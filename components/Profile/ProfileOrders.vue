<script setup lang="ts">
const auth = useAuth()
const orders = ref<any[]>([])
const loading = ref(false)
const selectedOrder = ref<any>(null)

// Разделение заказов на активные и историю
const activeOrders = computed(() => {
  return orders.value.filter(
    (o) => !['DELIVERED', 'CANCELLED'].includes(o.status)
  )
})

const historyOrders = computed(() => {
  return orders.value.filter(
    (o) => ['DELIVERED', 'CANCELLED'].includes(o.status)
  )
})

// Обновление статусов заказов в реальном времени
const updateOrderStatuses = async () => {
  // Обновляем только активные заказы
  for (const order of activeOrders.value) {
    try {
      const updated = await auth.$fetchWithAuth(`/api/orders/${order.id}`)
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
    orders.value = await auth.$fetchWithAuth('/api/profile/orders')
  } catch (error) {
    console.error('Ошибка загрузки заказов', error)
  } finally {
    loading.value = false
  }
}

// Форматирование даты как на скриншоте
const formatOrderDate = (date: string) => {
  const d = new Date(date)
  const day = d.getDate()
  const month = d.toLocaleDateString('ru-RU', { month: 'long' })
  const year = d.getFullYear()
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${day} ${month} ${year} ${hours}:${minutes}`
}

// Форматирование адреса/статуса для карточки
const getOrderAddressText = (order: any) => {
  // Формируем полный адрес
  const getFullAddress = () => {
    if (order.addressText) {
      return order.addressText
    }
    if (order.address) {
      const parts = [
        order.address.street,
        order.address.house,
        order.address.apartment ? `кв. ${order.address.apartment}` : null
      ].filter(Boolean)
      return parts.join(', ')
    }
    if (order.deliveryZone?.name) {
      return order.deliveryZone.name
    }
    return null
  }

  const address = getFullAddress()

  if (order.status === 'DELIVERED') {
    return `Получен: ${address || 'Адрес не указан'}`
  }
  if (order.deliveryType === 'PICKUP') {
    return `Самовывоз: ${address || 'Адрес не указан'}`
  }
  return address || 'Адрес не указан'
}

// Получение миниатюр товаров (максимум 5)
const getProductThumbnails = (order: any) => {
  return order.items?.slice(0, 5).map((item: any) => ({
    image: item.product?.image || '/placeholder-product.png',
    name: item.product?.name || 'Товар'
  })) || []
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

    <div v-else class="space-y-6">
      <!-- Активные заказы -->
      <div v-if="activeOrders.length > 0">
        <h2 class="text-lg font-bold mb-3 px-4">Активные заказы</h2>
        <div class="space-y-3">
          <div
            v-for="order in activeOrders"
            :key="order.id"
            class="bg-card rounded-lg border border-white/5 p-4 mx-4"
            @click="selectedOrder = order">
            <div class="flex items-start justify-between mb-2">
              <div class="flex-1">
                <div class="text-base font-semibold mb-1">Заказ №{{ order.orderNumber }}</div>
                <div class="text-sm text-gray-400 mb-1">
                  {{ formatOrderDate(order.createdAt) }}
                </div>
                <div class="text-sm text-gray-300">
                  {{ getOrderAddressText(order) }}
                </div>
              </div>
              <div class="text-base font-semibold ml-4">
                {{ Math.round(Number(order.total)).toLocaleString('ru-RU') }} Р
              </div>
            </div>
            <!-- Миниатюры товаров -->
            <div class="flex gap-2 mt-3">
              <div
                v-for="(thumb, index) in getProductThumbnails(order)"
                :key="index"
                class="w-12 h-12 rounded bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                <img
                  :src="thumb.image"
                  :alt="thumb.name"
                  class="w-full h-full object-cover"
                  @error="(e: any) => e.target.src = '/placeholder-product.png'" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- История заказов -->
      <div v-if="historyOrders.length > 0">
        <h2 class="text-lg font-bold mb-3 px-4">История заказов</h2>
        <div class="space-y-3">
          <div
            v-for="order in historyOrders"
            :key="order.id"
            class="bg-card rounded-lg border border-white/5 p-4 mx-4"
            @click="selectedOrder = order">
            <div class="flex items-start justify-between mb-2">
              <div class="flex-1">
                <div class="text-base font-semibold mb-1">Заказ №{{ order.orderNumber }}</div>
                <div class="text-sm text-gray-400 mb-1">
                  {{ formatOrderDate(order.createdAt) }}
                </div>
                <div class="text-sm text-gray-300">
                  {{ getOrderAddressText(order) }}
                </div>
              </div>
              <div class="text-base font-semibold ml-4">
                {{ Math.round(Number(order.total)).toLocaleString('ru-RU') }} Р
              </div>
            </div>
            <!-- Миниатюры товаров -->
            <div class="flex gap-2 mt-3">
              <div
                v-for="(thumb, index) in getProductThumbnails(order)"
                :key="index"
                class="w-12 h-12 rounded bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                <img
                  :src="thumb.image"
                  :alt="thumb.name"
                  class="w-full h-full object-cover"
                  @error="(e: any) => e.target.src = '/placeholder-product.png'" />
              </div>
            </div>
          </div>
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
          <div class="text-sm text-gray-400 mb-1">Дата</div>
          <div class="font-semibold">{{ formatOrderDate(selectedOrder.createdAt) }}</div>
        </div>
        <div>
          <div class="text-sm text-gray-400 mb-2">Товары</div>
          <div class="space-y-2">
            <div
              v-for="item in selectedOrder.items"
              :key="item.id"
              class="flex justify-between text-sm">
              <span>{{ item.product?.name || 'Товар' }} × {{ item.quantity }}</span>
              <span>{{ Number(item.subtotal).toFixed(2) }} ₽</span>
            </div>
          </div>
        </div>
        <div class="pt-4 border-t border-white/10">
          <div class="flex justify-between font-semibold">
            <span>Итого:</span>
            <span>{{ Math.round(Number(selectedOrder.total)).toLocaleString('ru-RU') }} Р</span>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

