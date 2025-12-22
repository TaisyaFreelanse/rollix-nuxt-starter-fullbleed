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

// Загружаем зоны доставки (только для Петропавловска-Камчатского)
const loadZones = async () => {
  try {
    isLoading.value = true
    const response = await $fetch<{ zones: DeliveryZone[] }>('/api/delivery-zones')
    // Фильтруем зоны - показываем только зоны для Петропавловска-Камчатского
    zones.value = response.zones.filter(zone => 
      zone.name.includes('Петро-Кам') || zone.name.includes('Петропавловск')
    )
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
    
    <!-- Карта Google Maps для Петропавловска-Камчатского -->
    <div class="rounded-lg overflow-hidden border border-white/10 mx-3 sm:mx-4 lg:mx-8 mb-4">
      <div class="relative w-full" style="height: 60vh; min-height: 400px; overflow: hidden;">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1IfxTsTdE_9g3TkhGFnBOVru_GQCVDNo&ehbc=2E312F&ll=53.0194,158.6503&z=12"
          width="100%"
          height="100%"
          style="border:0; margin-top: -70px; height: calc(100% + 70px); pointer-events: auto; display: block;"
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
        <!-- Основная информация -->
        <div class="space-y-3">
          <div class="flex justify-between items-center py-2 border-b border-white/10">
            <span class="text-gray-400 text-sm">Время доставки:</span>
            <span class="text-white text-sm font-semibold">~{{ selectedZone.estimatedTime }} мин</span>
          </div>
          
          <div class="flex justify-between items-center py-2 border-b border-white/10">
            <span class="text-gray-400 text-sm">Минимальная сумма заказа:</span>
            <span class="text-accent text-sm font-semibold">{{ selectedZone.minOrderAmount.toLocaleString('ru-RU') }} ₽</span>
          </div>
          
          <div class="flex justify-between items-center py-2 border-b border-white/10">
            <span class="text-gray-400 text-sm">Стоимость доставки:</span>
            <span class="text-white text-sm font-semibold">{{ selectedZone.deliveryPrice.toLocaleString('ru-RU') }} ₽</span>
          </div>
        </div>
        
        <!-- Условия доставки -->
        <div class="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-4">
          <div class="text-sm text-gray-300 leading-relaxed">
            <div class="font-medium text-white mb-2">Условия доставки:</div>
            <div class="space-y-1">
              <div>• До суммы <span class="font-semibold text-white">{{ selectedZone.minOrderAmount.toLocaleString('ru-RU') }} ₽</span> доставка платная: <span class="font-semibold text-white">{{ selectedZone.deliveryPrice.toLocaleString('ru-RU') }} ₽</span></div>
              <div class="text-accent">• От суммы <span class="font-semibold">{{ selectedZone.minOrderAmount.toLocaleString('ru-RU') }} ₽</span> доставка <span class="font-semibold">бесплатная</span></div>
            </div>
          </div>
        </div>
        
        <!-- Дополнительная информация -->
        <div v-if="selectedZone.description" class="pt-2 border-t border-white/10">
          <div class="text-xs text-gray-400 leading-relaxed">
            {{ selectedZone.description }}
          </div>
        </div>
        
        <!-- Информация о филиале -->
        <div class="pt-2 border-t border-white/10">
          <div class="text-xs text-gray-400 space-y-1">
            <div><span class="text-gray-500">Город:</span> Петропавловск-Камчатский</div>
            <div><span class="text-gray-500">Филиал:</span> ул. Советская, 30</div>
            <div><span class="text-gray-500">Точка:</span> Петропаловск_1 Сов</div>
          </div>
        </div>
      </div>
    </Modal>
  </main>
</template>
