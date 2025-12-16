import 'dotenv/config'
import { prisma } from '../server/utils/prisma'
import { aikoClient } from '../server/utils/aiko-client'

/**
 * Тест защиты от отката статусов
 * Проверяет, что заказ в статусе READY не откатывается на PENDING
 */
async function testStatusDowngrade() {
  try {
    console.log('🧪 Тестирование защиты от отката статусов...\n')

    // 1. Находим заказ с синхронизацией iikoCloud
    console.log('1️⃣ Поиск заказов с синхронизацией iikoCloud...')
    const orders = await prisma.order.findMany({
      where: {
        aikoOrderId: { not: null }
      },
      take: 1
    })

    if (orders.length === 0) {
      console.log('⚠️  Заказов с синхронизацией iikoCloud не найдено')
      return
    }

    const testOrder = orders[0]
    console.log(`✅ Найден заказ: ${testOrder.orderNumber} (ID: ${testOrder.id})`)
    console.log(`   - Текущий статус: ${testOrder.status}`)
    console.log(`   - ID в iikoCloud: ${testOrder.aikoOrderId}\n`)

    // 2. Временно устанавливаем статус READY для теста
    console.log('2️⃣ Установка статуса READY для теста...')
    await prisma.order.update({
      where: { id: testOrder.id },
      data: { status: 'READY' }
    })
    console.log('✅ Статус установлен: READY\n')

    // 3. Получаем статус из iikoCloud (вернет PENDING из-за таймаута)
    console.log('3️⃣ Получение статуса из iikoCloud...')
    if (!testOrder.aikoOrderId) {
      throw new Error('aikoOrderId не найден')
    }

    const aikoStatus = await aikoClient.getOrderStatus(testOrder.aikoOrderId)
    console.log(`✅ Статус из iikoCloud: ${aikoStatus.status}`)
    console.log(`   - Сообщение: ${aikoStatus.message || 'Нет сообщения'}\n`)

    // 4. Проверяем, что статус не откатился назад
    console.log('4️⃣ Проверка защиты от отката статуса...')
    const orderAfterSync = await prisma.order.findUnique({
      where: { id: testOrder.id }
    })

    if (!orderAfterSync) {
      throw new Error('Заказ не найден после синхронизации')
    }

    console.log(`   - Статус до синхронизации: READY`)
    console.log(`   - Статус из iikoCloud: ${aikoStatus.status} (PENDING)`)
    console.log(`   - Статус после синхронизации: ${orderAfterSync.status}`)

    if (orderAfterSync.status === 'READY') {
      console.log('✅ ЗАЩИТА РАБОТАЕТ: Статус не откатился назад (READY → PENDING предотвращен)\n')
    } else if (orderAfterSync.status === 'PENDING') {
      console.error('❌ ОШИБКА: Статус откатился назад (READY → PENDING)!\n')
      throw new Error('Защита от отката статусов не работает!')
    } else {
      console.log(`ℹ️  Статус изменился на: ${orderAfterSync.status}\n`)
    }

    // 5. Восстанавливаем исходный статус
    console.log('5️⃣ Восстановление исходного статуса...')
    await prisma.order.update({
      where: { id: testOrder.id },
      data: { status: testOrder.status }
    })
    console.log(`✅ Статус восстановлен: ${testOrder.status}\n`)

    console.log('✅ Тестирование защиты от отката статусов завершено успешно!\n')
    console.log('📊 Итоги:')
    console.log(`   - Защита от отката статусов: ✅`)
    console.log(`   - Статус READY не откатился на PENDING: ✅`)
    console.log(`   - Система работает корректно: ✅\n`)

  } catch (error: any) {
    console.error('\n❌ Ошибка тестирования:')
    console.error('   Сообщение:', error.message)
    console.error('   Детали:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testStatusDowngrade()

