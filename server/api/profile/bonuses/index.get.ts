import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const userId = await requireAuth(event)

    // Проверяем, существует ли поле bonusBalance и таблица bonus_transactions
    let balance = 0
    let history: any[] = []

    try {
      // Пытаемся получить баланс бонусов через Prisma
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          bonusBalance: true
        }
      })

      if (user) {
        balance = Number(user.bonusBalance || 0)
      }

      // Пытаемся получить историю транзакций
      history = await prisma.bonusTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: {
          order: {
            select: {
              id: true,
              orderNumber: true
            }
          }
        }
      })
    } catch (error: any) {
      // Если таблица bonus_transactions или поле bonusBalance не существует
      if (error.message?.includes('bonus') || error.message?.includes('does not exist') || error.message?.includes('column')) {
        // Используем raw SQL для проверки наличия поля
        try {
          const bonusCheck = await prisma.$queryRawUnsafe<Array<{column_name: string}>>(
            `SELECT column_name 
             FROM information_schema.columns 
             WHERE table_name = 'users' AND column_name = 'bonusBalance'`
          )
          
          if (bonusCheck.length > 0) {
            // Поле существует, получаем баланс через raw SQL
            const balanceResult = await prisma.$queryRawUnsafe<Array<{bonusBalance: number}>>(
              `SELECT COALESCE("bonusBalance", 0) as "bonusBalance" 
               FROM users 
               WHERE id = $1`,
              userId
            )
            balance = Number(balanceResult[0]?.bonusBalance || 0)
          }
        } catch (sqlError) {
          // Игнорируем ошибку, balance останется 0
          console.log('Система бонусов еще не применена к базе данных')
        }
      } else {
        throw error
      }
    }

    return {
      balance,
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

