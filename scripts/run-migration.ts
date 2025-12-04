import 'dotenv/config'
import { Pool } from 'pg'
import { readFileSync } from 'fs'
import { join } from 'path'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is not set')
  process.exit(1)
}

async function runMigration() {
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes('render.com') ? { rejectUnauthorized: false } : false
  })

  try {
    console.log('🔄 Running SMS codes migration...')
    
    const sql = readFileSync(
      join(process.cwd(), 'prisma/migrations/add_sms_codes.sql'),
      'utf-8'
    )
    
    await pool.query(sql)
    console.log('✅ Migration completed successfully!')
  } catch (error: any) {
    // Если таблица уже существует - это нормально
    if (error.message?.includes('already exists') || error.code === '42P07') {
      console.log('ℹ️  Table already exists, skipping...')
    } else {
      console.error('❌ Migration error:', error.message)
      process.exit(1)
    }
  } finally {
    await pool.end()
  }
}

runMigration()

