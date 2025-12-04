// Утилиты для работы с паролями
// ВНИМАНИЕ: Для продакшена необходимо установить bcrypt: npm install bcrypt @types/bcrypt

/**
 * Хэширует пароль
 * В продакшене использовать bcrypt: return await bcrypt.hash(password, 10)
 */
export async function hashPassword(password: string): Promise<string> {
  // Простое хэширование для демо (НЕ использовать в продакшене!)
  // В продакшене: const bcrypt = await import('bcrypt'); return await bcrypt.hash(password, 10);
  
  // Для демо используем простой base64 хэш (НЕ БЕЗОПАСНО!)
  return Buffer.from(password).toString('base64')
}

/**
 * Сравнивает пароль с хэшем
 * В продакшене использовать bcrypt: return await bcrypt.compare(password, hash)
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  // Простое сравнение для демо (НЕ использовать в продакшене!)
  // В продакшене: const bcrypt = await import('bcrypt'); return await bcrypt.compare(password, hash);
  
  // Для демо просто сравниваем base64
  const passwordHash = Buffer.from(password).toString('base64')
  return passwordHash === hash
}

