import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event)

    // Получаем виджет промокода (или создаем новый, если нет)
    let widget = await prisma.promocodeWidget.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!widget) {
      // Создаем виджет по умолчанию
      widget = await prisma.promocodeWidget.create({
        data: {
          code: '3101',
          description: 'Специальное предложение для новых клиентов',
          isActive: true
        }
      })
    }

    return widget
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка получения виджета промокода'
    })
  }
})

