<script setup lang="ts">
const router = useRouter()
const adminAuth = useAdminAuth()
// Модальное окно показывается по умолчанию - скроем только после успешной авторизации
const showLoginModal = ref(true)

const goToMain = () => {
  router.push('/')
}

const handleLogout = async () => {
  await adminAuth.logout()
  showLoginModal.value = true
}

// Проверяем авторизацию сразу при загрузке компонента
onMounted(async () => {
  if (process.client) {
    // Синхронно проверяем наличие токена
    const token = localStorage.getItem('admin_token')
    
    if (!token) {
      // Нет токена - модальное окно уже открыто (true по умолчанию)
      showLoginModal.value = true
      return
    }
    
    // Есть токен - проверяем его валидность асинхронно
    // Модальное окно остается открытым, пока не подтвердим авторизацию
    try {
      const isAuth = await adminAuth.checkAuth()
      showLoginModal.value = !isAuth
    } catch (error) {
      // Ошибка проверки - показываем модальное окно
      showLoginModal.value = true
    }
  }
})

// Следим за изменением авторизации - автоматически показываем/скрываем модальное окно
watch(() => adminAuth.isAuthenticated.value, (isAuth) => {
  showLoginModal.value = !isAuth
}, { immediate: true })

const handleLoginSuccess = () => {
  showLoginModal.value = false
}

const handleModalClose = () => {
  // Если пользователь не авторизован, не позволяем закрыть модальное окно
  if (!adminAuth.isAuthenticated.value) {
    return
  }
  showLoginModal.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Модальное окно входа - показывается всегда, если пользователь не авторизован -->
    <AdminLoginModal
      :open="showLoginModal"
      @close="handleModalClose"
      @success="handleLoginSuccess" />

    <!-- Контент админ-панели показывается только если пользователь авторизован -->
    <div v-if="adminAuth.isAuthenticated.value" class="relative">
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

      <!-- Main Content -->
      <main class="p-8 relative">
        <slot />
      </main>
    </div>
  </div>
</template>

