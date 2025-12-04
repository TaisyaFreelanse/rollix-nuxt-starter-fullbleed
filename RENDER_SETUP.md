# Настройка Render для проекта rollix-delivery

## Текущая ситуация

Проект был остановлен из-за ошибки. Нужно выполнить следующие шаги:

## 1. Обновить Build команду на Render

В настройках сервиса `rollix-delivery` на Render обновите Build Command на:

```bash
npm install --production=false && npx prisma generate --schema=prisma/schema.prisma && npx prisma db push --accept-data-loss && npm run build
```

Эта команда:
- Устанавливает все зависимости (включая dev)
- Генерирует Prisma Client
- Выполняет миграции (db push)
- Собирает приложение

## 2. Проверить переменные окружения

Убедитесь, что в настройках сервиса установлены следующие переменные:

- `DATABASE_URL` - должен быть автоматически связан с базой данных `rollix-db`
- `SMS_RU_API_KEY` - API ключ от SMS.RU (по умолчанию: `66CCA90D-74B8-6CCB-30C5-05A1D6661AE6`)

## 3. Выполнить миграцию (если не выполнится автоматически)

Если миграция не выполнится автоматически при сборке, можно выполнить её вручную через Render Shell:

1. Откройте Render Dashboard → Ваш сервис → Shell
2. Выполните команду:
```bash
npx prisma db push --accept-data-loss
```

Или через SSH:
```bash
ssh srv-d4mqj16mcj7s73cgv21g@ssh.oregon.render.com
npx prisma db push --accept-data-loss
```

## 4. Альтернативный способ: SQL миграция

Если нужно выполнить миграцию напрямую через SQL:

1. Откройте Render Dashboard → База данных `rollix-db` → Query
2. Выполните SQL из файла `prisma/migrations/add_sms_codes.sql`

## После выполнения

После выполнения всех шагов:
1. Перезапустите сервис в Render Dashboard
2. Проверьте логи на наличие ошибок
3. Протестируйте отправку SMS кодов

## Контакты

- Dashboard: https://dashboard.render.com/web/srv-d4mqj16mcj7s73cgv21g
- URL: https://rollix-delivery.onrender.com
- База данных: https://dashboard.render.com/d/dpg-d4mqip8dl3ps73e9vpv0-a

