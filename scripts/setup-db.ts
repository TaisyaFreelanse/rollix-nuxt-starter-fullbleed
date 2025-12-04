import 'dotenv/config'
import { execSync } from 'child_process'

// Простой скрипт для выполнения миграций и seed
async function setup() {
  try {
    console.log('🔄 Pushing database schema...')
    execSync('npx prisma db push --accept-data-loss', { 
      stdio: 'inherit',
      env: process.env
    })
    
    console.log('🌱 Seeding database...')
    try {
      execSync('npx tsx prisma/seed.ts', { 
        stdio: 'inherit',
        env: process.env
      })
    } catch (seedError) {
      console.warn('⚠️  Seed failed or skipped:', seedError)
    }
    
    console.log('✅ Database setup completed!')
  } catch (error: any) {
    console.error('❌ Error:', error.message || error)
    process.exit(1)
  }
}

setup()

