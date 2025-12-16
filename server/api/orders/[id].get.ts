import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID заказа не указан'
      })
    }

    // Получаем userId из авторизации (если пользователь авторизован)
    // Для обычных пользователей проверяем авторизацию и фильтруем по userId
    // Для админов (или если userId не указан в контексте) не фильтруем по userId
    const auth = event.context.auth
    const userId = auth?.userId || null

    // Пытаемся найти заказ
    let order
    if (userId) {
      // Если пользователь авторизован, ищем заказ только среди его заказов
      order = await prisma.order.findFirst({
        where: {
          id,
          userId
        },
      include: {
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
        },
        address: true,
        deliveryZone: true
      }
    })
    } else {
      // Если пользователь не авторизован (или админ), ищем заказ без фильтра по userId
      order = await prisma.order.findFirst({
        where: {
          id
        },
        include: {
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
          },
          address: true,
          deliveryZone: true
        }
      })
    }

    if (!order) {
      throw createError({
        statusCode: 404,
        message: 'Заказ не найден'
      })
    }

    // Если заказ был отправлен в iikoCloud, добавляем информацию о синхронизации
    const result: any = {
      ...order,
      subtotal: Number(order.subtotal),
      deliveryPrice: Number(order.deliveryPrice),
      discount: Number(order.discount),
      total: Number(order.total),
      hasIikoSync: !!order.aikoOrderId,
      iikoOrderId: order.aikoOrderId
    }

    return result
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении заказа'
    })
  }
})

