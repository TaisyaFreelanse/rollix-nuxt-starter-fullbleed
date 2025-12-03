import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, 'productId')
    const userId = await requireAuth(event)

    if (!productId) {
      throw createError({
        statusCode: 400,
        message: 'Не указан ID товара'
      })
    }

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
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Ошибка при добавлении в избранное:', error)
    throw createError({
      statusCode: 500,
      message: 'Ошибка при добавлении в избранное'
    })
  }
})

