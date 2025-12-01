export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { phone } = body

    if (!phone || phone.length < 10) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Неверный номер телефона'
      })
    }

    // TODO: Интеграция с SMS API (SMS.ru, Twilio и т.д.)
    // Пока заглушка - генерируем код и сохраняем в сессии/БД
    const code = Math.floor(1000 + Math.random() * 9000).toString()

    // В реальном приложении здесь должен быть вызов SMS API
    console.log(`[SMS] Код для ${phone}: ${code}`)

    // Сохраняем код в сессии (в реальном приложении - в Redis/БД)
    // setSession(event, 'sms_code', code)
    // setSession(event, 'sms_phone', phone)
    // setSession(event, 'sms_expires', Date.now() + 5 * 60 * 1000) // 5 минут

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
      statusMessage: 'Ошибка отправки SMS'
    })
  }
})

