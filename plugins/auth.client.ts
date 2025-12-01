export default defineNuxtPlugin(() => {
  // Перехватываем все $fetch запросы для добавления токена
  const originalFetch = $fetch
  
  // Создаем обертку с перехватчиком
  const authFetch = $fetch.create({
    onRequest({ options }) {
      const auth = useAuth()
      if (auth.token.value) {
        const headers = options.headers || {}
        if (typeof headers === 'object' && !Array.isArray(headers)) {
          options.headers = {
            ...headers,
            Authorization: `Bearer ${auth.token.value}`
          }
        }
      }
    }
  })

  // Заменяем глобальный $fetch на клиенте
  if (process.client) {
    // @ts-ignore
    globalThis.$fetch = authFetch
    // Также заменяем в window для совместимости
    // @ts-ignore
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.$fetch = authFetch
    }
  }
})

