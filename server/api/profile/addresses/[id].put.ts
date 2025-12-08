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

    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID адреса не указан'
      })
    }

    // Проверяем, что адрес принадлежит пользователю
    const existingAddress = await prisma.address.findUnique({
      where: { id }
    })

    if (!existingAddress) {
      throw createError({
        statusCode: 404,
        message: 'Адрес не найден'
      })
    }

    if (existingAddress.userId !== userId) {
      throw createError({
        statusCode: 403,
        message: 'Нет доступа к этому адресу'
      })
    }

    const body = await readBody(event)

    // Если это адрес по умолчанию, снимаем флаг с других адресов
    if (body.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId,
          id: { not: id },
          isDefault: true
        },
        data: {
          isDefault: false
        }
      })
    }

    const address = await prisma.address.update({
      where: { id },
      data: {
        street: body.street,
        house: body.house,
        apartment: body.apartment,
        entrance: body.entrance,
        floor: body.floor,
        intercom: body.intercom,
        comment: body.comment,
        isDefault: body.isDefault || false
      }
    })

    return address
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Ошибка при обновлении адреса:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Ошибка при обновлении адреса'
    })
  }
})

