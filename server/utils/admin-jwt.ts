// JWT утилиты для админов
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'admin-secret-key-change-in-production'

export interface AdminJWTPayload {
  adminId: string
  login: string
  iat?: number
  exp?: number
}

export async function generateAdminToken(payload: Omit<AdminJWTPayload, 'iat' | 'exp'>): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const jwtPayload: AdminJWTPayload = {
    ...payload,
    iat: now,
    exp: now + 7 * 24 * 60 * 60 // 7 дней для админов (было 24 часа)
  }

  // В реальном приложении использовать библиотеку jsonwebtoken
  // return jwt.sign(jwtPayload, ADMIN_JWT_SECRET)
  
  // Заглушка - возвращаем простой токен
  return Buffer.from(JSON.stringify(jwtPayload)).toString('base64url')
}

export async function verifyAdminToken(token: string): Promise<AdminJWTPayload> {
  try {
    // В реальном приложении использовать библиотеку jsonwebtoken
    // return jwt.verify(token, ADMIN_JWT_SECRET) as AdminJWTPayload
    
    // Заглушка - декодируем токен
    const decodedStr = Buffer.from(token, 'base64url').toString()
    console.log('[JWT] Декодированная строка:', decodedStr)
    
    const decoded = JSON.parse(decodedStr) as AdminJWTPayload
    console.log('[JWT] Декодированный объект:', JSON.stringify(decoded))
    console.log('[JWT] Тип decoded:', typeof decoded)
    console.log('[JWT] Ключи decoded:', Object.keys(decoded))
    
    // Проверяем срок действия
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      console.log('[JWT] Токен истек')
      throw new Error('Token expired')
    }
    
    return decoded
  } catch (error: any) {
    console.error('[JWT] Ошибка декодирования токена:', error.message || error)
    console.error('[JWT] Токен (первые 50 символов):', token.substring(0, 50))
    throw new Error('Invalid token')
  }
}

