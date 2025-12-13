# Деплой на Render

## ✅ Код готов к деплою!

Все файлы проверены, ошибок компиляции нет. Интеграция с iikoCloud API готова.

## Необходимые переменные окружения на Render

Добавьте следующие переменные в настройках вашего сервиса на Render (Environment Variables):

### База данных
```env
DATABASE_URL=postgresql://... # URL вашей PostgreSQL базы на Render
```

### iikoCloud API (новые, обязательные!)
```env
IIKO_API_KEY=ce8d12344a734e9aa8d613deea532a5a
IIKO_ORGANIZATION_ID=2584ca7e-77e0-4175-908f-778dc3df2d1b
IIKO_TERMINAL_GROUP_ID=ee1abd5a-28d3-20c9-019a-3897b0240066
IIKO_API_URL=https://api-ru.iiko.services
```

### SMS Service
```env
SMS_RU_API_KEY=66CCA90D-74B8-6CCB-30C5-05A1D6661AE6
```

### JWT Secrets (рекомендуется изменить в production!)
```env
JWT_SECRET=your-secret-key-change-in-production
ADMIN_JWT_SECRET=admin-secret-key-change-in-production
```

### Опциональные
```env
AUTO_SEND_TO_AIKO=true  # Автоматическая отправка заказов в iikoCloud
NUXT_PUBLIC_APP_URL=https://your-app.onrender.com  # URL вашего приложения
NUXT_PUBLIC_API_BASE_URL=https://your-app.onrender.com
```

## Настройки Build команды на Render

**Build Command:**
```bash
npm run render:build
```

Или вручную:
```bash
npm install --production=false && npx prisma generate --schema=prisma/schema.prisma && npx tsx scripts/create-sms-table.ts && npx tsx scripts/add-product-tags.ts && npx tsx scripts/create-banners-table.ts && npm run build
```

**Start Command:**
```bash
npm start
```

## После деплоя

1. **Проверьте подключение к iikoCloud:**
   ```bash
   curl https://your-app.onrender.com/api/aiko/health
   ```
   Должен вернуть:
   ```json
   {
     "configured": true,
     "connected": true,
     "organizationId": "...",
     "baseUrl": "https://api-ru.iiko.services",
     "note": "iikoCloud API настроен и доступен"
   }
   ```

2. **Синхронизируйте меню:**
   ```bash
   curl -X POST https://your-app.onrender.com/api/aiko/sync
   ```

3. **Настройте автоматическую синхронизацию** (опционально):
   - Через Render Cron Jobs
   - Или используйте внешний сервис для периодических запросов

## Важные замечания

⚠️ **Не добавляйте `.env` файл в Git!** Все переменные окружения настраиваются через панель Render.

✅ **Код готов к production**, но убедитесь что:
- Все секретные ключи изменены (JWT_SECRET, ADMIN_JWT_SECRET)
- База данных правильно подключена
- Все переменные iikoCloud API настроены

## Если что-то пошло не так

1. Проверьте логи сборки на Render
2. Проверьте логи runtime
3. Убедитесь, что все переменные окружения установлены
4. Проверьте подключение к базе данных

---

**Успешного деплоя! 🚀**

