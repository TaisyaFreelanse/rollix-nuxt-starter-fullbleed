import { requireAdminAuth } from '~/server/utils/admin-auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event)

    const body = await readBody(event)
    const { title, image, link, isActive, sortOrder } = body

    if (!title || !image) {
      throw createError({
        statusCode: 400,
        message: 'Заполните все обязательные поля (название и изображение)'
      })
    }

    const banner = await prisma.banner.create({
      data: {
        title,
        image,
        link: link || null,
        isActive: isActive !== undefined ? isActive : true,
        sortOrder: sortOrder || 0
      }
    })

    return banner
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка создания баннера'
    })
  }
})
