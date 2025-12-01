<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const orderId = route.params.id as string

const order = ref<any>(null)
const isLoading = ref(true)

const statusOptions = [
  { value: 'PENDING', label: 'Ожидает' },
  { value: 'CONFIRMED', label: 'Подтвержден' },
  { value: 'PREPARING', label: 'Готовится' },
  { value: 'READY', label: 'Готов' },
  { value: 'DELIVERING', label: 'Доставляется' },
  { value: 'DELIVERED', label: 'Доставлен' },
  { value: 'CANCELLED', label: 'Отменен' }
]

const loadOrder = async () => {
  isLoading.value = true
  try {
    const response = await $fetch('/api/orders/all').catch(() => ({ orders: [] }))
    order.value = response.orders.find((o: any) => o.id === orderId)
    
    if (!order.value) {
      alert('Заказ не найден')
      router.push('/admin/orders')
    }
  } catch (error) {
    console.error('Ошибка загрузки заказа:', error)
    alert('Ошибка загрузки заказа')
    router.push('/admin/orders')
  } finally {
    isLoading.value = false
  }
}

const updateStatus = async (newStatus: string) => {
  try {
    await $fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      body: { status: newStatus }
    })
    await loadOrder()
  } catch (error: any) {
    alert(error?.data?.message || 'Ошибка обновления статуса')
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU')
}

onMounted(() => {
  loadOrder()
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">Заказ #{{ order?.orderNumber }}</h1>
      <NuxtLink
        to="/admin/orders"
        class="text-gray-400 hover:text-white transition-colors">
        ← Назад к списку
      </NuxtLink>
    </div>

    <div v-if="isLoading" class="text-center text-gray-400 py-8">
      Загрузка...
    </div>

    <div v-else-if="order" class="space-y-6">
      <!-- Информация о заказе -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold text-white mb-4">Информация о заказе</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span class="text-gray-400">Статус:</span>
            <select
              :value="order.status"
              @change="updateStatus(($event.target as HTMLSelectElement).value)"
              class="ml-2 bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-accent focus:outline-none">
              <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
          <div>
            <span class="text-gray-400">Тип доставки:</span>
            <span class="text-white ml-2">
              {{ order.deliveryType === 'DELIVERY' ? '🚚 Доставка' : '🏪 Самовывоз' }}
            </span>
          </div>
          <div>
            <span class="text-gray-400">Клиент:</span>
            <span class="text-white ml-2">{{ order.name || '-' }}</span>
          </div>
          <div>
            <span class="text-gray-400">Телефон:</span>
            <span class="text-white ml-2">{{ order.phone }}</span>
          </div>
          <div>
            <span class="text-gray-400">Адрес:</span>
            <span class="text-white ml-2">{{ order.addressText || '-' }}</span>
          </div>
          <div>
            <span class="text-gray-400">Дата создания:</span>
            <span class="text-white ml-2">{{ formatDate(order.createdAt) }}</span>
          </div>
        </div>
      </div>

      <!-- Товары -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold text-white mb-4">Товары</h2>
        <div class="space-y-4">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div class="flex items-center gap-4">
              <img
                :src="item.product?.image || '/product.svg'"
                :alt="item.product?.name"
                class="w-16 h-16 object-cover rounded" />
              <div>
                <div class="font-medium text-white">{{ item.product?.name }}</div>
                <div class="text-sm text-gray-400">Количество: {{ item.quantity }}</div>
                <div v-if="item.modifiers?.length" class="text-xs text-gray-500 mt-1">
                  Модификаторы: {{ item.modifiers.map((m: any) => m.name).join(', ') }}
                </div>
              </div>
            </div>
            <div class="text-white font-medium">
              {{ Number(item.subtotal).toLocaleString() }} ₽
            </div>
          </div>
        </div>
      </div>

      <!-- Итого -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold text-white mb-4">Итого</h2>
        <div class="space-y-2">
          <div class="flex justify-between text-gray-300">
            <span>Товары:</span>
            <span>{{ Number(order.subtotal).toLocaleString() }} ₽</span>
          </div>
          <div class="flex justify-between text-gray-300">
            <span>Доставка:</span>
            <span>{{ Number(order.deliveryPrice).toLocaleString() }} ₽</span>
          </div>
          <div v-if="order.discount > 0" class="flex justify-between text-green-400">
            <span>Скидка:</span>
            <span>-{{ Number(order.discount).toLocaleString() }} ₽</span>
          </div>
          <div class="flex justify-between text-white text-xl font-bold pt-2 border-t border-gray-700">
            <span>Итого:</span>
            <span>{{ Number(order.total).toLocaleString() }} ₽</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

