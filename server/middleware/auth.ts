import { verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const path = event.node.req.url?.split('?')[0] || '' // Убираем query параметры

  // Пропускаем все не-API маршруты (страницы, статические файлы и т.д.)
  if (!path.startsWith('/api')) {
    return
  }

  // ВАЖНО: Админские auth маршруты должны быть публичными (не требуют авторизации)
  if (path === '/api/admin/auth/login' || path === '/api/admin/auth/logout') {
    return
  }

  // ВАЖНО: Все остальные админские маршруты имеют свою систему авторизации через requireAdminAuth
  // Этот middleware проверяет только токены пользователей, поэтому пропускаем все /api/admin/* маршруты
  if (path.startsWith('/api/admin/')) {
    return
  }

  // Пропускаем публичные API маршруты
  const publicRoutes = [
    '/api/categories',
    '/api/products',
    '/api/auth',
    '/api/delivery-zones',
    '/api/promo-codes',
    '/api/banners', // Публичный эндпоинт для баннеров
    '/api/orders', // Разрешаем гостевые заказы
    '/api/promotions', // Публичный эндпоинт для акций
    '/api/promocode-widget', // Публичный эндпоинт для виджета промокода
    '/api/aiko' // Публичные эндпоинты для синхронизации с iikoCloud
  ]

  if (publicRoutes.some((route) => path.startsWith(route))) {
    // Для маршрутов с опциональной авторизацией пытаемся извлечь токен, но не требуем его
    const authHeader = event.node.req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      try {
        const payload = await verifyToken(token)
        event.context.auth = { userId: payload.userId }
      } catch (error) {
        // Игнорируем ошибку - пользователь просто не авторизован
        event.context.auth = null
      }
    }
    return
  }

  // Проверяем токен для защищенных маршрутов
  const authHeader = event.node.req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      message: 'Требуется авторизация'
    })
  }

  const token = authHeader.substring(7)
  try {
    const payload = await verifyToken(token)
    event.context.auth = { userId: payload.userId }
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Недействительный токен'
    })
  }
})