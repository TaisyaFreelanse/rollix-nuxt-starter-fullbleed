export interface AikoSyncResult {
  success: boolean
  message: string
  stats: {
    syncedCategories: number
    syncedProducts: number
    updatedPrices: number
    timestamp: string
  }
  note?: string
}

export interface AikoOrderResponse {
  success: boolean
  orderId: string
  orderNumber: string
  aikoOrderId: string
  message: string
  note?: string
}

export interface AikoOrderStatus {
  success: boolean
  aikoOrderId: string
  status: string
  estimatedTime: number
  message: string
  updatedAt: string
  note?: string
}

export const useAiko = () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Синхронизация меню и цен с АЙКО
   */
  const syncMenu = async (): Promise<AikoSyncResult> => {
    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch<AikoSyncResult>('/api/aiko/sync', {
        method: 'POST'
      })
      return result
    } catch (err: any) {
      error.value = err?.data?.message || err?.message || 'Ошибка синхронизации с АЙКО'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Отправка заказа в АЙКО
   */
  const sendOrder = async (orderId: string): Promise<AikoOrderResponse> => {
    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch<AikoOrderResponse>('/api/aiko/orders', {
        method: 'POST',
        body: { orderId }
      })
      return result
    } catch (err: any) {
      error.value = err?.data?.message || err?.message || 'Ошибка отправки заказа в АЙКО'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Получение статуса заказа из АЙКО
   */
  const getOrderStatus = async (aikoOrderId: string): Promise<AikoOrderStatus> => {
    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch<AikoOrderStatus>(`/api/aiko/orders/${aikoOrderId}/status`)
      return result
    } catch (err: any) {
      error.value = err?.data?.message || err?.message || 'Ошибка получения статуса заказа'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Проверка подключения к АЙКО API
   */
  const checkConnection = async (): Promise<boolean> => {
    try {
      // Простая проверка доступности API
      const AIKO_API_URL = useRuntimeConfig().public.aikoApiUrl || process.env.AIKO_API_URL
      if (!AIKO_API_URL) {
        return false
      }
      // В реальной реализации здесь был бы запрос к health endpoint
      return true
    } catch {
      return false
    }
  }

  return {
    isLoading: readonly(isLoading),
    error: readonly(error),
    syncMenu,
    sendOrder,
    getOrderStatus,
    checkConnection
  }
}

