import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации и прав администратора
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID категории не указан'
      })
    }

    // Мягкое удаление - просто деактивируем категорию
    await prisma.category.update({
      where: { id },
      data: { isActive: false }
    })

    return { success: true }
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Категория не найдена'
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при удалении категории'
    })
  }
})

