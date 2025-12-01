import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const userId = 'user_123' // TODO: Получить из сессии/токена

    const favorites = await prisma.productFavorite.findMany({
      where: {
        userId
      },
      include: {
        product: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return favorites.map((fav) => ({
      ...fav,
      product: {
        ...fav.product,
        price: Number(fav.product.price),
        oldPrice: fav.product.oldPrice ? Number(fav.product.oldPrice) : null
      }
    }))
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при получении избранного'
    })
  }
})

