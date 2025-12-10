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
        // Если ошибка связана с bonusBalance, используем другой подход
        if (prismaError.message?.includes('bonusBalance') || 
            prismaError.message?.includes('column') || 
            prismaError.message?.includes('does not exist')) {
          
          // Проверяем существование пользователя через простой SELECT без типизации
          const existingUserRaw = await prisma.$queryRawUnsafe(
            `SELECT id, phone, name, email, "createdAt", "updatedAt" FROM users WHERE phone = $1`,
            phoneNumber
          ) as any[]
          
          if (existingUserRaw && existingUserRaw.length > 0) {
            const raw = existingUserRaw[0]
            user = {
              id: String(raw.id),
              phone: String(raw.phone),
              name: raw.name ? String(raw.name) : null,
              email: raw.email ? String(raw.email) : null,
              createdAt: raw.createdAt,
              updatedAt: raw.updatedAt
            }
          } else {
            // Нужно создать пользователя
            // Проверяем, есть ли поле bonusBalance
            const hasBonusBalance = await prisma.$queryRawUnsafe(
              `SELECT column_name FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'bonusBalance'`
            ) as any[]
            
            let newUserId: string
            
            if (hasBonusBalance.length > 0) {
              // Поле есть, создаем с bonusBalance
              // Используем $executeRaw для INSERT (не возвращает данные)
              const insertResult = await prisma.$executeRawUnsafe(
                `INSERT INTO users (id, phone, name, email, "bonusBalance", "createdAt", "updatedAt") 
                 VALUES (gen_random_uuid()::text, $1, NULL, NULL, 0, NOW(), NOW())
                 RETURNING id`,
                phoneNumber
              )
              
              // Получаем ID созданного пользователя отдельным запросом
              const idResult = await prisma.$queryRawUnsafe(
                `SELECT id FROM users WHERE phone = $1 ORDER BY "createdAt" DESC LIMIT 1`,
                phoneNumber
              ) as any[]
              
              if (idResult && idResult.length > 0) {
                newUserId = String(idResult[0].id)
              } else {
                throw new Error('Не удалось получить ID созданного пользователя')
              }
            } else {
              // Поле нет, создаем без bonusBalance
              await prisma.$executeRawUnsafe(
                `INSERT INTO users (id, phone, name, email, "createdAt", "updatedAt") 
                 VALUES (gen_random_uuid()::text, $1, NULL, NULL, NOW(), NOW())`,
                phoneNumber
              )
              
              // Получаем ID созданного пользователя
              const idResult = await prisma.$queryRawUnsafe(
                `SELECT id FROM users WHERE phone = $1 ORDER BY "createdAt" DESC LIMIT 1`,
                phoneNumber
              ) as any[]
              
              if (idResult && idResult.length > 0) {
                newUserId = String(idResult[0].id)
              } else {
                throw new Error('Не удалось получить ID созданного пользователя')
              }
            }
            
            // Получаем полные данные созданного пользователя
            const newUserRaw = await prisma.$queryRawUnsafe(
              `SELECT id, phone, name, email, "createdAt", "updatedAt" FROM users WHERE id = $1`,
              newUserId
            ) as any[]
            
            if (newUserRaw && newUserRaw.length > 0) {
              const raw = newUserRaw[0]
              user = {
                id: String(raw.id),
                phone: String(raw.phone),
                name: raw.name ? String(raw.name) : null,
                email: raw.email ? String(raw.email) : null,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt
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
