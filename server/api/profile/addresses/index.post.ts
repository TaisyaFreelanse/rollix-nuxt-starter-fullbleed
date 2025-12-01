import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const userId = 'user_123' // TODO: Получить из сессии/токена

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
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при создании адреса'
    })
  }
})

