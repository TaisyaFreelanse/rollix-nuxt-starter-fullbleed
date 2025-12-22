import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Функция для создания полигона вокруг точки
function createPolygonAroundPoint(
  centerLat: number,
  centerLng: number,
  radiusKm: number = 5
): number[][] {
  // Приблизительное преобразование: 1 градус ≈ 111 км
  const latOffset = radiusKm / 111
  const lngOffset = radiusKm / (111 * Math.cos((centerLat * Math.PI) / 180))

  // Создаем квадратный полигон вокруг точки
  return [
    [centerLng - lngOffset, centerLat - latOffset], // левый нижний
    [centerLng + lngOffset, centerLat - latOffset], // правый нижний
    [centerLng + lngOffset, centerLat + latOffset], // правый верхний
    [centerLng - lngOffset, centerLat + latOffset], // левый верхний
    [centerLng - lngOffset, centerLat - latOffset]  // замыкаем полигон
  ]
}

// Зоны доставки для Петропавловска-Камчатского
const zones = [
  {
    name: 'Петро-Кам 1 Y1',
    description: 'Время доставки: 90мин\nМинимальная сумма: 2000 руб\nПлатная доставка: 400 руб\nГород: Петропавловск-Камчатский\nФилиал: ул. Советская, 30\nТочка: Петропаловск_1 Сов',
    minOrderAmount: 2000,
    deliveryPrice: 400,
    estimatedTime: 90,
    // Примерные координаты для зоны Y1 (нужно уточнить по карте)
    centerLat: 53.0194,
    centerLng: 158.6503,
    radiusKm: 3
  },
  {
    name: 'Петро-Кам 1 Y2',
    description: 'Время доставки: 90мин\nМинимальная сумма: 1800 руб\nПлатная доставка: 350 руб\nГород: Петропавловск-Камчатский\nФилиал: ул. Советская, 30\nТочка: Петропаловск_1 Сов',
    minOrderAmount: 1800,
    deliveryPrice: 350,
    estimatedTime: 90,
    centerLat: 53.0194,
    centerLng: 158.6503,
    radiusKm: 4
  },
  {
    name: 'Петро-Кам 1 УЗ',
    description: 'Время доставки: 90мин\nМинимальная сумма: 1800 руб\nПлатная доставка: 300 руб\nГород: Петропавловск-Камчатский\nФилиал: ул. Советская, 30\nТочка: Петропаловск_1 Сов',
    minOrderAmount: 1800,
    deliveryPrice: 300,
    estimatedTime: 90,
    centerLat: 53.0194,
    centerLng: 158.6503,
    radiusKm: 3.5
  },
  {
    name: 'Петро-Кам 1 Y4',
    description: 'Время доставки: 90мин\nМинимальная сумма: 2300 руб\nПлатная доставка: 450 руб\nГород: Петропавловск-Камчатский\nФилиал: ул. Советская, 30\nТочка: Петропаловск_1 Сов',
    minOrderAmount: 2300,
    deliveryPrice: 450,
    estimatedTime: 90,
    centerLat: 53.0194,
    centerLng: 158.6503,
    radiusKm: 5
  },
  {
    name: 'Петро-Кам 1 У5',
    description: 'Время доставки: 90мин\nМинимальная сумма: 1800 руб\nПлатная доставка: 300 руб\nГород: Петропавловск-Камчатский\nФилиал: ул. Советская, 30\nТочка: Петропаловск_1 Сов',
    minOrderAmount: 1800,
    deliveryPrice: 300,
    estimatedTime: 90,
    centerLat: 53.0194,
    centerLng: 158.6503,
    radiusKm: 3.5
  },
  {
    name: 'Петро-Кам 1 У6',
    description: 'Время доставки: 90мин\nМинимальная сумма: 2300 руб\nПлатная доставка: 350 руб\nГород: Петропавловск-Камчатский\nФилиал: ул. Советская, 30\nТочка: Петропаловск_1 Сов',
    minOrderAmount: 2300,
    deliveryPrice: 350,
    estimatedTime: 90,
    centerLat: 53.0194,
    centerLng: 158.6503,
    radiusKm: 4.5
  },
  {
    name: 'Петро-Кам 1 Y7',
    description: 'Время доставки: 90мин\nМинимальная сумма: 2300 руб\nПлатная доставка: 450 руб\nГород: Петропавловск-Камчатский\nФилиал: ул. Советская, 30\nТочка: Петропаловск_1 Сов',
    minOrderAmount: 2300,
    deliveryPrice: 450,
    estimatedTime: 90,
    centerLat: 53.0194,
    centerLng: 158.6503,
    radiusKm: 5.5
  },
  {
    name: 'Петро-Кам 1 Z1',
    description: 'Время доставки: 120 мин\nМинимальная сумма: 2300 руб\nПлатная доставка: 350 руб\nГород: Петропавловск-Камчатский\nФилиал: ул. Советская, 30\nТочка: Петропаловск_1 Сов',
    minOrderAmount: 2300,
    deliveryPrice: 350,
    estimatedTime: 120,
    centerLat: 53.0194,
    centerLng: 158.6503,
    radiusKm: 6
  }
]

async function main() {
  console.log('🗺️ Создание зон доставки для Петропавловска-Камчатского...')

  // Удаляем старые зоны (опционально, можно закомментировать)
  // await prisma.deliveryZone.deleteMany({
  //   where: {
  //     name: {
  //       startsWith: 'Петро-Кам'
  //     }
  //   }
  // })

  for (const zone of zones) {
    const polygon = createPolygonAroundPoint(zone.centerLat, zone.centerLng, zone.radiusKm)
    
    const coordinates = {
      type: 'Polygon',
      coordinates: [polygon]
    }

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
            coordinates: coordinates,
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
            coordinates: coordinates,
            minOrderAmount: zone.minOrderAmount,
            deliveryPrice: zone.deliveryPrice,
            estimatedTime: zone.estimatedTime,
            isActive: true
          }
        })
        console.log(`✅ Зона "${zone.name}" создана`)
      }
    } catch (error) {
      console.error(`❌ Ошибка при создании зоны "${zone.name}":`, error)
    }
  }

  console.log('✅ Все зоны доставки созданы/обновлены!')
  console.log('\n⚠️  ВАЖНО: Координаты полигонов созданы приблизительно.')
  console.log('   Для точной настройки нужно:')
  console.log('   1. Открыть карту Google Maps с зонами доставки')
  console.log('   2. Скопировать точные координаты полигонов из карты')
  console.log('   3. Обновить зоны через админ-панель или этот скрипт')
}

main()
  .catch((e) => {
    console.error('Ошибка:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

