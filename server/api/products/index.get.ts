import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const categoryId = query.categoryId as string | undefined
    const search = query.search as string | undefined
    const sortBy = (query.sortBy as string) || 'sortOrder'
    const sortOrder = (query.sortOrder as 'asc' | 'desc') || 'asc'
    const isPopular = query.isPopular === 'true'
    const limit = query.limit ? parseInt(query.limit as string) : undefined
    const offset = query.offset ? parseInt(query.offset as string) : undefined

    const where: any = {
      isActive: true
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (isPopular) {
      where.isPopular = true
    }

    const orderBy: any = {}
    if (sortBy === 'price') {
      orderBy.price = sortOrder
    } else if (sortBy === 'name') {
      orderBy.name = sortOrder
    } else {
      orderBy.sortOrder = sortOrder
    }

    const products = await prisma.product.findMany({
      where,
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
      },
      orderBy,
      take: limit,
      skip: offset
    })

    const total = await prisma.product.count({ where })

    // Преобразуем Decimal в число для JSON и фильтруем невалидные продукты
    const formattedProducts = products
      .filter((product) => product && product.id && product.name)
      .map((product) => ({
        ...product,
        name: product.name || '',
        image: product.image || null,
        price: Number(product.price) || 0,
        oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
        modifiers: (product.modifiers || []).map((modifier) => ({
        ...modifier,
        price: Number(modifier.price),
        options: modifier.options.map((option) => ({
          ...option,
          price: Number(option.price)
        }))
      }))
    }))

    return {
      products: formattedProducts,
      total,
      limit,
      offset
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении товаров'
    })
  }
})

