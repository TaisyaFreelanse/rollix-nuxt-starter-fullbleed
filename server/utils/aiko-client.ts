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
      // Согласно документации API (NomenclatureResponse):
      // - productCategories: массив категорий товаров (ProductCategoryInfo: id, name, isDeleted)
      // - products: массив товаров (ProductInfo: id, name, productCategoryId, sizePrices, imageLinks, и т.д.)
      // - groups: группы стоп-листов (НЕ категории меню!)
      
      const categories: any[] = []
      const products: any[] = []
      
      // Обрабатываем категории товаров (productCategories)
      const productCategories = menu.categories || []
      productCategories.forEach((category: any) => {
        // Пропускаем удаленные категории
        if (category.isDeleted) {
          return
        }
        
        const categorySlug = (category.name || category.id || '')
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-а-яё]/g, '')
        
        categories.push({
          id: category.id,
          name: category.name,
          slug: categorySlug || category.id
        })
      })
      
      // Обрабатываем товары (products)
      // В iiko-client.ts мы уже преобразовали response в menu.items и menu.categories
      const iikoProducts = menu.items || []
      
      iikoProducts.forEach((product: any) => {
        // Пропускаем модификаторы (type: "modifier") - они не являются товарами для меню
        // Используем только товары типа "dish" или "good" (или без type, если он nullable)
        // Согласно документации, type может быть: "dish" | "good" | "modifier" | null
        if (product.type === 'modifier') {
          return
        }
        
        // Получаем изображение
        // Внешнее меню использует поле image, номенклатура - imageLinks
        const imageUrl = product.image || (product.imageLinks && product.imageLinks.length > 0 
          ? product.imageLinks[0] 
          : null)
        
        // Получаем цену
        // Внешнее меню уже имеет price, номенклатура - sizePrices
        let price = product.price || 0
        if (price === 0 && product.sizePrices && Array.isArray(product.sizePrices) && product.sizePrices.length > 0) {
          // sizePrices - массив объектов {sizeId, price}
          const firstPrice = product.sizePrices.find((sp: any) => sp.price !== undefined && sp.price !== null)
          if (firstPrice) {
            price = firstPrice.price || 0
          }
        }
        
        // Получаем описание (может быть в разных полях)
        const description = product.description || product.additionalInfo || null
        
        // Получаем categoryId
        // Внешнее меню использует categoryId, номенклатура - productCategoryId
        const categoryId = product.categoryId || product.productCategoryId || null
        
        products.push({
          id: product.id,
          name: product.name,
          description: description,
          price: price,
          categoryId: categoryId, // Связь с категорией
          image: imageUrl,
          // Модификаторы
          modifiers: product.groupModifiers || product.modifiers || []
        })
      })
      
      console.log(`[АЙКО] Обработано: ${categories.length} категорий, ${products.length} товаров`)
      
      if (products.length > 0) {
        console.log(`[АЙКО] Пример товара:`, {
          name: products[0].name,
          categoryId: products[0].categoryId,
          price: products[0].price
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

