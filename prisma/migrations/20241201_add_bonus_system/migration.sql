-- AlterTable: Добавляем поле bonusBalance в таблицу users
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "bonusBalance" DECIMAL(10, 2) NOT NULL DEFAULT 0;

-- CreateTable: Создаем таблицу bonus_transactions
CREATE TABLE IF NOT EXISTS "bonus_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT,
    "amount" DECIMAL(10, 2) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bonus_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: Индекс для быстрого поиска по userId
CREATE INDEX IF NOT EXISTS "bonus_transactions_userId_idx" ON "bonus_transactions"("userId");

-- CreateIndex: Индекс для быстрого поиска по orderId
CREATE INDEX IF NOT EXISTS "bonus_transactions_orderId_idx" ON "bonus_transactions"("orderId");

-- AddForeignKey: Связь с таблицей users
ALTER TABLE "bonus_transactions" 
ADD CONSTRAINT IF NOT EXISTS "bonus_transactions_userId_fkey" 
FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: Связь с таблицей orders
ALTER TABLE "bonus_transactions" 
ADD CONSTRAINT IF NOT EXISTS "bonus_transactions_orderId_fkey" 
FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

