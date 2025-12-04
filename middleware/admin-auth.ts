export default defineNuxtRouteMiddleware(async (to, from) => {
  // Middleware только инициализирует токен из localStorage
  // Реальная проверка и показ модального окна происходит в layout
  if (process.client) {
    const adminAuth = useAdminAuth()
    
    // Инициализируем токен из localStorage синхронно
    const savedToken = localStorage.getItem('admin_token')
    const savedAdmin = localStorage.getItem('admin_user')
    
    if (savedToken && !adminAuth.token.value) {
      try {
        adminAuth.setAuth(savedToken, savedAdmin ? JSON.parse(savedAdmin) : null)
      } catch (e) {
        console.error('Ошибка инициализации авторизации админа', e)
      }
    }
  }
})

