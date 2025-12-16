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
    // Проверяем, не истёк ли токен (с запасом 2 минуты)
    // Токен действителен 1 час согласно документации
    if (this.token && Date.now() < this.tokenExpiresAt - 2 * 60 * 1000) {
      console.log('[iikoCloud] Используем существующий токен (ещё действителен)')
      return this.token
    }

    console.log('[iikoCloud] 🔐 Начало авторизации в iikoCloud API...')
    console.log('[iikoCloud] URL авторизации:', `${this.baseUrl}/api/1/access_token`)
    console.log('[iikoCloud] API Key (первые 10 символов):', this.apiKey?.substring(0, 10) + '...')

    try {
      const requestBody = {
        apiLogin: this.apiKey
      }
      
      console.log('[iikoCloud] Тело запроса авторизации:', JSON.stringify(requestBody).replace(this.apiKey, '***'))

      const response = await fetch(`${this.baseUrl}/api/1/access_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      console.log('[iikoCloud] Статус ответа авторизации:', response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('[iikoCloud] ❌ Ошибка получения токена:', errorText)
        throw new Error(`Ошибка получения токена iikoCloud (${response.status}): ${errorText}`)
      }

      const data: IikoTokenResponse = await response.json()
      this.token = data.token
      // Согласно документации: "The standard token lifetime is 1 hour"
      // Устанавливаем время истечения на 55 минут (с запасом 5 минут)
      this.tokenExpiresAt = Date.now() + 55 * 60 * 1000

      console.log('[iikoCloud] ✅ Токен получен успешно, действителен 1 час')
      console.log('[iikoCloud] Токен (первые 20 символов):', this.token?.substring(0, 20) + '...')
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

    // Логируем детали запроса для диагностики (только для важных запросов)
    if (endpoint === '/api/2/menu/by_id') {
      console.log(`[iikoCloud] 📤 Отправка запроса к iikoCloud API:`)
      console.log(`  - Endpoint: ${endpoint}`)
      console.log(`  - Method: ${options.method || 'GET'}`)
      if (options.body) {
        const bodyStr = typeof options.body === 'string' ? options.body : JSON.stringify(options.body)
        console.log(`  - Body: ${bodyStr}`)
      }
    }

    try {
      // Добавляем User-Agent как в браузере/Postman для совместимости
      const fetchOptions = {
        ...options,
        headers: {
          ...headers,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': '*/*',
          'Accept-Language': 'ru,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive'
        }
      }
      
      const response = await fetch(url, fetchOptions)

      if (!response.ok) {
        const errorText = await response.text()
        
        // Логируем полную информацию об ошибке
        console.error(`[iikoCloud] Полная информация об ошибке API:`)
        console.error(`  Status: ${response.status} ${response.statusText}`)
        console.error(`  URL: ${url}`)
        console.error(`  Endpoint: ${endpoint}`)
        console.error(`  Полный текст ошибки (первые 1000 символов):`, errorText.substring(0, 1000))
        
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'iiko-client.ts:131',message:'Full API error details',data:{status:response.status,statusText:response.statusText,url,endpoint,errorTextFull:errorText,errorTextPreview:errorText.substring(0,1000),responseHeaders:Object.fromEntries(response.headers.entries())},timestamp:Date.now(),sessionId:'debug-session',runId:'run4',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        
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
        
        // Обработка временных ошибок сервера (502, 503, 504) - делаем задержку и повторную попытку
        if (response.status === 502 || response.status === 503 || response.status === 504) {
          const maxRetries = 2
          const retryDelay = 2000 // 2 секунды
          
          for (let attempt = 1; attempt <= maxRetries; attempt++) {
            console.warn(`[iikoCloud] ⚠️  Временная ошибка сервера (${response.status}). Попытка ${attempt}/${maxRetries} через ${retryDelay}мс...`)
            await new Promise(resolve => setTimeout(resolve, retryDelay * attempt)) // Увеличиваем задержку с каждой попыткой
            
            // Повторная попытка запроса
            console.log(`[iikoCloud] Повторная попытка запроса (попытка ${attempt})...`)
            const retryResponse = await fetch(url, {
              ...options,
              headers
            })
            
            if (retryResponse.ok) {
              console.log(`[iikoCloud] ✅ Запрос успешен после повторной попытки`)
              return await retryResponse.json()
            } else if (attempt < maxRetries) {
              const retryErrorText = await retryResponse.text()
              console.warn(`[iikoCloud] Попытка ${attempt} не удалась (${retryResponse.status}), пробуем еще раз...`)
              // Продолжаем цикл для следующей попытки
            } else {
              const retryErrorText = await retryResponse.text()
              console.error(`[iikoCloud] ❌ Все попытки не удались (${retryResponse.status})`)
              throw new Error(`iikoCloud API временная ошибка сервера (${retryResponse.status}): ${retryErrorText.substring(0, 200)}`)
            }
          }
        }
        
        console.error(`[iikoCloud] Ошибка API (${response.status}) при запросе ${url}:`, errorText.substring(0, 500))
        
        // Логируем детали запроса для отладки
        let requestBodyObj: any = null
        if (options.body && typeof options.body === 'string') {
          try {
            requestBodyObj = JSON.parse(options.body)
            console.error(`[iikoCloud] Тело запроса было:`, JSON.stringify(requestBodyObj, null, 2))
          } catch (e) {
            console.error(`[iikoCloud] Не удалось распарсить тело запроса`)
          }
        }
        
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'iiko-client.ts:210',message:'API error details',data:{status:response.status,url,endpoint,errorTextPreview:errorText.substring(0,500),requestBody:requestBodyObj,hasVersion:requestBodyObj?.version!==undefined,externalMenuIdType:typeof requestBodyObj?.externalMenuId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        
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
      // { type: "Product", productId: string, amount: number, productSizeId?: string, modifiers?: [...], comment?: string }
      const iikoItems: any[] = orderData.items.map(item => {
        const itemData: any = {
          type: 'Product', // Обязательное поле discriminator для OrderItem
          productId: item.productId, // ID товара из iiko (обязательное поле для ProductOrderItem)
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
          items: iikoItems,
          // Обязательное поле: тип сервиса заказа
          // DeliveryByCourier - доставка курьером
          // DeliveryByClient - самовывоз
          orderServiceType: isDelivery ? 'DeliveryByCourier' : 'DeliveryByClient'
        }
      }

      // Добавляем информацию о клиенте
      // Согласно документации, customer должен иметь discriminator "type"
      // Используем "one-time" для разовых клиентов (без регистрации в системе лояльности)
      if (orderData.phone || orderData.customerName) {
        requestData.order.customer = {
          type: 'one-time' // или 'regular' для постоянных клиентов
        }
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

      // Добавляем телефон в корень order (обязательное поле для доставки)
      if (orderData.phone) {
        requestData.order.phone = orderData.phone
      }

      // Добавляем адрес доставки для доставки курьером
      // Временно отключаем deliveryPoint для тестирования
      // TODO: Настроить правильную структуру адреса согласно документации
      // if (isDelivery && orderData.address) {
      //   // Парсим адрес (простая логика, можно улучшить)
      //   const addressParts = orderData.address.split(',')
      //   const streetPart = addressParts[0]?.trim() || ''
      //   const housePart = addressParts[1]?.trim() || ''
      //   const flatPart = addressParts[2]?.trim() || ''
      //   
      //   // Формируем адрес согласно документации (убираем пустые поля)
      //   const addressObj: any = {
      //     street: {
      //       name: streetPart
      //     }
      //   }
      //   
      //   if (housePart) {
      //     addressObj.house = housePart
      //   }
      //   if (flatPart) {
      //     addressObj.flat = flatPart
      //   }
      //   
      //   requestData.order.deliveryPoint = {
      //     address: addressObj
      //   }
      // }

      // Добавляем дату доставки (формат: yyyy-MM-dd HH:mm:ss.fff без timezone)
      if (orderData.deliveryTime) {
        const date = new Date(orderData.deliveryTime)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0')
        
        requestData.order.completeBefore = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`
      }

      console.log('[iikoCloud] 📤 Создание заказа в iikoCloud...')
      console.log('[iikoCloud] Данные заказа:', JSON.stringify(requestData, null, 2))
      
      const response: any = await this.request('/api/1/deliveries/create', {
        method: 'POST',
        body: JSON.stringify(requestData)
      })

      console.log('[iikoCloud] ✅ Ответ от iikoCloud:', JSON.stringify(response, null, 2))

      // API возвращает orderId в ответе
      // Структура ответа: { orderInfo: { id: ..., creationStatus: "InProgress" | "Success", order: {...} } }
      // Заказ создается асинхронно, поэтому сначала получаем orderInfo.id
      // Если creationStatus = "Success", то orderInfo.order.id содержит финальный ID заказа
      const orderInfo = response.orderInfo || response
      const iikoOrderId = orderInfo.order?.id || orderInfo.id || response.orderId || response.id
      
      if (!iikoOrderId) {
        console.error('[iikoCloud] ⚠️  Не удалось получить orderId из ответа:', response)
        throw new Error('Не удалось получить ID заказа из ответа iikoCloud')
      }

      const creationStatus = orderInfo.creationStatus || 'Success'
      console.log('[iikoCloud] ✅ Заказ создан в iikoCloud:')
      console.log(`   - ID: ${iikoOrderId}`)
      console.log(`   - Статус создания: ${creationStatus}`)
      
      // Если заказ создается асинхронно, возвращаем orderInfo.id
      // Позже можно будет получить финальный ID через /api/1/commands/status
      return {
        iikoOrderId,
        correlationId: response.correlationId,
        creationStatus
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
      console.log('[iikoCloud] 📥 Получение статуса заказа:', iikoOrderId)
      
      const response = await this.request<any>(
        `/api/1/deliveries/by_id`,
        {
          method: 'POST',
          body: JSON.stringify({
            organizationId: this.organizationId,
            orderIds: [iikoOrderId]
          })
        }
      )

      console.log('[iikoCloud] Ответ статуса заказа:', JSON.stringify(response, null, 2))

      // API может вернуть массив заказов или один заказ
      // Структура может быть: { orders: [...] } или просто массив
      let orders = Array.isArray(response) ? response : response.orders || []
      
      if (!Array.isArray(orders)) {
        orders = [response]
      }

      const order = orders.find((o: any) => o.orderId === iikoOrderId || o.id === iikoOrderId)
      
      if (!order) {
        throw new Error(`Заказ ${iikoOrderId} не найден в iikoCloud`)
      }

      // Преобразуем статус в наш формат
      const status: IikoOrderStatus = {
        orderId: order.orderId || order.id || iikoOrderId,
        status: order.status || order.orderStatus || 'New',
        statusInfo: order.statusInfo || order.statusDescription || '',
        creationDate: order.creationDate || order.dateCreated || new Date().toISOString(),
        items: order.items || []
      }

      console.log('[iikoCloud] ✅ Статус заказа:', status.status)
      
      return status
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

      // Логируем полный ответ от API для анализа структуры
      console.log('[iikoCloud] Полный ответ /api/2/menu:', JSON.stringify(menusListResponse, null, 2))

      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'iiko-client.ts:458',message:'Full menu list response',data:{fullResponse:JSON.stringify(menusListResponse),externalMenus:menusListResponse.externalMenus,priceCategories:menusListResponse.priceCategories,firstMenu:menusListResponse.externalMenus?.[0],firstMenuId:menusListResponse.externalMenus?.[0]?.id,firstMenuIdType:typeof menusListResponse.externalMenus?.[0]?.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run4',hypothesisId:'A'})}).catch(()=>{});
      // #endregion

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
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'iiko-client.ts:456',message:'First menu details',data:{menuName:firstMenu.name,menuId:firstMenu.id,menuIdType:typeof firstMenu.id,menuIdString:String(firstMenu.id),menuIdNumber:typeof firstMenu.id==='string'?parseInt(firstMenu.id,10):firstMenu.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
      // #endregion

      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'iiko-client.ts:461',message:'External menu data',data:{menuName:firstMenu.name,menuId:firstMenu.id,menuIdType:typeof firstMenu.id,priceCategoriesCount:menusListResponse.priceCategories?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion

      // Получаем первую доступную категорию цен или используем значение по умолчанию
      const priceCategory = menusListResponse.priceCategories?.[0]
      let priceCategoryId: string
      
      if (priceCategory && priceCategory.id) {
        priceCategoryId = priceCategory.id
        console.log(`[iikoCloud] Используем категорию цен: ${priceCategory.name} (ID: ${priceCategoryId})`)
      } else {
        // Если категории цен нет в ответе, используем значение по умолчанию
        // Согласно поддержке iiko: если указали источником цен ценовую категорию,
        // нужно использовать "00000000-0000-0000-0000-000000000000"
        priceCategoryId = '00000000-0000-0000-0000-000000000000'
        console.log(`[iikoCloud] Категории цен нет в ответе, используем значение по умолчанию: ${priceCategoryId}`)
      }

      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'iiko-client.ts:476',message:'Price category selected',data:{priceCategoryId,hasPriceCategory:!!priceCategory,priceCategoryName:priceCategory?.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion

      // API /api/2/menu возвращает id как строку "67847"
      // В документации показан формат "15#3", но API возвращает просто "67847"
      // Используем как возвращает API - в Postman это работает
      const externalMenuId = String(firstMenu.id)
      
      console.log('[iikoCloud] Используем externalMenuId как возвращает API:', externalMenuId)
      console.log('[iikoCloud] Тип externalMenuId:', typeof externalMenuId)
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'iiko-client.ts:521',message:'External menu ID format decision',data:{originalIdFromAPI:firstMenu.id,externalMenuId,externalMenuIdType:typeof externalMenuId,formatUsed:'as_returned_by_api',firstMenuFull:firstMenu},timestamp:Date.now(),sessionId:'debug-session',runId:'run4',hypothesisId:'A'})}).catch(()=>{});
      // #endregion

      // Согласно документации и поддержке iiko, priceCategoryId обязателен
      // Для "цен из меню" нужно использовать "00000000-0000-0000-0000-000000000000"
      // API возвращает ошибку "Price category id is not correct" если priceCategoryId отсутствует
      // Параметр version: 2 ОБЯЗАТЕЛЕН - в Postman запрос работает только с version: 2
      const menuRequest = {
        externalMenuId: externalMenuId,
        organizationIds: [this.organizationId],
        priceCategoryId: priceCategoryId, // Обязательный параметр, даже для "цен из меню"
        version: 2 // Обязательный параметр согласно документации и рабочему примеру в Postman
      }
      
      console.log('[iikoCloud] Используем priceCategoryId:', priceCategoryId === '00000000-0000-0000-0000-000000000000' ? 'цены из меню' : priceCategoryId)
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'iiko-client.ts:520',message:'Menu request before API call',data:{menuRequest:JSON.stringify(menuRequest),organizationId:this.organizationId},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      
      console.log('[iikoCloud] Запрос меню:', JSON.stringify(menuRequest, null, 2))
      console.log('[iikoCloud] URL запроса:', `${this.baseUrl}/api/2/menu/by_id`)
      console.log('[iikoCloud] Полное тело запроса (JSON):', JSON.stringify(menuRequest))
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'iiko-client.ts:535',message:'Full menu request details',data:{url:`${this.baseUrl}/api/2/menu/by_id`,requestBody:menuRequest,requestBodyString:JSON.stringify(menuRequest),organizationId:this.organizationId},timestamp:Date.now(),sessionId:'debug-session',runId:'run4',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      
      const menuResponse = await this.request<any>(
        '/api/2/menu/by_id',
        {
          method: 'POST',
          body: JSON.stringify(menuRequest)
        }
      )
      
      // Логируем успешный ответ
      console.log('[iikoCloud] Полный ответ /api/2/menu/by_id:', JSON.stringify(menuResponse, null, 2))
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'iiko-client.ts:545',message:'Menu response received',data:{hasResponse:!!menuResponse,responseKeys:menuResponse?Object.keys(menuResponse):[],fullResponse:JSON.stringify(menuResponse)},timestamp:Date.now(),sessionId:'debug-session',runId:'run4',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'iiko-client.ts:497',message:'Menu response received',data:{hasResponse:!!menuResponse,responseKeys:menuResponse?Object.keys(menuResponse):[]},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      
      console.log('[iikoCloud] ✅ Меню получено успешно')
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
    
    // Структура внешнего меню: itemCategories содержит категории, каждая категория содержит items
    const itemCategories = menuResponse.itemCategories || []
    const allItems: any[] = []
    const categories: any[] = []

    // Обрабатываем каждую категорию
    itemCategories.forEach((category: any) => {
      // Добавляем категорию
      categories.push({
        id: category.id,
        name: category.name,
        description: category.description || '',
        slug: (category.name || category.id || '')
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-а-яё]/g, '')
          .substring(0, 100)
      })

      // Извлекаем товары из категории
      if (category.items && Array.isArray(category.items)) {
        category.items.forEach((item: any) => {
          // Обрабатываем размеры товара (itemSizes)
          if (item.itemSizes && Array.isArray(item.itemSizes) && item.itemSizes.length > 0) {
            const defaultSize = item.itemSizes.find((size: any) => size.isDefault) || item.itemSizes[0]
            
            // Получаем цену из первого размера
            let price = 0
            if (defaultSize.prices && Array.isArray(defaultSize.prices) && defaultSize.prices.length > 0) {
              price = defaultSize.prices[0].price || 0
            }

            // Получаем изображение
            const imageUrl = item.buttonImageUrl || (item.itemSizes[0]?.buttonImageUrl) || null

            allItems.push({
              id: item.itemId || item.sku,
              name: item.name,
              description: item.description || '',
              price: price,
              categoryId: category.id,
              image: imageUrl,
              sku: item.sku,
              type: item.type || 'DISH'
            })
          }
        })
      }
    })

    console.log('[iikoCloud] Форматированное меню:', {
      itemsCount: allItems.length,
      categoriesCount: categories.length
    })

    return {
      groups: [],
      items: allItems,
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

