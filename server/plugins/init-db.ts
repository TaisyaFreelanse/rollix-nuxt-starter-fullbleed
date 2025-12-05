export default defineNitroPlugin(async (nitroApp) => {
  // Проверяем и создаем необходимые таблицы при запуске сервера
  nitroApp.hooks.hook('ready', async () => {
    try {
      const { createSmsCodesTable, createBannersTable } = await import('~/server/utils/migrations')
      await createSmsCodesTable()
      await createBannersTable()
    } catch (error: any) {
      console.error('❌ Error initializing database tables:', error.message)
      // Не прерываем запуск приложения
    }
  })
})

