/**
 * Тестовый скрипт для проверки API endpoints синхронизации статусов
 * Использование: tsx scripts/test-api-endpoints.ts
 */

import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testApiEndpoints() {
  try {
    console.log('🧪 Тестирование API endpoints синхронизации статусов...\n')

    // 1. Находим последний заказ с aikoOrderId
    console.log('1️⃣ Поиск заказа с синхронизацией iikoCloud...')
    const order = await prisma.order.findFirst({
      where: {
        aikoOrderId: { not: null }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!order) {
      console.log('⚠️  Заказов с синхронизацией iikoCloud не найдено')
      console.log('   Создайте заказ через npm run iiko:test-order\n')
      return
    }

    console.log(`✅ Найден заказ: ${order.orderNumber}`)
    console.log(`   - ID в БД: ${order.id}`)
    console.log(`   - ID в iikoCloud: ${order.aikoOrderId}`)
    console.log(`   - Текущий статус: ${order.status}\n`)

    // 2. Проверяем API endpoint получения заказа
    console.log('2️⃣ Проверка GET /api/orders/[id]...')
    try {
      const baseUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      const response = await fetch(`${baseUrl}/api/orders/${order.id}`)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const orderData = await response.json()
      console.log('✅ Заказ получен через API:')
      console.log(`   - Статус: ${orderData.status}`)
      console.log(`   - hasIikoSync: ${orderData.hasIikoSync}`)
      console.log(`   - iikoOrderId: ${orderData.iikoOrderId || 'Нет'}\n`)

      if (orderData.hasIikoSync !== !!order.aikoOrderId) {
        console.error('❌ Ошибка: hasIikoSync не соответствует aikoOrderId')
      }
    } catch (error: any) {
      console.error('❌ Ошибка получения заказа через API:', error.message)
      console.log('   Примечание: Запустите dev сервер (npm run dev) для проверки API\n')
    }

    // 3. Проверяем API endpoint синхронизации статуса
    console.log('3️⃣ Проверка POST /api/orders/[id]/sync-status...')
    try {
      const baseUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      const response = await fetch(`${baseUrl}/api/orders/${order.id}/sync-status`, {
        method: 'POST'
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const syncData = await response.json()
      console.log('✅ Статус синхронизирован:')
      console.log(`   - Статус: ${syncData.status}`)
      console.log(`   - Сообщение: ${syncData.message || 'Нет сообщения'}\n`)

      // Проверяем обновление в БД
      const updatedOrder = await prisma.order.findUnique({
        where: { id: order.id }
      })
      console.log(`   - Статус в БД после синхронизации: ${updatedOrder?.status}\n`)
    } catch (error: any) {
      console.error('❌ Ошибка синхронизации статуса через API:', error.message)
      console.log('   Примечание: Запустите dev сервер (npm run dev) для проверки API\n')
    }

    // 4. Проверяем API endpoint массовой синхронизации
    console.log('4️⃣ Проверка POST /api/aiko/sync-orders-status...')
    try {
      const baseUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      const response = await fetch(`${baseUrl}/api/aiko/sync-orders-status`, {
        method: 'POST'
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const syncData = await response.json()
      console.log('✅ Массовая синхронизация выполнена:')
      console.log(`   - Синхронизировано заказов: ${syncData.synced || syncData.count || 'N/A'}`)
      console.log(`   - Обновлено статусов: ${syncData.updated || 'N/A'}\n`)
    } catch (error: any) {
      console.error('❌ Ошибка массовой синхронизации через API:', error.message)
      console.log('   Примечание: Запустите dev сервер (npm run dev) для проверки API\n')
    }

    // 5. Проверяем данные в БД
    console.log('5️⃣ Проверка данных в БД...')
    const finalOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (finalOrder) {
      console.log('✅ Данные заказа в БД:')
      console.log(`   - Номер: ${finalOrder.orderNumber}`)
      console.log(`   - Статус: ${finalOrder.status}`)
      console.log(`   - ID в iikoCloud: ${finalOrder.aikoOrderId || 'Нет'}`)
      console.log(`   - Товаров: ${finalOrder.items.length}`)
      console.log(`   - Сумма: ${Number(finalOrder.total)} ₽\n`)
    }

    console.log('✅ Тестирование API endpoints завершено успешно!')
    console.log('\n📝 Примечание:')
    console.log('   Для полной проверки API endpoints запустите dev сервер:')
    console.log('   npm run dev')
    console.log('   Затем запустите этот скрипт снова.\n')

  } catch (error: any) {
    console.error('\n❌ Ошибка тестирования:', error.message)
    console.error('   Детали:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Запускаем тест
testApiEndpoints()

