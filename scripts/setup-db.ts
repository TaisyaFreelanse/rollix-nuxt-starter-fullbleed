import 'dotenv/config'

// Простой скрипт для выполнения миграций и seed
async function setup() {
  const { execSync } = require('child_process')
  
  try {
    console.log('🔄 Pushing database schema...')
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' })
    
    console.log('🌱 Seeding database...')
    execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' })
    
    console.log('✅ Database setup completed!')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

setup()

