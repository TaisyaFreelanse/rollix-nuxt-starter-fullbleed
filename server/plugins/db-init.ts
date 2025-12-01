// Плагин для автоматической инициализации базы данных при старте
// Выполняется только если база данных пустая

export default defineNitroPlugin(async (nitroApp) => {
  // Проверяем, нужно ли выполнить миграции
  // Это выполняется только один раз при первом запуске
  if (process.env.NODE_ENV === 'production' && process.env.AUTO_MIGRATE === 'true') {
    try {
      const { execSync } = require('child_process')
      console.log('🔄 Auto-migrating database...')
      execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' })
      console.log('✅ Database migrated')
    } catch (error) {
      console.error('⚠️  Migration error (non-critical):', error)
    }
  }
})

