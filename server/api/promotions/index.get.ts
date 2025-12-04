import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Получаем только активные акции, отсортированные по порядку
    const promotions = await prisma.promotion.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        sortOrder: 'asc'
      }
    })

    return promotions
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Ошибка получения акций'
    })
  }
})

