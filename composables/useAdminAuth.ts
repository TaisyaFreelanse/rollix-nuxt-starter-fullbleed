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
    // Создаем новый объект заголовков
    const headers: Record<string, string> = {}
    
    // Копируем существующие заголовки
    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        if (value) {
          headers[key] = String(value)
        }
      })
    }
    
    // Устанавливаем заголовок Authorization
    headers['Authorization'] = `Bearer ${authToken}`
    
    return $fetch(url, {
      ...options,
      headers
    })
  }

  // $fetch с текущим токеном из state
  const $fetchWithAuth = async (url: string, options: any = {}) => {
    // ВСЕГДА берем токен из localStorage - это источник истины
    let currentToken: string | null = null
    
    if (process.client) {
      currentToken = localStorage.getItem('admin_token')
      // Обновляем state из localStorage, если токен найден
      if (currentToken) {
        token.value = currentToken
        // Также восстанавливаем админа из localStorage
        const savedAdmin = localStorage.getItem('admin_user')
        if (savedAdmin) {
          try {
            admin.value = JSON.parse(savedAdmin)
          } catch {
            // Игнорируем ошибки парсинга
          }
        }
      }
    }

    if (!currentToken) {
      const error: any = new Error('Сессия истекла. Пожалуйста, войдите заново.')
      error.statusCode = 401
      error.status = 401
      throw error
    }

    try {
      return await fetchWithToken(url, currentToken, options)
    } catch (error: any) {
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
        // Убеждаемся, что токен действительно сохранен
        if (process.client) {
          await nextTick()
          const savedToken = localStorage.getItem('admin_token')
          if (!savedToken || savedToken !== response.token) {
            console.error('⚠️ Токен не сохранился после логина! Сохраняем еще раз...')
            localStorage.setItem('admin_token', response.token)
            localStorage.setItem('admin_user', JSON.stringify(response.admin))
            token.value = response.token
            admin.value = response.admin
          }
        }
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
      
      // Токен невалиден - НЕ очищаем сразу, чтобы пользователь мог увидеть ошибку
      return false
    } catch (error: any) {
      // Ошибка проверки - НЕ очищаем сразу, если это 401, возможно это временная ошибка
      if (error.statusCode === 401 || error.status === 401) {
        // Только если токен действительно истек, очищаем авторизацию
        // Но не сразу - дадим пользователю возможность увидеть ошибку
        return false
      }
      
      // Другие ошибки - не очищаем авторизацию
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
