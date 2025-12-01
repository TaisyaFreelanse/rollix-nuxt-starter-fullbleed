export default defineNuxtRouteMiddleware((to, from) => {
  // Проверяем авторизацию только на клиенте
  if (process.client) {
    const auth = useAuth()
    
    // Инициализируем токен из localStorage синхронно
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')
    
    if (savedToken && !auth.token.value) {
      try {
        auth.setAuth(savedToken, savedUser ? JSON.parse(savedUser) : null)
      } catch (e) {
        console.error('Ошибка инициализации авторизации', e)
      }
    }
    
    // Если пользователь не авторизован после инициализации, перенаправляем на главную
    if (!auth.isAuthenticated.value) {
      return navigateTo('/')
    }
  }
})

