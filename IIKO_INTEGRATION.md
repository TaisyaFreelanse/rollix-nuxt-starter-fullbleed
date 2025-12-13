# Интеграция с iikoCloud API

## Настройка

### Переменные окружения

Добавьте в файл `.env`:

```env
IIKO_API_KEY=ce8d12344a734e9aa8d613deea532a5a
IIKO_ORGANIZATION_ID=2584ca7e-77e0-4175-908f-778dc3df2d1b
IIKO_TERMINAL_GROUP_ID=ee1abd5a-28d3-20c9-019a-3897b0240066
IIKO_API_URL=https://api-ru.iiko.services
```

**Документация API:** [https://api-ru.iiko.services/docs](https://api-ru.iiko.services/docs)

### Структура файлов

- `server/utils/iiko-client.ts` - Основной клиент для работы с iikoCloud API
- `server/utils/aiko-client.ts` - Обёртка для обратной совместимости (использует iiko-client)
- `server/api/aiko/` - API endpoints для работы с iikoCloud

## Возможности

### 1. Получение внешнего меню

Согласно документации iikoCloud API, backend запрашивает меню через endpoint `/api/1/nomenclature`, который возвращает:
- **Категории** (группы товаров)
- **Товары** с ценами, описаниями, изображениями
- **Модификаторы** товаров
- **Стоп-листы** (товары, временно недоступные)

**Endpoint:** `POST /api/aiko/sync`

**Использование:**
```bash
curl -X POST http://localhost:3000/api/aiko/sync
```

**Рекомендация:** Запускайте синхронизацию:
- При старте приложения
- По расписанию (например, каждые 15-30 минут)
- Вручную через админ-панель

Меню кэшируется в локальной базе данных для быстрой работы фронтенда.

### 2. Создание заказа в iikoDelivery

При оформлении заказа backend формирует JSON-заказ согласно структуре API и отправляет его в iikoDelivery через Cloud API.

**Endpoint API iikoCloud:** `POST /api/1/deliveries/create`

**Структура заказа включает:**
- Позиции товаров (ID товаров из iiko)
- Модификаторы для каждой позиции
- Информацию о клиенте (телефон, имя)
- Адрес доставки или самовывоз
- Тип оплаты
- Комментарий к заказу
- Время доставки

**Ответ iikoCloud:**
- `orderId` - номер заказа в iiko
- Статус заказа

**Использование:**
```typescript
// Автоматически при создании заказа (если AUTO_SEND_TO_AIKO=true)
// Или вручную через endpoint
POST /api/aiko/orders
{
  "orderId": "order-id-from-db"
}
```

### 3. Получение статуса заказа

Получает актуальный статус заказа из iikoCloud и обновляет его в локальной БД.

**Endpoint API iikoCloud:** `POST /api/1/deliveries/by_id`

**Endpoint нашего API:** `GET /api/aiko/orders/[aikoOrderId]/status`

**Маппинг статусов:**
- `New` → `PENDING` (новый заказ)
- `Bill` → `CONFIRMED` (подтвержден)
- `Close` → `DELIVERED` (доставлен)
- `Deleted` → `CANCELLED` (отменен)

### 4. Проверка подключения

Проверяет состояние интеграции с iikoCloud.

**Endpoint:** `GET /api/aiko/health`

**Ответ:**
```json
{
  "configured": true,
  "connected": true,
  "organizationId": "2584ca7e-77e0-4175-908f-778dc3df2d1b",
  "baseUrl": "https://api-ru.iiko.services",
  "note": "iikoCloud API настроен и доступен"
}
```

## Использование в коде

### Синхронизация меню

```typescript
import { aikoClient } from '~/server/utils/aiko-client'

const menu = await aikoClient.getMenu()
console.log('Категории:', menu.categories)
console.log('Товары:', menu.products)
```

### Создание заказа

```typescript
import { getIikoClient } from '~/server/utils/iiko-client'

const client = getIikoClient()
const result = await client.createOrder({
  phone: '+79001234567',
  customerName: 'Иван Иванов',
  comment: 'Комментарий к заказу',
  items: [
    {
      productId: 'product-id-from-iiko', // ID товара из iiko (обязательно!)
      productName: 'Ролл Филадельфия',
      quantity: 2,
      price: 450,
      modifiers: [
        {
          id: 'modifier-id-from-iiko', // ID модификатора из iiko
          name: 'Острый соус',
          price: 50
        }
      ]
    }
  ],
  address: 'ул. Ленина, д. 1, кв. 10',
  deliveryType: 'DELIVERY', // или 'PICKUP'
  deliveryTime: new Date()
})

console.log('ID заказа в iikoCloud:', result.iikoOrderId)
```

### Получение статуса заказа

```typescript
const status = await client.getOrderStatus('iiko-order-id')
console.log('Статус:', status.status)
```

## Автоматическая отправка заказов

Для автоматической отправки заказов в iikoCloud при их создании добавьте в `.env`:

```env
AUTO_SEND_TO_AIKO=true
```

При создании заказа через `POST /api/orders` заказ автоматически будет отправлен в iikoCloud (если товары имеют правильные ID из iiko).

## Важные замечания

1. **ID товаров и модификаторов** должны быть реальными ID из iikoCloud. При синхронизации меню сохраняйте оригинальные ID товаров из iiko.

2. **Токен доступа** к iikoCloud API кэшируется на 23 часа для оптимизации запросов.

3. **При ошибках авторизации** токен автоматически сбрасывается и запрашивается заново.

4. **Все ошибки** логируются в консоль с префиксом `[iikoCloud]` для удобства отладки.

5. **Структура ответа API** может отличаться в зависимости от версии. Код пытается обработать различные варианты структуры данных.

## Рекомендуемый workflow

1. **При старте приложения:**
   - Синхронизировать меню из iikoCloud
   - Кэшировать в локальной БД

2. **При оформлении заказа:**
   - Фронтенд собирает корзину с товарами (используя ID из iiko)
   - Фронтенд позволяет выбрать адрес, время и тип оплаты
   - Backend формирует JSON-заказ и отправляет в iikoCloud
   - Получает orderId и статус от iiko
   - Сохраняет orderId в локальной БД для отслеживания

3. **Отслеживание статусов:**
   - Периодически запрашивать статусы заказов из iikoCloud
   - Обновлять статусы в локальной БД
   - Уведомлять пользователей об изменениях статуса

4. **Регулярная синхронизация:**
   - Запускать синхронизацию меню по расписанию (каждые 15-30 минут)
   - Обновлять цены, доступность товаров, стоп-листы
