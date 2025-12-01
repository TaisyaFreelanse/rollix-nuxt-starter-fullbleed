export const useAuth = () => {
  const token = useState<string | null>('auth:token', () => {
    // Инициализация из localStorage только на клиенте
    if (process.client) {
      return localStorage.getItem('auth_token')
    }
    return null
  })
  
  const user = useState<any | null>('auth:user', () => {
    // Инициализация из localStorage только на клиенте
    if (process.client) {
      const savedUser = localStorage.getItem('auth_user')
      if (savedUser) {
        try {
          return JSON.parse(savedUser)
        } catch (e) {
          console.error('Ошибка парсинга пользователя из localStorage', e)
          return null
        }
      }
    }
    return null
  })
  
  const isInitialized = useState<boolean>('auth:initialized', () => false)

  // Инициализация на клиенте после монтирования
  if (process.client) {
    onMounted(() => {
      if (!isInitialized.value) {
        const savedToken = localStorage.getItem('auth_token')
        const savedUser = localStorage.getItem('auth_user')
        if (savedToken && !token.value) {
          token.value = savedToken
        }
        if (savedUser && !user.value) {
          try {
            user.value = JSON.parse(savedUser)
          } catch (e) {
            console.error('Ошибка парсинга пользователя из localStorage', e)
          }
        }
        isInitialized.value = true
      }
    })
  }

  const isAuthenticated = computed(() => !!token.value)

  const setAuth = (newToken: string, newUser: any) => {
    token.value = newToken
    user.value = newUser
    if (process.client) {
      localStorage.setItem('auth_token', newToken)
      localStorage.setItem('auth_user', JSON.stringify(newUser))
    }
  }

  const clearAuth = () => {
    token.value = null
    user.value = null
    if (process.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
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

  return {
    token: readonly(token),
    user: readonly(user),
    isAuthenticated,
    isInitialized: readonly(isInitialized),
    setAuth,
    clearAuth,
    $fetchWithAuth
  }
}
