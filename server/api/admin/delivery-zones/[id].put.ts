import { prisma } from '~/server/utils/prisma'
import { requireAdminAuth } from '~/server/utils/admin-auth'

export default defineEventHandler(async (event) => {
  try {
    // Проверяем авторизацию
    await requireAdminAuth(event)

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const { name, description, minOrderAmount, deliveryPrice, freeDeliveryThreshold, estimatedTime, isActive, coordinates } = body

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description || null
    if (minOrderAmount !== undefined) updateData.minOrderAmount = minOrderAmount
    if (deliveryPrice !== undefined) updateData.deliveryPrice = deliveryPrice
    if (freeDeliveryThreshold !== undefined) updateData.freeDeliveryThreshold = freeDeliveryThreshold || null
    if (estimatedTime !== undefined) updateData.estimatedTime = estimatedTime
    if (isActive !== undefined) updateData.isActive = isActive
    if (coordinates !== undefined) updateData.coordinates = coordinates

    const zone = await prisma.deliveryZone.update({
      where: { id },
      data: updateData
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
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        message: 'Зона доставки не найдена'
      })
    }
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'Ошибка при обновлении зоны доставки'
    })
  }
})

