import { prisma } from '~/server/utils/prisma'
import { aikoClient } from '~/server/utils/aiko-client'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Добавить проверку авторизации и прав администратора
    
    console.log('[iikoCloud] Начало синхронизации меню и цен...')

    // Получаем меню из iikoCloud
    const iikoMenu = await aikoClient.getMenu()

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

    console.log('[iikoCloud] Синхронизация завершена')

    return {
      success: true,
      message: 'Синхронизация выполнена',
      stats: {
        syncedCategories,
        syncedProducts,
        updatedPrices,
        errorsCount: errors.length,
        timestamp: new Date().toISOString()
      },
      errors: errors.length > 0 ? errors : undefined
    }
  } catch (error: any) {
    console.error('[iikoCloud] Ошибка синхронизации:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      message: 'Ошибка при синхронизации с iikoCloud',
      data: {
        error: error.message,
        note: 'Проверьте настройки IIKO_API_KEY, IIKO_ORGANIZATION_ID и IIKO_TERMINAL_GROUP_ID'
      }
    })
  }
})

