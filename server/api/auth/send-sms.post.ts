import { prisma } from '~/server/utils/prisma'
import { sendSmsCode } from '~/server/utils/sms-ru'
import { createSmsCodesTable } from '~/server/utils/migrations'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { phone } = body

    if (!phone || phone.length < 10) {
      throw createError({
        statusCode: 400,
        message: 'Неверный номер телефона'
      })
    }

    // Нормализуем номер телефона
    const normalizedPhone = phone.replace(/\D/g, '')
    const phoneNumber = normalizedPhone.startsWith('8') 
      ? '7' + normalizedPhone.slice(1)
      : normalizedPhone.startsWith('7')
      ? normalizedPhone
      : '7' + normalizedPhone

    // Генерируем 4-значный код
    const code = Math.floor(1000 + Math.random() * 9000).toString()

    // Удаляем старые неиспользованные коды для этого номера
    try {
      await prisma.smsCode.deleteMany({
        where: {
          phone: phoneNumber,
          verified: false,
          expiresAt: {
            lt: new Date()
          }
        }
      })
    } catch (error: any) {
      // Если таблица не существует, создаем её
      if (error.message?.includes('does not exist')) {
        await createSmsCodesTable()
      } else {
        throw error
      }
    }

    // Сохраняем код в БД (действителен 5 минут)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 минут
    
    try {
      await prisma.smsCode.create({
        data: {
          phone: phoneNumber,
          code,
          expiresAt,
          verified: false
        }
      })
    } catch (error: any) {
      // Если таблица не существует, создаем её и повторяем
      if (error.message?.includes('does not exist')) {
        await createSmsCodesTable()
        await prisma.smsCode.create({
          data: {
            phone: phoneNumber,
            code,
            expiresAt,
            verified: false
          }
        })
      } else {
        throw error
      }
    }

    // Отправляем SMS через SMS.RU API
    try {
      await sendSmsCode(phoneNumber, code)
      console.log(`[SMS] Код ${code} отправлен на номер ${phoneNumber} через SMS.RU`)
    } catch (smsError: any) {
      console.error('[SMS] Ошибка отправки через SMS.RU:', smsError)
      // В режиме разработки можем продолжить, но в продакшене нужно обработать ошибку
      // Для тестирования можно закомментировать эту проверку
      throw createError({
        statusCode: 500,
        message: 'Ошибка отправки SMS. Попробуйте позже.'
      })
    }

    return {
      success: true,
      message: 'Код отправлен на номер телефона'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'Ошибка отправки SMS'
    })
  }
})