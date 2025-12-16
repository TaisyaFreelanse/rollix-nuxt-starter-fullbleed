/**
 * Тестовый скрипт для проверки запроса к iikoCloud API локально
 * Использование: tsx scripts/test-iiko-api.ts
 */

import 'dotenv/config'
import { getIikoClient } from '../server/utils/iiko-client'

async function testIikoApi() {
  try {
    console.log('🧪 Тестирование запроса к iikoCloud API...\n')

    const client = getIikoClient()

    console.log('📤 Выполняем запрос getMenu()...\n')
    
    const menu = await client.getMenu()

    console.log('\n✅ Запрос выполнен успешно!')
    console.log(`📊 Результат:`)
    console.log(`   - Категорий: ${menu.categories?.length || 0}`)
    console.log(`   - Товаров: ${menu.items?.length || 0}`)
    console.log(`   - Групп: ${menu.groups?.length || 0}`)
    
    if (menu.categories && menu.categories.length > 0) {
      console.log(`\n📁 Пример категории:`, menu.categories[0])
    }
    
    if (menu.items && menu.items.length > 0) {
      console.log(`\n🍕 Пример товара:`, {
        id: menu.items[0].id,
        name: menu.items[0].name,
        price: menu.items[0].price
      })
    }

    process.exit(0)
  } catch (error: any) {
    console.error('\n❌ Ошибка при выполнении запроса:')
    console.error('   Сообщение:', error.message)
    console.error('   Stack:', error.stack)
    process.exit(1)
  }
}

testIikoApi()

