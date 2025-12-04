import { Pool } from 'pg'

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
      
      // Выполняем SQL напрямую
      await pool.query(`
        CREATE TABLE "sms_codes" (
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
        CREATE INDEX "sms_codes_phone_code_idx" ON "sms_codes"("phone", "code");
      `)
      
      await pool.query(`
        CREATE INDEX "sms_codes_expiresAt_idx" ON "sms_codes"("expiresAt");
      `)
      
      console.log('✅ SMS codes table created')
    } else {
      console.log('ℹ️  SMS codes table already exists')
    }
  } catch (error: any) {
    // Если таблица уже существует - это нормально
    if (error.message?.includes('already exists') || error.code === '42P07' || error.code === '23505') {
      console.log('ℹ️  Table already exists')
    } else {
      console.error('❌ Error creating sms_codes table:', error.message)
      throw error
    }
  } finally {
    await pool.end()
  }
}

