-- CreateTable
CREATE TABLE IF NOT EXISTS "sms_codes" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sms_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "sms_codes_phone_code_idx" ON "sms_codes"("phone", "code");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "sms_codes_expiresAt_idx" ON "sms_codes"("expiresAt");

