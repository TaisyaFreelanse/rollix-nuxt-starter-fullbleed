import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const userId = 'user_123' // TODO: Получить из сессии/токена

    const orders = await prisma.order.findMany({
      where: {
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return orders.map((order) => ({
      ...order,
      subtotal: Number(order.subtotal),
      deliveryPrice: Number(order.deliveryPrice),
      discount: Number(order.discount),
      total: Number(order.total),
      items: order.items.map((item) => ({
        ...item,
        price: Number(item.price),
        subtotal: Number(item.subtotal)
      }))
    }))
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при получении заказов'
    })
  }
})

