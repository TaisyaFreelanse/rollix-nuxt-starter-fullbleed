import { verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  // Пропускаем публичные маршруты
  const publicRoutes = ['/api/categories', '/api/products', '/api/auth']
  const path = event.node.req.url || ''

  if (publicRoutes.some((route) => path.startsWith(route))) {
    return
  }

  // Проверяем токен для защищенных маршрутов
  const authHeader = event.node.req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Требуется авторизация'
    })
  }

  const token = authHeader.substring(7)
  try {
    const payload = await verifyToken(token)
    event.context.user = payload
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Недействительный токен'
    })
  }
})

