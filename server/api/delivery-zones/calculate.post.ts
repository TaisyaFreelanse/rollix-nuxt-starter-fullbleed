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
      }
    })

    console.log(`[Delivery Zones Calculate] Найдено зон в базе: ${zones.length}`)
    if (zones.length === 0) {
      console.warn('[Delivery Zones Calculate] В базе данных нет активных зон доставки!')
    }

    // Находим подходящую зону
    let matchedZone = null
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
        matchedZone = zone
        break
      }
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

  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const pointI = polygon[i]
    const pointJ = polygon[j]
    
    if (!Array.isArray(pointI) || !Array.isArray(pointJ) || pointI.length < 2 || pointJ.length < 2) {
      continue
    }

    // Определяем формат координат: [lat, lng] или [lng, lat]
    // Для Петропавловска-Камчатского: lat ~53, lng ~158
    // Если первая координата > 100, это скорее всего lng, значит формат [lng, lat]
    const isLngLatFormat = Math.abs(pointI[0]) > 90 || Math.abs(pointI[1]) <= 90
    
    let xi: number, yi: number, xj: number, yj: number
    
    if (isLngLatFormat) {
      // Формат [lng, lat]
      xi = pointI[0] // lng
      yi = pointI[1] // lat
      xj = pointJ[0] // lng
      yj = pointJ[1] // lat
    } else {
      // Формат [lat, lng]
      xi = pointI[1] // lng
      yi = pointI[0] // lat
      xj = pointJ[1] // lng
      yj = pointJ[0] // lat
    }

    const intersect =
      yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi

    if (intersect) inside = !inside
  }

  console.log(`[isPointInZone] Результат: ${inside ? 'ТОЧКА ВНУТРИ' : 'точка снаружи'}`)
  return inside
}

