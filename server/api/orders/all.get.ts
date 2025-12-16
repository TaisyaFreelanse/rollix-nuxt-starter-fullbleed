import { prisma } from '~/server/utils/prisma'

/**
 * Получение всех заказов (для админ-панели)
 * TODO: Добавить проверку авторизации и прав администратора
 */
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const status = query.status as string | undefined
    const limit = query.limit ? parseInt(query.limit as string) : 100
    const offset = query.offset ? parseInt(query.offset as string) : 0

    const where: any = {}
    if (status) {
      where.status = status
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true
                }
              },
              modifiers: true
            }
          },
          address: true,
          deliveryZone: true,
          promoCode: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: limit,
        skip: offset
      }),
      prisma.order.count({ where })
    ])

    return {
      orders: orders.map((order) => ({
        ...order,
        subtotal: Number(order.subtotal),
        deliveryPrice: Number(order.deliveryPrice),
        discount: Number(order.discount),
        total: Number(order.total),
        hasIikoSync: !!order.aikoOrderId,
        iikoOrderId: order.aikoOrderId
      })),
      total,
      limit,
      offset
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении заказов'
    })
  }
})

