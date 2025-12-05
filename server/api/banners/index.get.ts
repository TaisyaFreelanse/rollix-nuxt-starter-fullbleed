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
  } catch (error: any) {
    console.error('[Banners API] Ошибка получения баннеров:', error)
    console.error('[Banners API] Детали ошибки:', {
      message: error.message,
      code: error.code,
      meta: error.meta
    })
    
    // Если таблица не существует или другая ошибка БД, возвращаем пустой массив
    if (error.message?.includes('does not exist') || 
        error.message?.includes('relation') ||
        error.message?.includes('table') ||
        error.code === 'P2021' ||
        error.code === 'P2001' ||
        error.code === '42P01') {
      console.warn('[Banners API] Таблица banners не существует или недоступна, возвращаем пустой массив')
      return []
    }
    
    throw createError({
      statusCode: 500,
      message: error.message || 'Ошибка получения баннеров'
    })
  }
})
