# 🔧 Исправление ошибки сборки на Render

## Проблема:
Render не может найти Prisma Schema при сборке, потому что файлы Prisma не закоммичены в git.

## Решение:

### 1. Добавьте все необходимые файлы в git:

```bash
git add prisma/
git add prisma.config.ts
git add lib/prisma.ts
git add server/utils/prisma.ts
git add server/api/
git add composables/
git add .env.example
git add render.yaml
git add SETUP-RENDER.md
git add QUICK-START.md
git add RENDER-FIX.md
```

### 2. Обновите buildCommand на Render:

1. Откройте: https://dashboard.render.com/web/srv-d4mqj16mcj7s73cgv21g/settings
2. Найдите раздел **"Build Command"**
3. Замените на:
   ```
   npm install && npx prisma generate && npm run build
   ```
4. Или используйте скрипт из package.json:
   ```
   npm run render:build
   ```

### 3. Закоммитьте и запушьте изменения:

```bash
git commit -m "Add Prisma files and configuration for Render deployment"
git push origin main
```

### 4. После пуша:

Render автоматически запустит новый деплой. Убедитесь, что:
- ✅ Все файлы Prisma закоммичены
- ✅ buildCommand обновлен на Render
- ✅ DATABASE_URL добавлен в Environment Variables на Render

## Альтернативный buildCommand:

Если проблемы продолжаются, используйте:

```bash
npm ci && npx prisma generate --schema=prisma/schema.prisma && npm run build
```

Это явно указывает путь к schema файлу.

