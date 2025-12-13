import { prisma } from '~/server/utils/prisma'

/**
 * Проверка состояния интеграции с iikoCloud
 * Включает статус подключения и статистику синхронизации меню
 */
export default defineEventHandler(async (event) => {
  try {
    const apiKey = process.env.IIKO_API_KEY
    const organizationId = process.env.IIKO_ORGANIZATION_ID
    const terminalGroupId = process.env.IIKO_TERMINAL_GROUP_ID
    const baseUrl = process.env.IIKO_API_URL

    const isConfigured = !!(apiKey && organizationId && terminalGroupId)

    if (!isConfigured) {
      return {
        configured: false,
        connected: false,
        note: 'iikoCloud API не настроен. Установите IIKO_API_KEY, IIKO_ORGANIZATION_ID и IIKO_TERMINAL_GROUP_ID'
      }
    }

    // Проверяем реальное подключение
    let apiConnected = false
    let apiError = null
    
    try {
      const { getIikoClient } = await import('~/server/utils/iiko-client')
      const client = getIikoClient()
      const health = await client.healthCheck()
      apiConnected = health.connected
    } catch (error: any) {
      apiError = error.message
      apiConnected = false
    }

    // Получаем статистику синхронизации меню
    let menuStats = null
    try {
      const categoriesCount = await prisma.category.count({
        where: { isActive: true }
      })
      
      const productsCount = await prisma.product.count({
        where: { isActive: true }
      })

      const lastUpdatedProduct = await prisma.product.findFirst({
        orderBy: { updatedAt: 'desc' },
        select: { updatedAt: true }
      })

      const lastSyncTime = lastUpdatedProduct?.updatedAt || null

      menuStats = {
        categoriesCount,
        productsCount,
        lastSyncTime: lastSyncTime ? lastSyncTime.toISOString() : null,
        isSynced: categoriesCount > 0 || productsCount > 0
      }
    } catch (error: any) {
      console.error('[iikoCloud] Ошибка получения статистики меню:', error)
      menuStats = {
        error: 'Не удалось получить статистику меню'
      }
    }

    return {
      configured: true,
      connected: apiConnected,
      organizationId,
      terminalGroupId,
      baseUrl: baseUrl || 'https://api-ru.iiko.services',
      apiError: apiError || undefined,
      menu: menuStats,
      note: apiConnected
        ? (menuStats?.isSynced 
          ? 'iikoCloud API настроен и доступен. Меню синхронизировано.'
          : 'iikoCloud API настроен и доступен. Меню не синхронизировано - запустите POST /api/aiko/sync')
        : 'iikoCloud API настроен, но не удалось подключиться'
    }
  } catch (error: any) {
    return {
      configured: false,
      connected: false,
      error: error.message,
      note: 'Ошибка проверки состояния iikoCloud API'
    }
  }
})

