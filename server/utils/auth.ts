import { getHeader, H3Event } from 'h3'
import { verifyToken } from './jwt'

/**
 * Извлекает userId из JWT токена из заголовка Authorization
 * @param event - H3 event объект
 * @returns userId или null, если токен отсутствует или невалиден
 */
export async function getUserIdFromToken(event: H3Event): Promise<string | null> {
  try {
    const authHeader = getHeader(event, 'authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7) // Убираем "Bearer "
    
    if (!token) {
      return null
    }

    const payload = await verifyToken(token)
    return payload.userId || null
  } catch (error) {
    // Токен невалиден или истек
    console.error('Ошибка проверки токена:', error)
    return null
  }
}

/**
 * Проверяет авторизацию пользователя и возвращает userId
 * Выбрасывает ошибку 401, если пользователь не авторизован
 */
export async function requireAuth(event: H3Event): Promise<string> {
  const userId = await getUserIdFromToken(event)
  
  if (!userId) {
    throw createError({
      statusCode: 401,
      message: 'Неавторизованный доступ'
    })
  }
  
  return userId
}
