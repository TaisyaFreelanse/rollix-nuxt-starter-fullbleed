import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, 'productId')
    const userId = 'user_123' // TODO: Получить из сессии/токена

    const favorite = await prisma.productFavorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    })

    return { isFavorite: !!favorite }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Ошибка при проверке избранного'
    })
  }
})

