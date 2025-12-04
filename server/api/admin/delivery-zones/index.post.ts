import { prisma } from '~/server/utils/prisma'
import { requireAdminAuth } from '~/server/utils/admin-auth'

export default defineEventHandler(async (event) => {
  try {
    // Проверяем авторизацию
    await requireAdminAuth(event)

    const body = await readBody(event)
    const { name, description, minOrderAmount, deliveryPrice, freeDeliveryThreshold, estimatedTime, isActive, coordinates } = body

    if (!name || minOrderAmount === undefined || deliveryPrice === undefined) {
      throw createError({
        statusCode: 400,
        message: 'Не указаны обязательные поля'
      })
    }

    const zone = await prisma.deliveryZone.create({
      data: {
        name,
        description: description || null,
        minOrderAmount: minOrderAmount,
        deliveryPrice: deliveryPrice,
        freeDeliveryThreshold: freeDeliveryThreshold || null,
        estimatedTime: estimatedTime || 60,
        isActive: isActive !== undefined ? isActive : true,
        coordinates: coordinates || [[53.0194, 158.6509], [53.0194, 158.6510], [53.0195, 158.6510], [53.0195, 158.6509]]
      }
    })

    return {
      success: true,
      zone: {
        id: zone.id,
        name: zone.name,
        description: zone.description,
        minOrderAmount: Number(zone.minOrderAmount),
        deliveryPrice: Number(zone.deliveryPrice),
        freeDeliveryThreshold: zone.freeDeliveryThreshold ? Number(zone.freeDeliveryThreshold) : null,
        estimatedTime: zone.estimatedTime,
        isActive: zone.isActive
      }
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'Ошибка при создании зоны доставки'
    })
  }
})

