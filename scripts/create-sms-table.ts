import 'dotenv/config'
import { Pool } from 'pg'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is not set')
  process.exit(1)
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: databaseUrl.includes('render.com') ? { rejectUnauthorized: false } : false
})

async function createTable() {
  try {
    console.log('🔄 Creating sms_codes table...')
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "sms_codes" (
        "id" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "code" TEXT NOT NULL,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "verified" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "sms_codes_pkey" PRIMARY KEY ("id")
      );
    `)
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS "sms_codes_phone_code_idx" ON "sms_codes"("phone", "code");
    `)
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS "sms_codes_expiresAt_idx" ON "sms_codes"("expiresAt");
    `)
    
    console.log('✅ SMS codes table created successfully!')
  } catch (error: any) {
    if (error.message?.includes('already exists') || error.code === '42P07') {
      console.log('ℹ️  Table already exists')
    } else {
      console.error('❌ Error:', error.message)
      process.exit(1)
    }
  } finally {
    await pool.end()
  }
}

createTable()

