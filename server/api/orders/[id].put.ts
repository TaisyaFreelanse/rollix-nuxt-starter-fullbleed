import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации (только владелец заказа или администратор)
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID заказа не указан'
      })
    }

    const updateData: any = {}
    if (body.status !== undefined) updateData.status = body.status
    if (body.paymentStatus !== undefined) updateData.paymentStatus = body.paymentStatus
    if (body.paymentId !== undefined) updateData.paymentId = body.paymentId
    if (body.aikoOrderId !== undefined) updateData.aikoOrderId = body.aikoOrderId
    if (body.comment !== undefined) updateData.comment = body.comment
    if (body.deliveryTime !== undefined) {
      updateData.deliveryTime = body.deliveryTime ? new Date(body.deliveryTime) : null
    }

    const order = await prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true
          }
        },
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
        }
      }
    })

    // Начисляем бонусы при доставке заказа (1% от итоговой суммы)
    // Бонусы начисляются только за оплаченные и доставленные заказы
    if (updateData.status === 'DELIVERED' && order.userId && order.user) {
      try {
        const { awardBonusForDeliveredOrder } = await import('~/server/utils/bonus')
        await awardBonusForDeliveredOrder(order.id)
      } catch (error) {
        // Логируем ошибку, но не прерываем обновление заказа
        console.error('Ошибка начисления бонусов:', error)
      }
    }

    // Отправляем обновление через WebSocket (если настроен)
    if (updateData.status) {
      try {
        const { broadcastOrderUpdate } = await import('~/server/websocket/orders')
        broadcastOrderUpdate(id, updateData.status, {
          orderNumber: order.orderNumber,
          status: order.status
        })
      } catch (error) {
        // WebSocket может быть не настроен
        console.log('WebSocket не настроен, пропускаем broadcast')
      }
    }

    return {
      ...order,
      subtotal: Number(order.subtotal),
      deliveryPrice: Number(order.deliveryPrice),
      discount: Number(order.discount),
      total: Number(order.total)
    }
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        message: 'Заказ не найден'
      })
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка при обновлении заказа'
    })
  }
})

