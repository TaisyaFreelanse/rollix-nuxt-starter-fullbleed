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
    const decoded = JSON.parse(decodedStr) as any
    
    // Проверяем, что это токен админа, а не пользователя
    if (decoded.userId || decoded.phone) {
      console.log('[JWT Admin] Обнаружен токен пользователя вместо токена администратора!')
      throw new Error('This is a user token, not an admin token')
    }
    
    // Проверяем наличие обязательных полей админа
    if (!decoded.adminId || !decoded.login) {
      console.log('[JWT Admin] Токен не содержит обязательных полей админа (adminId, login)')
      throw new Error('Token does not contain adminId or login')
    }
    
    const adminPayload: AdminJWTPayload = {
      adminId: decoded.adminId,
      login: decoded.login,
      iat: decoded.iat,
      exp: decoded.exp
    }
    
    // Проверяем срок действия
    if (adminPayload.exp && adminPayload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired')
    }
    
    return adminPayload
  } catch (error: any) {
    if (error.message && (error.message.includes('user token') || error.message.includes('adminId'))) {
      throw error
    }
    throw new Error('Invalid admin token')
  }
}

