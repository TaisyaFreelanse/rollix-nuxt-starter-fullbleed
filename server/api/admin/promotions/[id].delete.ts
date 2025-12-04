import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event)

    const promotionId = getRouterParam(event, 'id')

    if (!promotionId) {
      throw createError({
        statusCode: 400,
        message: 'Не указан ID акции'
      })
    }

    // Удаляем акцию
    await prisma.promotion.delete({
      where: { id: promotionId }
    })

    return {
      success: true,
      message: 'Акция удалена'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка удаления акции'
    })
  }
})

