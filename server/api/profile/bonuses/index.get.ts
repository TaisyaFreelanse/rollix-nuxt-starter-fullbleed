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
      console.log('Ошибка при получении бонусов через Prisma:', error.message)
      
      // Если таблица bonus_transactions или поле bonusBalance не существует, используем raw SQL
      if (error.message?.includes('bonus') || error.message?.includes('does not exist') || error.message?.includes('column') || error.message?.includes('Unknown arg')) {
        try {
          // Проверяем наличие поля bonusBalance
          const bonusCheck = await prisma.$queryRawUnsafe<Array<{column_name: string}>>(
            `SELECT column_name 
             FROM information_schema.columns 
             WHERE table_name = 'users' AND column_name = 'bonusBalance'`
          )
          
          if (bonusCheck.length > 0) {
            // Поле существует, получаем баланс через raw SQL
            const balanceResult = await prisma.$queryRawUnsafe<Array<{bonusBalance: number}>>(
              `SELECT COALESCE("bonusBalance"::text, '0') as "bonusBalance" 
               FROM users 
               WHERE id = $1`,
              userId
            )
            balance = Number(balanceResult[0]?.bonusBalance || 0)

            // Проверяем наличие таблицы bonus_transactions
            const tableCheck = await prisma.$queryRawUnsafe<Array<{table_name: string}>>(
              `SELECT table_name 
               FROM information_schema.tables 
               WHERE table_name = 'bonus_transactions'`
            )

            if (tableCheck.length > 0) {
              // Таблица существует, получаем историю через raw SQL
              const historyResult = await prisma.$queryRawUnsafe<Array<{
                id: string
                amount: string
                description: string | null
                createdAt: Date
                orderId: string | null
              }>>(
                `SELECT 
                  bt.id,
                  bt.amount::text as amount,
                  bt.description,
                  bt."createdAt",
                  bt."orderId"
                FROM bonus_transactions bt
                WHERE bt."userId" = $1
                ORDER BY bt."createdAt" DESC
                LIMIT 50`,
                userId
              )

              // Получаем номера заказов для истории
              for (const transaction of historyResult) {
                if (transaction.orderId) {
                  const orderResult = await prisma.$queryRawUnsafe<Array<{orderNumber: string}>>(
                    `SELECT "orderNumber" FROM orders WHERE id = $1`,
                    transaction.orderId
                  )
                  
                  history.push({
                    id: transaction.id,
                    amount: Number(transaction.amount),
                    description: transaction.description || (orderResult[0] ? `Начисление за заказ №${orderResult[0].orderNumber}` : 'Транзакция бонусов'),
                    createdAt: transaction.createdAt,
                    orderNumber: orderResult[0]?.orderNumber
                  })
                } else {
                  history.push({
                    id: transaction.id,
                    amount: Number(transaction.amount),
                    description: transaction.description || 'Транзакция бонусов',
                    createdAt: transaction.createdAt
                  })
                }
              }
            }
          } else {
            console.log('Система бонусов еще не применена к базе данных (поле bonusBalance не найдено)')
          }
        } catch (sqlError: any) {
          console.error('Ошибка при получении бонусов через raw SQL:', sqlError.message)
          // Игнорируем ошибку, balance и history останутся 0 и []
        }
      } else {
        // Если это не ошибка связанная с бонусами, пробрасываем дальше
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

