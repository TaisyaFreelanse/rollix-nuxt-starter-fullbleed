export const useAdminAuth = () => {
  const token = useState<string | null>('admin:token', () => {
    // Инициализация из localStorage только на клиенте
    if (process.client) {
      return localStorage.getItem('admin_token')
    }
    return null
  })
  
  const admin = useState<any | null>('admin:user', () => {
    // Инициализация из localStorage только на клиенте
    if (process.client) {
      const savedAdmin = localStorage.getItem('admin_user')
      if (savedAdmin) {
        try {
          return JSON.parse(savedAdmin)
        } catch (e) {
          console.error('Ошибка парсинга админа из localStorage', e)
          return null
        }
      }
    }
    return null
  })
  
  const isInitialized = useState<boolean>('admin:initialized', () => false)

  // Инициализация на клиенте после монтирования
  if (process.client) {
    onMounted(() => {
      if (!isInitialized.value) {
        const savedToken = localStorage.getItem('admin_token')
        const savedAdmin = localStorage.getItem('admin_user')
        if (savedToken && !token.value) {
          token.value = savedToken
        }
        if (savedAdmin && !admin.value) {
          try {
            admin.value = JSON.parse(savedAdmin)
          } catch (e) {
            console.error('Ошибка парсинга админа из localStorage', e)
          }
        }
        isInitialized.value = true
      }
    })
  }

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

  // Настройка $fetch для автоматической отправки токена
  const $fetchWithAuth = async (url: string, options: any = {}) => {
    const headers = options.headers || {}
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`
    }
    return $fetch(url, {
      ...options,
      headers
    })
  }

  // Вход в систему
  const login = async (login: string, password: string) => {
    try {
      const response = await $fetch('/api/admin/auth/login', {
        method: 'POST',
        body: { login, password }
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

  // Проверка авторизации
  const checkAuth = async () => {
    if (!token.value) {
      return false
    }

    try {
      const response = await $fetchWithAuth('/api/admin/auth/check')
      if (response.success && response.admin) {
        setAuth(token.value, response.admin)
        return true
      }
      return false
    } catch (error) {
      clearAuth()
      return false
    }
  }

  // Выход из системы
  const logout = async () => {
    try {
      await $fetchWithAuth('/api/admin/auth/logout', { method: 'POST' })
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
    isInitialized: readonly(isInitialized),
    setAuth,
    clearAuth,
    $fetchWithAuth,
    login,
    checkAuth,
    logout
  }
}

