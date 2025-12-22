<script setup lang="ts">
interface DeliveryZone {
  id: string
  name: string
  description: string | null
  minOrderAmount: number
  deliveryPrice: number
  freeDeliveryThreshold: number | null
  estimatedTime: number
}

const zones = ref<DeliveryZone[]>([])
const selectedZone = ref<DeliveryZone | null>(null)
const showZoneModal = ref(false)
const isLoading = ref(true)

// Загружаем зоны доставки
const loadZones = async () => {
  try {
    isLoading.value = true
    const response = await $fetch<{ zones: DeliveryZone[] }>('/api/delivery-zones')
    zones.value = response.zones
  } catch (error) {
    console.error('Ошибка загрузки зон доставки:', error)
  } finally {
    isLoading.value = false
  }
}

// Открываем модальное окно с информацией о зоне
const openZoneInfo = (zone: DeliveryZone) => {
  selectedZone.value = zone
  showZoneModal.value = true
}

// Закрываем модальное окно
const closeZoneModal = () => {
  showZoneModal.value = false
  selectedZone.value = null
}

onMounted(() => {
  loadZones()
})
</script>

<template>
  <main class="w-full px-0 pb-20">
    <h1 class="text-sm sm:text-base font-semibold mt-2 mb-2 px-3 sm:px-4 lg:px-8">Условия доставки</h1>
    
    <!-- Карта Google Maps -->
    <div class="rounded-lg overflow-hidden border border-white/10 mx-3 sm:mx-4 lg:mx-8 mb-4">
      <div class="relative w-full" style="height: 60vh; min-height: 400px;">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1IfxTsTdE_9g3TkhGFnBOVru_GQCVDNo&ehbc=2E312F"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>

    <!-- Список зон доставки -->
    <div class="px-3 sm:px-4 lg:px-8 mb-4">
      <h2 class="text-xs sm:text-sm font-semibold text-white mb-3">Зоны доставки</h2>
      
      <div v-if="isLoading" class="text-center py-8 text-gray-400">
        <div class="text-sm">Загрузка зон доставки...</div>
      </div>
      
      <div v-else-if="zones.length === 0" class="text-center py-8 text-gray-400">
        <div class="text-sm">Зоны доставки не найдены</div>
      </div>
      
      <div v-else class="grid gap-2 sm:gap-3 md:grid-cols-2 lg:grid-cols-4">
        <button
          v-for="zone in zones"
          :key="zone.id"
          class="card p-3 sm:p-4 text-left hover:bg-white/10 transition-colors cursor-pointer"
          @click="openZoneInfo(zone)">
          <div class="flex items-start justify-between mb-2">
            <h3 class="text-white font-semibold text-xs sm:text-sm">{{ zone.name }}</h3>
            <span class="text-accent text-xs">→</span>
          </div>
          <div class="space-y-1 text-[10px] sm:text-xs text-gray-400">
            <div>Время доставки: {{ zone.estimatedTime }} мин</div>
            <div>Мин. сумма: {{ zone.minOrderAmount.toLocaleString('ru-RU') }} ₽</div>
            <div>Доставка: {{ zone.deliveryPrice.toLocaleString('ru-RU') }} ₽</div>
          </div>
        </button>
      </div>
    </div>

    <!-- Информационные карточки -->
    <div class="grid gap-2 sm:gap-3 md:grid-cols-3 px-3 sm:px-4 lg:px-8 mt-3 sm:mt-4">
      <div class="card p-3 sm:p-4">
        <h3 class="text-white font-semibold mb-1.5 text-xs sm:text-sm">Как сделать заказ</h3>
        <p class="text-gray-400 text-[10px] sm:text-xs">Выберите блюда, добавьте в корзину, укажите адрес и удобное время.</p>
      </div>
      <div class="card p-3 sm:p-4">
        <h3 class="text-white font-semibold mb-1.5 text-xs sm:text-sm">Оплата</h3>
        <p class="text-gray-400 text-[10px] sm:text-xs">Онлайн (СБП/карта) или наличными курьеру. Чеки отправляем на e-mail.</p>
      </div>
      <div class="card p-3 sm:p-4">
        <h3 class="text-white font-semibold mb-1.5 text-xs sm:text-sm">Сроки доставки</h3>
        <p class="text-gray-400 text-[10px] sm:text-xs">Обычно 45–60 минут. В часы пик может добавляться +30–60 минут.</p>
      </div>
    </div>

    <!-- Модальное окно с информацией о зоне -->
    <Modal :open="showZoneModal" :title="selectedZone?.name || 'Информация о зоне'" @close="closeZoneModal">
      <div v-if="selectedZone" class="space-y-4">
        <div>
          <label class="text-gray-400 text-xs mb-1 block">Название</label>
          <div class="text-white text-sm font-medium">{{ selectedZone.name }}</div>
        </div>
        
        <div v-if="selectedZone.description">
          <label class="text-gray-400 text-xs mb-1 block">Описание</label>
          <div class="text-white text-sm">{{ selectedZone.description }}</div>
        </div>
        
        <div class="space-y-2 pt-2 border-t border-white/10">
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-xs">Время доставки:</span>
            <span class="text-white text-sm font-medium">{{ selectedZone.estimatedTime }} мин</span>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-xs">Минимальная сумма:</span>
            <span class="text-white text-sm font-medium">{{ selectedZone.minOrderAmount.toLocaleString('ru-RU') }} ₽</span>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-xs">Платная доставка:</span>
            <span class="text-white text-sm font-medium">{{ selectedZone.deliveryPrice.toLocaleString('ru-RU') }} ₽</span>
          </div>
          
          <div class="pt-2 border-t border-white/10">
            <div class="bg-accent/10 border border-accent/20 rounded-lg p-3">
              <div class="text-xs text-gray-300 leading-relaxed">
                <div class="font-medium text-white mb-1">Условия доставки:</div>
                <div>• До суммы {{ selectedZone.minOrderAmount.toLocaleString('ru-RU') }} ₽ доставка платная: {{ selectedZone.deliveryPrice.toLocaleString('ru-RU') }} ₽</div>
                <div>• От суммы {{ selectedZone.minOrderAmount.toLocaleString('ru-RU') }} ₽ доставка бесплатная</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="pt-2 border-t border-white/10">
          <div class="text-xs text-gray-400">
            <div>Город: Петропавловск-Камчатский</div>
            <div>Филиал: ул. Советская, 30</div>
            <div>Точка: Петропаловск_1 Сов</div>
          </div>
        </div>
      </div>
    </Modal>
  </main>
</template>
