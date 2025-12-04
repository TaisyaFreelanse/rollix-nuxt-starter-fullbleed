import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event)

    const body = await readBody(event)
    const { code, description, isActive } = body

    if (!code || !description) {
      throw createError({
        statusCode: 400,
        message: 'Не указан код или описание промокода'
      })
    }

    // Получаем существующий виджет или создаем новый
    let widget = await prisma.promocodeWidget.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (widget) {
      // Обновляем существующий
      widget = await prisma.promocodeWidget.update({
        where: { id: widget.id },
        data: {
          code,
          description,
          isActive: isActive !== undefined ? isActive : true
        }
      })
    } else {
      // Создаем новый
      widget = await prisma.promocodeWidget.create({
        data: {
          code,
          description,
          isActive: isActive !== undefined ? isActive : true
        }
      })
    }

    return {
      success: true,
      widget
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка обновления виджета промокода'
    })
  }
})

