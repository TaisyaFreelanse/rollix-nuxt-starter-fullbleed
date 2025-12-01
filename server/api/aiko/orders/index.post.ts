import { prisma } from '~/server/utils/prisma'
import { aikoClient } from '~/server/utils/aiko-client'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { orderId } = body

    if (!orderId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID заказа не указан'
      })
    }

    // Получаем заказ из БД
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
            modifiers: {
              include: {
                option: true
              }
            }
          }
        },
        address: true,
        deliveryZone: true
      }
    })

    if (!order) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Заказ не найден'
      })
    }

    // Формируем данные заказа для АЙКО
    const aikoOrderData = {
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
    }

    // Отправка заказа в АЙКО (заглушка)
    const aikoResponse = await aikoClient.createOrder(aikoOrderData)

    // Сохраняем ID заказа в АЙКО
    await prisma.order.update({
      where: { id: orderId },
      data: {
        aikoOrderId: aikoResponse.aikoOrderId
      }
    })

    return {
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      aikoOrderId: aikoResponse.aikoOrderId,
      message: 'Заказ отправлен в АЙКО (заглушка)',
      note: 'Это заглушка. Реальная интеграция будет реализована позже.'
    }
  } catch (error: any) {
    console.error('[АЙКО] Ошибка отправки заказа:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при отправке заказа в АЙКО',
      data: {
        error: error.message,
        note: 'Проверьте настройки AIKO_API_URL и AIKO_API_KEY'
      }
    })
  }
})

