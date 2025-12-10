-- Ручная миграция для добавления системы бонусов
-- Используйте этот скрипт если prisma migrate dev не работает
-- Выполните через psql или любой PostgreSQL клиент

-- 1. Добавляем поле bonusBalance в таблицу users
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "bonusBalance" DECIMAL(10, 2) NOT NULL DEFAULT 0;

-- 2. Создаем таблицу bonus_transactions
CREATE TABLE IF NOT EXISTS "bonus_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT,
    "amount" DECIMAL(10, 2) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bonus_transactions_pkey" PRIMARY KEY ("id")
);

-- 3. Создаем индексы (совместимый синтаксис для всех версий PostgreSQL)
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

-- 4. Добавляем внешние ключи
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

-- Проверка
SELECT 
    column_name, 
    data_type, 
    column_default 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'bonusBalance';

SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'bonus_transactions';

