<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const settings = ref({
  isMaintenanceMode: false,
  maintenanceMessage: 'Сайт временно недоступен. Ведутся технические работы.',
  estimatedReadyTime: 30, // минут
  maxConcurrentOrders: 10,
  currentOrdersCount: 0
})

const isLoading = ref(false)

const loadSettings = async () => {
  // TODO: Загрузить настройки из БД или API
  // Пока используем localStorage как заглушку
  const saved = localStorage.getItem('admin-settings')
  if (saved) {
    settings.value = { ...settings.value, ...JSON.parse(saved) }
  }
}

const saveSettings = async () => {
  isLoading.value = true
  try {
    // TODO: Сохранить настройки через API
    localStorage.setItem('admin-settings', JSON.stringify(settings.value))
    
    // Обновляем глобальное состояние (если используется store)
    // await $fetch('/api/admin/settings', {
    //   method: 'PUT',
    //   body: settings.value
    // })
    
    alert('Настройки сохранены')
  } catch (error) {
    alert('Ошибка сохранения настроек')
  } finally {
    isLoading.value = false
  }
}

const loadCurrentOrders = async () => {
  try {
    const orders = await $fetch('/api/profile/orders').catch(() => [])
    // Фильтруем активные заказы (не доставленные и не отмененные)
    const activeOrders = orders.filter((o: any) => 
      !['DELIVERED', 'CANCELLED'].includes(o.status)
    )
    settings.value.currentOrdersCount = activeOrders.length
  } catch (error) {
    console.error('Ошибка загрузки заказов:', error)
  }
}

onMounted(() => {
  loadSettings()
  loadCurrentOrders()
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-white mb-6">Настройки</h1>

    <div class="space-y-6">
      <!-- Технические работы -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold text-white mb-4">Технические работы</h2>
        
        <div class="space-y-4">
          <label class="flex items-center gap-3 cursor-pointer">
            <input
              v-model="settings.isMaintenanceMode"
              type="checkbox"
              class="w-5 h-5 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent" />
            <span class="text-gray-300">Включить режим технических работ (отключить прием заказов)</span>
          </label>

          <div v-if="settings.isMaintenanceMode" class="mt-4">
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Сообщение для пользователей
            </label>
            <textarea
              v-model="settings.maintenanceMessage"
              rows="3"
              class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"></textarea>
          </div>
        </div>
      </div>

      <!-- Управление временем готовности -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold text-white mb-4">Время готовности</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Оценочное время готовности (минут)
            </label>
            <input
              v-model.number="settings.estimatedReadyTime"
              type="number"
              min="0"
              class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
            <p class="text-xs text-gray-400 mt-1">
              Это время будет автоматически добавляться к выбранному времени доставки при высокой загруженности
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Максимальное количество одновременных заказов
            </label>
            <input
              v-model.number="settings.maxConcurrentOrders"
              type="number"
              min="1"
              class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
            <p class="text-xs text-gray-400 mt-1">
              Текущее количество активных заказов: 
              <span class="font-semibold" :class="settings.currentOrdersCount >= settings.maxConcurrentOrders ? 'text-red-400' : 'text-green-400'">
                {{ settings.currentOrdersCount }} / {{ settings.maxConcurrentOrders }}
              </span>
            </p>
            <p v-if="settings.currentOrdersCount >= settings.maxConcurrentOrders" class="text-xs text-orange-400 mt-1">
              ⚠️ Достигнут лимит заказов. Время готовности будет увеличено на {{ settings.estimatedReadyTime }} минут.
            </p>
          </div>
        </div>
      </div>

      <!-- Кнопка сохранения -->
      <div class="flex items-center justify-end">
        <button
          @click="saveSettings"
          :disabled="isLoading"
          class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50">
          {{ isLoading ? 'Сохранение...' : 'Сохранить настройки' }}
        </button>
      </div>
    </div>
  </div>
</template>

