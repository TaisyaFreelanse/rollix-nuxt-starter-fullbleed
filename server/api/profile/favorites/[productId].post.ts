import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, 'productId')
    const userId = 'user_123' // TODO: Получить из сессии/токена

    const favorite = await prisma.productFavorite.upsert({
      where: {
        userId_productId: {
          userId,
          productId
        }
      },
      create: {
        userId,
        productId
      },
      update: {}
    })

    return favorite
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при добавлении в избранное'
    })
  }
})

