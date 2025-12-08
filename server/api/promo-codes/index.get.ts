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
      },
      include: {
        _count: {
          select: {
            orders: true
          }
        }
      }
    })

    console.log('[PromoCode List] Найдено промокодов:', promoCodes.length)
    promoCodes.forEach((code) => {
      console.log('[PromoCode List] Промокод:', { id: code.id, code: code.code })
    })

    return promoCodes.map((code) => ({
      ...code,
      discountValue: Number(code.discountValue),
      minOrderAmount: code.minOrderAmount ? Number(code.minOrderAmount) : null,
      maxDiscount: code.maxDiscount ? Number(code.maxDiscount) : null,
      usedCount: code._count?.orders || 0,
      usageLimit: code.usageLimit
    }))
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении промокодов'
    })
  }
})

