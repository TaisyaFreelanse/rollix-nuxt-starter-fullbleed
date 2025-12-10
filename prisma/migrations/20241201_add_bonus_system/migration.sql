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

-- CreateIndex: Индекс для быстрого поиска по userId (совместимый синтаксис)
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

-- CreateIndex: Индекс для быстрого поиска по orderId (совместимый синтаксис)
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

-- AddForeignKey: Связь с таблицей users
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

-- AddForeignKey: Связь с таблицей orders
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

