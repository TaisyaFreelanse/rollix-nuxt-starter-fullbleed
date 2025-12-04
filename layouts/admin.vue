<script setup lang="ts">
const router = useRouter()
const adminAuth = useAdminAuth()

// Все состояния для клиентской части
const isAuthorized = ref(false)
const isLoading = ref(true)
const isMounted = ref(false)

const goToMain = () => {
  router.push('/')
}

const handleLogout = async () => {
  await adminAuth.logout()
  isAuthorized.value = false
}

const handleLoginSuccess = () => {
  isAuthorized.value = true
}

// Проверяем авторизацию ТОЛЬКО на клиенте
onMounted(async () => {
  isMounted.value = true
  
  try {
    const isValid = await adminAuth.checkAuth()
    isAuthorized.value = isValid
  } catch (error) {
    console.error('Ошибка проверки авторизации:', error)
    isAuthorized.value = false
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Всё рендерится ТОЛЬКО на клиенте -->
    <ClientOnly>
      <!-- Спиннер загрузки -->
      <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-gray-900 z-[9999]">
        <div class="flex flex-col items-center gap-4">
          <div class="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p class="text-gray-400">Проверка авторизации...</p>
        </div>
      </div>

      <!-- Модальное окно входа -->
      <AdminLoginModal
        v-if="!isLoading && !isAuthorized"
        :open="true"
        @close="() => {}"
        @success="handleLoginSuccess" />

      <!-- Контент админ-панели -->
      <div v-if="!isLoading && isAuthorized" class="relative">
        <header class="bg-gray-800 border-b border-gray-700 px-8 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3 cursor-pointer" @click="goToMain">
              <img src="/logo.svg" alt="Logo" class="h-12 w-auto" />
              <div>
                <h1 class="text-xl font-bold text-white">Админ-панель</h1>
                <p class="text-xs text-gray-400">Управление контентом</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div v-if="adminAuth.admin.value" class="text-sm text-gray-400">
                {{ adminAuth.admin.value.name || adminAuth.admin.value.login }}
              </div>
              <button
                @click="handleLogout"
                class="text-gray-400 hover:text-white transition-colors text-sm">
                Выйти
              </button>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors text-sm">
                ← Вернуться на сайт
              </NuxtLink>
            </div>
          </div>
        </header>

        <main class="p-8 relative">
          <slot />
        </main>
      </div>

      <!-- Fallback для SSR - показываем спиннер -->
      <template #fallback>
        <div class="fixed inset-0 flex items-center justify-center bg-gray-900 z-[9999]">
          <div class="flex flex-col items-center gap-4">
            <div class="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <p class="text-gray-400">Загрузка...</p>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
