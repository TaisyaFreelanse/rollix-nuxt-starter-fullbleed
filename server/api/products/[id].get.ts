import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID товара не указан'
      })
    }

    const product = await prisma.product.findUnique({
      where: {
        id
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true
          }
        },
        modifiers: {
          include: {
            options: {
              orderBy: {
                sortOrder: 'asc'
              }
            }
          },
          orderBy: {
            sortOrder: 'asc'
          }
        }
      }
    })

    if (!product) {
      throw createError({
        statusCode: 404,
        message: 'Товар не найден'
      })
    }

    // Преобразуем Decimal в число для JSON
    return {
      ...product,
      price: Number(product.price),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
      modifiers: product.modifiers.map((modifier) => ({
        ...modifier,
        price: Number(modifier.price),
        options: modifier.options.map((option) => ({
          ...option,
          price: Number(option.price)
        }))
      }))
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении товара'
    })
  }
})

