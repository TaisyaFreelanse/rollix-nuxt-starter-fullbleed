import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Проверяем авторизацию
    await requireAdminAuth(event)

    // Получаем список всех админов (без паролей)
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        login: true,
        name: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return admins
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка получения списка администраторов'
    })
  }
})

