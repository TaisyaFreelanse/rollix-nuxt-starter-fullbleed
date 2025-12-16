import { prisma } from '~/server/utils/prisma'
import { aikoClient } from '~/server/utils/aiko-client'

/**
 * API endpoint для синхронизации статусов всех активных заказов из iikoCloud
 * POST /api/aiko/sync-orders-status
 * 
 * Синхронизирует статусы всех заказов, которые были отправлены в iikoCloud
 * и еще не завершены (не DELIVERED и не CANCELLED)
 */
export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации и прав администратора
    
    console.log('[АЙКО] Начало синхронизации статусов заказов...')

    // Получаем все активные заказы, которые были отправлены в iikoCloud
    const activeOrders = await prisma.order.findMany({
      where: {
        aikoOrderId: { not: null },
        status: {
          notIn: ['DELIVERED', 'CANCELLED']
        }
      },
      select: {
        id: true,
        orderNumber: true,
        aikoOrderId: true,
        status: true
      }
    })

    console.log(`[АЙКО] Найдено ${activeOrders.length} активных заказов для синхронизации`)

    let syncedCount = 0
    let updatedCount = 0
    const errors: string[] = []

    // Синхронизируем статусы заказов
    for (const order of activeOrders) {
      if (!order.aikoOrderId) continue

      try {
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

        // Обновляем статус заказа в БД, если он изменился
        if (order.status !== mappedStatus) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: mappedStatus as any }
          })

          console.log(`[АЙКО] ✅ Статус заказа ${order.orderNumber} обновлен: ${order.status} → ${mappedStatus}`)
          updatedCount++

          // Отправляем обновление через WebSocket (если настроен)
          try {
            const { broadcastOrderUpdate } = await import('~/server/websocket/orders')
            broadcastOrderUpdate(order.id, mappedStatus, {
              orderNumber: order.orderNumber,
              estimatedTime: aikoStatus.estimatedTime
            })
          } catch (error) {
            // WebSocket может быть не настроен
          }
        }

        syncedCount++
      } catch (error: any) {
        const errorMsg = `Ошибка синхронизации заказа ${order.orderNumber}: ${error.message}`
        errors.push(errorMsg)
        console.error(`[АЙКО] ${errorMsg}`)
      }
    }

    console.log(`[АЙКО] ✅ Синхронизация завершена: ${syncedCount} заказов синхронизировано, ${updatedCount} обновлено`)

    return {
      success: true,
      message: 'Синхронизация статусов заказов выполнена',
      stats: {
        totalOrders: activeOrders.length,
        syncedCount,
        updatedCount,
        errorsCount: errors.length,
        timestamp: new Date().toISOString()
      },
      errors: errors.length > 0 ? errors : undefined
    }
  } catch (error: any) {
    console.error('[АЙКО] Ошибка синхронизации статусов заказов:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      message: 'Ошибка при синхронизации статусов заказов из iikoCloud',
      data: {
        error: error.message
      }
    })
  }
})

