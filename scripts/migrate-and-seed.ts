import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is not set')
  process.exit(1)
}

let prisma: PrismaClient

if (databaseUrl.startsWith('prisma+')) {
  prisma = new PrismaClient({
    accelerateUrl: databaseUrl
  })
} else {
  const pool = new Pool({
    connectionString: databaseUrl
  })
  
  const adapter = new PrismaPg(pool)
  
  prisma = new PrismaClient({
    adapter: adapter
  })
}

async function migrateAndSeed() {
  try {
    console.log('🔄 Running database migrations...')
    
    // Используем db push для создания схемы
    const { execSync } = require('child_process')
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' })
    
    console.log('✅ Migrations completed')
    
    console.log('🌱 Seeding database...')
    
    // Проверяем, есть ли уже данные
    const categoryCount = await prisma.category.count()
    
    if (categoryCount === 0) {
      // Импортируем и выполняем seed
      const seedModule = await import('../prisma/seed')
      // seed.ts экспортирует функцию main, но она уже выполняется при импорте
      console.log('✅ Database seeded')
    } else {
      console.log('ℹ️  Database already has data, skipping seed')
    }
    
    await prisma.$disconnect()
    console.log('✅ Database setup completed')
  } catch (error) {
    console.error('❌ Error during migration/seed:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

migrateAndSeed()

