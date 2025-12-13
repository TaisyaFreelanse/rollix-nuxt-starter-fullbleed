import { prisma } from '~/server/utils/prisma'

/**
 * Проверка статуса последней синхронизации меню
 */
export default defineEventHandler(async (event) => {
  try {
    // Получаем статистику из базы данных
    const categoriesCount = await prisma.category.count({
      where: { isActive: true }
    })
    
    const productsCount = await prisma.product.count({
      where: { isActive: true }
    })

    // Получаем последние обновленные товары (для определения времени последнего обновления)
    const lastUpdatedProduct = await prisma.product.findFirst({
      orderBy: { updatedAt: 'desc' },
      select: {
        updatedAt: true,
        name: true
      }
    })

    const lastUpdatedCategory = await prisma.category.findFirst({
      orderBy: { updatedAt: 'desc' },
      select: {
        updatedAt: true,
        name: true
      }
    })

    // Определяем время последнего обновления
    const lastSyncTime = lastUpdatedProduct?.updatedAt || lastUpdatedCategory?.updatedAt || null

    return {
      success: true,
      status: 'ok',
      stats: {
        categoriesCount,
        productsCount,
        lastSyncTime: lastSyncTime ? lastSyncTime.toISOString() : null,
        lastUpdatedProduct: lastUpdatedProduct?.name || null,
        lastUpdatedCategory: lastUpdatedCategory?.name || null
      },
      message: lastSyncTime 
        ? `Меню синхронизировано. Категорий: ${categoriesCount}, Товаров: ${productsCount}`
        : 'Меню еще не синхронизировано. Запустите синхронизацию через POST /api/aiko/sync'
    }
  } catch (error: any) {
    console.error('[iikoCloud] Ошибка получения статуса синхронизации:', error)
    
    return {
      success: false,
      status: 'error',
      error: error.message,
      message: 'Ошибка при получении статуса синхронизации'
    }
  }
})

