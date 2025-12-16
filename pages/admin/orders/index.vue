<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const orders = ref<any[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const statusFilter = ref<string | null>(null)
const dateFilter = ref<string | null>(null)

const statusOptions = [
  { value: null, label: 'Все статусы' },
  { value: 'PENDING', label: 'Ожидает' },
  { value: 'CONFIRMED', label: 'Подтвержден' },
  { value: 'PREPARING', label: 'Готовится' },
  { value: 'READY', label: 'Готов' },
  { value: 'DELIVERING', label: 'Доставляется' },
  { value: 'DELIVERED', label: 'Доставлен' },
  { value: 'CANCELLED', label: 'Отменен' }
]

const filteredOrders = computed(() => {
  let filtered = orders.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((o) =>
      o.orderNumber?.toLowerCase().includes(query) ||
      o.phone?.toLowerCase().includes(query) ||
      o.name?.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter((o) => o.status === statusFilter.value)
  }

  if (dateFilter.value) {
    const filterDate = new Date(dateFilter.value)
    filtered = filtered.filter((o) => {
      const orderDate = new Date(o.createdAt)
      return orderDate.toDateString() === filterDate.toDateString()
    })
  }

  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

const loadOrders = async () => {
  isLoading.value = true
  try {
    const response = await $fetch('/api/orders/all').catch(() => ({ orders: [] }))
    orders.value = response.orders || []
  } catch (error) {
    console.error('Ошибка загрузки заказов:', error)
    orders.value = []
  } finally {
    isLoading.value = false
  }
}

const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    await $fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      body: { status: newStatus }
    })
    await loadOrders()
  } catch (error: any) {
    alert(error?.data?.message || 'Ошибка обновления статуса заказа')
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-500/20 text-yellow-400',
    CONFIRMED: 'bg-blue-500/20 text-blue-400',
    PREPARING: 'bg-orange-500/20 text-orange-400',
    READY: 'bg-purple-500/20 text-purple-400',
    DELIVERING: 'bg-indigo-500/20 text-indigo-400',
    DELIVERED: 'bg-green-500/20 text-green-400',
    CANCELLED: 'bg-red-500/20 text-red-400'
  }
  return colors[status] || 'bg-gray-500/20 text-gray-400'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    PENDING: 'Ожидает',
    CONFIRMED: 'Подтвержден',
    PREPARING: 'Готовится',
    READY: 'Готов',
    DELIVERING: 'Доставляется',
    DELIVERED: 'Доставлен',
    CANCELLED: 'Отменен'
  }
  return labels[status] || status
}

// Автоматическое обновление статусов заказов из iikoCloud
let statusSyncInterval: NodeJS.Timeout | null = null

const syncOrderStatuses = async () => {
  try {
    // Синхронизируем статусы всех активных заказов из iikoCloud
    await $fetch('/api/aiko/sync-orders-status', { method: 'POST' })
    // Перезагружаем список заказов
    await loadOrders()
  } catch (error) {
    console.error('Ошибка синхронизации статусов заказов:', error)
  }
}

onMounted(() => {
  loadOrders()
  
  // Синхронизируем статусы каждые 30 секунд для активных заказов
  statusSyncInterval = setInterval(() => {
    syncOrderStatuses()
  }, 30000) // 30 секунд
})

onUnmounted(() => {
  if (statusSyncInterval) {
    clearInterval(statusSyncInterval)
  }
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">Заказы</h1>
    </div>

    <!-- Фильтры -->
    <div class="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск по номеру, телефону, имени..."
          class="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        <select
          v-model="statusFilter"
          class="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none">
          <option v-for="option in statusOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <input
          v-model="dateFilter"
          type="date"
          class="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
      </div>
    </div>

    <!-- Таблица заказов -->
    <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div v-if="isLoading" class="p-8 text-center text-gray-400">
        Загрузка...
      </div>
      <div v-else-if="filteredOrders.length === 0" class="p-8 text-center text-gray-400">
        Заказы не найдены
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Номер</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Клиент</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Тип</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Сумма</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Статус</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Дата</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-700">
              <td class="px-6 py-4">
                <div class="font-mono font-semibold text-white">#{{ order.orderNumber }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-white">{{ order.name || '-' }}</div>
                <div class="text-sm text-gray-400">{{ order.phone }}</div>
              </td>
              <td class="px-6 py-4 text-gray-300">
                {{ order.deliveryType === 'DELIVERY' ? '🚚 Доставка' : '🏪 Самовывоз' }}
              </td>
              <td class="px-6 py-4">
                <div class="text-white font-medium">{{ Number(order.total).toLocaleString() }} ₽</div>
              </td>
              <td class="px-6 py-4">
                <select
                  :value="order.status"
                  @change="updateOrderStatus(order.id, ($event.target as HTMLSelectElement).value)"
                  :class="[
                    'px-3 py-1 rounded text-sm font-medium border-0 focus:outline-none focus:ring-2 focus:ring-accent',
                    getStatusColor(order.status)
                  ]">
                  <option v-for="option in statusOptions.filter(o => o.value)" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </td>
              <td class="px-6 py-4 text-gray-300 text-sm">
                {{ formatDate(order.createdAt) }}
              </td>
              <td class="px-6 py-4 text-right">
                <NuxtLink
                  :to="`/admin/orders/${order.id}`"
                  class="text-accent hover:text-accent-700 transition-colors">
                  Подробнее →
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

