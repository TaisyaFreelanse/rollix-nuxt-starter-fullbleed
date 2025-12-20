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
    console.log('[Yandex Suggest API] Параметры:', {
      text: text,
      ll: ll || '158.6503,53.0194',
      spn: spn || '0.5,0.5',
      types: 'house,street,locality',
      lang: 'ru_RU'
    })

    try {
      // Используем $fetch вместо fetch для лучшей совместимости с Nuxt
      // Минимальные заголовки, как в документации Yandex
      const data = await $fetch<{ results?: Array<any> }>(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        // Не бросаем ошибку при 403, обрабатываем вручную
        onResponseError({ response }) {
          console.error('[Yandex Suggest API] Ошибка ответа:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
          })
        }
      })

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
          results: filteredResults
        }
      }
      
      return data
    } catch (error: any) {
      // Обработка ошибок $fetch
      const statusCode = error.statusCode || error.response?.status || 500
      const statusText = error.statusText || error.response?.statusText || 'Internal Server Error'
      
      let errorMessage = `Ошибка Suggest API: ${statusCode} ${statusText}`
      
      // Пытаемся получить детали ошибки
      if (error.data) {
        try {
          if (typeof error.data === 'string') {
            errorMessage = error.data
          } else if (error.data.message) {
            errorMessage = error.data.message
          }
        } catch (e) {
          console.error('[Yandex Suggest API] Не удалось обработать данные ошибки:', e)
        }
      }

      // Специальная обработка для 403
      if (statusCode === 403) {
        console.error('[Yandex Suggest API] 403 Forbidden - возможные причины:')
        console.error('  1. API ключ неверный или не активирован')
        console.error('  2. API ключ не имеет доступа к пакету "API Геосаджеста"')
        console.error('  3. Ключ активируется в течение 15 минут после получения')
        console.error('  4. Yandex может блокировать запросы с серверных IP-адресов')
        console.error('  5. Проверьте настройки ключа в Кабинете Разработчика: https://developer.tech.yandex.ru/')
        console.error('  6. Проверьте ограничения HTTP Referer для ключа')
        console.error('[Yandex Suggest API] Полная ошибка:', JSON.stringify(error, null, 2))
        
        throw createError({
          statusCode: 403,
          message: `Доступ запрещен. Проверьте API ключ для Suggest API. ${errorMessage}. Возможно, Yandex блокирует запросы с серверных IP. Попробуйте использовать клиентский запрос или проверьте настройки ключа.`
        })
      }

      if (error.statusCode) {
        throw createError({
          statusCode: error.statusCode,
          message: errorMessage
        })
      }

      throw createError({
        statusCode: 500,
        message: `Ошибка при получении подсказок: ${errorMessage}`
      })
    }
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

