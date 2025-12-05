import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event)

    const bannerId = getRouterParam(event, 'id')

    if (!bannerId) {
      throw createError({
        statusCode: 400,
        message: 'ID баннера не указан'
      })
    }

    const banner = await prisma.banner.findUnique({
      where: { id: bannerId }
    })

    if (!banner) {
      throw createError({
        statusCode: 404,
        message: 'Баннер не найден'
      })
    }

    return banner
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка получения баннера'
    })
  }
})
