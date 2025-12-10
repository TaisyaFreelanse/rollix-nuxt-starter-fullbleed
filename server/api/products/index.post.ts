import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации и прав администратора
    const body = await readBody(event)

    // Обработка опциональных полей: преобразуем пустые значения в null
    const oldPriceValue = body.oldPrice === '' || body.oldPrice === null || body.oldPrice === undefined || isNaN(Number(body.oldPrice)) || Number(body.oldPrice) <= 0
      ? null
      : Number(body.oldPrice)
    
    const weightValue = body.weight === '' || body.weight === null || body.weight === undefined || isNaN(Number(body.weight)) || Number(body.weight) <= 0
      ? null
      : Number(body.weight)
    
    const caloriesValue = body.calories === '' || body.calories === null || body.calories === undefined || isNaN(Number(body.calories)) || Number(body.calories) <= 0
      ? null
      : Number(body.calories)

    const product = await prisma.product.create({
      data: {
        categoryId: body.categoryId,
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
        description: body.description,
        image: body.image,
        images: body.images || [],
        price: body.price,
        oldPrice: oldPriceValue,
        weight: weightValue,
        calories: caloriesValue,
        isActive: body.isActive !== undefined ? body.isActive : true,
        isPopular: body.isPopular || false,
        isNew: body.isNew || false,
        isHot: body.isHot || false,
        sortOrder: body.sortOrder || 0
      },
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
    if (error.code === 'P2002') {
      throw createError({
        statusCode: 409,
        message: 'Товар с таким slug уже существует'
      })
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка при создании товара'
    })
  }
})

