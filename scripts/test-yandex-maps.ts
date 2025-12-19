/**
 * Тестовый скрипт для проверки загрузки Яндекс Карт API
 */

async function testYandexMapsAPI() {
  console.log('🧪 Тестирование Яндекс Карт API...\n')

  // Проверка 1: Загрузка скрипта
  console.log('1️⃣ Проверка загрузки скрипта...')
  const scriptUrl = 'https://api-maps.yandex.ru/3.0/?apikey=51d550e0-cf8f-4247-bae5-dfd32b51048d&lang=ru_RU'
  
  try {
    const response = await fetch(scriptUrl)
    if (response.ok) {
      console.log('✅ Скрипт доступен для загрузки')
    } else {
      console.error(`❌ Ошибка загрузки скрипта: ${response.status} ${response.statusText}`)
      return
    }
  } catch (error: any) {
    console.error('❌ Ошибка при проверке скрипта:', error.message)
    return
  }

  // Проверка 2: Геокодер API
  console.log('\n2️⃣ Проверка Геокодера API...')
  const geocodeUrl = 'https://geocode-maps.yandex.ru/1.x/?apikey=51d550e0-cf8f-4247-bae5-dfd32b51048d&geocode=Москва&format=json&results=1'
  
  try {
    const response = await fetch(geocodeUrl)
    if (response.ok) {
      const data = await response.json()
      const feature = data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
      if (feature) {
        const [lng, lat] = feature.Point.pos.split(' ').map(Number)
        console.log(`✅ Геокодер работает. Координаты Москвы: ${lat}, ${lng}`)
        console.log(`   Адрес: ${feature.metaDataProperty?.GeocoderMetaData?.text || 'N/A'}`)
      } else {
        console.error('❌ Геокодер вернул пустой результат')
      }
    } else {
      console.error(`❌ Ошибка геокодера: ${response.status} ${response.statusText}`)
    }
  } catch (error: any) {
    console.error('❌ Ошибка при проверке геокодера:', error.message)
  }

  // Проверка 3: Обратный геокодинг
  console.log('\n3️⃣ Проверка обратного геокодинга...')
  const reverseGeocodeUrl = 'https://geocode-maps.yandex.ru/1.x/?apikey=51d550e0-cf8f-4247-bae5-dfd32b51048d&geocode=37.6173,55.7558&format=json&results=1'
  
  try {
    const response = await fetch(reverseGeocodeUrl)
    if (response.ok) {
      const data = await response.json()
      const feature = data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
      if (feature) {
        const address = feature.metaDataProperty?.GeocoderMetaData?.text
        console.log(`✅ Обратный геокодинг работает. Адрес: ${address}`)
      } else {
        console.error('❌ Обратный геокодинг вернул пустой результат')
      }
    } else {
      console.error(`❌ Ошибка обратного геокодинга: ${response.status} ${response.statusText}`)
    }
  } catch (error: any) {
    console.error('❌ Ошибка при проверке обратного геокодинга:', error.message)
  }

  console.log('\n✅ Тестирование завершено!')
  console.log('\n📝 Для визуального тестирования:')
  console.log('   1. Откройте http://localhost:3000/checkout')
  console.log('   2. Нажмите "Указать адрес доставки"')
  console.log('   3. Проверьте, что карта загружается и отображается')
  console.log('   4. Попробуйте найти адрес через поиск')
  console.log('   5. Попробуйте кликнуть на карте для выбора адреса')
}

// Запуск теста
testYandexMapsAPI().catch(console.error)

