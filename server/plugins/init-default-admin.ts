import { createDefaultAdminIfNeeded } from '~/server/utils/create-default-admin'

export default defineNuxtPlugin(async () => {
  // Создаем первого администратора при старте приложения
  // Работает только на сервере
  if (process.server) {
    try {
      await createDefaultAdminIfNeeded()
    } catch (error) {
      console.error('Ошибка инициализации администратора по умолчанию:', error)
    }
  }
})

