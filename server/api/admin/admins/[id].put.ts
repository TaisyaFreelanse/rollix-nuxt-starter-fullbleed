import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'
import { hashPassword } from '~/server/utils/password'

export default defineEventHandler(async (event) => {
  try {
    // Проверяем авторизацию
    await requireAdminAuth(event)

    const adminId = getRouterParam(event, 'id')
    const body = await readBody(event)
    const { name, password, isActive } = body

    if (!adminId) {
      throw createError({
        statusCode: 400,
        message: 'Не указан ID администратора'
      })
    }

    // Подготавливаем данные для обновления
    const updateData: any = {}
    
    if (name !== undefined) {
      updateData.name = name
    }
    
    if (password !== undefined && password.length > 0) {
      updateData.password = await hashPassword(password)
    }
    
    if (isActive !== undefined) {
      updateData.isActive = isActive
    }

    // Обновляем админа
    const admin = await prisma.admin.update({
      where: { id: adminId },
      data: updateData,
      select: {
        id: true,
        login: true,
        name: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

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
      message: 'Ошибка обновления администратора'
    })
  }
})

