import { prisma } from './prisma'
import { hashPassword } from './password'

/**
 * Создает первого администратора, если его еще нет
 * Вызывается при старте приложения
 */
export async function createDefaultAdminIfNeeded() {
  try {
    // Проверяем, есть ли уже администраторы
    const adminCount = await prisma.admin.count()
    
    if (adminCount === 0) {
      // Создаем первого администратора
      const hashedPassword = await hashPassword('admin123')
      
      await prisma.admin.create({
        data: {
          login: 'admin',
          password: hashedPassword,
          name: 'Администратор',
          isActive: true
        }
      })
      
      console.log('✅ Создан первый администратор: admin / admin123')
    }
  } catch (error) {
    console.error('❌ Ошибка создания администратора по умолчанию:', error)
  }
}

