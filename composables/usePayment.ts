export interface CreatePaymentRequest {
  orderId: string
  returnUrl?: string
}

export interface CreatePaymentResponse {
  success: boolean
  paymentId: string
  confirmationUrl: string
  status: string
  note?: string
}

export interface PaymentStatusResponse {
  success: boolean
  paymentId: string
  status: string
  paid: boolean
  amount: {
    value: string
    currency: string
  }
  orderId?: string
  note?: string
}

export interface RefundRequest {
  amount: number
  reason?: string
}

export const usePayment = () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Создание платежа
   */
  const createPayment = async (
    orderId: string,
    returnUrl?: string
  ): Promise<CreatePaymentResponse> => {
    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch<CreatePaymentResponse>('/api/payments/create', {
        method: 'POST',
        body: {
          orderId,
          returnUrl
        }
      })
      return result
    } catch (err: any) {
      error.value = err?.data?.message || err?.message || 'Ошибка создания платежа'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Получение статуса платежа
   */
  const getPaymentStatus = async (paymentId: string): Promise<PaymentStatusResponse> => {
    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch<PaymentStatusResponse>(`/api/payments/${paymentId}/status`)
      return result
    } catch (err: any) {
      error.value = err?.data?.message || err?.message || 'Ошибка получения статуса платежа'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Отмена платежа
   */
  const cancelPayment = async (paymentId: string, reason?: string): Promise<any> => {
    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch(`/api/payments/${paymentId}/cancel`, {
        method: 'POST',
        body: { reason }
      })
      return result
    } catch (err: any) {
      error.value = err?.data?.message || err?.message || 'Ошибка отмены платежа'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Возврат платежа
   */
  const refundPayment = async (
    paymentId: string,
    amount: number,
    reason?: string
  ): Promise<any> => {
    isLoading.value = true
    error.value = null

    try {
      const result = await $fetch(`/api/payments/${paymentId}/refund`, {
        method: 'POST',
        body: { amount, reason }
      })
      return result
    } catch (err: any) {
      error.value = err?.data?.message || err?.message || 'Ошибка возврата платежа'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading: readonly(isLoading),
    error: readonly(error),
    createPayment,
    getPaymentStatus,
    cancelPayment,
    refundPayment
  }
}

