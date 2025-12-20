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
    const apiKey = '804dccb1-83e0-419e-a3cd-7d6641593b0b'
    const config = useRuntimeConfig()
    
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

