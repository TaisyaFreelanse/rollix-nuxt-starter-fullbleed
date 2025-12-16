import { ref, onMounted, onUnmounted, watch, readonly } from 'vue'

export const useOrderStatus = (orderId: string) => {
  const status = ref<string>('PENDING')
  const isLoading = ref(false)
  const hasIikoSync = ref(false)
  let pollInterval: NodeJS.Timeout | null = null

  const fetchStatus = async () => {
    try {
      isLoading.value = true
      const order = await $fetch(`/api/orders/${orderId}`)
      status.value = order.status
      hasIikoSync.value = order.hasIikoSync || false
      
      // Если заказ синхронизирован с iiko, периодически обновляем статус
      if (hasIikoSync.value && !['DELIVERED', 'CANCELLED'].includes(status.value)) {
        try {
          // Синхронизируем статус из iikoCloud
          await $fetch(`/api/orders/${orderId}/sync-status`, { method: 'POST' })
          // Обновляем локальный статус
          const updatedOrder = await $fetch(`/api/orders/${orderId}`)
          status.value = updatedOrder.status
        } catch (error) {
          // Игнорируем ошибки синхронизации, используем локальный статус
          console.log('Не удалось синхронизировать статус из iikoCloud:', error)
        }
      }
    } catch (error) {
      console.error('Ошибка получения статуса заказа', error)
    } finally {
      isLoading.value = false
    }
  }

  const startPolling = (interval: number = 5000) => {
    if (pollInterval) return

    pollInterval = setInterval(() => {
      fetchStatus()
    }, interval)
  }

  const stopPolling = () => {
    if (pollInterval) {
      clearInterval(pollInterval)
      pollInterval = null
    }
  }

  onMounted(() => {
    fetchStatus()
    // Автоматически начинаем опрос, если заказ не завершен
    if (!['DELIVERED', 'CANCELLED'].includes(status.value)) {
      startPolling()
    }
  })

  onUnmounted(() => {
    stopPolling()
  })

  // Останавливаем опрос, когда заказ завершен
  watch(status, (newStatus) => {
    if (['DELIVERED', 'CANCELLED'].includes(newStatus)) {
      stopPolling()
    }
  })

  return {
    status: readonly(status),
    isLoading: readonly(isLoading),
    hasIikoSync: readonly(hasIikoSync),
    fetchStatus,
    startPolling,
    stopPolling
  }
}

