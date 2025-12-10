# Применение миграции для системы бонусов

## Проблема
Колонка `bonusBalance` отсутствует в базе данных, что вызывает ошибку при создании/обновлении пользователей.

## Решение

### Вариант 1: Через Prisma Migrate (рекомендуется)

Если у вас есть доступ к базе данных через внешний URL:

```bash
npx prisma migrate deploy
```

Или:

```bash
npx prisma db push
```

### Вариант 2: Ручное применение SQL (если Prisma не работает)

Выполните SQL скрипт напрямую в вашей базе данных PostgreSQL:

1. Подключитесь к базе данных через psql или любой PostgreSQL клиент
2. Выполните SQL из файла `prisma/migrations/20241201_add_bonus_system_manual.sql`

Или выполните следующие команды:

```sql
-- Добавляем поле bonusBalance в таблицу users
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "bonusBalance" DECIMAL(10, 2) NOT NULL DEFAULT 0;

-- Создаем таблицу bonus_transactions
CREATE TABLE IF NOT EXISTS "bonus_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT,
    "amount" DECIMAL(10, 2) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "bonus_transactions_pkey" PRIMARY KEY ("id")
);

-- Создаем индексы
CREATE INDEX IF NOT EXISTS "bonus_transactions_userId_idx" ON "bonus_transactions"("userId");
CREATE INDEX IF NOT EXISTS "bonus_transactions_orderId_idx" ON "bonus_transactions"("orderId");

-- Добавляем внешние ключи
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

### Вариант 3: Через Render Dashboard

1. Откройте Render Dashboard
2. Перейдите к вашей базе данных PostgreSQL
3. Откройте "Shell" или используйте "Connect" -> "PSQL"
4. Выполните SQL команды из варианта 2

## Проверка

После применения миграции проверьте:

```sql
-- Проверка наличия колонки bonusBalance
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'bonusBalance';

-- Проверка создания таблицы bonus_transactions
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'bonus_transactions';
```

## Важно

Код был временно исправлен, чтобы работать и без миграции, но для полной функциональности системы бонусов миграция должна быть применена.

