import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Публичный endpoint - возвращаем только активные баннеры
    const banners = await prisma.banner.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        sortOrder: 'asc'
      }
    })

    return banners
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Ошибка получения баннеров'
    })
  }
})
