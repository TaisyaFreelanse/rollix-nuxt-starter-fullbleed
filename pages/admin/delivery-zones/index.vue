<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const adminAuth = useAdminAuth()
const zones = ref<any[]>([])
const isLoading = ref(true)

const loadZones = async () => {
  isLoading.value = true
  try {
    zones.value = await adminAuth.$fetchWithAuth('/api/admin/delivery-zones')
    // Исправляем несоответствие полей: API возвращает estimatedTime, но фронтенд ожидает deliveryTime
    zones.value = zones.value.map((zone: any) => ({
      ...zone,
      deliveryTime: zone.deliveryTime || zone.estimatedTime
    }))
  } catch (error) {
    console.error('Ошибка загрузки зон доставки:', error)
  } finally {
    isLoading.value = false
  }
}

const deleteZone = async (id: string) => {
  if (!confirm('Вы уверены, что хотите удалить эту зону доставки?')) return

  try {
    await adminAuth.$fetchWithAuth(`/api/delivery-zones/${id}`, { method: 'DELETE' })
    await loadZones()
  } catch (error) {
    alert('Ошибка удаления зоны доставки')
  }
}

onMounted(() => {
  loadZones()
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">Зоны доставки</h1>
      <NuxtLink
        to="/admin/delivery-zones/new"
        class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors">
        ➕ Добавить зону
      </NuxtLink>
    </div>

    <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div v-if="isLoading" class="p-8 text-center text-gray-400">
        Загрузка...
      </div>
      <div v-else-if="zones.length === 0" class="p-8 text-center text-gray-400">
        Зоны доставки не найдены
      </div>
      <div v-else class="divide-y divide-gray-700">
        <div
          v-for="zone in zones"
          :key="zone.id"
          class="p-6 hover:bg-gray-700 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-white">{{ zone.name }}</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                <div>
                  <span class="text-gray-400">Стоимость:</span>
                  <span class="text-white ml-2 font-medium">{{ zone.deliveryPrice }} ₽</span>
                </div>
                <div>
                  <span class="text-gray-400">Бесплатно от:</span>
                  <span class="text-white ml-2 font-medium">{{ zone.freeDeliveryThreshold }} ₽</span>
                </div>
                <div>
                  <span class="text-gray-400">Мин. заказ:</span>
                  <span class="text-white ml-2 font-medium">{{ zone.minOrderAmount }} ₽</span>
                </div>
                <div>
                  <span class="text-gray-400">Время:</span>
                  <span class="text-white ml-2 font-medium">{{ zone.deliveryTime }} мин</span>
                </div>
              </div>
              <div class="mt-2">
                <span
                  :class="[
                    'px-2 py-1 rounded text-xs font-medium',
                    zone.isActive
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  ]">
                  {{ zone.isActive ? 'Активна' : 'Неактивна' }}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <NuxtLink
                :to="`/admin/delivery-zones/${zone.id}`"
                class="text-accent hover:text-accent-700 transition-colors">
                ✏️
              </NuxtLink>
              <button
                @click="deleteZone(zone.id)"
                class="text-red-400 hover:text-red-500 transition-colors">
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

