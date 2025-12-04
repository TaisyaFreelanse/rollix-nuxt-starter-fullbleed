export default defineNitroPlugin(async (nitroApp) => {
  // Проверяем и создаем таблицу sms_codes при запуске сервера
  nitroApp.hooks.hook('ready', async () => {
    try {
      const { createSmsCodesTable } = await import('~/server/utils/migrations')
      await createSmsCodesTable()
    } catch (error: any) {
      console.error('❌ Error initializing SMS codes table:', error.message)
      // Не прерываем запуск приложения
    }
  })
})

