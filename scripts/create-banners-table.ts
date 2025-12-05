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

async function createBannersTable() {
  try {
    console.log('🔄 Creating banners table...')

    // Проверяем, существует ли таблица
    const checkTable = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'banners'
      );
    `)

    if (checkTable.rows[0].exists) {
      console.log('ℹ️  Table banners already exists')
      return
    }

    // Создаем таблицу
    await pool.query(`
      CREATE TABLE "banners" (
        "id" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "image" TEXT NOT NULL,
        "link" TEXT,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "sortOrder" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
      );
    `)

    console.log('✅ Banners table created successfully!')
  } catch (error: any) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

createBannersTable()
