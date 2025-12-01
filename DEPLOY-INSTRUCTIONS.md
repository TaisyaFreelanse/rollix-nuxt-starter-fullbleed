# 🚀 Инструкция по деплою на Render

## ⚠️ ПРОБЛЕМА: Файлы Prisma не в git

Render не может найти Prisma Schema, потому что файлы не закоммичены.

## ✅ РЕШЕНИЕ:

### ШАГ 1: Добавьте файлы в git и закоммитьте

Выполните эти команды:

```bash
# Добавьте все необходимые файлы
git add prisma/
git add prisma.config.ts
git add lib/
git add server/
git add composables/
git add .env.example
git add render.yaml
git add *.md

# Закоммитьте
git commit -m "Add Prisma configuration and API for Render deployment"

# Запушьте
git push origin main
```

### ШАГ 2: Обновите Build Command на Render

1. Откройте: https://dashboard.render.com/web/srv-d4mqj16mcj7s73cgv21g/settings
2. Найдите раздел **"Build Command"**
3. Замените текущую команду на:
   ```
   npm install && npx prisma generate --schema=prisma/schema.prisma && npm run build
   ```
4. Нажмите **"Save Changes"**

### ШАГ 3: Добавьте DATABASE_URL (если еще не добавлен)

1. В том же dashboard перейдите в раздел **"Environment"**
2. Добавьте переменную:
   - Key: `DATABASE_URL`
   - Value: получите из https://dashboard.render.com/d/dpg-d4mqip8dl3ps73e9vpv0-a
     - Откройте раздел "Connections"
     - Скопируйте **Internal Database URL**
3. Нажмите **"Save Changes"**

### ШАГ 4: Дождитесь деплоя

После пуша в git Render автоматически запустит новый деплой (обычно 5-10 минут).

### ШАГ 5: Выполните миграции на Render

После успешного деплоя:

1. Откройте: https://dashboard.render.com/web/srv-d4mqj16mcj7s73cgv21g
2. Перейдите в раздел **"Shell"**
3. Выполните:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

## 📝 Проверка:

После выполнения всех шагов ваше приложение будет доступно по адресу:
**https://rollix-delivery.onrender.com**

## 🔍 Если ошибка повторяется:

Убедитесь, что:
- ✅ Все файлы в папке `prisma/` закоммичены
- ✅ Файл `prisma.config.ts` закоммичен
- ✅ Build Command содержит `--schema=prisma/schema.prisma`
- ✅ DATABASE_URL добавлен в Environment Variables

