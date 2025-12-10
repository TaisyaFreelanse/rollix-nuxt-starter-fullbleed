# Применение миграции системы бонусов

Система бонусов включена в админке, но миграция базы данных еще не применена. Выполните один из способов ниже.

## Способ 1: Через API endpoint (рекомендуется)

После деплоя на Render, выполните POST запрос к:
```
POST https://rollix-delivery.onrender.com/api/admin/apply-bonus-migration
```

Или через curl:
```bash
curl -X POST https://rollix-delivery.onrender.com/api/admin/apply-bonus-migration
```

## Способ 2: Через SQL напрямую в базе данных Render

1. Зайдите в Render Dashboard → ваша база данных PostgreSQL
2. Откройте "Connect" → "PSQL"
3. Выполните SQL скрипт из файла `prisma/migrations/20241201_add_bonus_system_manual.sql`

Или выполните SQL вручную:

```sql
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

-- 3. Создаем индексы
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
```

## Способ 3: Через Prisma Migrate (если есть доступ к серверу)

```bash
npx prisma migrate deploy
```

## Проверка успешного применения

После применения миграции в логах сервера не должно быть сообщения:
```
Система бонусов еще не применена к базе данных
```

Вместо этого при оплате заказа должны начисляться бонусы (1% от суммы заказа).

