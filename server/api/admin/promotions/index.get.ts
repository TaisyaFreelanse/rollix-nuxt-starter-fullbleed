import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event)

    // Получаем все акции (включая неактивные), отсортированные по порядку
    const promotions = await prisma.promotion.findMany({
      orderBy: {
        sortOrder: 'asc'
      }
    })

    return promotions
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка получения акций'
    })
  }
})

