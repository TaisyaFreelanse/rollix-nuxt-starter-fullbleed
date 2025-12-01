// Простая реализация JWT (в продакшене использовать библиотеку типа jsonwebtoken)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export interface JWTPayload {
  userId: string
  phone: string
  iat?: number
  exp?: number
}

export async function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }

  const now = Math.floor(Date.now() / 1000)
  const jwtPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + 30 * 24 * 60 * 60 // 30 дней
  }

  // В реальном приложении использовать библиотеку jsonwebtoken
  // return jwt.sign(jwtPayload, JWT_SECRET)
  
  // Заглушка - возвращаем простой токен
  return Buffer.from(JSON.stringify(jwtPayload)).toString('base64url')
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    // В реальном приложении использовать библиотеку jsonwebtoken
    // return jwt.verify(token, JWT_SECRET) as JWTPayload
    
    // Заглушка - декодируем токен
    const decoded = JSON.parse(Buffer.from(token, 'base64url').toString()) as JWTPayload
    
    // Проверяем срок действия
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired')
    }
    
    return decoded
  } catch (error) {
    throw new Error('Invalid token')
  }
}

