<script setup lang="ts">
const banners = ref<any[]>([])
const currentIndex = ref(0)
const autoplayInterval = ref<NodeJS.Timeout | null>(null)
const autoplayDelay = 5000 // 5 секунд
const carouselRef = ref<HTMLElement | null>(null)

// Загрузка баннеров из API
const loadBanners = async () => {
  try {
    const data = await $fetch('/api/banners')
    banners.value = Array.isArray(data) ? data : []
    
    // Если нет активных баннеров, используем дефолтные
    if (banners.value.length === 0) {
      banners.value = [
        { id: '1', image: '/baner1.jpg', link: null },
        { id: '2', image: '/baner3.jpg', link: null },
        { id: '3', image: '/baner4.jpg', link: null }
      ]
    }
  } catch (error) {
    console.error('Ошибка загрузки баннеров:', error)
    // В случае ошибки используем дефолтные баннеры
    banners.value = [
      { id: '1', image: '/baner1.jpg', link: null },
      { id: '2', image: '/baner3.jpg', link: null },
      { id: '3', image: '/baner4.jpg', link: null }
    ]
  }
}

// Автоматическая прокрутка
const startAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }
  
  autoplayInterval.value = setInterval(() => {
    if (banners.value.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % banners.value.length
    }
  }, autoplayDelay)
}

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
    autoplayInterval.value = null
  }
}

const goToSlide = (index: number) => {
  currentIndex.value = index
  stopAutoplay()
  startAutoplay()
}

const nextSlide = () => {
  if (banners.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % banners.value.length
    stopAutoplay()
    startAutoplay()
  }
}

const prevSlide = () => {
  if (banners.value.length > 0) {
    currentIndex.value = (currentIndex.value - 1 + banners.value.length) % banners.value.length
    stopAutoplay()
    startAutoplay()
  }
}

let touchStartX = 0
let touchEndX = 0

const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX
  stopAutoplay()
}

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX = e.changedTouches[0].clientX
  handleSwipe()
  startAutoplay()
}

const handleSwipe = () => {
  const swipeDistance = touchStartX - touchEndX
  const minSwipeDistance = 50

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      // Свайп влево - следующий слайд
      nextSlide()
    } else {
      // Свайп вправо - предыдущий слайд
      prevSlide()
    }
  }
}

const handleBannerClick = (banner: any) => {
  if (banner.link) {
    navigateTo(banner.link)
  }
}

// Обновление баннеров периодически (каждые 10 секунд) для отображения изменений
let refreshInterval: NodeJS.Timeout | null = null

// Обновление при фокусе окна
const handleFocus = () => {
  loadBanners()
}

onMounted(async () => {
  await loadBanners()
  if (banners.value.length > 0) {
    startAutoplay()
  }
  
  // Обновляем баннеры каждые 10 секунд для быстрого отображения изменений
  refreshInterval = setInterval(async () => {
    await loadBanners()
    if (banners.value.length > 0 && !autoplayInterval.value) {
      startAutoplay()
    }
  }, 10000)
  
  // Обновляем при возврате фокуса на страницу
  if (process.client) {
    window.addEventListener('focus', handleFocus)
  }
})

onUnmounted(() => {
  stopAutoplay()
  if (refreshInterval) {
    clearInterval(refreshInterval)
    refreshInterval = null
  }
  if (process.client) {
    window.removeEventListener('focus', handleFocus)
  }
})

// Останавливаем автопрокрутку при наведении
const handleMouseEnter = () => {
  stopAutoplay()
}

const handleMouseLeave = () => {
  startAutoplay()
}
</script>

<template>
  <section
    v-if="banners.length > 0"
    ref="carouselRef"
    class="relative w-full h-[30vh] md:h-[40vh] min-h-[200px] md:min-h-[300px] max-h-[400px] md:max-h-[500px] overflow-hidden"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd">
    <!-- Баннеры -->
    <div class="relative w-full h-full overflow-hidden">
      <div
        class="flex transition-transform duration-500 ease-in-out h-full"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div
          v-for="(banner, index) in banners"
          :key="banner.id || index"
          class="min-w-full h-full flex-shrink-0 cursor-pointer"
          @click="handleBannerClick(banner)">
          <img
            :src="banner.image"
            :alt="banner.title || `Баннер ${index + 1}`"
            class="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <!-- Кнопки навигации -->
    <button
      @click="prevSlide"
      class="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors backdrop-blur-sm">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors backdrop-blur-sm">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Индикаторы (точки) - только для десктопа -->
    <div class="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 z-10 items-center gap-1.5">
      <button
        v-for="(banner, index) in banners"
        :key="`indicator-${index}`"
        @click="goToSlide(index)"
        :class="[
          'w-1.5 h-1.5 rounded-full transition-all',
          index === currentIndex
            ? 'bg-accent w-5'
            : 'bg-white/50 hover:bg-white/75'
        ]"
        :aria-label="`Перейти к баннеру ${index + 1}`" />
    </div>
  </section>
</template>

