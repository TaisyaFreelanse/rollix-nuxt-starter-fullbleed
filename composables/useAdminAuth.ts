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
      // Очищаем токен пользователя, если он есть, чтобы избежать путаницы
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      // Сохраняем токен админа
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
      
      // Если токен найден, проверяем, что это токен админа, а не пользователя
      if (currentToken) {
        try {
          // Декодируем токен (base64url на клиенте)
          // base64url использует - и _ вместо + и /
          const base64 = currentToken.replace(/-/g, '+').replace(/_/g, '/')
          const decodedStr = atob(base64)
          const decoded = JSON.parse(decodedStr)
          
          // Если это токен пользователя (содержит userId/phone), очищаем его
          if (decoded.userId || decoded.phone) {
            console.error('⚠️ Обнаружен токен пользователя в admin_token! Очищаю...')
            localStorage.removeItem('admin_token')
            localStorage.removeItem('admin_user')
            currentToken = null
          } else if (decoded.adminId && decoded.login) {
            // Это токен админа - все хорошо
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
        } catch (e) {
          // Если не удалось декодировать, возможно токен поврежден
          console.error('⚠️ Не удалось декодировать токен админа:', e)
          localStorage.removeItem('admin_token')
          localStorage.removeItem('admin_user')
          currentToken = null
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

    // Читаем токен из localStorage
    const savedToken = localStorage.getItem('admin_token')
    
    if (!savedToken) {
      clearAuth()
      return false
    }

    // Проверяем, что это токен админа, а не пользователя
    try {
      // Декодируем токен (base64url на клиенте)
      const base64 = savedToken.replace(/-/g, '+').replace(/_/g, '/')
      const decodedStr = atob(base64)
      const decoded = JSON.parse(decodedStr)
      
      // Если это токен пользователя, очищаем его
      if (decoded.userId || decoded.phone) {
        console.error('⚠️ Обнаружен токен пользователя в admin_token при checkAuth! Очищаю...')
        clearAuth()
        return false
      }
    } catch (e) {
      // Если не удалось декодировать, очищаем токен
      clearAuth()
      return false
    }

    try {
      // Проверяем токен на сервере
      const response = await fetchWithToken('/api/admin/auth/check', savedToken)
      
      if (response.success && response.admin) {
        // Токен валиден - устанавливаем в state
        setAuth(savedToken, response.admin)
        return true
      }
      
      return false
    } catch (error: any) {
      // Если получили 401, очищаем авторизацию
      if (error.statusCode === 401 || error.status === 401) {
        clearAuth()
      }
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
