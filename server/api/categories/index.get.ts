import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true
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

