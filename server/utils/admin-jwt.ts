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
    exp: now + 24 * 60 * 60 // 24 часа для админов
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
    const decoded = JSON.parse(Buffer.from(token, 'base64url').toString()) as AdminJWTPayload
    
    // Проверяем срок действия
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired')
    }
    
    return decoded
  } catch (error) {
    throw new Error('Invalid token')
  }
}

