import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Проверяем авторизацию
    const currentAdminId = await requireAdminAuth(event)

    const adminId = getRouterParam(event, 'id')

    if (!adminId) {
      throw createError({
        statusCode: 400,
        message: 'Не указан ID администратора'
      })
    }

    // Нельзя удалить самого себя
    if (currentAdminId === adminId) {
      throw createError({
        statusCode: 400,
        message: 'Нельзя удалить собственный аккаунт'
      })
    }

    // Удаляем админа
    await prisma.admin.delete({
      where: { id: adminId }
    })

    return {
      success: true,
      message: 'Администратор удален'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка удаления администратора'
    })
  }
})

