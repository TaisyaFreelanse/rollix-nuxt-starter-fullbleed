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
        
        // Обработка ошибки авторизации (401) - сбрасываем токен и повторяем запрос
        if (response.status === 401) {
          console.warn(`[iikoCloud] ⚠️  Ошибка авторизации (401). Сбрасываем токен и повторяем запрос...`)
          
          // Сбрасываем токен
          this.token = null
          this.tokenExpiresAt = 0
          
          // Получаем новый токен
          const newToken = await this.getToken()
          
          // Обновляем заголовки с новым токеном
          const newHeaders = {
            'Authorization': `Bearer ${newToken}`,
            'Content-Type': 'application/json',
            ...options.headers
          }
          
          // Повторная попытка запроса с новым токеном
          console.log(`[iikoCloud] Повторная попытка запроса с новым токеном...`)
          const retryResponse = await fetch(url, {
            ...options,
            headers: newHeaders
          })
          
          if (retryResponse.ok) {
            console.log(`[iikoCloud] ✅ Запрос успешен после обновления токена`)
            return await retryResponse.json()
          } else {
            const retryErrorText = await retryResponse.text()
            console.error(`[iikoCloud] ❌ Повторная попытка также не удалась (${retryResponse.status})`)
            console.error(`[iikoCloud] Возможные причины ошибки 401:`)
            console.error(`  1. API ключ (IIKO_API_KEY) неверный или истек`)
            console.error(`  2. У API ключа нет необходимых прав доступа в iiko Web`)
            console.error(`  3. Нужно настроить права доступа в iiko Web:`)
            console.error(`     - Откройте iiko Web → Настройки → Права доступа`)
            console.error(`     - Убедитесь, что для вашего API ключа включены права:`)
            console.error(`       * Работа с API`)
            console.error(`       * Просмотр внешнего меню`)
            console.error(`       * Создание заказов`)
            console.error(`  4. OrganizationId указан неправильно`)
            console.error(`[iikoCloud] Текст ошибки:`, retryErrorText.substring(0, 200))
            throw new Error(`iikoCloud API ошибка (401): Недостаточно прав доступа. Проверьте настройки прав в iiko Web. ${retryErrorText.substring(0, 200)}`)
          }
        }
        
        // Обработка rate limiting (429) - делаем задержку и повторную попытку
        if (response.status === 429) {
          console.warn(`[iikoCloud] ⚠️  Rate limit (429). Ожидание 5 секунд перед повторной попыткой...`)
          await new Promise(resolve => setTimeout(resolve, 5000)) // Ждем 5 секунд
          
          // Повторная попытка запроса
          console.log(`[iikoCloud] Повторная попытка запроса после rate limit...`)
          const retryResponse = await fetch(url, {
            ...options,
            headers
          })
          
          if (retryResponse.ok) {
            return await retryResponse.json()
          } else {
            const retryErrorText = await retryResponse.text()
            console.error(`[iikoCloud] Повторная попытка также не удалась (${retryResponse.status})`)
            throw new Error(`iikoCloud API ошибка (${retryResponse.status}): ${retryErrorText.substring(0, 200)}`)
          }
        }
        
        console.error(`[iikoCloud] Ошибка API (${response.status}) при запросе ${url}:`, errorText.substring(0, 500))
        
        // Логируем детали запроса для отладки
        if (options.body && typeof options.body === 'string') {
          try {
            const bodyObj = JSON.parse(options.body)
            console.error(`[iikoCloud] Тело запроса было:`, JSON.stringify(bodyObj, null, 2))
          } catch (e) {
            console.error(`[iikoCloud] Не удалось распарсить тело запроса`)
          }
        }
        
        throw new Error(`iikoCloud API ошибка (${response.status}): ${errorText.substring(0, 200)}`)
      }

      return await response.json()
    } catch (error: any) {
      if (error.message.includes('токена') || error.message.includes('token') || error.message.includes('401')) {
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
      // Сначала пробуем получить номенклатуру
      // Если она пустая, пробуем использовать внешнее меню
      console.log('[iikoCloud] Попытка 1: Получение номенклатуры через /api/1/nomenclature')
      
      const nomenclatureRequest = {
        organizationId: this.organizationId
      }
      
      const nomenclatureResponse = await this.request<any>(
        '/api/1/nomenclature',
        {
          method: 'POST',
          body: JSON.stringify(nomenclatureRequest)
        }
      )

      // Если номенклатура не пустая, используем её
      if (nomenclatureResponse.products && nomenclatureResponse.products.length > 0) {
        console.log(`[iikoCloud] ✅ Номенклатура получена: ${nomenclatureResponse.products.length} товаров`)
        return this.formatNomenclatureResponse(nomenclatureResponse)
      }

      // Если номенклатура пустая, выводим предупреждение
      // terminalGroupId не поддерживается в /api/1/nomenclature согласно документации
      if (!nomenclatureResponse.products || nomenclatureResponse.products.length === 0) {
        console.warn('[iikoCloud] ⚠️  Номенклатура пустая!')
        console.warn('[iikoCloud] Возможные причины:')
        console.warn('  1. В организации нет товаров в номенклатуре')
        console.warn('  2. Товары не включены в меню (isIncludedInMenu: false)')
        console.warn('  3. Товары находятся в стоп-листе')
        console.warn('  4. OrganizationId указан неправильно')
        console.warn('  5. Нужно настроить меню в админке iiko')
      }

      // Если номенклатура все еще пустая, пробуем внешнее меню
      console.log('[iikoCloud] Номенклатура пустая, пробуем внешнее меню через /api/2/menu')
      
      // Получаем список внешних меню
      // Попробуем с organizationIds в body (согласно документации)
      const menusListResponse = await this.request<any>(
        '/api/2/menu',
        {
          method: 'POST',
          body: JSON.stringify({
            organizationIds: [this.organizationId]
          })
        }
      )

      console.log('[iikoCloud] Список внешних меню:', {
        externalMenusCount: menusListResponse.externalMenus?.length || 0,
        priceCategoriesCount: menusListResponse.priceCategories?.length || 0
      })

      if (!menusListResponse.externalMenus || menusListResponse.externalMenus.length === 0) {
        console.warn('[iikoCloud] ⚠️  Внешних меню не найдено')
        // Возвращаем пустой ответ
        return {
          groups: [],
          items: [],
          categories: []
        }
      }

      // Используем первое внешнее меню
      const firstMenu = menusListResponse.externalMenus[0]
      console.log(`[iikoCloud] Используем внешнее меню: ${firstMenu.name} (ID: ${firstMenu.id}, тип: ${typeof firstMenu.id})`)

      // Получаем конкретное меню
      // Пробуем разные варианты запроса
      let menuResponse
      
      // Вариант 1: С версией 2
      try {
        const menuRequest1 = {
          externalMenuId: firstMenu.id,
          organizationIds: [this.organizationId],
          version: 2
        }
        console.log('[iikoCloud] Попытка 1: Запрос меню с версией 2')
        menuResponse = await this.request<any>(
          '/api/2/menu/by_id',
          {
            method: 'POST',
            body: JSON.stringify(menuRequest1)
          }
        )
        console.log('[iikoCloud] ✅ Меню получено с версией 2')
      } catch (error: any) {
        console.log('[iikoCloud] ❌ Версия 2 не сработала:', error.message?.substring(0, 100))
        
        // Вариант 2: С версией 3
        try {
          const menuRequest2 = {
            externalMenuId: firstMenu.id,
            organizationIds: [this.organizationId],
            version: 3
          }
          console.log('[iikoCloud] Попытка 2: Запрос меню с версией 3')
          menuResponse = await this.request<any>(
            '/api/2/menu/by_id',
            {
              method: 'POST',
              body: JSON.stringify(menuRequest2)
            }
          )
          console.log('[iikoCloud] ✅ Меню получено с версией 3')
        } catch (error2: any) {
          console.log('[iikoCloud] ❌ Версия 3 не сработала:', error2.message?.substring(0, 100))
          
          // Вариант 3: Без версии
          try {
            const menuRequest3 = {
              externalMenuId: firstMenu.id,
              organizationIds: [this.organizationId]
            }
            console.log('[iikoCloud] Попытка 3: Запрос меню без версии')
            menuResponse = await this.request<any>(
              '/api/2/menu/by_id',
              {
                method: 'POST',
                body: JSON.stringify(menuRequest3)
              }
            )
            console.log('[iikoCloud] ✅ Меню получено без версии')
          } catch (error3: any) {
            console.error('[iikoCloud] ❌ Все попытки получения внешнего меню не удались')
            console.error('[iikoCloud] Последняя ошибка:', error3.message?.substring(0, 200))
            
            // Если все попытки не удались, выбрасываем ошибку с рекомендациями
            console.error('[iikoCloud] ⚠️  ВСЕ ПОПЫТКИ ПОЛУЧЕНИЯ ВНЕШНЕГО МЕНЮ НЕ УДАЛИСЬ')
            console.error('[iikoCloud] Рекомендации:')
            console.error('  1. Проверьте в админке iiko, что меню "Меню обнова" (ID: 67105) настроено и активно')
            console.error('  2. Убедитесь, что товары включены в это меню')
            console.error('  3. Проверьте, что externalMenuId правильный (текущий: 67105)')
            console.error('  4. Возможно, нужно использовать номенклатуру вместо внешнего меню')
            console.error('  5. Проверьте настройки API ключа и прав доступа в iikoCloud')
            
            throw new Error(`Не удалось получить внешнее меню (externalMenuId: ${firstMenu.id}). API iikoCloud возвращает ошибку 500. Проверьте настройки меню в админке iiko.`)
          }
        }
      }

      console.log('[iikoCloud] Внешнее меню получено:', {
        itemsCount: menuResponse.items?.length || 0,
        categoriesCount: menuResponse.categories?.length || 0
      })

      // Форматируем ответ внешнего меню
      return this.formatExternalMenuResponse(menuResponse)
    } catch (error: any) {
      console.error('[iikoCloud] Ошибка получения меню:', error)
      throw new Error(`Ошибка получения меню из iikoCloud: ${error.message}`)
    }
  }

  /**
   * Форматирование ответа номенклатуры
   */
  private formatNomenclatureResponse(response: any): IikoMenuResponse {
    // Логируем структуру ответа для отладки
    console.log('[iikoCloud] Ответ номенклатуры:')
    console.log('  - revision:', response.revision)
    console.log('  - productCategories:', response.productCategories?.length || 0)
    console.log('  - products:', response.products?.length || 0)
    
    return {
      groups: [],
      items: response.products || [],
      categories: response.productCategories || []
    }
  }

  /**
   * Форматирование ответа внешнего меню
   */
  private formatExternalMenuResponse(menuResponse: any): IikoMenuResponse {
    console.log('[iikoCloud] Форматирование внешнего меню...')
    
    // Внешнее меню может иметь другую структуру
    // Проверяем, что у нас есть в ответе
    const items = menuResponse.items || menuResponse.products || []
    const categories = menuResponse.categories || menuResponse.productCategories || []

    console.log('[iikoCloud] Форматированное меню:', {
      itemsCount: items.length,
      categoriesCount: categories.length
    })

    return {
      groups: [],
      items: items,
      categories: categories
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

