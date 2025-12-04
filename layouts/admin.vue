<script setup lang="ts">
const router = useRouter()
const adminAuth = useAdminAuth()
// Модальное окно показывается по умолчанию - скроем только после успешной проверки авторизации
const showLoginModal = ref(true)
const isCheckingAuth = ref(true) // Флаг проверки авторизации

const goToMain = () => {
  router.push('/')
}

const handleLogout = async () => {
  await adminAuth.logout()
  showLoginModal.value = true
  isCheckingAuth.value = false
}

// Проверяем авторизацию сразу при загрузке компонента
onMounted(async () => {
  if (process.client) {
    // Модальное окно открыто по умолчанию - показываем его сразу
    showLoginModal.value = true
    isCheckingAuth.value = true
    
    // Синхронно проверяем наличие токена в localStorage
    const token = localStorage.getItem('admin_token')
    
    if (!token) {
      // Нет токена - модальное окно остается открытым
      isCheckingAuth.value = false
      return
    }
    
    // Есть токен - проверяем его валидность асинхронно
    try {
      const isAuth = await adminAuth.checkAuth()
      if (isAuth) {
        // Авторизация подтверждена - скрываем модальное окно
        showLoginModal.value = false
      } else {
        // Токен невалиден - показываем модальное окно
        showLoginModal.value = true
        adminAuth.clearAuth() // Очищаем невалидный токен
      }
    } catch (error) {
      // Ошибка проверки - показываем модальное окно
      showLoginModal.value = true
      adminAuth.clearAuth()
    } finally {
      isCheckingAuth.value = false
    }
  }
})

// Следим за изменением авторизации - автоматически показываем/скрываем модальное окно
watch(() => adminAuth.isAuthenticated.value, (isAuth) => {
  // Только после завершения проверки авторизации
  if (!isCheckingAuth.value) {
    showLoginModal.value = !isAuth
  }
})

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

    <!-- Контент админ-панели показывается только если пользователь авторизован и проверка завершена -->
    <div v-if="adminAuth.isAuthenticated.value && !isCheckingAuth && !showLoginModal" class="relative">
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

