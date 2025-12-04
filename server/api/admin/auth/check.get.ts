import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const adminId = await requireAdminAuth(event)

    // Получаем информацию об админе
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        login: true,
        name: true,
        isActive: true,
        createdAt: true
      }
    })

    if (!admin || !admin.isActive) {
      throw createError({
        statusCode: 401,
        message: 'Администратор не найден или заблокирован'
      })
    }

    return {
      success: true,
      admin
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка проверки авторизации'
    })
  }
})

