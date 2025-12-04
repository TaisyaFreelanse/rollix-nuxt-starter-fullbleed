export default defineNitroPlugin(async () => {
  // Проверяем и создаем таблицу sms_codes при запуске
  try {
    const { prisma } = await import('~/server/utils/prisma')
    
    // Проверяем, существует ли таблица
    await prisma.$queryRaw`SELECT 1 FROM sms_codes LIMIT 1`.catch(async () => {
      // Таблица не существует, создаем через прямой SQL
      const { Pool } = await import('pg')
      const { readFileSync } = await import('fs')
      const { join } = await import('path')
      
      const databaseUrl = process.env.DATABASE_URL
      if (!databaseUrl) return
      
      const pool = new Pool({
        connectionString: databaseUrl,
        ssl: databaseUrl.includes('render.com') ? { rejectUnauthorized: false } : false
      })
      
      try {
        const sql = readFileSync(
          join(process.cwd(), 'prisma/migrations/add_sms_codes.sql'),
          'utf-8'
        )
        await pool.query(sql)
        console.log('✅ SMS codes table created on startup')
      } catch (error: any) {
        if (!error.message?.includes('already exists') && error.code !== '42P07') {
          console.error('Error creating sms_codes table:', error.message)
        }
      } finally {
        await pool.end()
      }
    })
  } catch (error) {
    // Игнорируем ошибки при инициализации
  }
})

