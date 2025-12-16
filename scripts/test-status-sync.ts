/**
 * Тестовый скрипт для проверки синхронизации статусов заказов с iikoCloud
 * Использование: tsx scripts/test-status-sync.ts
 */

import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { aikoClient } from '../server/utils/aiko-client'

const prisma = new PrismaClient()

async function testStatusSync() {
  try {
    console.log('🧪 Тестирование синхронизации статусов заказов с iikoCloud...\n')

    // 1. Находим заказы с синхронизацией iikoCloud
    console.log('1️⃣ Поиск заказов с синхронизацией iikoCloud...')
    const orders = await prisma.order.findMany({
      where: {
        aikoOrderId: { not: null },
        status: {
          notIn: ['DELIVERED', 'CANCELLED']
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    })

    if (orders.length === 0) {
      console.log('⚠️  Активных заказов с синхронизацией iikoCloud не найдено')
      console.log('   Создайте заказ через npm run iiko:test-order\n')
      return
    }

    console.log(`✅ Найдено заказов: ${orders.length}\n`)

    // 2. Синхронизируем статусы для каждого заказа
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i]
      console.log(`${i + 2}️⃣ Синхронизация заказа ${order.orderNumber}...`)
      console.log(`   - ID в БД: ${order.id}`)
      console.log(`   - ID в iikoCloud: ${order.aikoOrderId}`)
      console.log(`   - Текущий статус: ${order.status}`)

      try {
        // Получаем статус из iikoCloud
        const statusData = await aikoClient.getOrderStatus(order.aikoOrderId!)
        console.log(`   - Статус из iikoCloud: ${statusData.status}`)
        console.log(`   - Сообщение: ${statusData.message || 'Нет сообщения'}`)

        // Маппинг статусов
        const statusMap: Record<string, string> = {
          'New': 'PENDING',
          'Bill': 'CONFIRMED',
          'CookingStarted': 'PREPARING',
          'CookingCompleted': 'READY',
          'OnWay': 'DELIVERING',
          'Closed': 'DELIVERED',
          'Deleted': 'CANCELLED'
        }

        const mappedStatus = statusMap[statusData.status] || statusData.status.toUpperCase()

        // Обновляем статус в БД, если он изменился
        if (order.status !== mappedStatus) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: mappedStatus as any }
          })
          console.log(`   ✅ Статус обновлен: ${order.status} → ${mappedStatus}`)
        } else {
          console.log(`   ℹ️  Статус не изменился: ${order.status}`)
        }
      } catch (error: any) {
        console.error(`   ❌ Ошибка синхронизации: ${error.message}`)
      }

      console.log('')
    }

    // 3. Проверяем финальные статусы в БД
    console.log(`${orders.length + 2}️⃣ Проверка финальных статусов в БД...`)
    const finalOrders = await prisma.order.findMany({
      where: {
        id: { in: orders.map(o => o.id) }
      },
      select: {
        orderNumber: true,
        status: true,
        aikoOrderId: true
      }
    })

    console.log('✅ Финальные статусы:')
    finalOrders.forEach(order => {
      console.log(`   - ${order.orderNumber}: ${order.status} (iiko: ${order.aikoOrderId?.substring(0, 8)}...)`)
    })

    console.log('\n✅ Тестирование синхронизации статусов завершено успешно!')

  } catch (error: any) {
    console.error('\n❌ Ошибка тестирования:', error.message)
    console.error('   Детали:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Запускаем тест
testStatusSync()

