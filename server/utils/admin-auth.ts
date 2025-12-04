import { getHeader, H3Event } from 'h3'
import { verifyAdminToken } from './admin-jwt'

/**
 * Извлекает adminId из JWT токена из заголовка Authorization
 * @param event - H3 event объект
 * @returns adminId или null, если токен отсутствует или невалиден
 */
export async function getAdminIdFromToken(event: H3Event): Promise<string | null> {
  try {
    const authHeader = getHeader(event, 'authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7) // Убираем "Bearer "
    
    if (!token) {
      return null
    }

    const payload = await verifyAdminToken(token)
    return payload.adminId || null
  } catch (error) {
    // Токен невалиден или истек
    console.error('Ошибка проверки токена админа:', error)
    return null
  }
}

/**
 * Проверяет авторизацию админа и возвращает adminId
 * Выбрасывает ошибку 401, если админ не авторизован
 */
export async function requireAdminAuth(event: H3Event): Promise<string> {
  const adminId = await getAdminIdFromToken(event)
  
  if (!adminId) {
    throw createError({
      statusCode: 401,
      message: 'Неавторизованный доступ. Требуется авторизация администратора.'
    })
  }
  
  return adminId
}

