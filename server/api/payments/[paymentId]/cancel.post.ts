import { prisma } from '~/server/utils/prisma'
import { paymentClient } from '~/server/utils/payment-client'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации
    const paymentId = getRouterParam(event, 'paymentId')
    const body = await readBody(event)
    const { reason } = body

    if (!paymentId) {
      throw createError({
        statusCode: 400,
        message: 'ID платежа не указан'
      })
    }

    // Отменяем платеж в ЮKassa (заглушка)
    const canceledPayment = await paymentClient.cancelPayment(paymentId, reason)

    // Обновляем статус заказа
    const order = await prisma.order.findFirst({
      where: { paymentId }
    })

    if (order) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: 'FAILED'
        }
      })
    }

    return {
      success: true,
      paymentId,
      status: canceledPayment.status,
      message: 'Платеж отменен (заглушка)',
      note: 'Это заглушка. Реальная интеграция с ЮKassa будет реализована позже.'
    }
  } catch (error: any) {
    console.error('[Платежи] Ошибка отмены платежа:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      message: 'Ошибка при отмене платежа',
      data: {
        error: error.message
      }
    })
  }
})

