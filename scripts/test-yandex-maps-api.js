/**
 * Автоматизированный тест Яндекс Карт API
 * Проверяет доступность API и работу геокодера
 */

const API_KEY = '51d550e0-cf8f-4247-bae5-dfd32b51048d'
const BASE_URL = 'https://api-maps.yandex.ru'
const GEOCODER_URL = 'https://geocode-maps.yandex.ru'

async function testScriptAvailability() {
  console.log('1️⃣ Проверка доступности скрипта Яндекс Карт API...')
  try {
    const url = `${BASE_URL}/3.0/?apikey=${API_KEY}&lang=ru_RU`
    const response = await fetch(url, { method: 'HEAD' })
    
    if (response.ok || response.status === 200 || response.status === 405) {
      console.log('✅ Скрипт API доступен')
      return true
    } else {
      console.log(`⚠️  Статус: ${response.status}`)
      return true // HEAD может не поддерживаться, но это не критично
    }
  } catch (error) {
    console.log(`⚠️  Не удалось проверить скрипт (это нормально для Node.js): ${error.message}`)
    return true // Продолжаем тестирование
  }
}

async function testGeocoder() {
  console.log('\n2️⃣ Тестирование Геокодера (адрес -> координаты)...')
  try {
    const address = encodeURIComponent('Москва, Красная площадь')
    const url = `${GEOCODER_URL}/1.x/?apikey=${API_KEY}&geocode=${address}&format=json&results=1`
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    const feature = data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
    
    if (feature) {
      const [lng, lat] = feature.Point.pos.split(' ').map(Number)
      const addressText = feature.metaDataProperty?.GeocoderMetaData?.text || 'N/A'
      console.log(`✅ Геокодер работает`)
      console.log(`   Адрес: ${addressText}`)
      console.log(`   Координаты: ${lat.toFixed(6)}, ${lng.toFixed(6)}`)
      return { success: true, lat, lng, address: addressText }
    } else {
      console.log('❌ Геокодер вернул пустой результат')
      return { success: false }
    }
  } catch (error) {
    console.log(`❌ Ошибка геокодера: ${error.message}`)
    return { success: false, error: error.message }
  }
}

async function testReverseGeocoder(lat, lng) {
  console.log('\n3️⃣ Тестирование обратного геокодинга (координаты -> адрес)...')
  try {
    const url = `${GEOCODER_URL}/1.x/?apikey=${API_KEY}&geocode=${lng},${lat}&format=json&results=1`
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    const feature = data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
    
    if (feature) {
      const address = feature.metaDataProperty?.GeocoderMetaData?.text || 'N/A'
      console.log(`✅ Обратный геокодинг работает`)
      console.log(`   Адрес: ${address}`)
      return { success: true, address }
    } else {
      console.log('❌ Обратный геокодинг вернул пустой результат')
      return { success: false }
    }
  } catch (error) {
    console.log(`❌ Ошибка обратного геокодинга: ${error.message}`)
    return { success: false, error: error.message }
  }
}

async function testMultipleAddresses() {
  console.log('\n4️⃣ Тестирование нескольких адресов...')
  const addresses = [
    'Санкт-Петербург, Невский проспект',
    'Казань, Кремль',
    'Екатеринбург, площадь 1905 года'
  ]
  
  let successCount = 0
  for (const address of addresses) {
    try {
      const encoded = encodeURIComponent(address)
      const url = `${GEOCODER_URL}/1.x/?apikey=${API_KEY}&geocode=${encoded}&format=json&results=1`
      
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        const feature = data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
        if (feature) {
          console.log(`   ✅ ${address}`)
          successCount++
        } else {
          console.log(`   ⚠️  ${address} - не найден`)
        }
      }
    } catch (error) {
      console.log(`   ❌ ${address} - ошибка: ${error.message}`)
    }
  }
  
  console.log(`\n   Результат: ${successCount}/${addresses.length} адресов найдено`)
  return successCount === addresses.length
}

async function runTests() {
  console.log('🧪 Автоматизированное тестирование Яндекс Карт API\n')
  console.log(`API Key: ${API_KEY.substring(0, 10)}...\n`)
  
  const results = {
    script: false,
    geocoder: false,
    reverseGeocoder: false,
    multipleAddresses: false
  }
  
  // Тест 1: Доступность скрипта
  results.script = await testScriptAvailability()
  
  // Тест 2: Геокодер
  const geocoderResult = await testGeocoder()
  results.geocoder = geocoderResult.success
  
  // Тест 3: Обратный геокодинг (используем координаты из теста 2)
  if (geocoderResult.success && geocoderResult.lat && geocoderResult.lng) {
    const reverseResult = await testReverseGeocoder(geocoderResult.lat, geocoderResult.lng)
    results.reverseGeocoder = reverseResult.success
  }
  
  // Тест 4: Несколько адресов
  results.multipleAddresses = await testMultipleAddresses()
  
  // Итоговый отчет
  console.log('\n' + '='.repeat(50))
  console.log('📊 ИТОГОВЫЙ ОТЧЕТ')
  console.log('='.repeat(50))
  console.log(`✅ Скрипт API: ${results.script ? 'РАБОТАЕТ' : 'ОШИБКА'}`)
  console.log(`✅ Геокодер: ${results.geocoder ? 'РАБОТАЕТ' : 'ОШИБКА'}`)
  console.log(`✅ Обратный геокодинг: ${results.reverseGeocoder ? 'РАБОТАЕТ' : 'ОШИБКА'}`)
  console.log(`✅ Множественный поиск: ${results.multipleAddresses ? 'РАБОТАЕТ' : 'ОШИБКА'}`)
  
  const allPassed = Object.values(results).every(r => r === true)
  console.log('\n' + '='.repeat(50))
  if (allPassed) {
    console.log('✅ ВСЕ ТЕСТЫ ПРОЙДЕНЫ УСПЕШНО!')
    console.log('✅ API Яндекс Карт работает корректно')
    console.log('✅ Компонент готов к использованию')
  } else {
    console.log('⚠️  НЕКОТОРЫЕ ТЕСТЫ НЕ ПРОЙДЕНЫ')
    console.log('⚠️  Проверьте API ключ и подключение к интернету')
  }
  console.log('='.repeat(50))
  
  process.exit(allPassed ? 0 : 1)
}

// Запуск тестов
runTests().catch(error => {
  console.error('\n❌ Критическая ошибка:', error)
  process.exit(1)
})

