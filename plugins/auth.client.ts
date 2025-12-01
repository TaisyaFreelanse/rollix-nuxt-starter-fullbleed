export default defineNuxtPlugin(() => {
  // Создаем перехватчик для всех $fetch запросов
  const authFetch = $fetch.create({
    onRequest({ options }) {
      const auth = useAuth()
      if (auth.token.value) {
        // Убеждаемся, что headers - это объект
        if (!options.headers) {
          options.headers = {}
        }
        
        // Если headers - массив, преобразуем в объект
        if (Array.isArray(options.headers)) {
          const headersObj: Record<string, string> = {}
          options.headers.forEach(([key, value]: [string, string]) => {
            headersObj[key] = value
          })
          options.headers = headersObj
        }
        
        // Добавляем токен авторизации
        if (typeof options.headers === 'object' && !Array.isArray(options.headers)) {
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${auth.token.value}`
          }
        }
      }
    }
  })

  // Заменяем глобальный $fetch только на клиенте
  if (process.client) {
    // @ts-ignore - заменяем глобальный $fetch
    globalThis.$fetch = authFetch
  }
})

