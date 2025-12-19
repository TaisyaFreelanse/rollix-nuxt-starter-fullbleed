<script setup lang="ts">
import type { YMapLocationRequest } from 'ymaps3'

interface Props {
  modelValue?: string
  coordinates?: [number, number] | null
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'update:coordinates', value: [number, number] | null): void
  (e: 'addressSelected', data: { address: string; coordinates: [number, number] }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const showMap = ref(false)
const mapContainer = ref<HTMLDivElement | null>(null)
const searchInput = ref('')
const isLoading = ref(false)
const isMapReady = ref(false)
const selectedAddress = ref(props.modelValue || '')
const selectedCoordinates = ref<[number, number] | null>(props.coordinates || null)
const mapInstance = ref<any>(null) // Ссылка на объект карты

// Глобальная переменная для ymaps3
declare global {
  interface Window {
    ymaps3: any
  }
}

// Инициализация карты
const initMap = async () => {
  if (!mapContainer.value || !window.ymaps3) {
    return
  }

  try {
    await window.ymaps3.ready

    const { YMap, YMapDefaultSchemeLayer, YMapControls, YMapGeolocationControl, YMapZoomControl } = window.ymaps3

    // Создаем карту (в Яндекс Картах координаты: [lng, lat])
    const LOCATION: YMapLocationRequest = selectedCoordinates.value
      ? {
          center: [selectedCoordinates.value[1], selectedCoordinates.value[0]], // [lng, lat]
          zoom: 15
        }
      : {
          center: [37.588144, 55.733842], // Москва по умолчанию [lng, lat]
          zoom: 10
        }

    const map = new YMap(mapContainer.value, { location: LOCATION })
    mapInstance.value = map // Сохраняем ссылку на карту
    map.addChild(new YMapDefaultSchemeLayer({}))

    // Добавляем контролы
    const controls = new YMapControls({ position: 'right' })
    controls.addChild(new YMapZoomControl({}))
    map.addChild(controls)

    // Добавляем геолокацию
    const geolocationControl = new YMapGeolocationControl({})
    map.addChild(geolocationControl)

    // Обработчик клика на карте (координаты приходят как [lng, lat])
    map.on('click', async (event: any) => {
      const [lng, lat] = event.coordinates
      selectedCoordinates.value = [lat, lng] // Сохраняем как [lat, lng] для API

      // Получаем адрес по координатам через HTTP Geocoder API
      try {
        const response = await fetch(
          `https://geocode-maps.yandex.ru/1.x/?apikey=51d550e0-cf8f-4247-bae5-dfd32b51048d&geocode=${lng},${lat}&format=json&results=1`
        )
        const data = await response.json()
        const geoObject = data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
        const address =
          geoObject?.metaDataProperty?.GeocoderMetaData?.text ||
          geoObject?.name ||
          `${lat.toFixed(6)}, ${lng.toFixed(6)}`

        selectedAddress.value = address
        emit('update:modelValue', address)
        emit('update:coordinates', [lat, lng])
        emit('addressSelected', { address, coordinates: [lat, lng] })
      } catch (error) {
        console.error('Ошибка получения адреса:', error)
        selectedAddress.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`
        emit('update:modelValue', selectedAddress.value)
        emit('update:coordinates', [lat, lng])
      }
    })

    isMapReady.value = true
  } catch (error) {
    console.error('Ошибка инициализации карты:', error)
  }
}

// Поиск адреса
const searchAddress = async () => {
  if (!searchInput.value.trim()) return

  isLoading.value = true
  try {
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=51d550e0-cf8f-4247-bae5-dfd32b51048d&geocode=${encodeURIComponent(
        searchInput.value
      )}&format=json&results=1`
    )
    const data = await response.json()
    const feature = data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject

    if (feature) {
      const [lng, lat] = feature.Point.pos.split(' ').map(Number)
      const address = feature.metaDataProperty?.GeocoderMetaData?.text || searchInput.value

      selectedAddress.value = address
      selectedCoordinates.value = [lat, lng]

      emit('update:modelValue', address)
      emit('update:coordinates', [lat, lng])
      emit('addressSelected', { address, coordinates: [lat, lng] })

      // Обновляем центр карты
      if (mapInstance.value) {
        mapInstance.value.setLocation({
          center: [lng, lat],
          zoom: 15
        })
      }
    } else {
      alert('Адрес не найден')
    }
  } catch (error) {
    console.error('Ошибка поиска адреса:', error)
    alert('Ошибка при поиске адреса')
  } finally {
    isLoading.value = false
  }
}

// Открытие карты
const openMap = async () => {
  showMap.value = true
  await nextTick()
  if (window.ymaps3) {
    await initMap()
  } else {
    // Ждем загрузки скрипта
    const checkYmaps = setInterval(() => {
      if (window.ymaps3) {
        clearInterval(checkYmaps)
        initMap()
      }
    }, 100)
    setTimeout(() => clearInterval(checkYmaps), 10000) // Таймаут 10 секунд
  }
}

// Закрытие карты
const closeMap = () => {
  showMap.value = false
}

// Подтверждение выбора
const confirmAddress = () => {
  if (selectedAddress.value && selectedCoordinates.value) {
    emit('update:modelValue', selectedAddress.value)
    emit('update:coordinates', selectedCoordinates.value)
    emit('addressSelected', {
      address: selectedAddress.value,
      coordinates: selectedCoordinates.value
    })
    closeMap()
  }
}

// Следим за изменениями modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      selectedAddress.value = newValue
    }
  }
)
</script>

<template>
  <div>
    <!-- Кнопка для открытия карты -->
    <button
      type="button"
      @click="openMap"
      class="w-full px-2 sm:px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 focus:border-accent focus:outline-none text-[10px] sm:text-xs text-left flex items-center gap-2">
      <span class="text-red-500">📍</span>
      <span class="flex-1 text-gray-300">
        {{ selectedAddress || 'Указать адрес доставки' }}
      </span>
      <span class="text-gray-400">→</span>
    </button>

    <!-- Модальное окно с картой -->
    <Modal :open="showMap" title="Выберите адрес доставки" @close="closeMap">
      <div class="space-y-3">
        <!-- Поиск адреса -->
        <div class="flex gap-2">
          <input
            v-model="searchInput"
            type="text"
            placeholder="Введите адрес или найдите на карте"
            class="flex-1 px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none text-sm"
            @keyup.enter="searchAddress" />
          <button
            @click="searchAddress"
            :disabled="isLoading"
            class="px-4 py-2 bg-accent hover:bg-accent-700 rounded text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed">
            {{ isLoading ? '...' : 'Найти' }}
          </button>
        </div>

        <!-- Карта -->
        <div ref="mapContainer" class="w-full h-[400px] rounded-lg overflow-hidden border border-white/10"></div>

        <!-- Выбранный адрес -->
        <div v-if="selectedAddress" class="p-3 bg-white/5 rounded-lg border border-white/10">
          <div class="text-xs text-gray-400 mb-1">Выбранный адрес:</div>
          <div class="text-sm text-white font-medium">{{ selectedAddress }}</div>
          <div v-if="selectedCoordinates" class="text-xs text-gray-500 mt-1">
            Координаты: {{ selectedCoordinates[0].toFixed(6) }}, {{ selectedCoordinates[1].toFixed(6) }}
          </div>
        </div>

        <!-- Инструкция -->
        <div class="text-xs text-gray-400">
          💡 Кликните на карте, чтобы выбрать адрес, или введите адрес в поле поиска
        </div>
      </div>

      <template #footer>
        <div class="flex gap-2">
          <button
            @click="closeMap"
            class="flex-1 py-2 text-gray-400 hover:text-white transition border border-white/10 rounded">
            Отмена
          </button>
          <button
            @click="confirmAddress"
            :disabled="!selectedAddress || !selectedCoordinates"
            class="flex-1 py-2 bg-accent hover:bg-accent-700 rounded text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed">
            Выбрать
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

