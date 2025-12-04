import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event)

    const id = getRouterParam(event, 'id')
    
    const zone = await prisma.deliveryZone.findUnique({
      where: { id }
    })

    if (!zone) {
      throw createError({
        statusCode: 404,
        message: 'Зона доставки не найдена'
      })
    }

    return {
      id: zone.id,
      name: zone.name,
      description: zone.description,
      minOrderAmount: Number(zone.minOrderAmount),
      deliveryPrice: Number(zone.deliveryPrice),
      freeDeliveryThreshold: zone.freeDeliveryThreshold ? Number(zone.freeDeliveryThreshold) : null,
      estimatedTime: zone.estimatedTime,
      isActive: zone.isActive,
      coordinates: zone.coordinates
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении зоны доставки'
    })
  }
})

