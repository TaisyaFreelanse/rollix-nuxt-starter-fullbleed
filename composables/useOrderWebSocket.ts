// Composable для подключения к WebSocket обновлениям статуса заказа
export const useOrderWebSocket = (orderId: string) => {
  const status = ref<string>('PENDING')
  const isConnected = ref(false)
  const ws = ref<WebSocket | null>(null)

  const connect = () => {
    if (typeof window === 'undefined') return

    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
      const wsUrl = `${protocol}//${window.location.host}/api/ws/orders/${orderId}`
      
      ws.value = new WebSocket(wsUrl)

      ws.value.onopen = () => {
        isConnected.value = true
        console.log('WebSocket connected for order:', orderId)
      }

      ws.value.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'status_update') {
            status.value = data.status
          }
        } catch (error) {
          console.error('Ошибка парсинга WebSocket сообщения', error)
        }
      }

      ws.value.onerror = (error) => {
        console.error('WebSocket error:', error)
        isConnected.value = false
      }

      ws.value.onclose = () => {
        isConnected.value = false
        console.log('WebSocket disconnected')
        
        // Переподключение через 5 секунд
        setTimeout(() => {
          if (orderId) {
            connect()
          }
        }, 5000)
      }
    } catch (error) {
      console.error('Ошибка создания WebSocket соединения', error)
      // Fallback на polling
      useOrderStatus(orderId)
    }
  }

  const disconnect = () => {
    if (ws.value) {
      ws.value.close()
      ws.value = null
    }
    isConnected.value = false
  }

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    status: readonly(status),
    isConnected: readonly(isConnected),
    connect,
    disconnect
  }
}

