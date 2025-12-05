export const useAdminAuth = () => {
  // Токен и админ НИКОГДА не инициализируются из localStorage автоматически!
  // Только после успешной валидации на сервере
  const token = useState<string | null>('admin:token', () => null)
  const admin = useState<any | null>('admin:user', () => null)

  const isAuthenticated = computed(() => !!token.value)

  const setAuth = (newToken: string, newAdmin: any) => {
    token.value = newToken
    admin.value = newAdmin
    if (process.client) {
      localStorage.setItem('admin_token', newToken)
      localStorage.setItem('admin_user', JSON.stringify(newAdmin))
    }
  }

  const clearAuth = () => {
    token.value = null
    admin.value = null
    if (process.client) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
    }
  }

  // $fetch с токеном (использует переданный токен, а не из state)
  const fetchWithToken = async (url: string, authToken: string, options: any = {}) => {
    const headers = options.headers || {}
    headers.Authorization = `Bearer ${authToken}`
    return $fetch(url, {
      ...options,
      headers
    })
  }

  // $fetch с текущим токеном из state с автоматической обработкой 401
  const $fetchWithAuth = async (url: string, options: any = {}) => {
    if (!token.value) {
      // Пытаемся восстановить токен из localStorage
      const savedToken = process.client ? localStorage.getItem('admin_token') : null
      if (savedToken) {
        try {
          const isValid = await checkAuth()
          if (!isValid) {
            throw new Error('No valid auth token')
          }
        } catch {
          throw new Error('No valid auth token')
        }
      } else {
        throw new Error('No auth token')
      }
    }

    try {
      return await fetchWithToken(url, token.value, options)
    } catch (error: any) {
      // Если получили 401, пытаемся проверить токен и обновить
      if (error.statusCode === 401 || error.status === 401) {
        console.log('🔄 Получена 401 ошибка, проверяю токен...')
        
        // Пытаемся проверить токен из localStorage
        const savedToken = process.client ? localStorage.getItem('admin_token') : null
        if (savedToken) {
          // Проверяем токен из localStorage (даже если он совпадает с текущим)
          try {
            const isValid = await checkAuth()
            if (isValid && token.value) {
              // Токен валиден, повторяем запрос с обновленным токеном
              console.log('✅ Токен проверен и валиден, повторяю запрос...')
              return await fetchWithToken(url, token.value, options)
            }
          } catch (checkError) {
            // Токен невалиден - продолжаем к очистке
            console.log('❌ Токен невалиден при проверке')
          }
        }
        
        // Токен невалиден или истек - очищаем авторизацию
        clearAuth()
        const authError: any = new Error('Сессия истекла. Пожалуйста, войдите заново.')
        authError.statusCode = 401
        authError.status = 401
        throw authError
      }
      
      // Другие ошибки пробрасываем дальше
      throw error
    }
  }

  // Вход в систему
  const login = async (loginValue: string, password: string) => {
    try {
      const response = await $fetch('/api/admin/auth/login', {
        method: 'POST',
        body: { login: loginValue, password }
      })
      
      if (response.success && response.token) {
        setAuth(response.token, response.admin)
        return { success: true, admin: response.admin }
      }
      
      throw new Error('Не удалось войти в систему')
    } catch (error: any) {
      console.error('Ошибка входа:', error)
      return { 
        success: false, 
        error: error.data?.message || error.message || 'Ошибка входа в систему' 
      }
    }
  }

  // Проверка авторизации - возвращает true только если токен ВАЛИДЕН на сервере
  const checkAuth = async (): Promise<boolean> => {
    if (!process.client) {
      return false
    }

    // Читаем токен из localStorage (НЕ устанавливаем в state!)
    const savedToken = localStorage.getItem('admin_token')
    
    if (!savedToken) {
      // Нет токена - очищаем state на всякий случай
      clearAuth()
      return false
    }

    try {
      // Проверяем токен на сервере
      const response = await fetchWithToken('/api/admin/auth/check', savedToken)
      
      if (response.success && response.admin) {
        // Токен валиден - ТЕПЕРЬ устанавливаем в state
        setAuth(savedToken, response.admin)
        return true
      }
      
      // Токен невалиден
      clearAuth()
      return false
    } catch (error) {
      // Ошибка проверки - очищаем всё
      clearAuth()
      return false
    }
  }

  // Выход из системы
  const logout = async () => {
    try {
      if (token.value) {
        await $fetchWithAuth('/api/admin/auth/logout', { method: 'POST' })
      }
    } catch (error) {
      console.error('Ошибка выхода:', error)
    } finally {
      clearAuth()
    }
  }

  return {
    token: readonly(token),
    admin: readonly(admin),
    isAuthenticated,
    setAuth,
    clearAuth,
    $fetchWithAuth,
    login,
    checkAuth,
    logout
  }
}
