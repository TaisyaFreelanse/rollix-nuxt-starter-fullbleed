import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const lat = query.lat ? parseFloat(query.lat as string) : undefined
    const lng = query.lng ? parseFloat(query.lng as string) : undefined

    const zones = await prisma.deliveryZone.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        minOrderAmount: 'asc'
      }
    })

    // Если переданы координаты, проверяем, в какой зоне находится точка
    let matchedZone = null
    if (lat !== undefined && lng !== undefined) {
      for (const zone of zones) {
        const coordinates = zone.coordinates as any
        if (isPointInZone(lat, lng, coordinates)) {
          matchedZone = zone
          break
        }
      }
    }

    const formattedZones = zones.map((zone) => ({
      id: zone.id,
      name: zone.name,
      description: zone.description,
      minOrderAmount: Number(zone.minOrderAmount),
      deliveryPrice: Number(zone.deliveryPrice),
      freeDeliveryThreshold: zone.freeDeliveryThreshold ? Number(zone.freeDeliveryThreshold) : null,
      estimatedTime: zone.estimatedTime,
      isMatched: matchedZone?.id === zone.id
    }))

    return {
      zones: formattedZones,
      matchedZone: matchedZone
        ? {
            id: matchedZone.id,
            name: matchedZone.name,
            minOrderAmount: Number(matchedZone.minOrderAmount),
            deliveryPrice: Number(matchedZone.deliveryPrice),
            freeDeliveryThreshold: matchedZone.freeDeliveryThreshold
              ? Number(matchedZone.freeDeliveryThreshold)
              : null,
            estimatedTime: matchedZone.estimatedTime
          }
        : null
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при получении зон доставки'
    })
  }
})

// Простая проверка точки в полигоне (алгоритм ray casting)
function isPointInZone(lat: number, lng: number, coordinates: any): boolean {
  // Если координаты - это массив точек полигона
  if (Array.isArray(coordinates) && coordinates.length > 0) {
    const polygon = Array.isArray(coordinates[0][0]) ? coordinates[0] : coordinates
    let inside = false

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][1] || polygon[i][0] // lat
      const yi = polygon[i][0] || polygon[i][1] // lng
      const xj = polygon[j][1] || polygon[j][0]
      const yj = polygon[j][0] || polygon[j][1]

      const intersect =
        yi > lng !== yj > lng && lat < ((xj - xi) * (lng - yi)) / (yj - yi) + xi

      if (intersect) inside = !inside
    }

    return inside
  }

  return false
}

