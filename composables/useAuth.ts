export const useAuth = () => {
  const token = useState<string | null>('auth:token', () => {
    if (process.client) {
      return localStorage.getItem('auth_token')
    }
    return null
  })

  const user = useState<any | null>('auth:user', () => {
    if (process.client) {
      const userStr = localStorage.getItem('auth_user')
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  })

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
    setAuth,
    clearAuth,
    $fetchWithAuth
  }
}

