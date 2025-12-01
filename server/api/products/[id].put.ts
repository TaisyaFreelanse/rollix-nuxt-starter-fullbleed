import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации и прав администратора
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID товара не указан'
      })
    }

    const updateData: any = {}
    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId
    if (body.name !== undefined) updateData.name = body.name
    if (body.slug !== undefined) updateData.slug = body.slug
    if (body.description !== undefined) updateData.description = body.description
    if (body.image !== undefined) updateData.image = body.image
    if (body.images !== undefined) updateData.images = body.images
    if (body.price !== undefined) updateData.price = body.price
    if (body.oldPrice !== undefined) updateData.oldPrice = body.oldPrice
    if (body.weight !== undefined) updateData.weight = body.weight
    if (body.calories !== undefined) updateData.calories = body.calories
    if (body.isActive !== undefined) updateData.isActive = body.isActive
    if (body.isPopular !== undefined) updateData.isPopular = body.isPopular
    if (body.sortOrder !== undefined) updateData.sortOrder = body.sortOrder

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true
          }
        }
      }
    })

    return {
      ...product,
      price: Number(product.price),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null
    }
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        message: 'Товар не найден'
      })
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка при обновлении товара'
    })
  }
})

