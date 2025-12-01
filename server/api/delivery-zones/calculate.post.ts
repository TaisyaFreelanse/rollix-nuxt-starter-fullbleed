import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { lat, lng, subtotal } = body

    if (!lat || !lng) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Координаты не указаны'
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
        statusMessage: 'Адрес не входит в зону доставки'
      })
    }

    // Рассчитываем стоимость доставки
    let deliveryPrice = Number(matchedZone.deliveryPrice)
    const orderSubtotal = subtotal || 0

    // Проверяем бесплатную доставку
    if (
      matchedZone.freeDeliveryThreshold &&
      orderSubtotal >= Number(matchedZone.freeDeliveryThreshold)
    ) {
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
      statusMessage: 'Ошибка при расчете доставки'
    })
  }
})

// Функция проверки точки в полигоне
function isPointInZone(lat: number, lng: number, coordinates: any): boolean {
  if (Array.isArray(coordinates) && coordinates.length > 0) {
    const polygon = Array.isArray(coordinates[0][0]) ? coordinates[0] : coordinates
    let inside = false

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][1] || polygon[i][0]
      const yi = polygon[i][0] || polygon[i][1]
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

