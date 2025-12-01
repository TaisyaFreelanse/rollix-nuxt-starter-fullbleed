import { prisma } from '~/server/utils/prisma'
import { paymentClient } from '~/server/utils/payment-client'

export default defineEventHandler(async (event) => {
  try {
    // Получаем тело запроса и заголовки
    const body = await readBody(event)
    const signature = getHeader(event, 'x-yookassa-signature') || getHeader(event, 'authorization') || ''

    // Проверяем подпись webhook (заглушка)
    const bodyString = JSON.stringify(body)
    const isValid = paymentClient.verifyWebhookSignature(bodyString, signature)

    if (!isValid) {
      console.warn('[Платежи] Неверная подпись webhook')
      // В реальной реализации здесь должна быть проверка подписи
      // throw createError({
      //   statusCode: 401,
      //   statusMessage: 'Неверная подпись webhook'
      // })
    }

    // Обработка события от ЮKassa
    const eventType = body.event || body.type
    const paymentData = body.object || body

    console.log('[Платежи] Webhook получен:', {
      event: eventType,
      paymentId: paymentData.id,
      status: paymentData.status
    })

    // Находим заказ по paymentId
    const order = await prisma.order.findFirst({
      where: { paymentId: paymentData.id }
    })

    if (!order) {
      console.warn('[Платежи] Заказ не найден для платежа:', paymentData.id)
      return { received: true }
    }

    // Обновляем статус платежа в зависимости от события
    let paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' = 'PENDING'

    if (eventType === 'payment.succeeded' || paymentData.status === 'succeeded') {
      paymentStatus = 'PAID'
    } else if (eventType === 'payment.canceled' || paymentData.status === 'canceled') {
      paymentStatus = 'FAILED'
    } else if (eventType === 'refund.succeeded') {
      paymentStatus = 'REFUNDED'
    }

    // Обновляем заказ
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus
      }
    })

    // Если платеж успешен, автоматически отправляем заказ в АЙКО (если еще не отправлен)
    if (paymentStatus === 'PAID' && !order.aikoOrderId) {
      try {
        const { aikoClient } = await import('~/server/utils/aiko-client')
        // Автоматическая отправка в АЙКО
        // const aikoResponse = await aikoClient.createOrder(...)
        // await prisma.order.update({
        //   where: { id: order.id },
        //   data: { aikoOrderId: aikoResponse.aikoOrderId }
        // })
        console.log('[Платежи] Платеж успешен, заказ готов к отправке в АЙКО')
      } catch (error) {
        console.error('[Платежи] Ошибка автоматической отправки в АЙКО:', error)
      }
    }

    return {
      received: true,
      processed: true,
      orderId: order.id,
      paymentStatus,
      note: 'Webhook обработан (заглушка)'
    }
  } catch (error: any) {
    console.error('[Платежи] Ошибка обработки webhook:', error)
    
    // Webhook должен возвращать 200 даже при ошибках, чтобы ЮKassa не повторял запрос
    return {
      received: true,
      error: error.message,
      note: 'Ошибка обработки webhook (заглушка)'
    }
  }
})

