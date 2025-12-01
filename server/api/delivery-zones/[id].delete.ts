import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации
    const id = getRouterParam(event, 'id')

    await prisma.deliveryZone.update({
      where: { id },
      data: { isActive: false }
    })

    return { success: true }
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Зона доставки не найдена'
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при удалении зоны доставки'
    })
  }
})

