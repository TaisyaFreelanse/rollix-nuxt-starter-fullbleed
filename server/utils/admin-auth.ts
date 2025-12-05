import { getHeader, H3Event } from 'h3'
import { verifyAdminToken } from './admin-jwt'

/**
 * Извлекает adminId из JWT токена из заголовка Authorization
 * @param event - H3 event объект
 * @returns adminId или null, если токен отсутствует или невалиден
 */
export async function getAdminIdFromToken(event: H3Event): Promise<string | null> {
  try {
    const authHeader = getHeader(event, 'authorization') || getHeader(event, 'Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('[Admin Auth] Нет заголовка Authorization или неверный формат')
      return null
    }

    const token = authHeader.substring(7) // Убираем "Bearer "
    
    if (!token) {
      console.log('[Admin Auth] Токен пустой после извлечения')
      return null
    }

    const payload = await verifyAdminToken(token)
    return payload.adminId || null
  } catch (error: any) {
    // Токен невалиден или истек
    console.error('[Admin Auth] Ошибка проверки токена:', error.message || error)
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

