import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Логируем запрос для отладки
    console.log('[Delivery Zones Calculate] Получен запрос:', {
      method: event.method,
      url: event.path
    })

    const body = await readBody(event)
    const { lat, lng, subtotal } = body

    console.log('[Delivery Zones Calculate] Данные запроса:', { lat, lng, subtotal })

    if (!lat || !lng) {
      throw createError({
        statusCode: 400,
        message: 'Координаты не указаны'
      })
    }

    const zones = await prisma.deliveryZone.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        minOrderAmount: 'desc' // Сортируем по убыванию минимальной суммы - сначала проверяем зоны с большей суммой
      }
    })

    console.log(`[Delivery Zones Calculate] Найдено зон в базе: ${zones.length}`)
    if (zones.length === 0) {
      console.warn('[Delivery Zones Calculate] В базе данных нет активных зон доставки!')
    }

    // Находим подходящую зону
    // Проверяем все зоны и собираем все подходящие (на случай перекрытия зон)
    const matchedZones: Array<typeof zones[0]> = []
    for (const zone of zones) {
      const coordinates = zone.coordinates as any
      console.log(`[Delivery Zones Calculate] Проверка зоны "${zone.name}"`)
      console.log(`[Delivery Zones Calculate] Тип координат:`, typeof coordinates, Array.isArray(coordinates) ? 'массив' : 'объект')
      if (coordinates && typeof coordinates === 'object' && coordinates.type) {
        console.log(`[Delivery Zones Calculate] Формат: GeoJSON (${coordinates.type})`)
      }
      const isInZone = isPointInZone(lat, lng, coordinates)
      console.log(`[Delivery Zones Calculate] Результат проверки зоны "${zone.name}": ${isInZone ? 'ПОПАДАЕТ' : 'не попадает'}`)
      if (isInZone) {
        matchedZones.push(zone)
      }
    }

    // Если точка попадает в несколько зон, выбираем зону с наибольшей минимальной суммой
    // (так как зоны уже отсортированы по убыванию minOrderAmount, первая подходящая и есть нужная)
    const matchedZone = matchedZones.length > 0 ? matchedZones[0] : null
    
    if (matchedZones.length > 1) {
      console.log(`[Delivery Zones Calculate] Точка попадает в ${matchedZones.length} зон. Выбрана зона с наибольшей минимальной суммой: "${matchedZone?.name}"`)
    }

    if (!matchedZone) {
      throw createError({
        statusCode: 404,
        message: 'Адрес не входит в зону доставки'
      })
    }

    // Рассчитываем стоимость доставки
    let deliveryPrice = Number(matchedZone.deliveryPrice)
    const orderSubtotal = subtotal || 0
    const minOrderAmount = Number(matchedZone.minOrderAmount)

    // Логика доставки:
    // - До минимальной суммы (minOrderAmount) - доставка платная (deliveryPrice)
    // - От минимальной суммы и выше - доставка бесплатная
    if (orderSubtotal >= minOrderAmount) {
      deliveryPrice = 0
    }

    const result = {
      zone: {
        id: matchedZone.id,
        name: matchedZone.name,
        estimatedTime: matchedZone.estimatedTime
      },
      deliveryPrice,
      freeDeliveryThreshold: matchedZone.freeDeliveryThreshold
        ? Number(matchedZone.freeDeliveryThreshold)
        : null,
      minOrderAmount: Number(matchedZone.minOrderAmount)
    }

    console.log('[Delivery Zones Calculate] Результат:', result)
    return result
  } catch (error: any) {
    console.error('[Delivery Zones Calculate] Ошибка:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка при расчете доставки'
    })
  }
})

// Функция проверки точки в полигоне
function isPointInZone(lat: number, lng: number, coordinates: any): boolean {
  if (!coordinates) {
    console.log('[isPointInZone] Координаты пусты или undefined')
    return false
  }

  // Обрабатываем разные форматы координат
  let polygon: number[][]
  
  // Сначала проверяем формат GeoJSON (объект с type и coordinates)
  if (coordinates && typeof coordinates === 'object' && coordinates.type === 'Polygon' && Array.isArray(coordinates.coordinates)) {
    // Формат GeoJSON: { type: 'Polygon', coordinates: [[[lng, lat], ...]] }
    if (Array.isArray(coordinates.coordinates[0]) && Array.isArray(coordinates.coordinates[0][0])) {
      polygon = coordinates.coordinates[0]
      console.log('[isPointInZone] Обнаружен формат GeoJSON Polygon')
    } else {
      console.log('[isPointInZone] Неверный формат GeoJSON координат')
      return false
    }
  } else if (Array.isArray(coordinates)) {
    // Проверяем простой массив
    if (coordinates.length === 0) {
      console.log('[isPointInZone] Массив координат пуст')
      return false
    }
    
    if (Array.isArray(coordinates[0])) {
      if (Array.isArray(coordinates[0][0])) {
        // Формат: [[[lat, lng], [lat, lng], ...]] или [[[lng, lat], [lng, lat], ...]]
        polygon = coordinates[0]
        console.log('[isPointInZone] Обнаружен формат вложенного массива')
      } else {
        // Формат: [[lat, lng], [lat, lng], ...] или [[lng, lat], [lng, lat], ...]
        polygon = coordinates
        console.log('[isPointInZone] Обнаружен формат плоского массива')
      }
    } else {
      console.log('[isPointInZone] Неизвестный формат координат (не массив массивов)')
      return false
    }
  } else {
    console.log('[isPointInZone] Неизвестный формат координат:', typeof coordinates)
    return false
  }

  if (polygon.length < 3) {
    console.log(`[isPointInZone] Полигон имеет недостаточно точек: ${polygon.length}`)
    return false // Полигон должен иметь минимум 3 точки
  }

  console.log(`[isPointInZone] Проверка точки (${lat}, ${lng}) в полигоне с ${polygon.length} точками`)
  console.log(`[isPointInZone] Первые точки полигона:`, polygon.slice(0, 3))

  // Определяем формат координат по первой точке
  // Для Петропавловска-Камчатского: lat ~53, lng ~158
  // Если первая координата > 100, это lng, значит формат [lng, lat]
  const firstPoint = polygon[0]
  if (!Array.isArray(firstPoint) || firstPoint.length < 2) {
    console.log('[isPointInZone] Неверный формат первой точки полигона')
    return false
  }

  const isLngLatFormat = Math.abs(firstPoint[0]) > 90
  console.log(`[isPointInZone] Формат координат: ${isLngLatFormat ? '[lng, lat]' : '[lat, lng]'}`)
  console.log(`[isPointInZone] Проверяемая точка: lat=${lat}, lng=${lng}`)

  let inside = false
  let intersections = 0

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const pointI = polygon[i]
    const pointJ = polygon[j]
    
    if (!Array.isArray(pointI) || !Array.isArray(pointJ) || pointI.length < 2 || pointJ.length < 2) {
      continue
    }

    // Извлекаем координаты в зависимости от формата
    let lngI: number, latI: number, lngJ: number, latJ: number
    
    if (isLngLatFormat) {
      // Формат [lng, lat] - как в GeoJSON
      lngI = pointI[0]
      latI = pointI[1]
      lngJ = pointJ[0]
      latJ = pointJ[1]
    } else {
      // Формат [lat, lng]
      latI = pointI[0]
      lngI = pointI[1]
      latJ = pointJ[0]
      lngJ = pointJ[1]
    }

    // Алгоритм ray casting: проверяем пересечение горизонтального луча с ребром полигона
    // Луч идет от точки (lng, lat) вправо (вдоль оси lng)
    // Проверяем, пересекает ли горизонтальный луч от точки (lng, lat) ребро между точками I и J
    
    // Проверяем, что ребро пересекает горизонтальную линию на уровне lat
    const latCrosses = (latI > lat) !== (latJ > lat)
    
    if (latCrosses) {
      // Вычисляем lng точки пересечения
      const lngIntersect = (lngJ - lngI) * (lat - latI) / (latJ - latI) + lngI
      
      // Если точка пересечения справа от проверяемой точки
      if (lng < lngIntersect) {
        inside = !inside
        intersections++
      }
    }
  }

  console.log(`[isPointInZone] Количество пересечений: ${intersections}, Результат: ${inside ? 'ТОЧКА ВНУТРИ' : 'точка снаружи'}`)
  return inside
}

