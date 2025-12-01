import { prisma } from '~/server/utils/prisma'
import { paymentClient } from '~/server/utils/payment-client'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { orderId, returnUrl } = body

    if (!orderId) {
      throw createError({
        statusCode: 400,
        message: 'ID заказа не указан'
      })
    }

    // Получаем заказ
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    })

    if (!order) {
      throw createError({
        statusCode: 404,
        message: 'Заказ не найден'
      })
    }

    if (order.paymentStatus === 'PAID') {
      throw createError({
        statusCode: 400,
        message: 'Заказ уже оплачен'
      })
    }

    // Создаем платеж в ЮKassa (заглушка)
    const payment = await paymentClient.createPayment({
      amount: Number(order.total),
      currency: 'RUB',
      orderId: order.id,
      orderNumber: order.orderNumber,
      description: `Оплата заказа #${order.orderNumber}`,
      returnUrl: returnUrl || `${process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/callback`,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        userId: order.userId
      }
    })

    // Сохраняем ID платежа в заказе
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentId: payment.id,
        paymentStatus: 'PENDING'
      }
    })

    return {
      success: true,
      paymentId: payment.id,
      confirmationUrl: payment.confirmation.confirmation_url,
      status: payment.status,
      note: 'Это заглушка. Реальная интеграция с ЮKassa будет реализована позже.'
    }
  } catch (error: any) {
    console.error('[Платежи] Ошибка создания платежа:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      message: 'Ошибка при создании платежа',
      data: {
        error: error.message,
        note: 'Проверьте настройки YUKASSA_SHOP_ID и YUKASSA_SECRET_KEY'
      }
    })
  }
})

