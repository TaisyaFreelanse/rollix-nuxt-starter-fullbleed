import { ref, onMounted, onUnmounted } from 'vue'

export const useOrderStatus = (orderId: string) => {
  const status = ref<string>('PENDING')
  const isLoading = ref(false)
  let pollInterval: NodeJS.Timeout | null = null

  const fetchStatus = async () => {
    try {
      const order = await $fetch(`/api/orders/${orderId}`)
      status.value = order.status
    } catch (error) {
      console.error('Ошибка получения статуса заказа', error)
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
    fetchStatus,
    startPolling,
    stopPolling
  }
}

