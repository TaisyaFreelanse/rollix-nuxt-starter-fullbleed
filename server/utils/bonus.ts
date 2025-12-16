import { prisma } from './prisma'
import { Decimal } from '@prisma/client/runtime/library'

/**
 * Начисляет бонусы пользователю за доставленный заказ
 * Бонусы начисляются только один раз за заказ (1% от итоговой суммы)
 * 
 * @param orderId - ID заказа
 * @returns true если бонусы были начислены, false если уже были начислены или произошла ошибка
 */
export async function awardBonusForDeliveredOrder(orderId: string): Promise<boolean> {
  try {
    // Получаем заказ с информацией о пользователе
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          select: {
            id: true
          }
        }
      }
    })

    if (!order) {
      console.log(`[Бонусы] Заказ ${orderId} не найден`)
      return false
    }

    // Проверяем, что заказ доставлен
    if (order.status !== 'DELIVERED') {
      console.log(`[Бонусы] Заказ ${order.orderNumber} еще не доставлен (статус: ${order.status})`)
      return false
    }

    // Проверяем, что заказ оплачен (бонусы начисляются только за оплаченные заказы)
    if (order.paymentStatus !== 'PAID') {
      console.log(`[Бонусы] Заказ ${order.orderNumber} не оплачен (статус оплаты: ${order.paymentStatus})`)
      return false
    }

    // Проверяем, что у заказа есть пользователь
    if (!order.userId || !order.user) {
      console.log(`[Бонусы] У заказа ${order.orderNumber} нет пользователя`)
      return false
    }

    // Проверяем, не начислялись ли уже бонусы за этот заказ
    const existingBonus = await prisma.bonusTransaction.findFirst({
      where: {
        orderId: order.id,
        userId: order.userId
      }
    })

    if (existingBonus) {
      console.log(`[Бонусы] Бонусы за заказ ${order.orderNumber} уже начислены`)
      return false
    }

    // Проверяем, существует ли система бонусов в БД
    try {
      const bonusFieldCheck = await prisma.$queryRawUnsafe<Array<{column_name: string}>>(
        `SELECT column_name 
         FROM information_schema.columns 
         WHERE table_name = 'users' AND column_name = 'bonusBalance'`
      )
      
      const tableCheck = await prisma.$queryRawUnsafe<Array<{table_name: string}>>(
        `SELECT table_name 
         FROM information_schema.tables 
         WHERE table_name = 'bonus_transactions'`
      )
      
      if (bonusFieldCheck.length === 0 || tableCheck.length === 0) {
        console.log('[Бонусы] Система бонусов еще не применена к базе данных')
        return false
      }
    } catch (error: any) {
      if (error.message?.includes('bonus') || error.message?.includes('does not exist')) {
        console.log('[Бонусы] Система бонусов еще не применена к базе данных')
        return false
      }
      throw error
    }

    // Начисляем 1% от итоговой суммы заказа
    const bonusAmount = new Decimal(Number(order.total) * 0.01)

    // Обновляем баланс бонусов пользователя
    await prisma.user.update({
      where: { id: order.userId },
      data: {
        bonusBalance: {
          increment: bonusAmount
        }
      }
    })

    // Создаем запись о начислении бонусов
    await prisma.bonusTransaction.create({
      data: {
        userId: order.userId,
        orderId: order.id,
        amount: bonusAmount,
        description: `Начисление бонусов за доставленный заказ №${order.orderNumber} (1% от суммы ${Number(order.total)} ₽)`
      }
    })

    console.log(`[Бонусы] ✅ Начислено ${Number(bonusAmount)} бонусов пользователю за заказ ${order.orderNumber}`)
    return true
  } catch (error: any) {
    // Логируем ошибку, но не прерываем выполнение
    console.error(`[Бонусы] ❌ Ошибка начисления бонусов за заказ ${orderId}:`, error.message)
    return false
  }
}

