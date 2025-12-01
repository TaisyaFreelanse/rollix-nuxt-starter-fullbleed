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
      class="fixed bottom-0 inset-x-0 z-50 bg-black/90 backdrop-blur border-t border-white/10 p-3 flex items-center justify-center gap-4 text-xs md:text-sm">
      <span class="text-gray-300">Продолжая пользоваться сайтом, вы соглашаетесь с политикой и cookie.</span>
      <button
        class="px-4 py-2 rounded bg-accent hover:bg-accent-700 text-white font-medium transition cursor-pointer"
        @click="acceptCookies">
        Согласен
      </button>
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
