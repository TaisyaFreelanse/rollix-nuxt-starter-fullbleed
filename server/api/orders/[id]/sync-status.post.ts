import { prisma } from '~/server/utils/prisma'
import { aikoClient } from '~/server/utils/aiko-client'

/**
 * API endpoint для синхронизации статуса заказа из iikoCloud
 * POST /api/orders/[id]/sync-status
 */
export default defineEventHandler(async (event) => {
  try {
    const orderId = getRouterParam(event, 'id')
    
    if (!orderId) {
      throw createError({
        statusCode: 400,
        message: 'ID заказа не указан'
      })
    }

    // Получаем заказ из БД
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    })

    if (!order) {
      throw createError({
        statusCode: 404,
        message: 'Заказ не найден'
      })
    }

    if (!order.aikoOrderId) {
      throw createError({
        statusCode: 400,
        message: 'Заказ не был отправлен в iikoCloud (нет aikoOrderId)'
      })
    }

    // Получаем статус из iikoCloud
    const aikoStatus = await aikoClient.getOrderStatus(order.aikoOrderId)

    // Маппинг статусов iikoCloud на наши статусы
    const statusMap: Record<string, string> = {
      'New': 'PENDING',
      'Bill': 'CONFIRMED',
      'CookingStarted': 'PREPARING',
      'CookingCompleted': 'READY',
      'OnWay': 'DELIVERING',
      'Closed': 'DELIVERED',
      'Deleted': 'CANCELLED'
    }

    const mappedStatus = statusMap[aikoStatus.status] || aikoStatus.status.toUpperCase()

    // Определяем порядок статусов для предотвращения отката назад
    const statusOrder: Record<string, number> = {
      'PENDING': 1,
      'CONFIRMED': 2,
      'PREPARING': 3,
      'READY': 4,
      'DELIVERING': 5,
      'DELIVERED': 6,
      'CANCELLED': 99 // CANCELLED можно установить в любой момент
    }

    const currentStatusOrder = statusOrder[order.status] || 0
    const newStatusOrder = statusOrder[mappedStatus] || 0

    // Обновляем статус заказа в БД, если он изменился И новый статус не является откатом назад
    // Исключение: CANCELLED можно установить в любой момент
    const shouldUpdate = order.status !== mappedStatus && 
      (newStatusOrder >= currentStatusOrder || mappedStatus === 'CANCELLED')

    if (shouldUpdate) {
      const updatedOrder = await prisma.order.update({
        where: { id: order.id },
        data: { status: mappedStatus as any },
        include: {
          user: {
            select: {
              id: true
            }
          }
        }
      })

      console.log(`[АЙКО] ✅ Статус заказа ${order.orderNumber} обновлен: ${order.status} → ${mappedStatus}`)

      // Начисляем бонусы при доставке заказа
      if (mappedStatus === 'DELIVERED' && updatedOrder.userId && updatedOrder.user) {
        try {
          const { awardBonusForDeliveredOrder } = await import('~/server/utils/bonus')
          await awardBonusForDeliveredOrder(updatedOrder.id)
        } catch (error) {
          console.error('[АЙКО] Ошибка начисления бонусов:', error)
        }
      }

      // Отправляем обновление через WebSocket (если настроен)
      try {
        const { broadcastOrderUpdate } = await import('~/server/websocket/orders')
        broadcastOrderUpdate(order.id, mappedStatus, {
          orderNumber: order.orderNumber,
          estimatedTime: aikoStatus.estimatedTime
        })
      } catch (error) {
        // WebSocket может быть не настроен
        console.log('[АЙКО] WebSocket не настроен, пропускаем broadcast')
      }
    } else if (order.status !== mappedStatus && newStatusOrder < currentStatusOrder) {
      console.log(`[АЙКО] ⚠️  Статус заказа ${order.orderNumber} не обновлен (откат назад предотвращен): ${order.status} → ${mappedStatus}`)
    }

    return {
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      oldStatus: order.status,
      newStatus: mappedStatus,
      iikoStatus: aikoStatus.status,
      updated: order.status !== mappedStatus,
      message: aikoStatus.message,
      updatedAt: new Date().toISOString()
    }
  } catch (error: any) {
    console.error('[АЙКО] Ошибка синхронизации статуса заказа:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      message: 'Ошибка при синхронизации статуса заказа из iikoCloud',
      data: {
        error: error.message
      }
    })
  }
})

