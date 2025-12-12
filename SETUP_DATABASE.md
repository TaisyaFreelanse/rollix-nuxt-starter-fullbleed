# Настройка подключения к базе данных Render

## Обновление .env файла

Файл `.env` уже настроен для подключения к базе данных Render с локальной машины:

```env
DATABASE_URL=postgresql://rollix_db_user:DrrK6FVqpHbSJ4MkxbudwuLOe0GG5eG1@dpg-d4mqip8dl3ps73e9vpv0-a.oregon-postgres.render.com/rollix_db?schema=public
```

Это External Database URL, который позволяет подключаться к базе данных Render с вашего локального компьютера.

## Данные для подключения

- **Hostname (Internal):** `dpg-d4mqip8dl3ps73e9vpv0-a`
- **Hostname (External):** `dpg-d4mqip8dl3ps73e9vpv0-a.oregon-postgres.render.com`
- **Port:** `5432`
- **Database:** `rollix_db`
- **Username:** `rollix_db_user`
- **Password:** `DrrK6FVqpHbSJ4MkxbudwuLOe0GG5eG1`

## Применение миграции системы бонусов

Система бонусов включена в админке, но миграция базы данных должна быть применена. Выберите один из способов:

### Способ 1: Через npm скрипт (рекомендуется)

```bash
npm run bonus:migrate
```

Это выполнит TypeScript скрипт `scripts/apply-bonus-migration.ts`, который применит миграцию к базе данных.

### Способ 2: Через bash скрипт (требует установленный psql)

```bash
bash scripts/apply-bonus-migration.sh
```

Убедитесь, что у вас установлен `psql` клиент PostgreSQL.

### Способ 3: Через Prisma Migrate

```bash
npx prisma migrate deploy
```

Или через Prisma Studio:

```bash
npm run db:studio
```

### Способ 4: Через API endpoint (на сервере Render)

После деплоя на Render, выполните POST запрос к:

```
POST https://rollix-delivery.onrender.com/api/admin/apply-bonus-migration
```

Или через curl:

```bash
curl -X POST https://rollix-delivery.onrender.com/api/admin/apply-bonus-migration \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Способ 5: Через SQL напрямую в базе данных Render

1. Зайдите в Render Dashboard → ваша база данных PostgreSQL
2. Откройте "Connect" → "PSQL"
3. Выполните SQL скрипт из файла `prisma/migrations/20241201_add_bonus_system_manual.sql`

Или скопируйте и выполните SQL вручную (см. файл `prisma/migrations/20241201_add_bonus_system_manual.sql`).

## Что делает миграция

Миграция добавляет:

1. **Поле `bonusBalance`** в таблицу `users` для хранения баланса бонусов пользователя
2. **Таблицу `bonus_transactions`** для хранения истории всех операций с бонусами (начисления и списания)
3. **Индексы** для быстрого поиска транзакций по пользователю и заказу
4. **Внешние ключи** для связи с таблицами `users` и `orders`

## Проверка успешного применения

После применения миграции:

1. В логах сервера не должно быть сообщения:
   ```
   Система бонусов еще не применена к базе данных
   ```

2. При оплате заказа должны начисляться бонусы (1% от суммы заказа, если система бонусов включена в админке)

3. В профиле пользователя должна отображаться вкладка "Бонусы" с балансом и историей транзакций

## Генерация Prisma Client

После применения миграции обновите Prisma Client:

```bash
npm run db:generate
```

## Полезные команды

- `npm run db:generate` - Обновить Prisma Client
- `npm run db:studio` - Открыть Prisma Studio для просмотра базы данных
- `npm run bonus:migrate` - Применить миграцию системы бонусов
- `npx prisma migrate status` - Проверить статус миграций

