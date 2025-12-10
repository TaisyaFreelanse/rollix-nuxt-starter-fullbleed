-- Миграция для добавления системы бонусов
-- Выполните этот SQL скрипт в вашей базе данных

-- 1. Добавляем поле bonusBalance в таблицу users
ALTER TABLE "users" 
ADD COLUMN IF NOT EXISTS "bonusBalance" DECIMAL(10, 2) NOT NULL DEFAULT 0;

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

-- 3. Создаем индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS "bonus_transactions_userId_idx" ON "bonus_transactions"("userId");
CREATE INDEX IF NOT EXISTS "bonus_transactions_orderId_idx" ON "bonus_transactions"("orderId");

-- 4. Добавляем внешние ключи
ALTER TABLE "bonus_transactions" 
ADD CONSTRAINT IF NOT EXISTS "bonus_transactions_userId_fkey" 
FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "bonus_transactions" 
ADD CONSTRAINT IF NOT EXISTS "bonus_transactions_orderId_fkey" 
FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

