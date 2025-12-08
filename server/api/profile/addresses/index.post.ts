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

    const body = await readBody(event)

    // Если это адрес по умолчанию, снимаем флаг с других адресов
    if (body.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId,
          isDefault: true
        },
        data: {
          isDefault: false
        }
      })
    }

    const address = await prisma.address.create({
      data: {
        userId,
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
    console.error('Ошибка при создании адреса:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Ошибка при создании адреса'
    })
  }
})

