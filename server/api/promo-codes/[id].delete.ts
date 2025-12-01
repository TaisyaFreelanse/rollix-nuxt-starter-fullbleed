import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации
    const id = getRouterParam(event, 'id')

    await prisma.promoCode.delete({
      where: { id }
    })

    return { success: true }
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Промокод не найден'
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при удалении промокода'
    })
  }
})

