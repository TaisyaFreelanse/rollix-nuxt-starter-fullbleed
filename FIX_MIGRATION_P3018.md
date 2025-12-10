# Исправление ошибки P3018 миграции

## Проблема
Миграция `20241201_add_bonus_system` упала с ошибкой P3018 из-за синтаксиса `CREATE INDEX IF NOT EXISTS`, который не поддерживается в вашей версии PostgreSQL.

## Решение

### Шаг 1: Разрешить ошибку миграции в Prisma

Сначала нужно пометить миграцию как "решённую", даже если она упала:

```bash
npx prisma migrate resolve --applied 20241201_add_bonus_system
```

Или через интерфейс:
1. В Prisma Studio или через SQL выполните:
```sql
INSERT INTO "_prisma_migrations" (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
VALUES (
  gen_random_uuid()::text,
  '', -- оставьте пустым
  NOW(),
  '20241201_add_bonus_system',
  NULL,
  NULL,
  NOW(),
  0
);
```

### Шаг 2: Применить исправленную миграцию вручную

Я исправил файл миграции, но для применения на сервере выполните SQL вручную:

```sql
-- 1. Добавляем поле bonusBalance (если ещё не добавлено)
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "bonusBalance" DECIMAL(10, 2) NOT NULL DEFAULT 0;

-- 2. Создаем таблицу bonus_transactions (если ещё не создана)
CREATE TABLE IF NOT EXISTS "bonus_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT,
    "amount" DECIMAL(10, 2) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "bonus_transactions_pkey" PRIMARY KEY ("id")
);

-- 3. Создаем индексы (совместимый синтаксис)
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

### Шаг 3: Проверка

Проверьте, что всё создано правильно:

```sql
-- Проверка колонки bonusBalance
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'bonusBalance';

-- Проверка таблицы bonus_transactions
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'bonus_transactions';

-- Проверка индексов
SELECT indexname 
FROM pg_indexes 
WHERE tablename = 'bonus_transactions';

-- Проверка внешних ключей
SELECT conname 
FROM pg_constraint 
WHERE conname LIKE 'bonus_transactions%';
```

### Шаг 4: Пометить миграцию как применённую

После успешного применения SQL вручную, пометьте миграцию как применённую:

```bash
npx prisma migrate resolve --applied 20241201_add_bonus_system
```

## Примечание

Файл миграции `prisma/migrations/20241201_add_bonus_system/migration.sql` уже исправлен для будущих применений. Он теперь использует совместимый синтаксис для всех версий PostgreSQL.

