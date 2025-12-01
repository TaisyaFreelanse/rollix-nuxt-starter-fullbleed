# 🔧 Исправление кэша npm на Render

## Проблема:
Render кэширует старую версию esbuild (0.25.10), которая конфликтует с версией, требуемой tsx.

## ⚠️ СРОЧНО: Обновите Build Command на Render

1. Откройте: https://dashboard.render.com/web/srv-d4mqj16mcj7s73cgv21g/settings
2. Найдите раздел **"Build Command"**
3. Замените текущую команду на:
   ```
   rm -rf node_modules && npm cache clean --force && npm install && npx prisma generate --schema=prisma/schema.prisma && npm run build
   ```
4. Нажмите **"Save Changes"**

## Альтернативный вариант (более надежный):

Если проблема сохраняется, используйте этот Build Command:

```
npm cache clean --force && rm -rf node_modules package-lock.json && npm install && npx prisma generate --schema=prisma/schema.prisma && npm run build
```

## ✅ После обновления:

1. Render автоматически запустит новый деплой
2. Дождитесь завершения (5-10 минут)
3. Выполните миграции в Shell:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

## 🎯 Приложение:

**https://rollix-delivery.onrender.com**

