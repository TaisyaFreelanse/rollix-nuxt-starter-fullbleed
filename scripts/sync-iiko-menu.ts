/**
 * Скрипт для синхронизации меню из iikoCloud
 * Использование: tsx scripts/sync-iiko-menu.ts
 */

import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { aikoClient } from '../server/utils/aiko-client'

const prisma = new PrismaClient()

async function syncMenu() {
  try {
    console.log('🔄 Начало синхронизации меню из iikoCloud...')

    // Получаем меню из iikoCloud
    const iikoMenu = await aikoClient.getMenu()
    
    console.log(`📦 Получено категорий: ${iikoMenu.categories.length}`)
    console.log(`📦 Получено товаров: ${iikoMenu.products.length}`)
    
    if (iikoMenu.categories.length === 0 && iikoMenu.products.length === 0) {
      console.log('⚠️  Внимание: меню пустое. Проверьте настройки iikoCloud API.')
      console.log('   Убедитесь, что:')
      console.log('   1. IIKO_API_KEY правильный')
      console.log('   2. IIKO_ORGANIZATION_ID правильный')
      console.log('   3. В iikoCloud есть товары и категории')
    }

    let syncedCategories = 0
    let syncedProducts = 0
    let updatedPrices = 0
    const errors: string[] = []

    // Синхронизация категорий
    for (const category of iikoMenu.categories) {
      try {
        await prisma.category.upsert({
          where: { slug: category.slug },
          create: {
            id: category.id,
            name: category.name,
            slug: category.slug,
            isActive: true
          },
          update: {
            name: category.name,
            isActive: true
          }
        })
        syncedCategories++
      } catch (error: any) {
        errors.push(`Ошибка синхронизации категории ${category.name}: ${error.message}`)
        console.error(`[iikoCloud] Ошибка категории ${category.name}:`, error)
      }
    }

    // Синхронизация товаров
    for (const product of iikoMenu.products) {
      try {
        // Находим категорию по ID или создаём дефолтную
        let categoryId = product.categoryId
        if (categoryId) {
          const category = await prisma.category.findUnique({
            where: { id: categoryId }
          })
          if (!category) {
            // Если категория не найдена, используем первую доступную
            const firstCategory = await prisma.category.findFirst({
              where: { isActive: true }
            })
            if (firstCategory) {
              categoryId = firstCategory.id
            }
          }
        }

        if (!categoryId) {
          errors.push(`Пропущен товар ${product.name}: нет категории`)
          continue
        }

        // Генерируем slug из имени товара
        const slug = (product.name || product.id)
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-а-яё]/g, '')
          .substring(0, 100) // Ограничиваем длину slug

        // Ищем существующий товар по slug или по внешнему ID (если бы было поле externalId)
        const existing = await prisma.product.findUnique({
          where: { slug }
        })

        const productData = {
          name: product.name,
          description: product.description || null,
          price: product.price || 0,
          categoryId,
          image: product.image || null,
          isActive: true
        }

        if (existing) {
          // Обновляем существующий товар, если изменилась цена
          if (Number(existing.price) !== Number(product.price)) {
            await prisma.product.update({
              where: { id: existing.id },
              data: {
                ...productData,
                price: product.price || existing.price
              }
            })
            updatedPrices++
          } else {
            // Обновляем другие поля без изменения цены
            await prisma.product.update({
              where: { id: existing.id },
              data: productData
            })
          }
        } else {
          // Создаём новый товар
          await prisma.product.create({
            data: {
              id: product.id,
              slug,
              ...productData
            }
          })
          syncedProducts++
        }
      } catch (error: any) {
        errors.push(`Ошибка синхронизации товара ${product.name}: ${error.message}`)
        console.error(`[iikoCloud] Ошибка товара ${product.name}:`, error)
      }
    }

    console.log('✅ Синхронизация завершена!')
    console.log(`📊 Статистика:`)
    console.log(`   - Категорий синхронизировано: ${syncedCategories}`)
    console.log(`   - Товаров синхронизировано: ${syncedProducts}`)
    console.log(`   - Цен обновлено: ${updatedPrices}`)
    console.log(`   - Ошибок: ${errors.length}`)
    console.log(`   - Время: ${new Date().toISOString()}`)

    if (errors.length > 0) {
      console.log('\n⚠️  Ошибки при синхронизации:')
      errors.forEach((error: string, index: number) => {
        console.log(`   ${index + 1}. ${error}`)
      })
    }
  } catch (error: any) {
    console.error('❌ Ошибка при синхронизации:', error.message)
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

syncMenu()

