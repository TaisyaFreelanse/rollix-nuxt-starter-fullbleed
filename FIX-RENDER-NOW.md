# 🔧 СРОЧНОЕ ИСПРАВЛЕНИЕ ДЛЯ RENDER

## ❌ Проблема:
Render не может найти Prisma Schema, потому что файлы не в git репозитории.

## ✅ БЫСТРОЕ РЕШЕНИЕ:

### 1. Добавьте все файлы в git:

```bash
git add prisma/
git add prisma.config.ts
git add lib/
git add server/
git add composables/
git add components/ProductModal.vue
git add .env.example
git add render.yaml
git add *.md
git add tsconfig.json
git add .eslintrc.js
git add .prettierrc
git add .prettierignore
```

### 2. Закоммитьте и запушьте:

```bash
git commit -m "Add Prisma, API, and configuration files for Render"
git push origin main
```

### 3. Обновите Build Command на Render:

**ВАЖНО!** Сделайте это ДО того, как Render начнет новый деплой:

1. Откройте: https://dashboard.render.com/web/srv-d4mqj16mcj7s73cgv21g/settings
2. Найдите **"Build Command"**
3. Замените на:
   ```
   npm install && npx prisma generate --schema=prisma/schema.prisma && npm run build
   ```
4. Сохраните изменения

### 4. Добавьте DATABASE_URL (если еще не добавлен):

1. В dashboard: https://dashboard.render.com/web/srv-d4mqj16mcj7s73cgv21g
2. Перейдите в **"Environment"**
3. Добавьте:
   - Key: `DATABASE_URL`
   - Value: получите из https://dashboard.render.com/d/dpg-d4mqip8dl3ps73e9vpv0-a
     - Откройте раздел "Connections"
     - Скопируйте **Internal Database URL**

## 🎯 После этого:

Render автоматически запустит новый деплой после пуша. Дождитесь завершения (5-10 минут), затем:

1. Откройте Shell на Render: https://dashboard.render.com/web/srv-d4mqj16mcj7s73cgv21g
2. Выполните:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

## ✅ Готово!

Приложение будет работать на: **https://rollix-delivery.onrender.com**

