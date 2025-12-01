import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации и прав администратора
    const query = getQuery(event)
    const isActive = query.isActive !== undefined ? query.isActive === 'true' : undefined

    const where: any = {}
    if (isActive !== undefined) {
      where.isActive = isActive
    }

    const promoCodes = await prisma.promoCode.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return promoCodes.map((code) => ({
      ...code,
      discountValue: Number(code.discountValue),
      minOrderAmount: code.minOrderAmount ? Number(code.minOrderAmount) : null,
      maxDiscount: code.maxDiscount ? Number(code.maxDiscount) : null
    }))
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при получении промокодов'
    })
  }
})

