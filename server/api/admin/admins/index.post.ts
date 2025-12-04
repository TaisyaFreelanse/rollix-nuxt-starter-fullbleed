import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'
import { hashPassword } from '~/server/utils/password'

export default defineEventHandler(async (event) => {
  try {
    // Проверяем авторизацию
    await requireAdminAuth(event)

    const body = await readBody(event)
    const { login, password, name } = body

    if (!login || !password) {
      throw createError({
        statusCode: 400,
        message: 'Не указан логин или пароль'
      })
    }

    // Проверяем, не существует ли уже админ с таким логином
    const existingAdmin = await prisma.admin.findUnique({
      where: { login }
    })

    if (existingAdmin) {
      throw createError({
        statusCode: 400,
        message: 'Администратор с таким логином уже существует'
      })
    }

    // Хэшируем пароль
    const hashedPassword = await hashPassword(password)

    // Создаем нового админа
    const admin = await prisma.admin.create({
      data: {
        login,
        password: hashedPassword,
        name: name || null,
        isActive: true
      },
      select: {
        id: true,
        login: true,
        name: true,
        isActive: true,
        createdAt: true
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
      message: 'Ошибка создания администратора'
    })
  }
})

