<script setup lang="ts">
const banners = [
  '/baner1.jpg',
  '/baner2.jpg',
  '/baner3.jpg',
  '/baner4.jpg'
]

const currentIndex = ref(0)
const autoplayInterval = ref<NodeJS.Timeout | null>(null)
const autoplayDelay = 5000 // 5 секунд
const carouselRef = ref<HTMLElement | null>(null)

// Автоматическая прокрутка
const startAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }
  
  autoplayInterval.value = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % banners.length
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
  currentIndex.value = (currentIndex.value + 1) % banners.length
  stopAutoplay()
  startAutoplay()
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + banners.length) % banners.length
  stopAutoplay()
  startAutoplay()
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

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
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
    ref="carouselRef"
    class="relative w-[100vw] h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden"
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
          :key="banner"
          class="min-w-full h-full flex-shrink-0">
          <img
            :src="banner"
            :alt="`Баннер ${index + 1}`"
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

    <!-- Индикаторы (точки) -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
      <button
        v-for="(banner, index) in banners"
        :key="`indicator-${index}`"
        @click="goToSlide(index)"
        :class="[
          'w-2 h-2 rounded-full transition-all',
          index === currentIndex
            ? 'bg-accent w-8'
            : 'bg-white/50 hover:bg-white/75'
        ]"
        :aria-label="`Перейти к баннеру ${index + 1}`" />
    </div>
  </section>
</template>

