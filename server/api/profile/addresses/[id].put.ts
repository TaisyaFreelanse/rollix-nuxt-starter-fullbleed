import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const userId = 'user_123' // TODO: Получить из сессии/токена

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
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Ошибка при обновлении адреса'
    })
  }
})

