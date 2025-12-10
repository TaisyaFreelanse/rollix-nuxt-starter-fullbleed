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
    let user: {id: string, phone: string, name: string | null, email: string | null} | null = null
    
    try {
      // Пытаемся использовать обычный Prisma upsert (если миграция применена)
      try {
        user = await prisma.user.upsert({
          where: { phone: phoneNumber },
          create: {
            phone: phoneNumber,
            name: null,
            bonusBalance: 0
          },
          update: {}
        })
      } catch (prismaError: any) {
        // Если ошибка связана с bonusBalance, используем raw SQL
        if (prismaError.message?.includes('bonusBalance') || 
            prismaError.message?.includes('column') || 
            prismaError.message?.includes('does not exist')) {
          
          // Проверяем существование пользователя через простой запрос
          // Используем COALESCE для NULL значений и явное приведение типов
          const existingUserResult = await prisma.$queryRaw<Array<any>>`
            SELECT 
              id::text as id,
              phone::text as phone,
              COALESCE("name", NULL)::text as "name",
              COALESCE(email, NULL)::text as email,
              "createdAt",
              "updatedAt"
            FROM users 
            WHERE phone = ${phoneNumber}
          `
          
          if (existingUserResult && existingUserResult.length > 0) {
            const rawUser = existingUserResult[0]
            user = {
              id: rawUser.id,
              phone: rawUser.phone,
              name: rawUser.name || null,
              email: rawUser.email || null,
              createdAt: rawUser.createdAt,
              updatedAt: rawUser.updatedAt
            }
          } else {
            // Проверяем, есть ли поле bonusBalance
            const hasBonusBalance = await prisma.$queryRaw<Array<{column_name: string}>>`
              SELECT column_name 
              FROM information_schema.columns 
              WHERE table_name = 'users' AND column_name = 'bonusBalance'
            `
            
            if (hasBonusBalance.length > 0) {
              // Поле есть, создаем с bonusBalance
              const createdUserResult = await prisma.$queryRaw<Array<any>>`
                INSERT INTO users (id, phone, name, email, "bonusBalance", "createdAt", "updatedAt") 
                VALUES (gen_random_uuid()::text, ${phoneNumber}, NULL, NULL, 0, NOW(), NOW())
                RETURNING 
                  id::text as id,
                  phone::text as phone,
                  COALESCE("name", NULL)::text as "name",
                  COALESCE(email, NULL)::text as email,
                  "createdAt",
                  "updatedAt"
              `
              
              if (createdUserResult && createdUserResult.length > 0) {
                const rawUser = createdUserResult[0]
                user = {
                  id: rawUser.id,
                  phone: rawUser.phone,
                  name: rawUser.name || null,
                  email: rawUser.email || null,
                  createdAt: rawUser.createdAt,
                  updatedAt: rawUser.updatedAt
                }
              }
            } else {
              // Поле нет, создаем без bonusBalance
              const createdUserResult = await prisma.$queryRaw<Array<any>>`
                INSERT INTO users (id, phone, name, email, "createdAt", "updatedAt") 
                VALUES (gen_random_uuid()::text, ${phoneNumber}, NULL, NULL, NOW(), NOW())
                RETURNING 
                  id::text as id,
                  phone::text as phone,
                  COALESCE("name", NULL)::text as "name",
                  COALESCE(email, NULL)::text as email,
                  "createdAt",
                  "updatedAt"
              `
              
              if (createdUserResult && createdUserResult.length > 0) {
                const rawUser = createdUserResult[0]
                user = {
                  id: rawUser.id,
                  phone: rawUser.phone,
                  name: rawUser.name || null,
                  email: rawUser.email || null,
                  createdAt: rawUser.createdAt,
                  updatedAt: rawUser.updatedAt
                }
              }
            }
          }
        } else {
          throw prismaError
        }
      }
      
      if (!user) {
        throw new Error('Не удалось создать или найти пользователя')
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
