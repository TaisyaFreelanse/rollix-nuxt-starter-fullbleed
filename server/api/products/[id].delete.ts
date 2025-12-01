import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации и прав администратора
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID товара не указан'
      })
    }

    // Мягкое удаление - просто деактивируем товар
    await prisma.product.update({
      where: { id },
      data: { isActive: false }
    })

    return { success: true }
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Товар не найден'
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при удалении товара'
    })
  }
})

