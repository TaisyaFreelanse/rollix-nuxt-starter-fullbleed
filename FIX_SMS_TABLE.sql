-- SQL для исправления таблицы sms_codes
-- Выполните этот SQL в Render Shell или через psql

-- Добавляем колонку verified
ALTER TABLE "sms_codes" 
ADD COLUMN IF NOT EXISTS "verified" BOOLEAN NOT NULL DEFAULT false;

-- Добавляем колонку createdAt
ALTER TABLE "sms_codes" 
ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Создаем индексы
CREATE INDEX IF NOT EXISTS "sms_codes_phone_code_idx" ON "sms_codes"("phone", "code");
CREATE INDEX IF NOT EXISTS "sms_codes_expiresAt_idx" ON "sms_codes"("expiresAt");

