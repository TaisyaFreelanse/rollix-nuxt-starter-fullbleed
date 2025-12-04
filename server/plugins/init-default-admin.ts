// Плагин для автоматического создания первого администратора при старте
// Создает администратора с логином "admin" и паролем "admin123", если администраторов нет

import { createDefaultAdminIfNeeded } from '~/server/utils/create-default-admin'

export default defineNitroPlugin((nitroApp) => {
  // Создаем первого администратора при старте сервера
  // Выполняется асинхронно, не блокируя старт сервера
  createDefaultAdminIfNeeded().catch((error) => {
    console.error('Ошибка инициализации администратора по умолчанию:', error)
  })
})

