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
    // Получаем userId из контекста авторизации (если пользователь авторизован)
    const auth = event.context.auth
    const userId = auth?.userId || body.userId || null

    // Генерируем номер заказа
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Преобразуем deliveryType в enum (DELIVERY или PICKUP)
    const deliveryTypeEnum = body.deliveryType?.toUpperCase() === 'PICKUP' ? 'PICKUP' : 'DELIVERY'

    // Фильтруем товары: исключаем приборы и специи (они не являются реальными продуктами в БД)
    // Приборы и специи имеют ID вида: utensils-* или spice-*
    const validItems = (body.items || []).filter((item: any) => {
      const productId = item.product?.id || item.productId
      // Исключаем товары с ID, которые начинаются с 'utensils-' или 'spice-'
      if (productId && (productId.startsWith('utensils-') || productId.startsWith('spice-'))) {
        console.log(`Исключаем товар из заказа (не является продуктом в БД): ${productId}`)
        return false
      }
      return true
    })

    // Проверяем существование продуктов в базе данных
    const productIds = validItems.map((item: any) => item.product?.id || item.productId).filter(Boolean)
    if (productIds.length > 0) {
      const existingProducts = await prisma.product.findMany({
        where: {
          id: { in: productIds }
        },
        select: { id: true }
      })
      const existingProductIds = new Set(existingProducts.map(p => p.id))
      
      // Фильтруем только существующие продукты
      const itemsWithValidProducts = validItems.filter((item: any) => {
        const productId = item.product?.id || item.productId
        if (!productId || !existingProductIds.has(productId)) {
          console.log(`Товар не найден в базе данных: ${productId}`)
          return false
        }
        return true
      })

      // Если после фильтрации не осталось товаров, выдаем ошибку
      if (itemsWithValidProducts.length === 0) {
        throw createError({
          statusCode: 400,
          message: 'В корзине нет действительных товаров для заказа'
        })
      }

      // Создаем заказ только с валидными товарами
      const order = await prisma.order.create({
        data: {
          userId,
          orderNumber,
          status: 'PENDING',
          deliveryType: deliveryTypeEnum,
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
            create: itemsWithValidProducts.map((item: any) => ({
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

      // Автоматическая отправка заказа в iikoCloud
      // По умолчанию включено, можно отключить через AUTO_SEND_TO_AIKO=false
      const autoSendToAiko = process.env.AUTO_SEND_TO_AIKO !== 'false'
      
      if (autoSendToAiko) {
        try {
          console.log('[АЙКО] Автоматическая отправка заказа в iikoCloud...')
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

          // Обновляем заказ с ID из iikoCloud
          await prisma.order.update({
            where: { id: order.id },
            data: { aikoOrderId: aikoResponse.aikoOrderId }
          })
          
          console.log('[АЙКО] ✅ Заказ успешно отправлен в iikoCloud, ID:', aikoResponse.aikoOrderId)
        } catch (error: any) {
          console.error('[АЙКО] ❌ Ошибка автоматической отправки заказа:', error.message)
          // Не прерываем создание заказа, если iikoCloud недоступен
          // Заказ сохраняется в БД, но не отправляется в iikoCloud
        }
      } else {
        console.log('[АЙКО] Автоматическая отправка заказов отключена (AUTO_SEND_TO_AIKO=false)')
      }

      return {
        ...order,
        subtotal: Number(order.subtotal),
        deliveryPrice: Number(order.deliveryPrice),
        discount: Number(order.discount),
        total: Number(order.total)
      }
    } else {
      // Если нет товаров для заказа
      throw createError({
        statusCode: 400,
        message: 'В корзине нет действительных товаров для заказа'
      })
    }
  } catch (error) {
    console.error('Ошибка создания заказа:', error)
    throw createError({
      statusCode: 500,
      message: 'Ошибка при создании заказа'
    })
  }
})

