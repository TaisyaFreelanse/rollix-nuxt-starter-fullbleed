<script setup lang="ts">
const isVisible = ref(true)

// Проверяем, было ли уже принято согласие
onMounted(() => {
  if (process.client) {
    const accepted = localStorage.getItem('cookie-consent')
    if (accepted === 'true') {
      isVisible.value = false
    }
  }
})

const acceptCookies = () => {
  if (process.client) {
    localStorage.setItem('cookie-consent', 'true')
  }
  isVisible.value = false
}
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="isVisible"
      class="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur border-t border-white/10 p-4 md:p-3">
      <div class="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-xs md:text-sm max-w-7xl mx-auto">
        <span class="text-gray-300 text-center">Продолжая пользоваться сайтом, вы соглашаетесь с политикой и cookie.</span>
        <button
          class="px-6 py-2.5 md:px-4 md:py-2 rounded-lg bg-accent hover:bg-accent-700 text-white font-medium transition cursor-pointer whitespace-nowrap"
          @click="acceptCookies">
          Согласен
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
