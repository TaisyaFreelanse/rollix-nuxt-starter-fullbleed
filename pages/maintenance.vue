<script setup lang="ts">
const route = useRoute()
const message = computed(() => route.query.message as string || 'Сайт временно недоступен. Ведутся технические работы.')
</script>

<template>
  <main class="min-h-screen w-[100vw] flex items-center justify-center bg-gray-900 px-4">
    <div class="text-center max-w-md">
      <div class="text-6xl mb-6">🔧</div>
      <h1 class="text-3xl font-bold text-white mb-4">Технические работы</h1>
      <p class="text-gray-400 text-lg mb-8">{{ message }}</p>
      <p class="text-gray-500 text-sm">Мы вернемся в ближайшее время. Спасибо за понимание!</p>
    </div>
  </main>
</template>

