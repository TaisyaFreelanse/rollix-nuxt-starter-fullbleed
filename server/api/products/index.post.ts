import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации и прав администратора
    const body = await readBody(event)

    const product = await prisma.product.create({
      data: {
        categoryId: body.categoryId,
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
        description: body.description,
        image: body.image,
        images: body.images || [],
        price: body.price,
        oldPrice: body.oldPrice,
        weight: body.weight,
        calories: body.calories,
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

