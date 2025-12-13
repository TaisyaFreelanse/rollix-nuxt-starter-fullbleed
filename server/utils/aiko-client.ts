/**
 * Обёртка для работы с iikoCloud API (обратная совместимость)
 * Использует новый iiko-client.ts под капотом
 */

import { getIikoClient } from './iiko-client'

export class AikoClient {
  private iikoClient: ReturnType<typeof getIikoClient> | null = null

  constructor() {
    try {
      this.iikoClient = getIikoClient()
    } catch (error: any) {
      console.warn('[АЙКО/iikoCloud] API не настроен:', error.message)
      this.iikoClient = null
    }
  }

  /**
   * Получение меню из iikoCloud
   */
  async getMenu(): Promise<{
    categories: any[]
    products: any[]
    lastSync: string
  }> {
    if (!this.iikoClient) {
      throw new Error('iikoCloud API не настроен. Проверьте переменные окружения.')
    }

    try {
      const menu = await this.iikoClient.getMenu()
      
      // Преобразуем формат iikoCloud в наш формат
      // Согласно документации API, структура ответа:
      // - groups: массив групп товаров (категорий)
      //   - каждая группа содержит items: массив товаров
      // - productCategories: категории товаров
      // - items: все товары (опционально)
      // - modifiers: модификаторы (опционально)
      
      const categories: any[] = []
      const products: any[] = []
      
      // Обрабатываем группы товаров (это категории)
      const groups = menu.groups || []
      
      groups.forEach((group: any) => {
        // Группа товаров = категория
        const categorySlug = (group.name || group.id || '')
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-а-яё]/g, '')
        
        categories.push({
          id: group.id,
          name: group.name,
          slug: categorySlug || group.id
        })

        // Обрабатываем товары внутри группы
        if (group.items && Array.isArray(group.items)) {
          group.items.forEach((item: any) => {
            // Получаем изображение (может быть в разных полях)
            const imageUrl = item.image || 
                           (item.images && item.images.length > 0 ? item.images[0] : null) ||
                           (item.imageLinks && item.imageLinks.length > 0 ? item.imageLinks[0] : null)
            
            // Получаем цену (может быть в разных полях или размерах)
            let price = 0
            if (item.price !== undefined) {
              price = item.price
            } else if (item.prices && item.prices.length > 0) {
              price = item.prices[0].price || 0
            } else if (item.sizePrices && item.sizePrices.length > 0) {
              price = item.sizePrices[0].price || 0
            }
            
            products.push({
              id: item.id,
              name: item.name,
              description: item.description || item.additionalInfo,
              price: price,
              categoryId: group.id,
              image: imageUrl,
              // Модификаторы могут быть в группе или отдельно
              modifiers: item.groupModifiers || item.modifiers || []
            })
          })
        }
      })
      
      // Если есть отдельный массив items (все товары), добавляем их тоже
      if (menu.items && Array.isArray(menu.items)) {
        menu.items.forEach((item: any) => {
          // Проверяем, не добавлен ли уже этот товар
          const existingProduct = products.find(p => p.id === item.id)
          if (!existingProduct) {
            const imageUrl = item.image || 
                           (item.images && item.images.length > 0 ? item.images[0] : null) ||
                           (item.imageLinks && item.imageLinks.length > 0 ? item.imageLinks[0] : null)
            
            let price = 0
            if (item.price !== undefined) {
              price = item.price
            } else if (item.prices && item.prices.length > 0) {
              price = item.prices[0].price || 0
            }
            
            products.push({
              id: item.id,
              name: item.name,
              description: item.description || item.additionalInfo,
              price: price,
              categoryId: item.productCategoryId || categories[0]?.id || 'default',
              image: imageUrl,
              modifiers: item.groupModifiers || item.modifiers || []
            })
          }
        })
      }

      return {
        categories,
        products,
        lastSync: new Date().toISOString()
      }
    } catch (error: any) {
      console.error('[АЙКО] Ошибка получения меню:', error)
      throw error
    }
  }

  /**
   * Отправка заказа в iikoCloud
   */
  async createOrder(orderData: {
    orderNumber?: string
    phone?: string
    name?: string
    address?: string
    deliveryType?: string
    deliveryTime?: Date | string
    comment?: string
    items: Array<{
      productId: string
      productName: string
      quantity: number
      price: number
      modifiers?: Array<{
        name: string
        price: number
      }>
    }>
    total?: number
    subtotal?: number
    deliveryPrice?: number
  }): Promise<{ aikoOrderId: string }> {
    if (!this.iikoClient) {
      throw new Error('iikoCloud API не настроен. Проверьте переменные окружения.')
    }

    try {
      const result = await this.iikoClient.createOrder({
        phone: orderData.phone,
        customerName: orderData.name,
        comment: orderData.comment,
        items: orderData.items,
        address: orderData.address,
        deliveryType: orderData.deliveryType as 'DELIVERY' | 'PICKUP',
        deliveryTime: orderData.deliveryTime
      })

      return {
        aikoOrderId: result.iikoOrderId
      }
    } catch (error: any) {
      console.error('[АЙКО] Ошибка создания заказа:', error)
      throw error
    }
  }

  /**
   * Получение статуса заказа из iikoCloud
   */
  async getOrderStatus(aikoOrderId: string): Promise<{
    orderId: string
    status: string
    estimatedTime?: number
    message?: string
    updatedAt: string
  }> {
    if (!this.iikoClient) {
      throw new Error('iikoCloud API не настроен. Проверьте переменные окружения.')
    }

    try {
      const status = await this.iikoClient.getOrderStatus(aikoOrderId)
      
      // Преобразуем статус iikoCloud в наш формат
      const statusMap: Record<string, string> = {
        'New': 'PENDING',
        'Bill': 'CONFIRMED',
        'Close': 'DELIVERED',
        'Deleted': 'CANCELLED'
      }

      return {
        orderId: status.orderId,
        status: statusMap[status.status] || status.status,
        message: status.statusInfo,
        updatedAt: status.creationDate || new Date().toISOString()
      }
    } catch (error: any) {
      console.error('[АЙКО] Ошибка получения статуса заказа:', error)
      throw error
    }
  }

  /**
   * Отмена заказа в iikoCloud
   */
  async cancelOrder(aikoOrderId: string, reason?: string): Promise<boolean> {
    if (!this.iikoClient) {
      throw new Error('iikoCloud API не настроен. Проверьте переменные окружения.')
    }

    try {
      return await this.iikoClient.cancelOrder(aikoOrderId, reason)
    } catch (error: any) {
      console.error('[АЙКО] Ошибка отмены заказа:', error)
      throw error
    }
  }
}

// Singleton instance
export const aikoClient = new AikoClient()

