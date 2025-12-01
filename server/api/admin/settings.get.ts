/**
 * Получение настроек админ-панели
 * TODO: Добавить проверку авторизации и прав администратора
 */
export default defineEventHandler(async (event) => {
  try {
    // Заглушка - в реальной реализации настройки должны храниться в БД
    // Можно создать модель Settings в Prisma
    
    return {
      isMaintenanceMode: false,
      maintenanceMessage: 'Сайт временно недоступен. Ведутся технические работы.',
      estimatedReadyTime: 30,
      maxConcurrentOrders: 10
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при получении настроек'
    })
  }
})

