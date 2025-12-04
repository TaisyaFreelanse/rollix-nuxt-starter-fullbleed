// Скрипт для создания первого администратора
// Использование: npx tsx scripts/create-admin.ts admin password "Admin Name"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createAdmin() {
  const login = process.argv[2] || 'admin'
  const password = process.argv[3] || 'admin123'
  const name = process.argv[4] || 'Администратор'

  if (!login || !password) {
    console.error('Использование: npx tsx scripts/create-admin.ts <login> <password> [name]')
    process.exit(1)
  }

  try {
    // Простое хэширование пароля (для продакшена использовать bcrypt)
    const hashedPassword = Buffer.from(password).toString('base64')

    // Проверяем, не существует ли уже админ с таким логином
    const existing = await prisma.admin.findUnique({
      where: { login }
    })

    if (existing) {
      console.error(`Администратор с логином "${login}" уже существует`)
      process.exit(1)
    }

    // Создаем админа
    const admin = await prisma.admin.create({
      data: {
        login,
        password: hashedPassword,
        name,
        isActive: true
      }
    })

    console.log('✅ Администратор успешно создан!')
    console.log(`Логин: ${admin.login}`)
    console.log(`Имя: ${admin.name}`)
    console.log(`ID: ${admin.id}`)
  } catch (error) {
    console.error('Ошибка создания администратора:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()

