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
const markerInstance = ref<any>(null) // Ссылка на маркер
const suggestions = ref<any[]>([]) // Список подсказок от Suggest API
const showSuggestions = ref(false) // Показывать ли список подсказок
const suggestionListRef = ref<HTMLDivElement | null>(null)

// Глобальная переменная для ymaps3
declare global {
  interface Window {
    ymaps3?: {
      ready: Promise<void>
      YMap: any
      YMapDefaultSchemeLayer: any
      YMapDefaultFeaturesLayer: any
      YMapControls: any
      YMapGeolocationControl: any
      YMapZoomControl: any
      YMapMarker: any
    }
  }
}

// Инициализация карты
const initMap = async () => {
  if (!mapContainer.value) {
    console.error('Контейнер карты не найден')
    return
  }

  // Убеждаемся, что контейнер имеет размеры
  if (mapContainer.value.offsetWidth === 0 || mapContainer.value.offsetHeight === 0) {
    console.error('Контейнер карты не имеет размеров')
    await nextTick()
    // Повторная попытка после следующего тика
    setTimeout(() => initMap(), 100)
    return
  }

  // Ждем загрузки API
  if (!window.ymaps3) {
    console.error('ymaps3 не загружен')
    return
  }

  try {
    // Ждем готовности API (обязательно!)
    if (window.ymaps3.ready) {
      await window.ymaps3.ready
    } else {
      // Если ready нет, ждем немного
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    // Проверяем, что карта еще не создана
    if (mapInstance.value) {
      return // Карта уже создана
    }

    // Проверяем наличие необходимых компонентов
    if (!window.ymaps3.YMap || !window.ymaps3.YMapDefaultSchemeLayer || !window.ymaps3.YMapDefaultFeaturesLayer) {
      console.error('Не все компоненты Яндекс Карт загружены')
      return
    }

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapGeolocationControl, YMapZoomControl, YMapMarker } = window.ymaps3

    // Создаем карту (в Яндекс Картах координаты: [lng, lat])
    const LOCATION: YMapLocationRequest = selectedCoordinates.value
      ? {
          center: [selectedCoordinates.value[1], selectedCoordinates.value[0]], // [lng, lat]
          zoom: 15
        }
      : {
          center: [158.6503, 53.0194], // Петропавловск-Камчатский по умолчанию [lng, lat]
          zoom: 12
        }

    // Очищаем контейнер перед созданием карты
    mapContainer.value.innerHTML = ''

    const map = new YMap(mapContainer.value, { location: LOCATION })
    mapInstance.value = map // Сохраняем ссылку на карту
    
    // Добавляем слой карты (это обязательно!)
    map.addChild(new YMapDefaultSchemeLayer({}))
    
    // Добавляем слой для маркеров (обязательно для YMapMarker!)
    map.addChild(new YMapDefaultFeaturesLayer({}))

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

      // Удаляем предыдущий маркер, если есть
      if (markerInstance.value) {
        try {
          map.removeChild(markerInstance.value)
        } catch (e) {
          console.warn('Ошибка удаления маркера:', e)
        }
        markerInstance.value = null
      }

      // Добавляем маркер на выбранную точку
      try {
        // Создаем HTML элемент для маркера
        const markerElement = document.createElement('div')
        markerElement.style.cssText = 'background: #ff0000; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);'
        
        const marker = new YMapMarker(
          {
            coordinates: [lng, lat]
          },
          markerElement
        )
        map.addChild(marker)
        markerInstance.value = marker
      } catch (error) {
        console.warn('Ошибка добавления маркера:', error)
      }

      // Показываем индикатор загрузки
      isLoading.value = true

      // Получаем адрес по координатам через HTTP Geocoder API (обратный геокодинг)
      // В API Яндекс координаты передаются как [долгота, широта]
      try {
        const response = await fetch(
          `https://geocode-maps.yandex.ru/1.x/?apikey=51d550e0-cf8f-4247-bae5-dfd32b51048d&geocode=${lng},${lat}&format=json&results=1&kind=house&lang=ru_RU`
        )
        const data = await response.json()
        const geoObject = data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
        
        if (geoObject) {
          // Используем полный адрес из GeocoderMetaData
          // Проверяем, что адрес относится к правильному региону (Россия, Петропавловск-Камчатский)
          const addressText = geoObject.metaDataProperty?.GeocoderMetaData?.text || geoObject.name
          const addressComponents = geoObject.metaDataProperty?.GeocoderMetaData?.Address?.Components || []
          
          // Проверяем, что адрес в России (не Куба и не другие страны)
          const isRussia = addressComponents.some((comp: any) => 
            comp.kind === 'COUNTRY' && (comp.name?.includes('Россия') || comp.name?.includes('Russia'))
          )
          
          if (!isRussia && addressText) {
            // Если адрес не в России, пробуем найти более точный адрес с параметром kind=house
            const preciseResponse = await fetch(
              `https://geocode-maps.yandex.ru/1.x/?apikey=51d550e0-cf8f-4247-bae5-dfd32b51048d&geocode=${lng},${lat}&format=json&results=1&kind=house&lang=ru_RU&rspn=1&ll=${lat},${lng}&spn=0.1,0.1`
            )
            const preciseData = await preciseResponse.json()
            const preciseGeoObject = preciseData.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
            
            if (preciseGeoObject) {
              const preciseAddress = preciseGeoObject.metaDataProperty?.GeocoderMetaData?.text || 
                                    preciseGeoObject.name || 
                                    addressText
              selectedAddress.value = preciseAddress
              emit('update:modelValue', preciseAddress)
              emit('update:coordinates', [lat, lng])
              emit('addressSelected', { address: preciseAddress, coordinates: [lat, lng] })
            } else {
              // Используем исходный адрес, но с предупреждением
              selectedAddress.value = addressText
              emit('update:modelValue', addressText)
              emit('update:coordinates', [lat, lng])
              emit('addressSelected', { address: addressText, coordinates: [lat, lng] })
            }
          } else {
            // Адрес в России - используем его
            selectedAddress.value = addressText
            emit('update:modelValue', addressText)
            emit('update:coordinates', [lat, lng])
            emit('addressSelected', { address: addressText, coordinates: [lat, lng] })
          }
        } else {
          // Если адрес не найден, используем координаты
          const fallbackAddress = `${lat.toFixed(6)}, ${lng.toFixed(6)}`
          selectedAddress.value = fallbackAddress
          emit('update:modelValue', fallbackAddress)
          emit('update:coordinates', [lat, lng])
        }
      } catch (error) {
        console.error('Ошибка получения адреса:', error)
        const fallbackAddress = `${lat.toFixed(6)}, ${lng.toFixed(6)}`
        selectedAddress.value = fallbackAddress
        emit('update:modelValue', fallbackAddress)
        emit('update:coordinates', [lat, lng])
      } finally {
        isLoading.value = false
      }
    })

    isMapReady.value = true
  } catch (error) {
    console.error('Ошибка инициализации карты:', error)
  }
}

// Получение подсказок через Suggest API
const fetchSuggestions = async (text: string) => {
  if (!text.trim() || text.length < 2) {
    suggestions.value = []
    showSuggestions.value = false
    return
  }

  try {
    // Получаем текущий центр карты для ограничения области поиска
    // В Yandex Maps API 3.0 координаты в формате [lng, lat]
    const center = mapInstance.value?.location?.center || [158.6503, 53.0194] // Петропавловск-Камчатский по умолчанию [lng, lat]
    const [lng, lat] = center

    // Для Suggest API параметр ll должен быть в формате lat,lng (широта, долгота)
    const response = await fetch(
      `https://suggest-maps.yandex.ru/v1/suggest?apikey=51d550e0-cf8f-4247-bae5-dfd32b51048d&text=${encodeURIComponent(
        text
      )}&lang=ru_RU&types=house,street,locality&ll=${lat},${lng}&spn=0.5,0.5&print_address=1&attrs=uri`
    )
    const data = await response.json()

    if (data.results && Array.isArray(data.results)) {
      suggestions.value = data.results
      showSuggestions.value = data.results.length > 0
    } else {
      suggestions.value = []
      showSuggestions.value = false
    }
  } catch (error) {
    console.error('Ошибка получения подсказок:', error)
    suggestions.value = []
    showSuggestions.value = false
  }
}

// Выбор адреса из подсказок
const selectSuggestion = async (suggestion: any) => {
  showSuggestions.value = false
  searchInput.value = suggestion.title.text
  isLoading.value = true

  try {
    // Используем uri для получения точных координат через Geocoder API
    let lat: number, lng: number
    let address = suggestion.title.text

    if (suggestion.uri) {
      // Используем uri для получения координат
      const geocodeResponse = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=51d550e0-cf8f-4247-bae5-dfd32b51048d&geocode=${encodeURIComponent(
          suggestion.uri
        )}&format=json&results=1`
      )
      const geocodeData = await geocodeResponse.json()
      const geoObject = geocodeData.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject

      if (geoObject) {
        const [lngStr, latStr] = geoObject.Point.pos.split(' ').map(Number)
        lng = lngStr
        lat = latStr
        address = geoObject.metaDataProperty?.GeocoderMetaData?.text || suggestion.address?.formatted_address || address
      } else {
        throw new Error('Не удалось получить координаты')
      }
    } else if (suggestion.address?.formatted_address) {
      // Если нет uri, используем адрес для геокодинга
      const geocodeResponse = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=51d550e0-cf8f-4247-bae5-dfd32b51048d&geocode=${encodeURIComponent(
          suggestion.address.formatted_address
        )}&format=json&results=1`
      )
      const geocodeData = await geocodeResponse.json()
      const geoObject = geocodeData.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject

      if (geoObject) {
        const [lngStr, latStr] = geoObject.Point.pos.split(' ').map(Number)
        lng = lngStr
        lat = latStr
        address = geoObject.metaDataProperty?.GeocoderMetaData?.text || suggestion.address.formatted_address
      } else {
        throw new Error('Не удалось получить координаты')
      }
    } else {
      throw new Error('Недостаточно данных для определения координат')
    }

    selectedAddress.value = address
    selectedCoordinates.value = [lat, lng]

    emit('update:modelValue', address)
    emit('update:coordinates', [lat, lng])
    emit('addressSelected', { address, coordinates: [lat, lng] })

    // Обновляем центр карты и добавляем маркер
    if (mapInstance.value) {
      // Удаляем предыдущий маркер, если есть
      if (markerInstance.value) {
        try {
          mapInstance.value.removeChild(markerInstance.value)
        } catch (e) {
          console.warn('Ошибка удаления маркера:', e)
        }
        markerInstance.value = null
      }

      // Обновляем местоположение карты
      try {
        if (typeof mapInstance.value.updateLocation === 'function') {
          mapInstance.value.updateLocation({
            center: [lng, lat],
            zoom: 15
          })
        } else if (mapInstance.value.location) {
          Object.assign(mapInstance.value.location, {
            center: [lng, lat],
            zoom: 15
          })
        }
      } catch (error) {
        console.warn('Не удалось обновить местоположение карты:', error)
      }

      // Добавляем маркер
      try {
        const { YMapMarker } = window.ymaps3
        if (YMapMarker) {
          const markerElement = document.createElement('div')
          markerElement.style.cssText = 'background: #ff0000; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);'
          
          const marker = new YMapMarker(
            {
              coordinates: [lng, lat]
            },
            markerElement
          )
          mapInstance.value.addChild(marker)
          markerInstance.value = marker
        }
      } catch (error) {
        console.warn('Ошибка добавления маркера:', error)
      }
    }
  } catch (error) {
    console.error('Ошибка выбора адреса:', error)
    alert('Ошибка при выборе адреса')
  } finally {
    isLoading.value = false
  }
}

// Поиск адреса (старый метод для обратной совместимости)
const searchAddress = async () => {
  if (!searchInput.value.trim()) return

  // Если есть подсказки, выбираем первую
  if (suggestions.value.length > 0) {
    await selectSuggestion(suggestions.value[0])
    return
  }

  // Иначе используем геокодинг
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

      // Обновляем центр карты и добавляем маркер
      if (mapInstance.value) {
        if (markerInstance.value) {
          try {
            mapInstance.value.removeChild(markerInstance.value)
          } catch (e) {
            console.warn('Ошибка удаления маркера:', e)
          }
          markerInstance.value = null
        }

        try {
          if (typeof mapInstance.value.updateLocation === 'function') {
            mapInstance.value.updateLocation({
              center: [lng, lat],
              zoom: 15
            })
          } else if (mapInstance.value.location) {
            Object.assign(mapInstance.value.location, {
              center: [lng, lat],
              zoom: 15
            })
          }
        } catch (error) {
          console.warn('Не удалось обновить местоположение карты:', error)
        }

        try {
          const { YMapMarker } = window.ymaps3
          if (YMapMarker) {
            const markerElement = document.createElement('div')
            markerElement.style.cssText = 'background: #ff0000; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);'
            
            const marker = new YMapMarker(
              {
                coordinates: [lng, lat]
              },
              markerElement
            )
            mapInstance.value.addChild(marker)
            markerInstance.value = marker
          }
        } catch (error) {
          console.warn('Ошибка добавления маркера:', error)
        }
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

// Debounce для подсказок
let suggestionTimeout: NodeJS.Timeout | null = null
const onSearchInput = () => {
  if (suggestionTimeout) {
    clearTimeout(suggestionTimeout)
  }
  suggestionTimeout = setTimeout(() => {
    fetchSuggestions(searchInput.value)
  }, 300) // Задержка 300мс
}

// Функция для загрузки скрипта Яндекс Карт
const loadYmapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Проверяем, не загружен ли уже скрипт и готов ли API
    if (window.ymaps3 && window.ymaps3.ready) {
      window.ymaps3.ready
        .then(() => resolve())
        .catch(reject)
      return
    }

    // Проверяем, не загружается ли уже скрипт
    const existingScript = document.querySelector('script[src*="api-maps.yandex.ru/3.0"]')
    if (existingScript) {
      // Скрипт уже есть, ждем его загрузки и готовности
      let attempts = 0
      const maxAttempts = 100 // 10 секунд
      const checkInterval = setInterval(() => {
        attempts++
        if (window.ymaps3?.ready) {
          clearInterval(checkInterval)
          window.ymaps3.ready
            .then(() => resolve())
            .catch(reject)
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval)
          reject(new Error('Таймаут загрузки Яндекс Карт API'))
        }
      }, 100)
      return
    }

    // Создаем и загружаем скрипт
    const script = document.createElement('script')
    script.src = 'https://api-maps.yandex.ru/3.0/?apikey=51d550e0-cf8f-4247-bae5-dfd32b51048d&lang=ru_RU'
    script.type = 'text/javascript'
    script.async = true

    script.onload = () => {
      // Ждем появления ymaps3 и его готовности
      let attempts = 0
      const maxAttempts = 50 // 5 секунд
      const checkReady = setInterval(() => {
        attempts++
        if (window.ymaps3?.ready) {
          clearInterval(checkReady)
          window.ymaps3.ready
            .then(() => resolve())
            .catch(reject)
        } else if (attempts >= maxAttempts) {
          clearInterval(checkReady)
          if (window.ymaps3) {
            // Если ymaps3 есть, но ready нет, пробуем продолжить
            resolve()
          } else {
            reject(new Error('ymaps3 не инициализирован после загрузки скрипта'))
          }
        }
      }, 100)
    }

    script.onerror = () => {
      // Проверяем статус загрузки скрипта
      const checkStatus = async () => {
        try {
          const response = await fetch(script.src, { method: 'HEAD', mode: 'no-cors' })
          // Если получили ответ, проверяем статус
          if (response.status === 403) {
            reject(new Error('403 Forbidden: API ключ не имеет доступа к JavaScript API 3.0.\n\nРешение:\n1. Перейдите в кабинет разработчика: https://developer.tech.yandex.ru/\n2. Проверьте, что ключ активирован для "JavaScript API и HTTP Геокодер"\n3. Настройте "Ограничение по HTTP Referer": добавьте http://localhost:* и https://rollix-delivery.onrender.com/*\n4. Подождите 1-2 минуты после изменений'))
          } else {
            reject(new Error(`Ошибка загрузки скрипта Яндекс Карт. Проверьте подключение к интернету и API ключ.`))
          }
        } catch (e) {
          // Если не удалось проверить статус, выдаем общую ошибку
          reject(new Error('Ошибка загрузки скрипта Яндекс Карт. Возможные причины:\n- API ключ не имеет доступа к JavaScript API 3.0 (403 Forbidden)\n- Не настроены ограничения по HTTP Referer\n- Проблемы с подключением к интернету\n\nПроверьте настройки ключа в кабинете разработчика Яндекс.'))
        }
      }
      checkStatus()
    }

    document.head.appendChild(script)
  })
}

// Открытие карты
const openMap = async () => {
  showMap.value = true
  // Ждем, пока модальное окно отобразится и контейнер будет доступен
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 300)) // Задержка для рендеринга модального окна

  // Сбрасываем предыдущий экземпляр карты
  if (mapInstance.value) {
    try {
      mapInstance.value.destroy?.()
    } catch (e) {
      console.warn('Ошибка при уничтожении предыдущей карты:', e)
    }
  }
  mapInstance.value = null
  isMapReady.value = false

  try {
    console.log('[Yandex Maps] Начало загрузки API...')
    // Загружаем скрипт, если он еще не загружен
    await loadYmapsScript()
    console.log('[Yandex Maps] API загружен, инициализация карты...')
    // Инициализируем карту
    await initMap()
    console.log('[Yandex Maps] Карта успешно инициализирована')
  } catch (error: any) {
    console.error('[Yandex Maps] Ошибка:', error)
    const errorMessage = error.message || 'Неизвестная ошибка'
    alert(`Ошибка загрузки карты: ${errorMessage}\n\nПроверьте:\n- Подключение к интернету\n- API ключ Яндекс Карт\n- Консоль браузера для деталей`)
  }
}

// Закрытие карты
const closeMap = () => {
  showMap.value = false
  // Очищаем карту при закрытии
  if (markerInstance.value && mapInstance.value) {
    try {
      mapInstance.value.removeChild(markerInstance.value)
    } catch (e) {
      console.warn('Ошибка удаления маркера:', e)
    }
    markerInstance.value = null
  }
  if (mapInstance.value) {
    mapInstance.value.destroy?.()
    mapInstance.value = null
  }
  isMapReady.value = false
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
        <div class="relative">
          <div class="flex gap-2">
            <div class="flex-1 relative">
              <input
                v-model="searchInput"
                type="text"
                placeholder="Введите адрес или найдите на карте"
                class="w-full px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none text-sm"
                @input="onSearchInput"
                @keyup.enter="searchAddress"
                @focus="showSuggestions = suggestions.length > 0"
                @blur="setTimeout(() => { showSuggestions = false }, 200)" />
              
              <!-- Список подсказок -->
              <div
                v-if="showSuggestions && suggestions.length > 0"
                ref="suggestionListRef"
                class="absolute z-50 w-full mt-1 bg-gray-800 border border-white/10 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <button
                  v-for="(suggestion, index) in suggestions"
                  :key="index"
                  type="button"
                  @click="selectSuggestion(suggestion)"
                  class="w-full px-3 py-2 text-left hover:bg-white/10 transition text-sm border-b border-white/5 last:border-b-0">
                  <div class="font-medium text-white">{{ suggestion.title.text }}</div>
                  <div v-if="suggestion.subtitle?.text" class="text-xs text-gray-400 mt-0.5">
                    {{ suggestion.subtitle.text }}
                  </div>
                  <div v-if="suggestion.address?.formatted_address" class="text-xs text-gray-500 mt-0.5">
                    {{ suggestion.address.formatted_address }}
                  </div>
                </button>
              </div>
            </div>
            <button
              @click="searchAddress"
              :disabled="isLoading"
              class="px-4 py-2 bg-accent hover:bg-accent-700 rounded text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isLoading ? '...' : 'Найти' }}
            </button>
          </div>
        </div>

        <!-- Карта -->
        <div 
          ref="mapContainer" 
          class="w-full h-[400px] rounded-lg overflow-hidden border border-white/10 bg-gray-900"
          style="min-width: 100%; min-height: 400px;">
          <div v-if="!isMapReady" class="w-full h-full flex items-center justify-center text-gray-400">
            <div class="text-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-2"></div>
              <div class="text-sm">Загрузка карты...</div>
            </div>
          </div>
        </div>

        <!-- Выбранный адрес -->
        <div v-if="selectedAddress || selectedCoordinates" class="p-3 bg-white/5 rounded-lg border border-white/10">
          <div class="text-xs text-gray-400 mb-1">Выбранный адрес:</div>
          <div v-if="isLoading" class="text-sm text-gray-400 italic">
            Поиск адреса...
          </div>
          <div v-else-if="selectedAddress" class="text-sm text-white font-medium">
            {{ selectedAddress }}
          </div>
          <div v-else-if="selectedCoordinates" class="text-sm text-gray-400 italic">
            Адрес не найден. Координаты: {{ selectedCoordinates[0].toFixed(6) }}, {{ selectedCoordinates[1].toFixed(6) }}
          </div>
          <div v-if="selectedCoordinates && !isLoading" class="text-xs text-gray-500 mt-1">
            Координаты: {{ selectedCoordinates[0].toFixed(6) }}, {{ selectedCoordinates[1].toFixed(6) }}
          </div>
        </div>

        <!-- Инструкция -->
        <div class="text-xs text-gray-400">
          💡 Кликните на карте, чтобы выбрать адрес (адрес определится автоматически), или введите адрес в поле поиска
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

