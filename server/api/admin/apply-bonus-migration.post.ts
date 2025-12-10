import { PrismaClient } from '@prisma/client'
import { requireAdminAuth } from '~/server/utils/admin-auth'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // Проверка авторизации админа
  await requireAdminAuth(event)
  
  try {
    // 1. Добавляем поле bonusBalance в таблицу users
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "bonusBalance" DECIMAL(10, 2) NOT NULL DEFAULT 0;
    `)
    
    // 2. Создаем таблицу bonus_transactions
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "bonus_transactions" (
          "id" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "orderId" TEXT,
          "amount" DECIMAL(10, 2) NOT NULL,
          "description" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "bonus_transactions_pkey" PRIMARY KEY ("id")
      );
    `)
    
    // 3. Создаем индексы
    await prisma.$executeRawUnsafe(`
      DO $$ 
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_indexes 
              WHERE tablename = 'bonus_transactions' 
              AND indexname = 'bonus_transactions_userId_idx'
          ) THEN
              CREATE INDEX "bonus_transactions_userId_idx" ON "bonus_transactions"("userId");
          END IF;
      END $$;
    `)
    
    await prisma.$executeRawUnsafe(`
      DO $$ 
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_indexes 
              WHERE tablename = 'bonus_transactions' 
              AND indexname = 'bonus_transactions_orderId_idx'
          ) THEN
              CREATE INDEX "bonus_transactions_orderId_idx" ON "bonus_transactions"("orderId");
          END IF;
      END $$;
    `)
    
    // 4. Добавляем внешние ключи
    await prisma.$executeRawUnsafe(`
      DO $$ 
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_constraint 
              WHERE conname = 'bonus_transactions_userId_fkey'
          ) THEN
              ALTER TABLE "bonus_transactions" 
              ADD CONSTRAINT "bonus_transactions_userId_fkey" 
              FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
          END IF;
      END $$;
    `)
    
    await prisma.$executeRawUnsafe(`
      DO $$ 
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_constraint 
              WHERE conname = 'bonus_transactions_orderId_fkey'
          ) THEN
              ALTER TABLE "bonus_transactions" 
              ADD CONSTRAINT "bonus_transactions_orderId_fkey" 
              FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
          END IF;
      END $$;
    `)
    
    // Проверяем результат
    const bonusFieldCheck = await prisma.$queryRawUnsafe<Array<{column_name: string}>>(
      `SELECT column_name 
       FROM information_schema.columns 
       WHERE table_name = 'users' AND column_name = 'bonusBalance'`
    )
    
    const tableCheck = await prisma.$queryRawUnsafe<Array<{table_name: string}>>(
      `SELECT table_name 
       FROM information_schema.tables 
       WHERE table_name = 'bonus_transactions'`
    )
    
    if (bonusFieldCheck.length > 0 && tableCheck.length > 0) {
      return {
        success: true,
        message: 'Миграция системы бонусов успешно применена',
        details: {
          bonusBalanceColumn: 'Добавлено',
          bonusTransactionsTable: 'Создана',
          indexes: 'Созданы',
          foreignKeys: 'Добавлены'
        }
      }
    } else {
      return {
        success: false,
        message: 'Миграция выполнена, но проверка не прошла',
        details: {
          bonusFieldCheck: bonusFieldCheck.length,
          tableCheck: tableCheck.length
        }
      }
    }
  } catch (error: any) {
    console.error('Ошибка применения миграции бонусов:', error)
    return {
      success: false,
      message: 'Ошибка применения миграции',
      error: error.message
    }
  } finally {
    await prisma.$disconnect()
  }
})

