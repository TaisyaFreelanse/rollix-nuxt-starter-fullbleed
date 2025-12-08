import { prisma } from '~/server/utils/prisma'
import { getUserIdFromToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const userId = await getUserIdFromToken(event)
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: 'Требуется авторизация'
      })
    }

    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID адреса не указан'
      })
    }

    // Проверяем, что адрес принадлежит пользователю
    const existingAddress = await prisma.address.findUnique({
      where: { id }
    })

    if (!existingAddress) {
      throw createError({
        statusCode: 404,
        message: 'Адрес не найден'
      })
    }

    if (existingAddress.userId !== userId) {
      throw createError({
        statusCode: 403,
        message: 'Нет доступа к этому адресу'
      })
    }

    await prisma.address.delete({
      where: { id }
    })

    return { success: true }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Ошибка при удалении адреса:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Ошибка при удалении адреса'
    })
  }
})

