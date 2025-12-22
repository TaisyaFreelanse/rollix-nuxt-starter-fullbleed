import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { lat, lng, subtotal } = body

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

    // Находим подходящую зону
    let matchedZone = null
    for (const zone of zones) {
      const coordinates = zone.coordinates as any
      if (isPointInZone(lat, lng, coordinates)) {
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

    return {
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
  } catch (error: any) {
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
  if (!Array.isArray(coordinates) || coordinates.length === 0) {
    return false
  }

  // Обрабатываем разные форматы координат
  let polygon: number[][]
  
  if (Array.isArray(coordinates[0])) {
    if (Array.isArray(coordinates[0][0])) {
      // Формат: [[[lat, lng], [lat, lng], ...]]
      polygon = coordinates[0]
    } else {
      // Формат: [[lat, lng], [lat, lng], ...]
      polygon = coordinates
    }
  } else {
    return false
  }

  if (polygon.length < 3) {
    return false // Полигон должен иметь минимум 3 точки
  }

  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const pointI = polygon[i]
    const pointJ = polygon[j]
    
    if (!Array.isArray(pointI) || !Array.isArray(pointJ) || pointI.length < 2 || pointJ.length < 2) {
      continue
    }

    // Координаты могут быть в формате [lat, lng] или [lng, lat]
    const xi = pointI[1] ?? pointI[0]
    const yi = pointI[0] ?? pointI[1]
    const xj = pointJ[1] ?? pointJ[0]
    const yj = pointJ[0] ?? pointJ[1]

    const intersect =
      yi > lng !== yj > lng && lat < ((xj - xi) * (lng - yi)) / (yj - yi) + xi

    if (intersect) inside = !inside
  }

  return inside
}

