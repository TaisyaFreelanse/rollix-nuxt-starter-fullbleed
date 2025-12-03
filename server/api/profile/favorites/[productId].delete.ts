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

    await prisma.productFavorite.delete({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    })

    return { success: true }
  } catch (error: any) {
    // Если записи не существует, это нормально - возвращаем success
    if (error.code === 'P2025') {
      return { success: true }
    }
    if (error.statusCode) {
      throw error
    }
    console.error('Ошибка при удалении из избранного:', error)
    throw createError({
      statusCode: 500,
      message: 'Ошибка при удалении из избранного'
    })
  }
})

