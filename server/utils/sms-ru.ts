// Утилита для работы с SMS.RU API
const SMS_RU_BASE_URL = 'https://sms.ru'

function getSmsRuApiKey(): string {
  // Используем runtimeConfig для получения API ключа
  const config = useRuntimeConfig()
  return (config.smsRuApiKey as string) || '66CCA90D-74B8-6CCB-30C5-05A1D6661AE6'
}

interface SmsRuResponse {
  status: string
  status_code: number
  status_text?: string
  [key: string]: any
}

/**
 * Отправляет SMS код на номер телефона
 * @param phone - Номер телефона в формате 79991234567
 * @param code - 4-значный код
 * @returns Promise с результатом отправки
 */
export async function sendSmsCode(phone: string, code: string): Promise<{ success: boolean; message?: string }> {
  try {
    // Нормализуем номер телефона (убираем все кроме цифр)
    const normalizedPhone = phone.replace(/\D/g, '')
    
    // Если номер начинается с 8, заменяем на 7
    const phoneNumber = normalizedPhone.startsWith('8') 
      ? '7' + normalizedPhone.slice(1)
      : normalizedPhone.startsWith('7')
      ? normalizedPhone
      : '7' + normalizedPhone

    // Формируем текст сообщения
    const message = `Ваш код авторизации: ${code}. Не сообщайте его никому.`

    // Отправляем SMS через SMS.RU API
    const response = await $fetch<SmsRuResponse>(`${SMS_RU_BASE_URL}/sms/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        api_id: getSmsRuApiKey(),
        to: phoneNumber,
        msg: message,
        json: '1'
      }).toString()
    })

    // Проверяем результат
    if (response.status === 'OK' || response.status_code === 100) {
      return {
        success: true,
        message: 'SMS отправлено успешно'
      }
    } else {
      console.error('SMS.RU API Error:', response)
      throw new Error(response.status_text || `Ошибка отправки SMS: ${response.status_code}`)
    }
  } catch (error: any) {
    console.error('Ошибка отправки SMS через SMS.RU:', error)
    throw error
  }
}

/**
 * Отправляет код через звонок (альтернативный метод)
 * @param phone - Номер телефона в формате 79991234567
 * @returns Promise с результатом
 */
export async function sendCodeViaCall(phone: string): Promise<{ success: boolean; message?: string }> {
  try {
    const normalizedPhone = phone.replace(/\D/g, '')
    const phoneNumber = normalizedPhone.startsWith('8') 
      ? '7' + normalizedPhone.slice(1)
      : normalizedPhone.startsWith('7')
      ? normalizedPhone
      : '7' + normalizedPhone

    const response = await $fetch<SmsRuResponse>(`${SMS_RU_BASE_URL}/code/call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        api_id: getSmsRuApiKey(),
        phone: phoneNumber,
        json: '1'
      }).toString()
    })

    if (response.status === 'OK' || response.status_code === 100) {
      return {
        success: true,
        message: 'Звонок инициирован'
      }
    } else {
      throw new Error(response.status_text || `Ошибка звонка: ${response.status_code}`)
    }
  } catch (error: any) {
    console.error('Ошибка звонка через SMS.RU:', error)
    throw error
  }
}

/**
 * Проверяет код авторизации через SMS.RU
 * @param phone - Номер телефона
 * @param code - Код для проверки
 * @returns Promise с результатом проверки
 */
export async function verifySmsCode(phone: string, code: string): Promise<{ success: boolean; message?: string }> {
  try {
    const normalizedPhone = phone.replace(/\D/g, '')
    const phoneNumber = normalizedPhone.startsWith('8') 
      ? '7' + normalizedPhone.slice(1)
      : normalizedPhone.startsWith('7')
      ? normalizedPhone
      : '7' + normalizedPhone

    const response = await $fetch<SmsRuResponse>(`${SMS_RU_BASE_URL}/code/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        api_id: getSmsRuApiKey(),
        phone: phoneNumber,
        code: code,
        json: '1'
      }).toString()
    })

    if (response.status === 'OK' || response.status_code === 100) {
      return {
        success: true,
        message: 'Код подтвержден'
      }
    } else {
      return {
        success: false,
        message: response.status_text || 'Неверный код'
      }
    }
  } catch (error: any) {
    console.error('Ошибка проверки кода через SMS.RU:', error)
    return {
      success: false,
      message: 'Ошибка проверки кода'
    }
  }
}

