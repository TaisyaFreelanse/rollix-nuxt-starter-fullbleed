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
      // Сначала пытаемся найти существующего пользователя через Prisma findUnique
      // Используем select только для полей, которые точно есть в схеме
      try {
        user = await prisma.user.findUnique({
          where: { phone: phoneNumber },
          select: {
            id: true,
            phone: true,
            name: true,
            email: true
          }
        })
      } catch (findError: any) {
        // Если ошибка связана с bonusBalance, игнорируем и продолжим создание
        console.log('Ошибка поиска пользователя через Prisma, попробуем создать:', findError.message)
      }
      
      // Если пользователь не найден, создаем нового
      if (!user) {
        // Пытаемся использовать обычный Prisma create (если миграция применена)
        try {
          user = await prisma.user.create({
            data: {
              phone: phoneNumber,
              name: null,
              bonusBalance: 0
            },
            select: {
              id: true,
              phone: true,
              name: true,
              email: true
            }
          })
        } catch (createError: any) {
          // Если ошибка связана с bonusBalance, создаем через executeRaw без возврата данных
          if (createError.message?.includes('bonusBalance') || 
              createError.message?.includes('column') || 
              createError.message?.includes('does not exist')) {
            
            // Просто создаем пользователя через executeRaw (без возврата данных)
            await prisma.$executeRawUnsafe(
              `INSERT INTO users (id, phone, name, email, "createdAt", "updatedAt") 
               VALUES (gen_random_uuid()::text, $1, NULL, NULL, NOW(), NOW())
               ON CONFLICT (phone) DO NOTHING`,
              phoneNumber
            )
            
            // Теперь получаем пользователя через Prisma findUnique с select
            user = await prisma.user.findUnique({
              where: { phone: phoneNumber },
              select: {
                id: true,
                phone: true,
                name: true,
                email: true
              }
            })
          } else {
            throw createError
          }
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
