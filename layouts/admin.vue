<script setup lang="ts">
const router = useRouter()

const goToMain = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Header -->
    <header class="bg-gray-800 border-b border-gray-700 px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3 cursor-pointer" @click="goToMain">
          <img src="/logo.svg" alt="Logo" class="h-12 w-auto" />
          <div>
            <h1 class="text-xl font-bold text-white">Админ-панель</h1>
            <p class="text-xs text-gray-400">Управление контентом</p>
          </div>
        </div>
        <NuxtLink
          to="/"
          class="text-gray-400 hover:text-white transition-colors text-sm">
          ← Вернуться на сайт
        </NuxtLink>
      </div>
    </header>

    <!-- Main Content -->
    <main class="p-8">
      <slot />
    </main>
  </div>
</template>

