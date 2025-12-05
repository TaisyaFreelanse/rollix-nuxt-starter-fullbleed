import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event)

    const banners = await prisma.banner.findMany({
      orderBy: {
        sortOrder: 'asc'
      }
    })

    return banners
  } catch (error: any) {
    console.error('[Admin Banners] Ошибка получения списка баннеров:', error)
    console.error('[Admin Banners] Детали:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      statusCode: error.statusCode
    })
    
    if (error.statusCode) {
      throw error
    }
    
    // Если таблица не существует, возвращаем пустой массив
    if (error.message?.includes('does not exist') || 
        error.message?.includes('relation') ||
        error.message?.includes('table') ||
        error.code === 'P2021' ||
        error.code === 'P2001' ||
        error.code === '42P01') {
      console.warn('[Admin Banners] Таблица banners не существует, возвращаем пустой массив')
      return []
    }
    
    throw createError({
      statusCode: 500,
      message: error.message || 'Ошибка получения баннеров'
    })
  }
})
