import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { phone, code } = body

    if (!phone || !code) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Не указан телефон или код'
      })
    }

    // TODO: Проверка кода из сессии/БД
    // const sessionCode = getSession(event, 'sms_code')
    // const sessionPhone = getSession(event, 'sms_phone')
    // const sessionExpires = getSession(event, 'sms_expires')

    // if (!sessionCode || sessionPhone !== phone || Date.now() > sessionExpires) {
    //   throw createError({
    //     statusCode: 400,
    //     statusMessage: 'Код неверен или истек'
    //   })
    // }

    // if (sessionCode !== code) {
    //   throw createError({
    //     statusCode: 400,
    //     statusMessage: 'Неверный код'
    //   })
    // }

    // Заглушка - всегда успешная проверка для демо
    console.log(`[SMS] Проверка кода ${code} для ${phone}: успешно`)

    // Создаем или находим пользователя в БД
    const user = await prisma.user.upsert({
      where: { phone },
      create: {
        phone,
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
      statusMessage: 'Ошибка проверки кода'
    })
  }
})

