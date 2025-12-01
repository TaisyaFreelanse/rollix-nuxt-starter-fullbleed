import { prisma } from '~/server/utils/prisma'
import { aikoClient } from '~/server/utils/aiko-client'

export default defineEventHandler(async (event) => {
  try {
    const aikoOrderId = getRouterParam(event, 'aikoOrderId')

    if (!aikoOrderId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID заказа АЙКО не указан'
      })
    }

    // Получение статуса заказа из АЙКО (заглушка)
    const aikoStatus = await aikoClient.getOrderStatus(aikoOrderId)

    // Находим заказ в нашей БД и обновляем статус
    const order = await prisma.order.findFirst({
      where: { aikoOrderId }
    })

    if (order) {
      // Маппинг статусов АЙКО на наши статусы
      const statusMap: Record<string, string> = {
        'pending': 'PENDING',
        'confirmed': 'CONFIRMED',
        'preparing': 'PREPARING',
        'ready': 'READY',
        'delivering': 'DELIVERING',
        'delivered': 'DELIVERED',
        'cancelled': 'CANCELLED'
      }

      const mappedStatus = statusMap[aikoStatus.status.toLowerCase()] || aikoStatus.status

      if (order.status !== mappedStatus) {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: mappedStatus as any }
        })

        // Отправляем обновление через WebSocket
        try {
          const { broadcastOrderUpdate } = await import('~/server/websocket/orders')
          broadcastOrderUpdate(order.id, mappedStatus, {
            orderNumber: order.orderNumber,
            estimatedTime: aikoStatus.estimatedTime
          })
        } catch (error) {
          // WebSocket может быть не настроен
          console.log('WebSocket не настроен, пропускаем broadcast')
        }
      }
    }

    return {
      success: true,
      aikoOrderId,
      status: aikoStatus.status,
      estimatedTime: aikoStatus.estimatedTime,
      message: aikoStatus.message,
      updatedAt: aikoStatus.updatedAt,
      note: 'Это заглушка. Реальная интеграция будет реализована позже.'
    }
  } catch (error: any) {
    console.error('[АЙКО] Ошибка получения статуса:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при получении статуса заказа из АЙКО',
      data: {
        error: error.message,
        note: 'Проверьте настройки AIKO_API_URL и AIKO_API_KEY'
      }
    })
  }
})

