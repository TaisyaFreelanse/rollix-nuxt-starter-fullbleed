import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const userId = await requireAuth(event)

    // Получаем пользователя с балансом бонусов
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        bonusBalance: true
      }
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'Пользователь не найден'
      })
    }

    // Получаем историю транзакций
    const history = await prisma.bonusTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50, // Последние 50 транзакций
      include: {
        order: {
          select: {
            id: true,
            orderNumber: true
          }
        }
      }
    })

    return {
      balance: Number(user.bonusBalance),
      history: history.map((transaction) => ({
        id: transaction.id,
        amount: Number(transaction.amount),
        description: transaction.description || 
          (transaction.order 
            ? `Начисление за заказ №${transaction.order.orderNumber}` 
            : 'Транзакция бонусов'),
        createdAt: transaction.createdAt,
        orderNumber: transaction.order?.orderNumber
      }))
    }
  } catch (error: any) {
    if (error.statusCode === 401 || error.statusCode === 404) {
      throw error
    }
    console.error('Ошибка получения бонусов:', error)
    throw createError({
      statusCode: 500,
      message: 'Ошибка при получении бонусов'
    })
  }
})

