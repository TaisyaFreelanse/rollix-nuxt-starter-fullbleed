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
    // Используем новый API ключ для пакета "API Геосаджеста"
    const config = useRuntimeConfig()
    // Можно использовать ключ из переменных окружения или захардкоженный
    const apiKey = process.env.YANDEX_SUGGEST_API_KEY || '804dccb1-83e0-419e-a3cd-7d6641593b0b'
    
    const params = new URLSearchParams({
      apikey: apiKey,
      text: text as string,
      lang: 'ru_RU',
      types: 'house,street,locality',
      print_address: '1',
      attrs: 'uri',
      results: '5' // Максимум 5 результатов
    })

    // Добавляем координаты центра, если указаны
    // В Suggest API формат: {lon},{lat} (долгота, широта)
    if (ll && typeof ll === 'string') {
      params.append('ll', ll)
    } else {
      // Петропавловск-Камчатский по умолчанию: долгота 158.6503, широта 53.0194
      params.append('ll', '158.6503,53.0194')
    }

    // Добавляем область поиска (spn - ширина и высота окна в градусах)
    if (spn && typeof spn === 'string') {
      params.append('spn', spn)
    } else {
      params.append('spn', '0.5,0.5')
    }

    const url = `https://suggest-maps.yandex.ru/v1/suggest?${params.toString()}`

    console.log('[Yandex Suggest API] Запрос:', url.replace(apiKey, '***'))

    // Делаем запрос к Yandex Suggest API
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      // Получаем детали ошибки от Yandex API
      let errorMessage = `Ошибка Suggest API: ${response.status} ${response.statusText}`
      try {
        const errorData = await response.text()
        console.error('[Yandex Suggest API] Ошибка ответа:', errorData)
        if (errorData) {
          try {
            const errorJson = JSON.parse(errorData)
            errorMessage = errorJson.message || errorJson.error || errorMessage
          } catch {
            errorMessage = `${errorMessage}. Ответ: ${errorData.substring(0, 200)}`
          }
        }
      } catch (e) {
        console.error('[Yandex Suggest API] Не удалось прочитать ответ об ошибке:', e)
      }

      // Специальная обработка для 403
      if (response.status === 403) {
        console.error('[Yandex Suggest API] 403 Forbidden - возможные причины:')
        console.error('  1. API ключ неверный или не активирован')
        console.error('  2. API ключ не имеет доступа к пакету "API Геосаджеста"')
        console.error('  3. Ключ активируется в течение 15 минут после получения')
        console.error('  4. Проверьте настройки ключа в Кабинете Разработчика: https://developer.tech.yandex.ru/')
        throw createError({
          statusCode: 403,
          message: `Доступ запрещен. Проверьте API ключ для Suggest API. ${errorMessage}`
        })
      }

      throw createError({
        statusCode: response.status,
        message: errorMessage
      })
    }

    const data = await response.json()
    console.log('[Yandex Suggest API] Успешный ответ, результатов:', data.results?.length || 0)
    
    // Фильтруем результаты - только адреса в России
    if (data.results && Array.isArray(data.results)) {
      const filteredResults = data.results.filter((result: any) => {
        const addressComponents = result.address?.component || []
        const isRussia = addressComponents.some((comp: any) => 
          comp.kind?.includes('COUNTRY') && 
          (comp.name?.includes('Россия') || comp.name?.includes('Russia') || comp.name?.includes('Российская'))
        )
        return isRussia
      })
      
      return {
        ...data,
        results: filteredResults
      }
    }
    
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

