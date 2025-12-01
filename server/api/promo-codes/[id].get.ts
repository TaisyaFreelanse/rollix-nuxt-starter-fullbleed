import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

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

