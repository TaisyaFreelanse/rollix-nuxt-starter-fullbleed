/**
 * Проверка состояния интеграции с iikoCloud
 */
export default defineEventHandler(async (event) => {
  try {
    const apiKey = process.env.IIKO_API_KEY
    const organizationId = process.env.IIKO_ORGANIZATION_ID
    const terminalGroupId = process.env.IIKO_TERMINAL_GROUP_ID
    const baseUrl = process.env.IIKO_API_URL

    const isConfigured = !!(apiKey && organizationId && terminalGroupId)

    if (!isConfigured) {
      return {
        configured: false,
        connected: false,
        note: 'iikoCloud API не настроен. Установите IIKO_API_KEY, IIKO_ORGANIZATION_ID и IIKO_TERMINAL_GROUP_ID'
      }
    }

    // Проверяем реальное подключение
    try {
      const { getIikoClient } = await import('~/server/utils/iiko-client')
      const client = getIikoClient()
      const health = await client.healthCheck()

      return {
        configured: true,
        connected: health.connected,
        organizationId: health.organizationId,
        baseUrl: baseUrl || 'https://api-ru.iiko.services',
        note: health.connected
          ? 'iikoCloud API настроен и доступен'
          : 'iikoCloud API настроен, но не удалось подключиться'
      }
    } catch (error: any) {
      return {
        configured: true,
        connected: false,
        error: error.message,
        note: 'Ошибка проверки подключения к iikoCloud API'
      }
    }
  } catch (error: any) {
    return {
      configured: false,
      connected: false,
      error: error.message,
      note: 'Ошибка проверки состояния iikoCloud API'
    }
  }
})

