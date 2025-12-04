import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event)

    const promotionId = getRouterParam(event, 'id')
    const body = await readBody(event)
    const { title, description, image, date, isActive, sortOrder } = body

    if (!promotionId) {
      throw createError({
        statusCode: 400,
        message: 'Не указан ID акции'
      })
    }

    // Подготавливаем данные для обновления
    const updateData: any = {}
    
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description || null
    if (image !== undefined) updateData.image = image || null
    if (date !== undefined) updateData.date = date ? new Date(date) : null
    if (isActive !== undefined) updateData.isActive = isActive
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder

    // Обновляем акцию
    const promotion = await prisma.promotion.update({
      where: { id: promotionId },
      data: updateData
    })

    return {
      success: true,
      promotion
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка обновления акции'
    })
  }
})

