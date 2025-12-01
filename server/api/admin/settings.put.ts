/**
 * Обновление настроек админ-панели
 * TODO: Добавить проверку авторизации и прав администратора
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // Заглушка - в реальной реализации настройки должны сохраняться в БД
    // await prisma.settings.update({
    //   where: { id: 'main' },
    //   data: {
    //     isMaintenanceMode: body.isMaintenanceMode,
    //     maintenanceMessage: body.maintenanceMessage,
    //     estimatedReadyTime: body.estimatedReadyTime,
    //     maxConcurrentOrders: body.maxConcurrentOrders
    //   }
    // })

    return {
      success: true,
      message: 'Настройки сохранены (заглушка)'
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при сохранении настроек'
    })
  }
})

