/**
 * Проверка состояния интеграции с АЙКО
 */
export default defineEventHandler(async (event) => {
  try {
    const AIKO_API_URL = process.env.AIKO_API_URL
    const AIKO_API_KEY = process.env.AIKO_API_KEY

    const isConfigured = !!(AIKO_API_URL && AIKO_API_KEY)

    // Заглушка проверки подключения
    // В реальной реализации здесь был бы запрос к health endpoint АЙКО
    const isConnected = isConfigured

    return {
      configured: isConfigured,
      connected: isConnected,
      apiUrl: AIKO_API_URL ? '***configured***' : null,
      note: isConfigured
        ? 'АЙКО API настроен (заглушка - реальная проверка будет реализована позже)'
        : 'АЙКО API не настроен. Установите AIKO_API_URL и AIKO_API_KEY'
    }
  } catch (error: any) {
    return {
      configured: false,
      connected: false,
      error: error.message,
      note: 'Ошибка проверки состояния АЙКО API'
    }
  }
})

