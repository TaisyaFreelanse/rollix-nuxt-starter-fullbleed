-- SQL для исправления структуры таблицы sms_codes
-- Если поле id имеет тип INTEGER вместо TEXT, выполните этот SQL

-- Проверяем текущую структуру
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'sms_codes'
ORDER BY ordinal_position;

-- Если id имеет тип INTEGER, нужно пересоздать таблицу
-- ВНИМАНИЕ: Это удалит все данные в таблице!
-- Сначала сделайте бэкап, если там есть важные данные

-- Вариант 1: Пересоздание таблицы (удалит данные)
-- DROP TABLE IF EXISTS "sms_codes";
-- CREATE TABLE "sms_codes" (
--   "id" TEXT NOT NULL,
--   "phone" TEXT NOT NULL,
--   "code" TEXT NOT NULL,
--   "expiresAt" TIMESTAMP(3) NOT NULL,
--   "verified" BOOLEAN NOT NULL DEFAULT false,
--   "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   CONSTRAINT "sms_codes_pkey" PRIMARY KEY ("id")
-- );
-- CREATE INDEX "sms_codes_phone_code_idx" ON "sms_codes"("phone", "code");
-- CREATE INDEX "sms_codes_expiresAt_idx" ON "sms_codes"("expiresAt");

-- Вариант 2: Если таблица пустая, можно просто пересоздать
DROP TABLE IF EXISTS "sms_codes" CASCADE;
CREATE TABLE "sms_codes" (
  "id" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "verified" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "sms_codes_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "sms_codes_phone_code_idx" ON "sms_codes"("phone", "code");
CREATE INDEX "sms_codes_expiresAt_idx" ON "sms_codes"("expiresAt");

