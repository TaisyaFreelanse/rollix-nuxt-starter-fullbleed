import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, 'productId')
    const userId = 'user_123' // TODO: Получить из сессии/токена

    await prisma.productFavorite.delete({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    })

    return { success: true }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Ошибка при удалении из избранного'
    })
  }
})

