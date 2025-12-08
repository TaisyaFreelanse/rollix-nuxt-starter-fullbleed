import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Пробуем получить ID разными способами
    let id = getRouterParam(event, 'id')
    const url = event.node.req.url || ''
    const method = event.node.req.method

    // Если не получили через getRouterParam, пробуем извлечь из URL
    if (!id && url) {
      const match = url.match(/\/api\/promo-codes\/([^/?]+)/)
      if (match && match[1]) {
        id = match[1]
        console.log('[PromoCode Delete] ID извлечен из URL:', id)
      }
    }

    console.log('[PromoCode Delete] Запрос:', { method, url, id, routerParams: event.context.params })

    if (!id) {
      console.error('[PromoCode Delete] ID не получен из параметров маршрута или URL')
      throw createError({
        statusCode: 400,
        message: 'ID промокода не указан'
      })
    }

    // Если это похоже на код промокода (короткая строка в верхнем регистре), 
    // а не на ID, возвращаем 404 - такие запросы должны обрабатываться через [code].get.ts
    // ID обычно длиннее (20+ символов) и имеет формат Prisma ID
    // Коды промокодов обычно короткие (до 20 символов) и в верхнем регистре
    if (id.length <= 20 && id === id.toUpperCase() && /^[A-Z0-9]+$/.test(id)) {
      throw createError({
        statusCode: 404,
        message: 'Промокод не найден'
      })
    }

    console.log('[PromoCode Delete] Поиск промокода по ID для удаления:', id)
    // Проверяем, существует ли промокод перед удалением
    const promoCode = await prisma.promoCode.findUnique({
      where: { id }
    })

    if (!promoCode) {
      console.log('[PromoCode Delete] Промокод не найден в БД для ID:', id)
      // Проверяем, может быть это код, а не ID
      const promoByCode = await prisma.promoCode.findFirst({
        where: { code: id }
      })
      if (promoByCode) {
        console.log('[PromoCode Delete] Найден промокод по коду, но запрос был по ID. Используйте endpoint [code]')
      }
      throw createError({
        statusCode: 404,
        message: 'Промокод не найден'
      })
    }

    console.log('[PromoCode Delete] Промокод найден, удаляем:', promoCode.id, promoCode.code)

    await prisma.promoCode.delete({
      where: { id }
    })

    return { success: true }
  } catch (error: any) {
    console.error('[PromoCode Delete] Ошибка:', {
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
      stack: error.stack
    })

    // Если это уже ошибка с statusCode, пробрасываем её
    if (error.statusCode) {
      throw error
    }

    // Обработка ошибок Prisma
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        message: 'Промокод не найден'
      })
    }

    console.error('[PromoCode Delete] Неизвестная ошибка удаления промокода:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Ошибка при удалении промокода'
    })
  }
})

