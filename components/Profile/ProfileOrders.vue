<script setup lang="ts">
const orders = ref<any[]>([])
const loading = ref(false)
const selectedOrder = ref<any>(null)

// Обновление статусов заказов в реальном времени
const updateOrderStatuses = async () => {
  // Обновляем только активные заказы
  const activeOrders = orders.value.filter(
    (o) => !['DELIVERED', 'CANCELLED'].includes(o.status)
  )

  for (const order of activeOrders) {
    try {
      const updated = await $fetch(`/api/orders/${order.id}`)
      const index = orders.value.findIndex((o) => o.id === order.id)
      if (index > -1) {
        orders.value[index].status = updated.status
      }
    } catch (error) {
      console.error('Ошибка обновления статуса заказа', error)
    }
  }
}

const fetchOrders = async () => {
  loading.value = true
  try {
    orders.value = await $fetch('/api/profile/orders')
  } catch (error) {
    console.error('Ошибка загрузки заказов', error)
  } finally {
    loading.value = false
  }
}

const repeatOrder = async (order: any) => {
  // TODO: Реализовать повтор заказа через корзину
  console.log('Повтор заказа:', order)
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    CONFIRMED: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    PREPARING: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
    READY: 'bg-green-500/20 text-green-300 border-green-500/50',
    DELIVERING: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
    DELIVERED: 'bg-gray-500/20 text-gray-300 border-gray-500/50',
    CANCELLED: 'bg-red-500/20 text-red-300 border-red-500/50'
  }
  return colors[status] || colors.PENDING
}

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    PENDING: 'Ожидает подтверждения',
    CONFIRMED: 'Подтвержден',
    PREPARING: 'Готовится',
    READY: 'Готов',
    DELIVERING: 'В доставке',
    DELIVERED: 'Доставлен',
    CANCELLED: 'Отменен'
  }
  return texts[status] || status
}

let statusInterval: NodeJS.Timeout | null = null

onMounted(() => {
  fetchOrders()

  // Обновляем статусы каждые 5 секунд для активных заказов
  statusInterval = setInterval(() => {
    updateOrderStatuses()
  }, 5000)
})

onUnmounted(() => {
  if (statusInterval) {
    clearInterval(statusInterval)
  }
})
</script>

<template>
  <div>
    <div v-if="loading" class="text-center py-12 text-gray-400">Загрузка...</div>

    <div v-else-if="orders.length === 0" class="text-center py-12 text-gray-400">
      <div class="text-4xl mb-4">📦</div>
      <div class="text-lg mb-2">У вас пока нет заказов</div>
      <NuxtLink to="/catalog" class="text-accent hover:text-accent-700">
        Перейти в каталог
      </NuxtLink>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-card rounded-lg border border-white/5 p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <div class="text-lg font-semibold mb-1">Заказ #{{ order.orderNumber }}</div>
            <div class="text-sm text-gray-400">
              {{ new Date(order.createdAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) }}
            </div>
          </div>
          <div
            :class="[
              'px-3 py-1 rounded-full border text-xs font-medium',
              getStatusColor(order.status)
            ]">
            {{ getStatusText(order.status) }}
          </div>
        </div>

        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-sm">
            <span class="text-gray-400">Товаров:</span>
            <span class="text-white">{{ order.items?.length || 0 }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-400">Сумма:</span>
            <span class="text-white font-semibold">{{ Number(order.total).toFixed(2) }} ₽</span>
          </div>
          <div v-if="order.addressText" class="text-sm text-gray-400">
            📍 {{ order.addressText }}
          </div>
        </div>

        <div class="flex gap-2">
          <button
            class="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition"
            @click="selectedOrder = order">
            Подробнее
          </button>
          <button
            class="px-4 py-2 bg-accent/20 hover:bg-accent/30 rounded-lg text-sm transition"
            @click="repeatOrder(order)">
            Повторить заказ
          </button>
        </div>
      </div>
    </div>

    <!-- Модальное окно деталей заказа -->
    <Modal v-if="selectedOrder" :open="!!selectedOrder" title="Детали заказа" @close="selectedOrder = null">
      <div v-if="selectedOrder" class="space-y-4">
        <div>
          <div class="text-sm text-gray-400 mb-1">Номер заказа</div>
          <div class="font-semibold">#{{ selectedOrder.orderNumber }}</div>
        </div>
        <div>
          <div class="text-sm text-gray-400 mb-1">Статус</div>
          <div
            :class="[
              'inline-block px-3 py-1 rounded-full border text-xs font-medium',
              getStatusColor(selectedOrder.status)
            ]">
            {{ getStatusText(selectedOrder.status) }}
          </div>
        </div>
        <div>
          <div class="text-sm text-gray-400 mb-2">Товары</div>
          <div class="space-y-2">
            <div
              v-for="item in selectedOrder.items"
              :key="item.id"
              class="flex justify-between text-sm">
              <span>{{ item.product.name }} × {{ item.quantity }}</span>
              <span>{{ Number(item.subtotal).toFixed(2) }} ₽</span>
            </div>
          </div>
        </div>
        <div class="pt-4 border-t border-white/10">
          <div class="flex justify-between font-semibold">
            <span>Итого:</span>
            <span>{{ Number(selectedOrder.total).toFixed(2) }} ₽</span>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

