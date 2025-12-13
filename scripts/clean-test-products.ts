/**
 * Скрипт для удаления тестовых товаров и категорий из базы данных
 * Использование: tsx scripts/clean-test-products.ts
 */

import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function cleanTestData() {
  console.log('🧹 Начало очистки тестовых данных...')

  // Список тестовых паттернов для поиска
  const testPatterns = [
    'tes1',
    'test',
    'тест',
    'dummy',
    'example',
    'заглушка',
    'test product',
    'sample'
  ]

  try {
    // Находим и удаляем тестовые товары
    console.log('🔍 Поиск тестовых товаров...')
    const testProducts = await prisma.product.findMany({
      where: {
        OR: testPatterns.map(pattern => ({
          name: {
            contains: pattern,
            mode: 'insensitive'
          }
        }))
      }
    })

    if (testProducts.length > 0) {
      console.log(`📦 Найдено тестовых товаров: ${testProducts.length}`)
      testProducts.forEach(p => console.log(`  - ${p.name} (ID: ${p.id})`))

      // Удаляем связанные данные
      for (const product of testProducts) {
        try {
          // Удаляем модификаторы и их опции
          const modifiers = await prisma.productModifier.findMany({
            where: { productId: product.id },
            select: { id: true }
          })

          if (modifiers.length > 0) {
            await prisma.modifierOption.deleteMany({
              where: {
                modifierId: {
                  in: modifiers.map(m => m.id)
                }
              }
            })
            
            await prisma.productModifier.deleteMany({
              where: {
                productId: product.id
              }
            })
          }
          
          // Удаляем из избранного
          await prisma.productFavorite.deleteMany({
            where: {
              productId: product.id
            }
          })

          // Удаляем товар
          await prisma.product.delete({
            where: {
              id: product.id
            }
          })
          
          console.log(`  ✓ Удален: ${product.name}`)
        } catch (error: any) {
          console.error(`  ✗ Ошибка удаления товара ${product.name}:`, error.message)
        }
      }

      console.log(`✅ Удалено товаров: ${testProducts.length}`)
    } else {
      console.log('✅ Тестовые товары не найдены')
    }

    // Находим и удаляем пустые категории (без товаров)
    console.log('🔍 Поиск пустых категорий...')
    const allCategories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: {
              where: {
                isActive: true
              }
            }
          }
        }
      }
    })

    const emptyCategories = allCategories.filter(cat => cat._count.products === 0)
    
    if (emptyCategories.length > 0) {
      console.log(`📁 Найдено пустых категорий: ${emptyCategories.length}`)
      
      // Удаляем только те категории, которые явно тестовые или пустые
      const categoriesToDelete = emptyCategories.filter(cat => 
        testPatterns.some(pattern => 
          cat.name.toLowerCase().includes(pattern.toLowerCase()) ||
          cat.slug.toLowerCase().includes(pattern.toLowerCase())
        )
      )

      if (categoriesToDelete.length > 0) {
        categoriesToDelete.forEach(cat => console.log(`  - ${cat.name} (ID: ${cat.id})`))
        
        await prisma.category.deleteMany({
          where: {
            id: {
              in: categoriesToDelete.map(c => c.id)
            }
          }
        })

        console.log(`✅ Удалено категорий: ${categoriesToDelete.length}`)
      } else {
        console.log('✅ Тестовые категории не найдены')
      }
    } else {
      console.log('✅ Пустые категории не найдены')
    }

    console.log('✅ Очистка тестовых данных завершена!')
  } catch (error) {
    console.error('❌ Ошибка при очистке тестовых данных:', error)
    throw error
  }
}

cleanTestData()
  .catch((e) => {
    console.error('❌ Ошибка:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

