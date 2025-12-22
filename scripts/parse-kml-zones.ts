/**
 * Скрипт для парсинга KML файла, экспортированного из Google My Maps
 * и конвертации координат полигонов в формат для базы данных
 * 
 * Использование:
 * 1. Экспортируйте карту из Google My Maps в формате KML
 * 2. Сохраните файл как zones.kml в папке scripts/
 * 3. Запустите: npm run zones:parse-kml
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

interface ZoneData {
  name: string
  coordinates: number[][]
  description?: string
  minOrderAmount?: number
  deliveryPrice?: number
  estimatedTime?: number
}

function parseKML(kmlContent: string, filterCity?: string): ZoneData[] {
  const zones: ZoneData[] = []
  
  // Простой парсер KML (для более сложных случаев используйте библиотеку типа @xmldom/xmldom)
  // Ищем все <Placemark> элементы
  const placemarkRegex = /<Placemark>([\s\S]*?)<\/Placemark>/g
  let match

  while ((match = placemarkRegex.exec(kmlContent)) !== null) {
    const placemark = match[1]
    
    // Извлекаем название (может быть многострочным)
    const nameMatch = placemark.match(/<name>([\s\S]*?)<\/name>/)
    let name = nameMatch ? nameMatch[1].trim() : 'Неизвестная зона'
    // Убираем переносы строк и лишние пробелы
    name = name.replace(/\s+/g, ' ').trim()
    
    // Извлекаем описание
    const descMatch = placemark.match(/<description>(.*?)<\/description>/s)
    let description = descMatch ? descMatch[1].trim() : undefined
    
    // Убираем CDATA обёртку если есть
    if (description) {
      description = description.replace(/<!\[CDATA\[(.*?)\]\]>/s, '$1')
      description = description.replace(/<br\s*\/?>/gi, '\n')
      description = description.replace(/<[^>]+>/g, '') // Убираем HTML теги
    }
    
    // Фильтруем по городу, если указан
    if (filterCity && description && !description.includes(filterCity)) {
      continue
    }
    
    // Ищем координаты в <Polygon> или <LineString>
    const coordinatesMatch = placemark.match(/<coordinates>(.*?)<\/coordinates>/s)
    
    if (coordinatesMatch) {
      const coordsString = coordinatesMatch[1].trim()
      // Парсим координаты: формат "lng,lat,alt lng,lat,alt ..."
      const coords = coordsString
        .split(/\s+/)
        .filter(coord => coord.trim())
        .map(coord => {
          const [lng, lat] = coord.split(',').map(Number)
          return [lng, lat] as [number, number]
        })
        .filter(([lng, lat]) => !isNaN(lng) && !isNaN(lat))
      
      if (coords.length >= 3) {
        // Замыкаем полигон (последняя точка = первой)
        if (coords[0][0] !== coords[coords.length - 1][0] || 
            coords[0][1] !== coords[coords.length - 1][1]) {
          coords.push([coords[0][0], coords[0][1]])
        }
        
        // Извлекаем данные из описания
        let minOrderAmount: number | undefined
        let deliveryPrice: number | undefined
        let estimatedTime: number | undefined
        
        if (description) {
          // Минимальная сумма
          const minAmountMatch = description.match(/Минимальная сумма:\s*(\d+)/i)
          if (minAmountMatch) {
            minOrderAmount = parseInt(minAmountMatch[1])
          }
          
          // Платная доставка
          const deliveryPriceMatch = description.match(/Платная доставка:\s*(\d+)/i)
          if (deliveryPriceMatch) {
            deliveryPrice = parseInt(deliveryPriceMatch[1])
          }
          
          // Время доставки
          const timeMatch = description.match(/Время доставки:\s*(\d+)\s*мин/i)
          if (timeMatch) {
            estimatedTime = parseInt(timeMatch[1])
          }
        }
        
        zones.push({
          name,
          coordinates: coords,
          description,
          minOrderAmount,
          deliveryPrice,
          estimatedTime
        })
      }
    }
  }
  
  return zones
}

function convertToGeoJSON(coordinates: number[][]): any {
  return {
    type: 'Polygon',
    coordinates: [coordinates]
  }
}

async function main() {
  // Ищем KML файлы в папке scripts
  const scriptsDir = join(process.cwd(), 'scripts')
  const files = readdirSync(scriptsDir)
  const kmlFiles = files.filter(f => f.toLowerCase().endsWith('.kml'))
  
  if (kmlFiles.length === 0) {
    console.error('❌ Не найдено KML файлов в папке scripts/')
    process.exit(1)
  }
  
  // Используем первый найденный файл или файл с "Петро" в названии
  const kmlFile = kmlFiles.find(f => f.toLowerCase().includes('петро') || f.toLowerCase().includes('petro') || f.toLowerCase().includes('зоны')) || kmlFiles[0]
  const kmlPath = join(scriptsDir, kmlFile)
  
  try {
    console.log(`📖 Чтение KML файла: ${kmlPath}`)
    const kmlContent = readFileSync(kmlPath, 'utf-8')
    
    console.log('🔍 Парсинг зон доставки для Петропавловска-Камчатского...')
    const zones = parseKML(kmlContent, 'Петропавловск-Камчатский')
    
    if (zones.length === 0) {
      console.error('❌ Не найдено зон в KML файле!')
      console.log('\nУбедитесь, что:')
      console.log('1. Файл zones.kml находится в папке scripts/')
      console.log('2. KML файл содержит <Placemark> элементы с координатами')
      process.exit(1)
    }
    
    console.log(`✅ Найдено зон: ${zones.length}\n`)
    
    // Выводим информацию о зонах
    zones.forEach((zone, index) => {
      console.log(`${index + 1}. ${zone.name}`)
      console.log(`   Точек: ${zone.coordinates.length}`)
      if (zone.description) {
        console.log(`   Описание: ${zone.description.substring(0, 50)}...`)
      }
      console.log(`   Первая точка: [${zone.coordinates[0][0]}, ${zone.coordinates[0][1]}]`)
      console.log()
    })
    
    // Создаем JSON файл с данными для импорта
    const outputData = zones.map(zone => ({
      name: zone.name,
      description: zone.description || `Зона доставки: ${zone.name}`,
      coordinates: convertToGeoJSON(zone.coordinates),
      minOrderAmount: zone.minOrderAmount || 1800,
      deliveryPrice: zone.deliveryPrice || 300,
      estimatedTime: zone.estimatedTime || 90
    }))
    
    const outputPath = join(process.cwd(), 'scripts', 'zones-exported.json')
    writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8')
    
    console.log(`✅ Данные экспортированы в: ${outputPath}`)
    console.log('\n📝 Следующие шаги:')
    console.log('1. Проверьте файл zones-exported.json (данные уже извлечены из описаний)')
    console.log('2. При необходимости отредактируйте minOrderAmount, deliveryPrice, estimatedTime')
    console.log('3. Запустите: npm run zones:import-json')
    
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error(`❌ Файл не найден: ${kmlPath}`)
      console.log('\nИнструкция:')
      console.log('1. Откройте карту Google My Maps')
      console.log('2. Нажмите меню (три точки) → "Экспортировать на компьютер"')
      console.log('3. Выберите формат KML')
      console.log('4. Сохраните файл как zones.kml в папку scripts/')
    } else {
      console.error('❌ Ошибка:', error.message)
    }
    process.exit(1)
  }
}

main()

