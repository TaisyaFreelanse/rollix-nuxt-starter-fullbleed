# Как проверить, что меню из iikoCloud успешно подгрузилось

## 1. Через API endpoint `/api/aiko/sync`

После запуска синхронизации вы получите детальную статистику:

```bash
curl -X POST https://your-app.onrender.com/api/aiko/sync
```

**Успешный ответ:**
```json
{
  "success": true,
  "message": "Синхронизация выполнена",
  "stats": {
    "syncedCategories": 10,
    "syncedProducts": 45,
    "updatedPrices": 3,
    "errorsCount": 0,
    "timestamp": "2024-12-01T12:00:00.000Z"
  }
}
```

**Если есть ошибки:**
```json
{
  "success": true,
  "message": "Синхронизация выполнена",
  "stats": {
    "syncedCategories": 10,
    "syncedProducts": 40,
    "updatedPrices": 0,
    "errorsCount": 5,
    "timestamp": "2024-12-01T12:00:00.000Z"
  },
  "errors": [
    "Ошибка синхронизации товара Товар 1: ...",
    "..."
  ]
}
```

## 2. Через endpoint проверки статуса `/api/aiko/sync-status`

Получает текущее состояние меню в базе данных:

```bash
curl https://your-app.onrender.com/api/aiko/sync-status
```

**Ответ:**
```json
{
  "success": true,
  "status": "ok",
  "stats": {
    "categoriesCount": 10,
    "productsCount": 45,
    "lastSyncTime": "2024-12-01T12:00:00.000Z",
    "lastUpdatedProduct": "Ролл Филадельфия",
    "lastUpdatedCategory": "Роллы"
  },
  "message": "Меню синхронизировано. Категорий: 10, Товаров: 45"
}
```

**Если меню не синхронизировано:**
```json
{
  "success": true,
  "status": "ok",
  "stats": {
    "categoriesCount": 0,
    "productsCount": 0,
    "lastSyncTime": null,
    "lastUpdatedProduct": null,
    "lastUpdatedCategory": null
  },
  "message": "Меню еще не синхронизировано. Запустите синхронизацию через POST /api/aiko/sync"
}
```

## 3. Через endpoint health check `/api/aiko/health`

Проверяет подключение к API и статус меню:

```bash
curl https://your-app.onrender.com/api/aiko/health
```

**Ответ:**
```json
{
  "configured": true,
  "connected": true,
  "organizationId": "2584ca7e-77e0-4175-908f-778dc3df2d1b",
  "terminalGroupId": "ee1abd5a-28d3-20c9-019a-3897b0240066",
  "baseUrl": "https://api-ru.iiko.services",
  "menu": {
    "categoriesCount": 10,
    "productsCount": 45,
    "lastSyncTime": "2024-12-01T12:00:00.000Z",
    "isSynced": true
  },
  "note": "iikoCloud API настроен и доступен. Меню синхронизировано."
}
```

## 4. Проверка через фронтенд

После синхронизации меню должно появиться на сайте:

1. **Главная страница** (`/`) - должны отображаться категории и товары
2. **Каталог** (`/catalog`) - должны быть все товары
3. **Боковое меню** (на десктопе) - должны быть категории с товарами

Если меню пустое, значит синхронизация еще не была выполнена или произошла ошибка.

## 5. Проверка через базу данных (для разработчиков)

Если у вас есть доступ к базе данных:

```sql
-- Количество категорий
SELECT COUNT(*) FROM categories WHERE "isActive" = true;

-- Количество товаров
SELECT COUNT(*) FROM products WHERE "isActive" = true;

-- Последние обновленные товары
SELECT name, "updatedAt" FROM products ORDER BY "updatedAt" DESC LIMIT 10;

-- Последние обновленные категории
SELECT name, "updatedAt" FROM categories ORDER BY "updatedAt" DESC LIMIT 10;
```

## Пошаговая инструкция после деплоя

1. **Проверьте подключение к iikoCloud:**
   ```bash
   curl https://your-app.onrender.com/api/aiko/health
   ```
   Должен вернуть `"connected": true`

2. **Запустите синхронизацию меню:**
   ```bash
   curl -X POST https://your-app.onrender.com/api/aiko/sync
   ```
   Проверьте, что `syncedCategories > 0` и `syncedProducts > 0`

3. **Проверьте статус:**
   ```bash
   curl https://your-app.onrender.com/api/aiko/sync-status
   ```
   Должен показать количество категорий и товаров

4. **Проверьте на сайте:**
   Откройте главную страницу - должны быть видны категории и товары

## Автоматическая синхронизация

Рекомендуется настроить автоматическую синхронизацию через Render Cron Jobs:

- **Команда:** `curl -X POST https://your-app.onrender.com/api/aiko/sync`
- **Расписание:** Каждые 15-30 минут (например: `*/30 * * * *`)

Это обеспечит актуальность меню и цен на сайте.

## Решение проблем

### Меню пустое после синхронизации

1. Проверьте логи синхронизации - есть ли ошибки
2. Убедитесь, что в iikoCloud есть товары и категории
3. Проверьте, что `organizationId` правильный

### Ошибка подключения к iikoCloud

1. Проверьте переменные окружения: `IIKO_API_KEY`, `IIKO_ORGANIZATION_ID`, `IIKO_TERMINAL_GROUP_ID`
2. Проверьте, что API ключ активен в iikoCloud
3. Убедитесь, что `IIKO_API_URL` правильный (`https://api-ru.iiko.services`)

### Товары не отображаются на сайте

1. Проверьте, что товары имеют `isActive: true`
2. Убедитесь, что категории имеют `isActive: true`
3. Проверьте связь товаров с категориями (`categoryId`)

