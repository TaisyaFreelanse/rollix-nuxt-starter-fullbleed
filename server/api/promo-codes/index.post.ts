import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации и прав администратора
    const body = await readBody(event)

    const promoCode = await prisma.promoCode.create({
      data: {
        code: body.code.toUpperCase(),
        description: body.description,
        discountType: body.discountType,
        discountValue: body.discountValue,
        minOrderAmount: body.minOrderAmount,
        maxDiscount: body.maxDiscount,
        usageLimit: body.usageLimit,
        validFrom: body.validFrom ? new Date(body.validFrom) : null,
        validUntil: body.validUntil ? new Date(body.validUntil) : null,
        isActive: body.isActive !== undefined ? body.isActive : true
      }
    })

    return {
      ...promoCode,
      discountValue: Number(promoCode.discountValue),
      minOrderAmount: promoCode.minOrderAmount ? Number(promoCode.minOrderAmount) : null,
      maxDiscount: promoCode.maxDiscount ? Number(promoCode.maxDiscount) : null
    }
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw createError({
        statusCode: 409,
        message: 'Промокод с таким кодом уже существует'
      })
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка при создании промокода'
    })
  }
})

