import { prisma } from '~/server/utils/prisma'
import { paymentClient } from '~/server/utils/payment-client'

export default defineEventHandler(async (event) => {
  try {
    const paymentId = getRouterParam(event, 'paymentId')

    if (!paymentId) {
      throw createError({
        statusCode: 400,
        message: 'ID платежа не указан'
      })
    }

    // Получаем статус платежа из ЮKassa (заглушка)
    const paymentStatus = await paymentClient.getPaymentStatus(paymentId)

    // Находим заказ по paymentId и обновляем статус
    const order = await prisma.order.findFirst({
      where: { paymentId }
    })

    if (order) {
      const paymentStatusMap: Record<string, 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'> = {
        'pending': 'PENDING',
        'succeeded': 'PAID',
        'canceled': 'FAILED'
      }

      const mappedStatus = paymentStatusMap[paymentStatus.status] || 'PENDING'

      if (order.paymentStatus !== mappedStatus) {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: mappedStatus
          }
        })

        // Если платеж успешен, можно автоматически отправить заказ в АЙКО
        if (mappedStatus === 'PAID' && !order.aikoOrderId) {
          try {
            const { aikoClient } = await import('~/server/utils/aiko-client')
            // Автоматическая отправка в АЙКО (если настроено)
            // await aikoClient.createOrder(...)
          } catch (error) {
            console.error('[Платежи] Ошибка автоматической отправки в АЙКО:', error)
          }
        }
      }
    }

    return {
      success: true,
      paymentId,
      status: paymentStatus.status,
      paid: paymentStatus.paid,
      amount: paymentStatus.amount,
      orderId: order?.id,
      note: 'Это заглушка. Реальная интеграция с ЮKassa будет реализована позже.'
    }
  } catch (error: any) {
    console.error('[Платежи] Ошибка получения статуса платежа:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении статуса платежа',
      data: {
        error: error.message
      }
    })
  }
})

