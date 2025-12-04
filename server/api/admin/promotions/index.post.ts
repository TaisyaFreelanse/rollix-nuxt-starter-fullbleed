import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event)

    const body = await readBody(event)
    const { title, description, image, date, isActive, sortOrder } = body

    if (!title) {
      throw createError({
        statusCode: 400,
        message: 'Не указано название акции'
      })
    }

    // Создаем новую акцию
    const promotion = await prisma.promotion.create({
      data: {
        title,
        description: description || null,
        image: image || null,
        date: date ? new Date(date) : null,
        isActive: isActive !== undefined ? isActive : true,
        sortOrder: sortOrder || 0
      }
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
      message: 'Ошибка создания акции'
    })
  }
})

