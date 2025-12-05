import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event)

    const banners = await prisma.banner.findMany({
      orderBy: {
        sortOrder: 'asc'
      }
    })

    return banners
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка получения баннеров'
    })
  }
})
