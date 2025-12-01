import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const code = getRouterParam(event, 'code')?.toUpperCase()

    if (!code) {
      throw createError({
        statusCode: 400,
        message: 'Промокод не указан'
      })
    }

    const promoCode = await prisma.promoCode.findFirst({
      where: {
        code: code,
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
    if (promoCode.maxUses !== null) {
      const usageCount = await prisma.order.count({
        where: {
          promoCodeId: promoCode.id
        }
      })

      if (usageCount >= promoCode.maxUses) {
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

