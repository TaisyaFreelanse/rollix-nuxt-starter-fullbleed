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

    await prisma.banner.delete({
      where: { id: bannerId }
    })

    return { success: true }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка удаления баннера'
    })
  }
})
