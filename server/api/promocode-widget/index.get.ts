import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Получаем активный виджет промокода
    const widget = await prisma.promocodeWidget.findFirst({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return widget || null
  } catch (error: any) {
    console.error('[Promocode Widget] Ошибка получения виджета:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка получения виджета промокода'
    })
  }
})

