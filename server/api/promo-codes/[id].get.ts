import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

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

    const promoCode = await prisma.promoCode.findUnique({
      where: { id }
    })

    if (!promoCode) {
      throw createError({
        statusCode: 404,
        message: 'Промокод не найден'
      })
    }

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

