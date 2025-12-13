import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
        // Фильтруем тестовые категории
        NOT: {
          OR: [
            { name: { contains: 'test', mode: 'insensitive' } },
            { name: { contains: 'тест', mode: 'insensitive' } },
            { name: { contains: 'dummy', mode: 'insensitive' } },
            { name: { contains: 'example', mode: 'insensitive' } },
            { name: { contains: 'заглушка', mode: 'insensitive' } },
            { slug: { contains: 'test', mode: 'insensitive' } },
            { slug: { contains: 'tes1', mode: 'insensitive' } }
          ]
        }
      },
      include: {
        _count: {
          select: {
            products: {
              where: {
                isActive: true
              }
            }
          }
        }
      },
      orderBy: {
        sortOrder: 'asc'
      }
    })

    return categories
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении категорий'
    })
  }
})

