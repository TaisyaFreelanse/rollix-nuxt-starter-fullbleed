import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации и прав администратора
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID категории не указан'
      })
    }

    const updateData: any = {}
    if (body.name !== undefined) updateData.name = body.name
    if (body.slug !== undefined) updateData.slug = body.slug
    if (body.icon !== undefined) updateData.icon = body.icon
    if (body.image !== undefined) updateData.image = body.image
    if (body.description !== undefined) updateData.description = body.description
    if (body.sortOrder !== undefined) updateData.sortOrder = body.sortOrder
    if (body.isActive !== undefined) updateData.isActive = body.isActive

    const category = await prisma.category.update({
      where: { id },
      data: updateData
    })

    return category
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        message: 'Категория не найдена'
      })
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка при обновлении категории'
    })
  }
})

