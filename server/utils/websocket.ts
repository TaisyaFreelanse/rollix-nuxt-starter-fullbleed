// Утилита для работы с WebSocket в Nuxt 3
// Используем простой подход через Server-Sent Events (SSE) или polling
// Для полноценного WebSocket нужна дополнительная настройка сервера

export function createOrderStatusStream(orderId: string) {
  // В Nuxt 3 можно использовать SSE или polling
  // Для простоты используем polling через API
  return {
    subscribe: (callback: (status: string) => void) => {
      const interval = setInterval(async () => {
        try {
          const order = await $fetch(`/api/orders/${orderId}`)
          callback(order.status)
        } catch (error) {
          console.error('Ошибка получения статуса заказа', error)
        }
      }, 3000) // Обновление каждые 3 секунды

      return () => clearInterval(interval)
    }
  }
}

