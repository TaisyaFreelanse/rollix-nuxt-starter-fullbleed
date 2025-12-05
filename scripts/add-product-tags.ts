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

async function addProductTags() {
  try {
    console.log('🔄 Adding isNew and isHot columns to products table...')
    
    // Проверяем, существуют ли уже колонки
    const checkColumns = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'products'
      AND column_name IN ('isNew', 'isHot');
    `)
    
    const existingColumns = checkColumns.rows.map((row: any) => row.column_name)
    
    if (!existingColumns.includes('isNew')) {
      await pool.query(`
        ALTER TABLE "products" ADD COLUMN "isNew" BOOLEAN NOT NULL DEFAULT false;
      `)
      console.log('✅ Added isNew column')
    } else {
      console.log('ℹ️  Column isNew already exists')
    }
    
    if (!existingColumns.includes('isHot')) {
      await pool.query(`
        ALTER TABLE "products" ADD COLUMN "isHot" BOOLEAN NOT NULL DEFAULT false;
      `)
      console.log('✅ Added isHot column')
    } else {
      console.log('ℹ️  Column isHot already exists')
    }
    
    console.log('✅ Product tags columns added successfully!')
  } catch (error: any) {
    if (error.code === '42701') {
      // Column already exists
      console.log('ℹ️  Columns already exist')
    } else {
      console.error('❌ Error:', error.message)
      process.exit(1)
    }
  } finally {
    await pool.end()
  }
}

addProductTags()

