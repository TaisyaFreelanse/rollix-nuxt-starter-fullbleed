import { WebSocketServer, WebSocket } from 'ws'
import type { IncomingMessage } from 'http'

// Хранилище подключений по orderId
const connections = new Map<string, Set<WebSocket>>()

export function setupOrderWebSocket(server: any) {
  const wss = new WebSocketServer({ noServer: true })

  // Обработка upgrade запроса
  server.on('upgrade', (request: IncomingMessage, socket: any, head: Buffer) => {
    const pathname = new URL(request.url || '', `http://${request.headers.host}`).pathname

    if (pathname.startsWith('/api/ws/orders/')) {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request)
      })
    } else {
      socket.destroy()
    }
  })

  wss.on('connection', (ws: WebSocket, request: IncomingMessage) => {
    const pathname = new URL(request.url || '', `http://${request.headers.host}`).pathname
    const orderId = pathname.split('/').pop()

    if (!orderId) {
      ws.close(1008, 'Order ID required')
      return
    }

    // Добавляем подключение
    if (!connections.has(orderId)) {
      connections.set(orderId, new Set())
    }
    connections.get(orderId)!.add(ws)

    // Отправляем приветственное сообщение
    ws.send(
      JSON.stringify({
        type: 'connected',
        orderId,
        message: 'Подключено к обновлениям заказа'
      })
    )

    // Обработка закрытия соединения
    ws.on('close', () => {
      const orderConnections = connections.get(orderId)
      if (orderConnections) {
        orderConnections.delete(ws)
        if (orderConnections.size === 0) {
          connections.delete(orderId)
        }
      }
    })

    // Обработка ошибок
    ws.on('error', (error) => {
      console.error('WebSocket error:', error)
    })
  })

  return wss
}

// Функция для отправки обновления статуса заказа
export function broadcastOrderUpdate(orderId: string, status: string, data?: any) {
  const orderConnections = connections.get(orderId)
  if (orderConnections) {
    const message = JSON.stringify({
      type: 'status_update',
      orderId,
      status,
      data,
      timestamp: new Date().toISOString()
    })

    orderConnections.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message)
      }
    })
  }
}

