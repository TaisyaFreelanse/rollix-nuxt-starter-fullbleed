export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { text, ll, spn } = query

    if (!text || typeof text !== 'string') {
      throw createError({
        statusCode: 400,
        message: 'Параметр text обязателен'
      })
    }

    // Формируем URL для Suggest API
    const apiKey = '51d550e0-cf8f-4247-bae5-dfd32b51048d'
    const params = new URLSearchParams({
      apikey: apiKey,
      text: text as string,
      lang: 'ru_RU',
      types: 'house,street,locality',
      print_address: '1',
      attrs: 'uri'
    })

    // Добавляем координаты центра, если указаны
    if (ll && typeof ll === 'string') {
      params.append('ll', ll)
    } else {
      // Петропавловск-Камчатский по умолчанию
      params.append('ll', '53.0194,158.6503')
    }

    // Добавляем область поиска
    if (spn && typeof spn === 'string') {
      params.append('spn', spn)
    } else {
      params.append('spn', '0.5,0.5')
    }

    const url = `https://suggest-maps.yandex.ru/v1/suggest?${params.toString()}`

    // Делаем запрос к Yandex Suggest API
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        message: `Ошибка Suggest API: ${response.statusText}`
      })
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении подсказок'
    })
  }
})

