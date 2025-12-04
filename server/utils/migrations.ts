import { Pool } from 'pg'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function createSmsCodesTable(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set')
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes('render.com') ? { rejectUnauthorized: false } : false
  })

  try {
    // Проверяем существование таблицы
    const checkResult = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'sms_codes'
      );
    `)

    if (!checkResult.rows[0]?.exists) {
      console.log('🔄 Creating sms_codes table...')
      const sql = readFileSync(
        join(process.cwd(), 'prisma/migrations/add_sms_codes.sql'),
        'utf-8'
      )
      await pool.query(sql)
      console.log('✅ SMS codes table created')
    }
  } catch (error: any) {
    // Если таблица уже существует - это нормально
    if (error.message?.includes('already exists') || error.code === '42P07') {
      console.log('ℹ️  Table already exists')
    } else {
      console.error('Error creating sms_codes table:', error.message)
      throw error
    }
  } finally {
    await pool.end()
  }
}

