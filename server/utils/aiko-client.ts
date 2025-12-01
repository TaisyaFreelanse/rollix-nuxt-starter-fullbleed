/**
 * Клиент для работы с API АЙКО
 * Заглушка для будущей интеграции
 */

const AIKO_API_URL = process.env.AIKO_API_URL
const AIKO_API_KEY = process.env.AIKO_API_KEY

export class AikoClient {
  private baseUrl: string
  private apiKey: string

  constructor() {
    if (!AIKO_API_URL || !AIKO_API_KEY) {
      console.warn('[АЙКО] API не настроен. Используется режим заглушки.')
    }
    this.baseUrl = AIKO_API_URL || ''
    this.apiKey = AIKO_API_KEY || ''
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    if (!this.baseUrl || !this.apiKey) {
      throw new Error('АЙКО API не настроен. Проверьте AIKO_API_URL и AIKO_API_KEY')
    }

    const url = `${this.baseUrl}${endpoint}`
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`АЙКО API ошибка (${response.status}): ${errorText}`)
      }

      return await response.json()
    } catch (error: any) {
      console.error('[АЙКО] Ошибка запроса:', error)
      throw new Error(`Ошибка подключения к АЙКО API: ${error.message}`)
    }
  }

  /**
   * Получение меню из АЙКО
   */
  async getMenu(): Promise<any> {
    // Заглушка
    console.log('[АЙКО] getMenu() - заглушка')
    return {
      categories: [],
      products: [],
      lastSync: new Date().toISOString()
    }

    // Реальная реализация:
    // return this.request('/api/menu')
  }

  /**
   * Отправка заказа в АЙКО
   */
  async createOrder(orderData: any): Promise<{ aikoOrderId: string }> {
    // Заглушка
    console.log('[АЙКО] createOrder() - заглушка', orderData)
    return {
      aikoOrderId: `AIKO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    // Реальная реализация:
    // return this.request('/api/orders', {
    //   method: 'POST',
    //   body: JSON.stringify(orderData)
    // })
  }

  /**
   * Получение статуса заказа из АЙКО
   */
  async getOrderStatus(aikoOrderId: string): Promise<any> {
    // Заглушка
    console.log('[АЙКО] getOrderStatus() - заглушка', aikoOrderId)
    return {
      orderId: aikoOrderId,
      status: 'PREPARING',
      estimatedTime: 30,
      message: 'Заказ готовится (заглушка)',
      updatedAt: new Date().toISOString()
    }

    // Реальная реализация:
    // return this.request(`/api/orders/${aikoOrderId}/status`)
  }

  /**
   * Отмена заказа в АЙКО
   */
  async cancelOrder(aikoOrderId: string, reason?: string): Promise<boolean> {
    // Заглушка
    console.log('[АЙКО] cancelOrder() - заглушка', aikoOrderId, reason)
    return true

    // Реальная реализация:
    // return this.request(`/api/orders/${aikoOrderId}/cancel`, {
    //   method: 'POST',
    //   body: JSON.stringify({ reason })
    // })
  }
}

// Singleton instance
export const aikoClient = new AikoClient()

