import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const bannerId = getRouterParam(event, 'id')
    console.log('[Admin Banners] Получение баннера по ID:', bannerId)
    
    await requireAdminAuth(event)

    if (!bannerId) {
      throw createError({
        statusCode: 400,
        message: 'ID баннера не указан'
      })
    }

    console.log('[Admin Banners] Поиск баннера в БД...')
    const banner = await prisma.banner.findUnique({
      where: { id: bannerId }
    })

    if (!banner) {
      console.log('[Admin Banners] Баннер не найден:', bannerId)
      throw createError({
        statusCode: 404,
        message: 'Баннер не найден'
      })
    }

    console.log('[Admin Banners] Баннер найден:', banner.id)
    return banner
  } catch (error: any) {
    console.error('[Admin Banners] Ошибка получения баннера:', error)
    console.error('[Admin Banners] Детали:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      statusCode: error.statusCode
    })
    
    // Если ошибка уже имеет статус код, просто пробрасываем её
    if (error.statusCode) {
      throw error
    }
    
    // Если таблица не существует, возвращаем 404
    if (error.message?.includes('does not exist') || 
        error.message?.includes('relation') ||
        error.message?.includes('table') ||
        error.code === 'P2021' ||
        error.code === 'P2001' ||
        error.code === '42P01') {
      console.warn('[Admin Banners] Таблица banners не существует')
      throw createError({
        statusCode: 404,
        message: 'Баннер не найден'
      })
    }
    
    throw createError({
      statusCode: 500,
      message: error.message || 'Ошибка получения баннера'
    })
  }
})
