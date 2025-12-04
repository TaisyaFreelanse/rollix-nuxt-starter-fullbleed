export default defineNuxtRouteMiddleware(async (to, from) => {
  // Проверяем авторизацию только на клиенте
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
    
    // Проверяем авторизацию
    if (!adminAuth.isAuthenticated.value) {
      // Сохраняем URL, на который пытались зайти, чтобы вернуться после входа
      const returnUrl = to.fullPath
      return navigateTo(`/admin?returnUrl=${encodeURIComponent(returnUrl)}`)
    }
  }
})

