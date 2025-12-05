import { prisma } from '~/server/utils/prisma'
import { hashPassword, comparePassword } from '~/server/utils/password'
import { generateAdminToken } from '~/server/utils/admin-jwt'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { login, password } = body

    if (!login || !password) {
      throw createError({
        statusCode: 400,
        message: 'Не указан логин или пароль'
      })
    }

    // Находим админа по логину
    const admin = await prisma.admin.findUnique({
      where: { login }
    })

    if (!admin) {
      throw createError({
        statusCode: 401,
        message: 'Неверный логин или пароль'
      })
    }

    if (!admin.isActive) {
      throw createError({
        statusCode: 403,
        message: 'Аккаунт администратора заблокирован'
      })
    }

    // Проверяем пароль
    const isPasswordValid = await comparePassword(password, admin.password)
    
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: 'Неверный логин или пароль'
      })
    }

    // Генерируем JWT токен
    const token = await generateAdminToken({
      adminId: admin.id,
      login: admin.login
    })

    // Проверяем, что токен правильно создан (для отладки)
    try {
      const decodedStr = Buffer.from(token, 'base64url').toString()
      const decoded = JSON.parse(decodedStr)
      console.log('[Admin Login] Создан токен админа с adminId:', decoded.adminId)
      if (decoded.userId || decoded.phone) {
        console.error('⚠️ ОШИБКА: Токен админа содержит поля пользователя!')
      }
    } catch (e) {
      console.error('⚠️ Ошибка проверки созданного токена:', e)
    }

    return {
      success: true,
      token,
      admin: {
        id: admin.id,
        login: admin.login,
        name: admin.name,
        isActive: admin.isActive
      }
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка входа в систему'
    })
  }
})

