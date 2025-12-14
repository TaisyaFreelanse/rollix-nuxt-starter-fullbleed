/**
 * Клиент для работы с iikoCloud API
 * Документация: https://api-ru.iiko.services/
 */

interface IikoConfig {
  apiKey: string
  organizationId: string
  terminalGroupId: string
  baseUrl?: string
}

interface IikoTokenResponse {
  token: string
}

// Интерфейсы для заказов определены внутри методов

interface IikoOrderStatus {
  orderId: string
  status: 'New' | 'Bill' | 'Close' | 'Deleted'
  statusInfo?: string
  creationDate?: string
  items?: any[]
}

interface IikoMenuItem {
  id: string
  name: string
  description?: string
  sku?: string
  price?: number
  categoryId?: string
  images?: string[]
  modifiers?: any[]
  image?: string // Для обратной совместимости
}

interface IikoMenuResponse {
  groups: Array<{
    id: string
    name: string
    items: IikoMenuItem[]
  }>
  // Альтернативная структура - items на верхнем уровне
  items?: IikoMenuItem[]
  categories?: Array<{
    id: string
    name: string
    items: IikoMenuItem[]
  }>
}

export class IikoClient {
  private apiKey: string
  private organizationId: string
  private terminalGroupId: string
  private baseUrl: string
  private token: string | null = null
  private tokenExpiresAt: number = 0

  constructor(config: IikoConfig) {
    this.apiKey = config.apiKey
    this.organizationId = config.organizationId
    this.terminalGroupId = config.terminalGroupId
    this.baseUrl = config.baseUrl || 'https://api-ru.iiko.services'
  }

  /**
   * Получение токена доступа
   */
  private async getToken(): Promise<string> {
    // Проверяем, не истёк ли токен (с запасом 5 минут)
    if (this.token && Date.now() < this.tokenExpiresAt - 5 * 60 * 1000) {
      return this.token
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/1/access_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apiLogin: this.apiKey
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Ошибка получения токена iikoCloud (${response.status}): ${errorText}`)
      }

      const data: IikoTokenResponse = await response.json()
      this.token = data.token
      // Токен обычно действителен 24 часа
      this.tokenExpiresAt = Date.now() + 23 * 60 * 60 * 1000

      return this.token
    } catch (error: any) {
      console.error('[iikoCloud] Ошибка получения токена:', error)
      throw new Error(`Ошибка подключения к iikoCloud API: ${error.message}`)
    }
  }

  /**
   * Выполнение запроса к API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getToken()

    const url = `${this.baseUrl}${endpoint}`
    const headers = {
      'Authorization': `Bearer ${token}`,
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
        console.error(`[iikoCloud] Ошибка API (${response.status}):`, errorText)
        throw new Error(`iikoCloud API ошибка (${response.status}): ${errorText}`)
      }

      return await response.json()
    } catch (error: any) {
      if (error.message.includes('токена') || error.message.includes('token')) {
        // Сбрасываем токен при ошибке авторизации
        this.token = null
        this.tokenExpiresAt = 0
      }
      console.error('[iikoCloud] Ошибка запроса:', error)
      throw error
    }
  }

  /**
   * Создание заказа в iikoCloud
   * Согласно документации: https://api-ru.iiko.services/docs
   */
  async createOrder(orderData: {
    phone?: string
    customerName?: string
    comment?: string
    items: Array<{
      productId: string
      productName: string
      quantity: number
      price: number
      modifiers?: Array<{
        id?: string
        name: string
        price: number
      }>
    }>
    address?: string
    deliveryType?: 'DELIVERY' | 'PICKUP'
    deliveryTime?: Date | string
  }): Promise<{ iikoOrderId: string }> {
    try {
      // Преобразуем данные заказа в формат iikoCloud
      // Согласно документации, структура items должна быть:
      // { id: string, amount: number, productSizeId?: string, modifiers?: [...], comment?: string }
      const iikoItems: any[] = orderData.items.map(item => {
        const itemData: any = {
          id: item.productId, // ID товара из iiko
          amount: item.quantity
        }

        // Добавляем модификаторы, если они есть
        // Структура модификатора: { id: string, amount: number, productSizeId?: string }
        if (item.modifiers && item.modifiers.length > 0) {
          itemData.modifiers = item.modifiers.map(mod => ({
            id: mod.id || mod.name, // ID модификатора из iiko
            amount: 1
          }))
        }

        return itemData
      })

      // Определяем тип доставки
      const isDelivery = orderData.deliveryType !== 'PICKUP'

      // Формируем структуру заказа согласно документации
      const requestData: any = {
        organizationId: this.organizationId,
        terminalGroupId: this.terminalGroupId,
        order: {
          items: iikoItems
        }
      }

      // Добавляем информацию о клиенте
      if (orderData.phone || orderData.customerName) {
        requestData.order.customer = {}
        if (orderData.phone) {
          requestData.order.customer.phone = orderData.phone
        }
        if (orderData.customerName) {
          requestData.order.customer.name = orderData.customerName
        }
      }

      // Добавляем комментарий
      if (orderData.comment) {
        requestData.order.comment = orderData.comment
      }

      // Добавляем адрес доставки для доставки курьером
      if (isDelivery && orderData.address) {
        // Парсим адрес (простая логика, можно улучшить)
        const addressParts = orderData.address.split(',')
        requestData.order.deliveryPoint = {
          address: {
            street: {
              name: addressParts[0]?.trim() || '',
              city: '' // Можно добавить парсинг города
            },
            house: addressParts[1]?.trim() || '',
            flat: addressParts[2]?.trim() || ''
          }
        }
      }

      // Добавляем дату доставки
      if (orderData.deliveryTime) {
        requestData.order.deliveryDate = new Date(orderData.deliveryTime).toISOString()
      }

      const response: any = await this.request('/api/1/deliveries/create', {
        method: 'POST',
        body: JSON.stringify(requestData)
      })

      // API возвращает orderId в ответе
      return {
        iikoOrderId: response.orderInfo?.order?.id || response.orderId || response.id
      }
    } catch (error: any) {
      console.error('[iikoCloud] Ошибка создания заказа:', error)
      throw new Error(`Ошибка создания заказа в iikoCloud: ${error.message}`)
    }
  }

  /**
   * Получение статуса заказа из iikoCloud
   */
  async getOrderStatus(iikoOrderId: string): Promise<IikoOrderStatus> {
    try {
      const response = await this.request<IikoOrderStatus>(
        `/api/1/deliveries/by_id`,
        {
          method: 'POST',
          body: JSON.stringify({
            organizationId: this.organizationId,
            orderIds: [iikoOrderId]
          })
        }
      )

      // API может вернуть массив заказов или один заказ
      if (Array.isArray(response)) {
        const order = response.find(o => o.orderId === iikoOrderId)
        if (!order) {
          throw new Error(`Заказ ${iikoOrderId} не найден в iikoCloud`)
        }
        return order
      }

      return response
    } catch (error: any) {
      console.error('[iikoCloud] Ошибка получения статуса заказа:', error)
      throw new Error(`Ошибка получения статуса заказа из iikoCloud: ${error.message}`)
    }
  }

  /**
   * Отмена заказа в iikoCloud
   */
  async cancelOrder(iikoOrderId: string, reason?: string): Promise<boolean> {
    try {
      await this.request('/api/1/deliveries/cancel', {
        method: 'POST',
        body: JSON.stringify({
          organizationId: this.organizationId,
          orderId: iikoOrderId,
          cancellationComment: reason || 'Отменено клиентом'
        })
      })

      return true
    } catch (error: any) {
      console.error('[iikoCloud] Ошибка отмены заказа:', error)
      throw new Error(`Ошибка отмены заказа в iikoCloud: ${error.message}`)
    }
  }

  /**
   * Получение внешнего меню из iikoCloud
   * Согласно документации: https://api-ru.iiko.services/docs
   * Endpoint: POST /api/1/nomenclature
   * Возвращает: категории, товары, модификаторы, стоп-листы
   */
  async getMenu(): Promise<IikoMenuResponse> {
    try {
      const response = await this.request<any>(
        '/api/1/nomenclature',
        {
          method: 'POST',
          body: JSON.stringify({
            organizationId: this.organizationId,
            // startRevision - опционально, для инкрементальной синхронизации
            // Можно добавить позже для оптимизации
          })
        }
      )

      // Логируем структуру ответа для отладки
      console.log('[iikoCloud] Ответ от API:')
      console.log('  - groups:', response.groups?.length || 0)
      console.log('  - items:', response.items?.length || 0)
      console.log('  - productCategories:', response.productCategories?.length || 0)
      console.log('  - Ключи ответа:', Object.keys(response))
      
      if (response.groups && response.groups.length > 0) {
        console.log('  - Первая группа (первые 200 символов):', JSON.stringify(response.groups[0]).substring(0, 200))
      }

      // API возвращает структуру с группами товаров (категориями)
      // и товарами внутри групп, а также модификаторы отдельно
      // Преобразуем в наш формат для обратной совместимости
      const menuResponse: IikoMenuResponse = {
        groups: response.groups || [],
        items: response.items || [],
        categories: response.productCategories || response.categories || []
      }

      return menuResponse
    } catch (error: any) {
      console.error('[iikoCloud] Ошибка получения меню:', error)
      throw new Error(`Ошибка получения меню из iikoCloud: ${error.message}`)
    }
  }

  /**
   * Проверка соединения с iikoCloud
   */
  async healthCheck(): Promise<{ connected: boolean; organizationId?: string }> {
    try {
      await this.getToken()
      return {
        connected: true,
        organizationId: this.organizationId
      }
    } catch (error: any) {
      return {
        connected: false
      }
    }
  }
}

// Создаём singleton экземпляр
let iikoClientInstance: IikoClient | null = null

export function getIikoClient(): IikoClient {
  if (!iikoClientInstance) {
    const apiKey = process.env.IIKO_API_KEY
    const organizationId = process.env.IIKO_ORGANIZATION_ID
    const terminalGroupId = process.env.IIKO_TERMINAL_GROUP_ID
    const baseUrl = process.env.IIKO_API_URL

    if (!apiKey || !organizationId || !terminalGroupId) {
      throw new Error(
        'iikoCloud API не настроен. Проверьте переменные окружения: ' +
        'IIKO_API_KEY, IIKO_ORGANIZATION_ID, IIKO_TERMINAL_GROUP_ID'
      )
    }

    iikoClientInstance = new IikoClient({
      apiKey,
      organizationId,
      terminalGroupId,
      baseUrl
    })
  }

  return iikoClientInstance
}

