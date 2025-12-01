import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Получить userId из сессии/токена
    const userId = 'user_123' // Заглушка

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
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении адресов'
    })
  }
})

