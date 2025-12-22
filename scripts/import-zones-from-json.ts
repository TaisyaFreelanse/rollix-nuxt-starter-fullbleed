/**
 * Скрипт для импорта зон доставки из JSON файла
 * (созданного скриптом parse-kml-zones.ts)
 * 
 * Использование:
 * 1. Экспортируйте зоны из Google Maps в KML
 * 2. Запустите: npm run zones:parse-kml
 * 3. Заполните данные в zones-exported.json
 * 4. Запустите: npm run zones:import-json
 */

import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

interface ZoneImportData {
  name: string
  description: string
  coordinates: {
    type: 'Polygon'
    coordinates: number[][][]
  }
  minOrderAmount: number
  deliveryPrice: number
  estimatedTime: number
}

async function main() {
  const jsonPath = join(process.cwd(), 'scripts', 'zones-exported.json')
  
  try {
    console.log('📖 Чтение JSON файла...')
    const fileContent = readFileSync(jsonPath, 'utf-8')
    const zones: ZoneImportData[] = JSON.parse(fileContent)
    
    if (!Array.isArray(zones) || zones.length === 0) {
      console.error('❌ Файл не содержит зон доставки!')
      process.exit(1)
    }
    
    console.log(`✅ Найдено зон для импорта: ${zones.length}\n`)
    
    for (const zone of zones) {
      try {
        // Проверяем, существует ли уже зона с таким именем
        const existing = await prisma.deliveryZone.findFirst({
          where: { name: zone.name }
        })

        if (existing) {
          console.log(`⚠️  Зона "${zone.name}" уже существует, обновляем...`)
          await prisma.deliveryZone.update({
            where: { id: existing.id },
            data: {
              description: zone.description,
              coordinates: zone.coordinates,
              minOrderAmount: zone.minOrderAmount,
              deliveryPrice: zone.deliveryPrice,
              estimatedTime: zone.estimatedTime,
              isActive: true
            }
          })
          console.log(`✅ Зона "${zone.name}" обновлена`)
        } else {
          await prisma.deliveryZone.create({
            data: {
              name: zone.name,
              description: zone.description,
              coordinates: zone.coordinates,
              minOrderAmount: zone.minOrderAmount,
              deliveryPrice: zone.deliveryPrice,
              estimatedTime: zone.estimatedTime,
              isActive: true
            }
          })
          console.log(`✅ Зона "${zone.name}" создана`)
        }
      } catch (error: any) {
        console.error(`❌ Ошибка при создании/обновлении зоны "${zone.name}":`, error.message)
      }
    }
    
    console.log('\n✅ Импорт завершен!')
    
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error(`❌ Файл не найден: ${jsonPath}`)
      console.log('\nСначала запустите: npm run zones:parse-kml')
    } else if (error instanceof SyntaxError) {
      console.error('❌ Ошибка парсинга JSON:', error.message)
    } else {
      console.error('❌ Ошибка:', error.message)
    }
    process.exit(1)
  }
}

main()
  .catch((e) => {
    console.error('Ошибка:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

