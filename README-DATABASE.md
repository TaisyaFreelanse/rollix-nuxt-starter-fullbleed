# Настройка базы данных

## Вариант 1: Использование Prisma Dev (рекомендуется для разработки)

Prisma Dev предоставляет встроенную базу данных PostgreSQL, которая запускается автоматически.

```bash
# Запустите Prisma Dev (это создаст и запустит базу данных)
npx prisma dev

# В другом терминале выполните миграции
npm run db:migrate

# Заполните базу данных тестовыми данными
npm run db:seed
```

После запуска `prisma dev` обновите `.env` файл с URL, который покажет Prisma.

## Вариант 2: Docker (простой способ)

Если у вас установлен Docker:

```bash
# Запустите PostgreSQL в Docker
docker run --name rollix-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=rollix_db -p 5432:5432 -d postgres:16

# Обновите .env файл:
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rollix_db?schema=public"

# Выполните миграции
npm run db:migrate

# Заполните базу данных
npm run db:seed
```

## Вариант 3: Локальная установка PostgreSQL

1. Установите PostgreSQL с официального сайта: https://www.postgresql.org/download/windows/
2. Создайте базу данных:
   ```sql
   CREATE DATABASE rollix_db;
   ```
3. Обновите `.env` файл с вашими учетными данными:
   ```
   DATABASE_URL="postgresql://ваш_пользователь:ваш_пароль@localhost:5432/rollix_db?schema=public"
   ```
4. Выполните миграции:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

## Вариант 4: Облачная база данных

Можно использовать бесплатные облачные сервисы:
- Supabase (https://supabase.com) - бесплатный PostgreSQL
- Neon (https://neon.tech) - бесплатный PostgreSQL
- Railway (https://railway.app) - бесплатный PostgreSQL

После создания базы данных скопируйте connection string в `.env` файл.

## Проверка подключения

После настройки базы данных проверьте подключение:

```bash
npm run db:migrate
```

Если миграции прошли успешно, выполните:

```bash
npm run db:seed
```

