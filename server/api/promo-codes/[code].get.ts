import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const code = getRouterParam(event, 'code')

    if (!code) {
      throw createError({
        statusCode: 400,
        message: 'Промокод не указан'
      })
    }

    // Если это похоже на ID (длинная строка, не в верхнем регистре), 
    // это не код промокода - такие запросы должны обрабатываться через [id].get.ts
    // ID обычно длиннее (20+ символов) и имеет формат Prisma ID (смешанный регистр)
    // Коды промокодов обычно короткие (до 20 символов) и в верхнем регистре
    if (code.length > 20 || code !== code.toUpperCase() || !/^[A-Z0-9]+$/.test(code.toUpperCase())) {
      // Это похоже на ID, а не на код - возвращаем 404, чтобы запрос попал в [id].get.ts
      throw createError({
        statusCode: 404,
        message: 'Промокод не найден'
      })
    }

    const codeUpper = code.toUpperCase()

    const promoCode = await prisma.promoCode.findFirst({
      where: {
        code: codeUpper,
        isActive: true,
        validFrom: { lte: new Date() },
        OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }]
      }
    })

    if (!promoCode) {
      throw createError({
        statusCode: 404,
        message: 'Промокод не найден или недействителен'
      })
    }

    // Проверяем лимит использований
    if (promoCode.usageLimit !== null) {
      const usageCount = await prisma.order.count({
        where: {
          promoCodeId: promoCode.id
        }
      })

      if (usageCount >= promoCode.usageLimit) {
        throw createError({
          statusCode: 400,
          message: 'Промокод исчерпал лимит использований'
        })
      }
    }

    return {
      code: promoCode.code,
      discountType: promoCode.discountType,
      discountValue: Number(promoCode.discountValue),
      minOrderAmount: Number(promoCode.minOrderAmount),
      maxDiscount: promoCode.maxDiscount ? Number(promoCode.maxDiscount) : undefined
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка при проверке промокода'
    })
  }
})

