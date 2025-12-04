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
    const user = await prisma.user.upsert({
      where: { phone: phoneNumber },
      create: {
        phone: phoneNumber,
        name: null
      },
      update: {}
    })

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
