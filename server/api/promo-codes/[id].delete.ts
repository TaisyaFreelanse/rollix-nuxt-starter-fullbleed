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

