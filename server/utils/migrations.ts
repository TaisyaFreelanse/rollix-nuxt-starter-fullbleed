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
        CREATE INDEX IF NOT EXISTS "sms_codes_phone_code_idx" ON "sms_codes"("phone", "code");
      `)
      
      await pool.query(`
        CREATE INDEX IF NOT EXISTS "sms_codes_expiresAt_idx" ON "sms_codes"("expiresAt");
      `)
      
      console.log('✅ SMS codes table created')
    } else {
      console.log('ℹ️  SMS codes table already exists, checking structure...')
      
      // Проверяем и добавляем недостающие колонки
      const columnsResult = await pool.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'sms_codes';
      `)
      
      const existingColumns = columnsResult.rows.map((row: any) => row.column_name)
      
      // Добавляем недостающие колонки
      if (!existingColumns.includes('verified')) {
        console.log('🔄 Adding missing column: verified')
        try {
          await pool.query(`
            ALTER TABLE "sms_codes" 
            ADD COLUMN "verified" BOOLEAN NOT NULL DEFAULT false;
          `)
        } catch (colError: any) {
          if (!colError.message?.includes('already exists') && colError.code !== '42701') {
            throw colError
          }
        }
      }
      
      if (!existingColumns.includes('createdAt')) {
        console.log('🔄 Adding missing column: createdAt')
        try {
          await pool.query(`
            ALTER TABLE "sms_codes" 
            ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
          `)
        } catch (colError: any) {
          if (!colError.message?.includes('already exists') && colError.code !== '42701') {
            throw colError
          }
        }
      }
      
      // Проверяем тип поля id - должно быть TEXT, не INTEGER
      const idColumnInfo = await pool.query(`
        SELECT data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'sms_codes' 
        AND column_name = 'id';
      `)
      
      if (idColumnInfo.rows.length > 0 && idColumnInfo.rows[0].data_type !== 'text') {
        const currentType = idColumnInfo.rows[0].data_type
        console.warn(`⚠️  Table id column has wrong type: ${currentType} (should be TEXT)`)
        
        if (currentType === 'integer') {
          console.log('🔄 Recreating table with correct id type (TEXT)...')
          // Пересоздаем таблицу с правильным типом (удалит данные!)
          await pool.query(`DROP TABLE IF EXISTS "sms_codes" CASCADE;`)
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
          await pool.query(`CREATE INDEX "sms_codes_phone_code_idx" ON "sms_codes"("phone", "code");`)
          await pool.query(`CREATE INDEX "sms_codes_expiresAt_idx" ON "sms_codes"("expiresAt");`)
          console.log('✅ Table recreated with TEXT id type')
        }
      }
      
      // Также проверяем другие обязательные колонки
      const requiredColumns = ['id', 'phone', 'code', 'expiresAt']
      for (const col of requiredColumns) {
        if (!existingColumns.includes(col)) {
          console.warn(`⚠️  Missing required column: ${col}`)
        }
      }
      
      // Создаем индексы если их нет
      await pool.query(`
        CREATE INDEX IF NOT EXISTS "sms_codes_phone_code_idx" ON "sms_codes"("phone", "code");
      `)
      
      await pool.query(`
        CREATE INDEX IF NOT EXISTS "sms_codes_expiresAt_idx" ON "sms_codes"("expiresAt");
      `)
      
      console.log('✅ SMS codes table structure verified')
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

export async function createBannersTable(): Promise<void> {
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
        AND table_name = 'banners'
      );
    `)

    if (!checkResult.rows[0]?.exists) {
      console.log('🔄 Creating banners table...')
      
      await pool.query(`
        CREATE TABLE "banners" (
          "id" TEXT NOT NULL,
          "title" TEXT NOT NULL,
          "image" TEXT NOT NULL,
          "link" TEXT,
          "isActive" BOOLEAN NOT NULL DEFAULT true,
          "sortOrder" INTEGER NOT NULL DEFAULT 0,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
        );
      `)
      
      console.log('✅ Banners table created')
    } else {
      console.log('ℹ️  Banners table already exists')
    }
  } catch (error: any) {
    if (error.message?.includes('already exists') || error.code === '42P07') {
      console.log('ℹ️  Banners table already exists')
    } else {
      console.error('❌ Error creating banners table:', error.message)
      throw error
    }
  } finally {
    await pool.end()
  }
}

