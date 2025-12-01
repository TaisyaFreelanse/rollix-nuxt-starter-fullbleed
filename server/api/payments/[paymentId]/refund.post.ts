import { prisma } from '~/server/utils/prisma'
import { paymentClient } from '~/server/utils/payment-client'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации и прав администратора
    const paymentId = getRouterParam(event, 'paymentId')
    const body = await readBody(event)
    const { amount, reason } = body

    if (!paymentId) {
      throw createError({
        statusCode: 400,
        message: 'ID платежа не указан'
      })
    }

    if (!amount || amount <= 0) {
      throw createError({
        statusCode: 400,
        message: 'Сумма возврата не указана или неверна'
      })
    }

    // Находим заказ
    const order = await prisma.order.findFirst({
      where: { paymentId }
    })

    if (!order) {
      throw createError({
        statusCode: 404,
        message: 'Заказ не найден'
      })
    }

    if (order.paymentStatus !== 'PAID') {
      throw createError({
        statusCode: 400,
        message: 'Заказ не оплачен, возврат невозможен'
      })
    }

    // Выполняем возврат в ЮKassa (заглушка)
    const refund = await paymentClient.refundPayment(paymentId, amount, reason)

    // Обновляем статус заказа
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: 'REFUNDED'
      }
    })

    return {
      success: true,
      refundId: refund.id,
      paymentId,
      amount: refund.amount,
      status: refund.status,
      message: 'Возврат выполнен (заглушка)',
      note: 'Это заглушка. Реальная интеграция с ЮKassa будет реализована позже.'
    }
  } catch (error: any) {
    console.error('[Платежи] Ошибка возврата платежа:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      message: 'Ошибка при возврате платежа',
      data: {
        error: error.message
      }
    })
  }
})

