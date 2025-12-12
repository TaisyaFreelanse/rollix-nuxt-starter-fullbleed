/**
 * Скрипт для применения миграции системы бонусов
 * Выполните: npx tsx scripts/apply-bonus-migration.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function applyBonusMigration() {
  try {
    console.log('🚀 Начинаем применение миграции системы бонусов...\n')

    // 1. Добавляем поле bonusBalance
    console.log('⚙️  Добавление поля bonusBalance в таблицу users...')
    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "bonusBalance" DECIMAL(10, 2) NOT NULL DEFAULT 0;
      `)
      console.log('✅ Поле bonusBalance добавлено\n')
    } catch (error: any) {
      if (error.message?.includes('already exists') || error.message?.includes('duplicate')) {
        console.log('⚠️  Поле bonusBalance уже существует\n')
      } else {
        throw error
      }
    }

    // 2. Создаем таблицу bonus_transactions
    console.log('⚙️  Создание таблицы bonus_transactions...')
    try {
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
      console.log('✅ Таблица bonus_transactions создана\n')
    } catch (error: any) {
      if (error.message?.includes('already exists') || error.message?.includes('duplicate')) {
        console.log('⚠️  Таблица bonus_transactions уже существует\n')
      } else {
        throw error
      }
    }

    // 3. Создаем индекс для userId
    console.log('⚙️  Создание индекса bonus_transactions_userId_idx...')
    try {
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
      console.log('✅ Индекс bonus_transactions_userId_idx создан\n')
    } catch (error: any) {
      if (error.message?.includes('already exists') || error.message?.includes('duplicate')) {
        console.log('⚠️  Индекс bonus_transactions_userId_idx уже существует\n')
      } else {
        console.log('⚠️  Предупреждение при создании индекса:', error.message)
      }
    }

    // 4. Создаем индекс для orderId
    console.log('⚙️  Создание индекса bonus_transactions_orderId_idx...')
    try {
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
      console.log('✅ Индекс bonus_transactions_orderId_idx создан\n')
    } catch (error: any) {
      if (error.message?.includes('already exists') || error.message?.includes('duplicate')) {
        console.log('⚠️  Индекс bonus_transactions_orderId_idx уже существует\n')
      } else {
        console.log('⚠️  Предупреждение при создании индекса:', error.message)
      }
    }

    // 5. Добавляем внешний ключ для userId
    console.log('⚙️  Добавление внешнего ключа bonus_transactions_userId_fkey...')
    try {
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
      console.log('✅ Внешний ключ bonus_transactions_userId_fkey добавлен\n')
    } catch (error: any) {
      if (error.message?.includes('already exists') || error.message?.includes('duplicate')) {
        console.log('⚠️  Внешний ключ bonus_transactions_userId_fkey уже существует\n')
      } else {
        console.log('⚠️  Предупреждение при добавлении внешнего ключа:', error.message)
      }
    }

    // 6. Добавляем внешний ключ для orderId
    console.log('⚙️  Добавление внешнего ключа bonus_transactions_orderId_fkey...')
    try {
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
      console.log('✅ Внешний ключ bonus_transactions_orderId_fkey добавлен\n')
    } catch (error: any) {
      if (error.message?.includes('already exists') || error.message?.includes('duplicate')) {
        console.log('⚠️  Внешний ключ bonus_transactions_orderId_fkey уже существует\n')
      } else {
        console.log('⚠️  Предупреждение при добавлении внешнего ключа:', error.message)
      }
    }

    // Проверяем результат
    console.log('🔍 Проверяем результат миграции...\n')

    // Проверяем наличие поля bonusBalance
    const userColumns = await prisma.$queryRaw<Array<{ column_name: string }>>`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'bonusBalance'
    `

    if (userColumns.length > 0) {
      console.log('✅ Поле bonusBalance найдено в таблице users')
    } else {
      console.log('❌ Поле bonusBalance не найдено в таблице users')
    }

    // Проверяем наличие таблицы bonus_transactions
    const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'bonus_transactions'
    `

    if (tables.length > 0) {
      console.log('✅ Таблица bonus_transactions найдена')
    } else {
      console.log('❌ Таблица bonus_transactions не найдена')
    }

    console.log('\n✨ Миграция применена успешно!')
    console.log('💡 Теперь система бонусов должна работать корректно.')

  } catch (error) {
    console.error('❌ Ошибка при применении миграции:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

applyBonusMigration()

