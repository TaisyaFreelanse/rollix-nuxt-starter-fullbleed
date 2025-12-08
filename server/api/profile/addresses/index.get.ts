import { prisma } from '~/server/utils/prisma'
import { getUserIdFromToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const userId = await getUserIdFromToken(event)
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: 'Требуется авторизация'
      })
    }

    const addresses = await prisma.address.findMany({
      where: {
        userId
      },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return addresses
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Ошибка при получении адресов:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Ошибка при получении адресов'
    })
  }
})

