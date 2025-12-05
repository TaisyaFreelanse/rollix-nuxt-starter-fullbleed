import { getHeader, H3Event } from 'h3'
import { verifyAdminToken } from './admin-jwt'

/**
 * Извлекает adminId из JWT токена из заголовка Authorization
 * @param event - H3 event объект
 * @returns adminId или null, если токен отсутствует или невалиден
 */
export async function getAdminIdFromToken(event: H3Event): Promise<string | null> {
  try {
    // Пробуем получить заголовок в разных регистрах
    const authHeader = getHeader(event, 'authorization') || getHeader(event, 'Authorization')
    
    if (!authHeader) {
      console.log('[Admin Auth] Нет заголовка Authorization')
      return null
    }
    
    if (!authHeader.startsWith('Bearer ')) {
      console.log('[Admin Auth] Неверный формат заголовка Authorization:', authHeader.substring(0, 20))
      return null
    }

    const token = authHeader.substring(7) // Убираем "Bearer "
    
    if (!token || token.trim().length === 0) {
      console.log('[Admin Auth] Токен пустой после извлечения')
      return null
    }

    const payload = await verifyAdminToken(token)
    
    // Детальное логирование для отладки
    if (!payload) {
      console.log('[Admin Auth] Payload пустой после декодирования')
      return null
    }
    
    console.log('[Admin Auth] Декодированный payload:', JSON.stringify(payload))
    console.log('[Admin Auth] Payload keys:', Object.keys(payload))
    console.log('[Admin Auth] adminId в payload:', payload.adminId)
    
    if (!payload.adminId) {
      console.log('[Admin Auth] Токен не содержит adminId. Весь payload:', payload)
      return null
    }
    
    return payload.adminId
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

