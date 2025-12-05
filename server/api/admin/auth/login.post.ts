import { prisma } from '~/server/utils/prisma'
import { hashPassword, comparePassword } from '~/server/utils/password'
import { generateAdminToken } from '~/server/utils/admin-jwt'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { login, password } = body

    console.log('[Admin Login] Попытка входа:', { login, passwordLength: password?.length })

    if (!login || !password) {
      console.log('[Admin Login] Отсутствует логин или пароль')
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
      console.log('[Admin Login] Админ не найден:', login)
      throw createError({
        statusCode: 401,
        message: 'Неверный логин или пароль'
      })
    }

    console.log('[Admin Login] Админ найден:', { id: admin.id, login: admin.login, isActive: admin.isActive })

    if (!admin.isActive) {
      console.log('[Admin Login] Админ заблокирован:', admin.id)
      throw createError({
        statusCode: 403,
        message: 'Аккаунт администратора заблокирован'
      })
    }

    // Проверяем пароль
    console.log('[Admin Login] Проверка пароля...')
    const isPasswordValid = await comparePassword(password, admin.password)
    console.log('[Admin Login] Результат проверки пароля:', isPasswordValid)
    
    if (!isPasswordValid) {
      console.log('[Admin Login] Неверный пароль для админа:', admin.login)
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
    console.error('[Admin Login] Ошибка при входе:', error)
    console.error('[Admin Login] Stack:', error.stack)
    if (error.statusCode) {
      throw error
    }
    console.error('[Admin Login] Неизвестная ошибка, возвращаем 500')
    throw createError({
      statusCode: 500,
      message: error.message || 'Ошибка входа в систему'
    })
  }
})

