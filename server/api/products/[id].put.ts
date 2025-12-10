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
    // Обработка oldPrice: если пустое, null, 0 или невалидное значение - устанавливаем null
    if (body.oldPrice !== undefined) {
      const oldPriceValue = body.oldPrice === '' || body.oldPrice === null || body.oldPrice === undefined || isNaN(Number(body.oldPrice)) || Number(body.oldPrice) <= 0
        ? null
        : Number(body.oldPrice)
      updateData.oldPrice = oldPriceValue
    }
    // Обработка weight: если пустое, null, 0 или невалидное значение - устанавливаем null
    if (body.weight !== undefined) {
      const weightValue = body.weight === '' || body.weight === null || body.weight === undefined || isNaN(Number(body.weight)) || Number(body.weight) <= 0
        ? null
        : Number(body.weight)
      updateData.weight = weightValue
    }
    // Обработка calories: если пустое, null, 0 или невалидное значение - устанавливаем null
    if (body.calories !== undefined) {
      const caloriesValue = body.calories === '' || body.calories === null || body.calories === undefined || isNaN(Number(body.calories)) || Number(body.calories) <= 0
        ? null
        : Number(body.calories)
      updateData.calories = caloriesValue
    }
    if (body.isActive !== undefined) updateData.isActive = body.isActive
    if (body.isPopular !== undefined) updateData.isPopular = body.isPopular
    if (body.isNew !== undefined) updateData.isNew = body.isNew
    if (body.isHot !== undefined) updateData.isHot = body.isHot
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

