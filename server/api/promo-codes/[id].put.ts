import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    const promoCode = await prisma.promoCode.update({
      where: { id },
      data: {
        code: body.code,
        description: body.description,
        discountType: body.discountType,
        discountValue: body.discountValue,
        minOrderAmount: body.minOrderAmount,
        maxDiscount: body.maxDiscount,
        usageLimit: body.usageLimit,
        validFrom: body.validFrom ? new Date(body.validFrom) : null,
        validUntil: body.validUntil ? new Date(body.validUntil) : null,
        isActive: body.isActive
      }
    })

    return {
      ...promoCode,
      discountValue: Number(promoCode.discountValue),
      minOrderAmount: promoCode.minOrderAmount ? Number(promoCode.minOrderAmount) : null,
      maxDiscount: promoCode.maxDiscount ? Number(promoCode.maxDiscount) : null
    }
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        message: 'Промокод не найден'
      })
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка при обновлении промокода'
    })
  }
})

