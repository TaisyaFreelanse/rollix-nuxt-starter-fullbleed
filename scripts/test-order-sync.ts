/**
 * Тестовый скрипт для проверки создания заказов и синхронизации статусов с iikoCloud
 * Использование: tsx scripts/test-order-sync.ts
 */

import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { getIikoClient } from '../server/utils/iiko-client'
import { aikoClient } from '../server/utils/aiko-client'

const prisma = new PrismaClient()

async function testOrderSync() {
  try {
    console.log('🧪 Тестирование создания заказа и синхронизации статусов с iikoCloud...\n')

    // 1. Проверяем подключение к БД
    console.log('1️⃣ Проверка подключения к БД...')
    await prisma.$connect()
    console.log('✅ Подключение к БД успешно\n')

    // 2. Получаем меню и проверяем наличие товаров
    console.log('2️⃣ Получение меню из iikoCloud...')
    const menu = await aikoClient.getMenu()
    console.log(`✅ Меню получено: ${menu.categories.length} категорий, ${menu.products.length} товаров\n`)

    if (menu.products.length === 0) {
      console.error('❌ Нет товаров в меню! Сначала синхронизируйте меню.')
      return
    }

    // 3. Выбираем первый товар для тестового заказа
    const testProduct = menu.products[0]
    console.log(`📦 Выбран товар для теста: ${testProduct.name} (ID: ${testProduct.id})\n`)

    // 4. Создаем тестовый заказ в БД
    console.log('3️⃣ Создание тестового заказа в БД...')
    const testOrder = await prisma.order.create({
      data: {
        orderNumber: `TEST-${Date.now()}`,
        phone: '+79001234567',
        name: 'Тестовый клиент',
        deliveryType: 'DELIVERY',
        subtotal: testProduct.price,
        deliveryPrice: 200,
        discount: 0,
        total: testProduct.price + 200,
        paymentMethod: 'CASH',
        paymentStatus: 'PENDING',
        status: 'PENDING',
        items: {
          create: {
            productId: testProduct.id,
            quantity: 1,
            price: testProduct.price,
            subtotal: testProduct.price
          }
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })
    console.log(`✅ Заказ создан в БД: ${testOrder.orderNumber} (ID: ${testOrder.id})\n`)

    // 5. Отправляем заказ в iikoCloud
    console.log('4️⃣ Отправка заказа в iikoCloud...')
    try {
      const aikoResponse = await aikoClient.createOrder({
        orderNumber: testOrder.orderNumber,
        phone: testOrder.phone,
        name: testOrder.name,
        address: 'ул. Тестовая, д. 1, кв. 1',
        deliveryType: testOrder.deliveryType,
        deliveryTime: new Date(),
        comment: 'Тестовый заказ',
        items: testOrder.items.map((item) => ({
          productId: item.productId,
          productName: item.product.name,
          quantity: item.quantity,
          price: Number(item.price),
          modifiers: []
        })),
        total: Number(testOrder.total),
        subtotal: Number(testOrder.subtotal),
        deliveryPrice: Number(testOrder.deliveryPrice)
      })

      console.log(`✅ Заказ отправлен в iikoCloud, ID: ${aikoResponse.aikoOrderId}\n`)

      // 6. Обновляем заказ с ID из iikoCloud
      await prisma.order.update({
        where: { id: testOrder.id },
        data: { aikoOrderId: aikoResponse.aikoOrderId }
      })
      console.log('✅ Заказ обновлен с ID из iikoCloud\n')

      // 7. Получаем статус заказа из iikoCloud
      console.log('5️⃣ Получение статуса заказа из iikoCloud...')
      await new Promise(resolve => setTimeout(resolve, 2000)) // Ждем 2 секунды

      const status = await aikoClient.getOrderStatus(aikoResponse.aikoOrderId)
      console.log(`✅ Статус заказа из iikoCloud: ${status.status}`)
      console.log(`   Сообщение: ${status.message || 'Нет сообщения'}\n`)

      // 8. Синхронизируем статус в БД
      console.log('6️⃣ Синхронизация статуса в БД...')
      const statusMap: Record<string, string> = {
        'New': 'PENDING',
        'Bill': 'CONFIRMED',
        'CookingStarted': 'PREPARING',
        'CookingCompleted': 'READY',
        'OnWay': 'DELIVERING',
        'Closed': 'DELIVERED',
        'Deleted': 'CANCELLED'
      }

      const mappedStatus = statusMap[status.status] || status.status.toUpperCase()
      
      const updatedOrder = await prisma.order.update({
        where: { id: testOrder.id },
        data: { status: mappedStatus as any }
      })

      console.log(`✅ Статус синхронизирован: ${testOrder.status} → ${updatedOrder.status}\n`)

      // 9. Проверяем заказ в БД
      console.log('7️⃣ Проверка заказа в БД...')
      const finalOrder = await prisma.order.findUnique({
        where: { id: testOrder.id },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      })

      if (finalOrder) {
        console.log('✅ Заказ найден в БД:')
        console.log(`   - Номер заказа: ${finalOrder.orderNumber}`)
        console.log(`   - Статус: ${finalOrder.status}`)
        console.log(`   - ID в iikoCloud: ${finalOrder.aikoOrderId || 'Нет'}`)
        console.log(`   - Товаров: ${finalOrder.items.length}`)
        console.log(`   - Сумма: ${Number(finalOrder.total)} ₽\n`)
      }

      // 10. Итоги
      console.log('✅ Тестирование завершено успешно!')
      console.log('\n📊 Итоги:')
      console.log(`   - Заказ создан в БД: ✅`)
      console.log(`   - Заказ отправлен в iikoCloud: ✅`)
      console.log(`   - Статус получен из iikoCloud: ✅`)
      console.log(`   - Статус синхронизирован в БД: ✅`)
      console.log(`\n🔗 ID заказа в БД: ${testOrder.id}`)
      console.log(`🔗 ID заказа в iikoCloud: ${aikoResponse.aikoOrderId}`)

    } catch (error: any) {
      console.error('❌ Ошибка при отправке заказа в iikoCloud:', error.message)
      console.error('   Детали:', error)
      
      // Удаляем тестовый заказ при ошибке
      await prisma.order.delete({
        where: { id: testOrder.id }
      }).catch(() => {})
      
      throw error
    }

  } catch (error: any) {
    console.error('\n❌ Ошибка тестирования:', error.message)
    console.error('   Детали:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Запускаем тест
testOrderSync()

