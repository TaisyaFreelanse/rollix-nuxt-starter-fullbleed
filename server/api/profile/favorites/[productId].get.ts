import { prisma } from '~/server/utils/prisma'
import { getUserIdFromToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, 'productId')
    const userId = await getUserIdFromToken(event)

    if (!userId) {
      return { isFavorite: false }
    }

    if (!productId) {
      throw createError({
        statusCode: 400,
        message: 'Не указан ID товара'
      })
    }

    const favorite = await prisma.productFavorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    })

    return { isFavorite: !!favorite }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Ошибка при проверке избранного:', error)
    throw createError({
      statusCode: 500,
      message: 'Ошибка при проверке избранного'
    })
  }
})

