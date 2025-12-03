import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const userId = await requireAuth(event)

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
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Ошибка при получении избранного:', error)
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении избранного'
    })
  }
})

