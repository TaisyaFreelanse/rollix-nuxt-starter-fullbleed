import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID промокода не указан'
      })
    }

    // Проверяем, существует ли промокод перед удалением
    const promoCode = await prisma.promoCode.findUnique({
      where: { id }
    })

    if (!promoCode) {
      throw createError({
        statusCode: 404,
        message: 'Промокод не найден'
      })
    }

    await prisma.promoCode.delete({
      where: { id }
    })

    return { success: true }
  } catch (error: any) {
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

    console.error('[PromoCode Delete] Ошибка удаления промокода:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Ошибка при удалении промокода'
    })
  }
})

