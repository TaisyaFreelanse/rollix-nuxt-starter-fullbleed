import { prisma } from '~/server/utils/prisma'
import { verifySmsCode } from '~/server/utils/sms-ru'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { phone, code } = body

    if (!phone || !code) {
      throw createError({
        statusCode: 400,
        message: 'Не указан телефон или код'
      })
    }

    // Нормализуем номер телефона
    const normalizedPhone = phone.replace(/\D/g, '')
    const phoneNumber = normalizedPhone.startsWith('8') 
      ? '7' + normalizedPhone.slice(1)
      : normalizedPhone.startsWith('7')
      ? normalizedPhone
      : '7' + normalizedPhone

    // Ищем код в БД
    const smsCodeRecord = await prisma.smsCode.findFirst({
      where: {
        phone: phoneNumber,
        code: code,
        verified: false,
        expiresAt: {
          gt: new Date() // Код еще не истек
        }
      },
      orderBy: {
        createdAt: 'desc' // Берем последний код
      }
    })

    if (!smsCodeRecord) {
      // Пробуем проверить через SMS.RU API (на случай если код был отправлен через звонок)
      const verifyResult = await verifySmsCode(phoneNumber, code)
      
      if (!verifyResult.success) {
        throw createError({
          statusCode: 400,
          message: 'Код неверен или истек'
        })
      }
    } else {
      // Помечаем код как использованный
      await prisma.smsCode.update({
        where: { id: smsCodeRecord.id },
        data: { verified: true }
      })
    }

    // Создаем или находим пользователя в БД
    // Используем raw SQL чтобы избежать проблем с bonusBalance до применения миграции
    let user
    try {
      // Сначала проверяем, существует ли пользователь
      const existingUser = await prisma.$queryRawUnsafe<Array<{id: string, phone: string, name: string | null, email: string | null, createdAt: Date, updatedAt: Date}>>(
        `SELECT id, phone, name, email, "createdAt", "updatedAt" 
         FROM users 
         WHERE phone = $1`,
        phoneNumber
      )
      
      if (existingUser.length > 0) {
        user = existingUser[0] as any
      } else {
        // Создаем нового пользователя
        // Проверяем, есть ли поле bonusBalance в таблице
        const hasBonusBalance = await prisma.$queryRawUnsafe<Array<{column_name: string}>>(
          `SELECT column_name 
           FROM information_schema.columns 
           WHERE table_name = 'users' AND column_name = 'bonusBalance'`
        )
        
        if (hasBonusBalance.length > 0) {
          // Поле есть, создаем с bonusBalance
          const createResult = await prisma.$queryRawUnsafe<Array<{id: string, phone: string, name: string | null, email: string | null, createdAt: Date, updatedAt: Date}>>(
            `INSERT INTO users (id, phone, name, email, "bonusBalance", "createdAt", "updatedAt") 
             VALUES (gen_random_uuid()::text, $1, NULL, NULL, 0, NOW(), NOW())
             RETURNING id, phone, name, email, "createdAt", "updatedAt"`,
            phoneNumber
          )
          user = createResult[0] as any
        } else {
          // Поле нет, создаем без bonusBalance
          const createResult = await prisma.$queryRawUnsafe<Array<{id: string, phone: string, name: string | null, email: string | null, createdAt: Date, updatedAt: Date}>>(
            `INSERT INTO users (id, phone, name, email, "createdAt", "updatedAt") 
             VALUES (gen_random_uuid()::text, $1, NULL, NULL, NOW(), NOW())
             RETURNING id, phone, name, email, "createdAt", "updatedAt"`,
            phoneNumber
          )
          user = createResult[0] as any
        }
      }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        message: `Ошибка создания пользователя: ${error.message}`
      })
    }

    // Генерируем JWT токен
    const { generateToken } = await import('~/server/utils/jwt')
    const token = await generateToken({
      userId: user.id,
      phone: user.phone
    })

    return {
      success: true,
      token,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        email: user.email
      }
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'Ошибка проверки кода'
    })
  }
})
