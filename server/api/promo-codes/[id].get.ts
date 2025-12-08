import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Пробуем получить ID разными способами
    let id = getRouterParam(event, 'id')
    const url = event.node.req.url || ''
    const params = event.context.params || {}

    console.log('[PromoCode Get] Запрос:', { url, params, id })

    // Если не получили через getRouterParam, пробуем извлечь из URL
    // Также проверяем routerParams - возможно, Nuxt неправильно маршрутизировал запрос
    if (!id) {
      const match = url.match(/\/api\/promo-codes\/([^/?]+)/)
      if (match && match[1]) {
        id = match[1]
        console.log('[PromoCode Get] ID извлечен из URL:', id)
      } else if (params.code) {
        // Nuxt неправильно маршрутизировал запрос как [code] вместо [id]
        id = params.code
        console.log('[PromoCode Get] ID извлечен из routerParams.code:', id)
      } else if (params.id) {
        id = params.id
        console.log('[PromoCode Get] ID извлечен из routerParams.id:', id)
      }
    }

    if (!id) {
      throw createError({
        statusCode: 404,
        message: 'Промокод не найден'
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

    console.log('[PromoCode Get] Поиск промокода по ID:', id)
    const promoCode = await prisma.promoCode.findUnique({
      where: { id }
    })

    if (!promoCode) {
      console.log('[PromoCode Get] Промокод не найден в БД для ID:', id)
      // Проверяем, может быть это код, а не ID
      const promoByCode = await prisma.promoCode.findFirst({
        where: { code: id }
      })
      if (promoByCode) {
        console.log('[PromoCode Get] Найден промокод по коду, но запрос был по ID. Используйте endpoint [code]')
      }
      throw createError({
        statusCode: 404,
        message: 'Промокод не найден'
      })
    }

    console.log('[PromoCode Get] Промокод найден:', promoCode.id, promoCode.code)

    return {
      ...promoCode,
      discountValue: Number(promoCode.discountValue),
      minOrderAmount: promoCode.minOrderAmount ? Number(promoCode.minOrderAmount) : null,
      maxDiscount: promoCode.maxDiscount ? Number(promoCode.maxDiscount) : null
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении промокода'
    })
  }
})

