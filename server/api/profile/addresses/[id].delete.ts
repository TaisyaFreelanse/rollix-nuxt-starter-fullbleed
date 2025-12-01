import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const userId = 'user_123' // TODO: Получить из сессии/токена

    await prisma.address.delete({
      where: { id }
    })

    return { success: true }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при удалении адреса'
    })
  }
})

