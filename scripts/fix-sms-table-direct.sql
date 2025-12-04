-- SQL скрипт для исправления структуры таблицы sms_codes
-- Выполните этот SQL напрямую в базе данных Render через psql или через веб-консоль

-- Добавляем колонку verified, если её нет
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'sms_codes' 
        AND column_name = 'verified'
    ) THEN
        ALTER TABLE "sms_codes" 
        ADD COLUMN "verified" BOOLEAN NOT NULL DEFAULT false;
        RAISE NOTICE 'Column verified added';
    ELSE
        RAISE NOTICE 'Column verified already exists';
    END IF;
END $$;

-- Добавляем колонку createdAt, если её нет
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'sms_codes' 
        AND column_name = 'createdAt'
    ) THEN
        ALTER TABLE "sms_codes" 
        ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
        RAISE NOTICE 'Column createdAt added';
    ELSE
        RAISE NOTICE 'Column createdAt already exists';
    END IF;
END $$;

-- Создаем индексы, если их нет
CREATE INDEX IF NOT EXISTS "sms_codes_phone_code_idx" ON "sms_codes"("phone", "code");
CREATE INDEX IF NOT EXISTS "sms_codes_expiresAt_idx" ON "sms_codes"("expiresAt");

