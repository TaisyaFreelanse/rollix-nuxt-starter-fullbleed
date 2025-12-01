import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Проверка режима технических работ
    try {
      const settings = await $fetch('/api/admin/settings').catch(() => null)
      if (settings?.isMaintenanceMode) {
        throw createError({
          statusCode: 503,
          message: settings.maintenanceMessage || 'Сайт временно недоступен. Ведутся технические работы.'
        })
      }
    } catch (error: any) {
      // Если это наша ошибка о техработах, пробрасываем её дальше
      if (error.statusCode === 503) {
        throw error
      }
      // Иначе игнорируем ошибку проверки настроек
    }

    const body = await readBody(event)
    const userId = body.userId || null // TODO: Получить из сессии/токена

    // Генерируем номер заказа
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Создаем заказ
    const order = await prisma.order.create({
      data: {
        userId,
        orderNumber,
        status: 'PENDING',
        deliveryType: body.deliveryType,
        deliveryZoneId: body.deliveryZoneId,
        addressId: body.addressId,
        addressText: body.addressText,
        phone: body.phone,
        name: body.name,
        comment: body.comment,
        deliveryTime: body.deliveryTime ? new Date(body.deliveryTime) : null,
        subtotal: body.subtotal,
        deliveryPrice: body.deliveryPrice,
        discount: body.discount || 0,
        total: body.total,
        promoCodeId: body.promoCodeId,
        paymentMethod: body.paymentMethod || 'CASH',
        paymentStatus: 'PENDING',
        items: {
          create: (body.items || []).map((item: any) => ({
            productId: item.product?.id || item.productId,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity,
            modifiers: {
              create: (item.selectedModifiers || []).flatMap((modifier: any) =>
                (modifier.optionIds || []).map((optionId: string) => {
                  const productModifier = item.product?.modifiers?.find(
                    (m: any) => m.id === modifier.modifierId
                  )
                  const option = productModifier?.options?.find((o: any) => o.id === optionId)
                  return {
                    modifierId: modifier.modifierId,
                    optionId: optionId,
                    name: `${productModifier?.name || ''} - ${option?.name || ''}`,
                    price: option?.price || 0
                  }
                })
              )
            }
          }))
        }
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        },
        address: true,
        deliveryZone: true
      }
    })

    // Обновляем счетчик использований промокода
    if (body.promoCodeId) {
      await prisma.promoCode.update({
        where: { id: body.promoCodeId },
        data: {
          usedCount: {
            increment: 1
          }
        }
      })
    }

    // Автоматическая отправка заказа в АЙКО (если настроено)
    if (process.env.AUTO_SEND_TO_AIKO === 'true') {
      try {
        const { aikoClient } = await import('~/server/utils/aiko-client')
        const aikoResponse = await aikoClient.createOrder({
          orderNumber: order.orderNumber,
          phone: order.phone,
          name: order.name,
          address: order.addressText || (order.address 
            ? `${order.address.street}, д. ${order.address.house}${order.address.apartment ? `, кв. ${order.address.apartment}` : ''}`
            : null),
          deliveryType: order.deliveryType,
          deliveryTime: order.deliveryTime,
          comment: order.comment,
          items: order.items.map((item) => ({
            productId: item.productId,
            productName: item.product.name,
            quantity: item.quantity,
            price: Number(item.price),
            modifiers: item.modifiers.map((mod) => ({
              name: mod.name,
              price: Number(mod.price)
            }))
          })),
          total: Number(order.total),
          subtotal: Number(order.subtotal),
          deliveryPrice: Number(order.deliveryPrice)
        })

        // Обновляем заказ с ID из АЙКО
        await prisma.order.update({
          where: { id: order.id },
          data: { aikoOrderId: aikoResponse.aikoOrderId }
        })
      } catch (error) {
        console.error('[АЙКО] Ошибка автоматической отправки заказа:', error)
        // Не прерываем создание заказа, если АЙКО недоступен
      }
    }

    return {
      ...order,
      subtotal: Number(order.subtotal),
      deliveryPrice: Number(order.deliveryPrice),
      discount: Number(order.discount),
      total: Number(order.total)
    }
  } catch (error) {
    console.error('Ошибка создания заказа:', error)
    throw createError({
      statusCode: 500,
      message: 'Ошибка при создании заказа'
    })
  }
})

