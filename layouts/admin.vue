<script setup lang="ts">
const router = useRouter()
const adminAuth = useAdminAuth()
const showLoginModal = ref(false)
const isChecking = ref(true)

const goToMain = () => {
  router.push('/')
}

const handleLogout = async () => {
  await adminAuth.logout()
  showLoginModal.value = true
}

// Проверяем авторизацию при загрузке
onMounted(async () => {
  if (process.client) {
    // Даем время на инициализацию токена из localStorage
    await nextTick()
    
    // Быстро завершаем проверку, чтобы контент отобразился
    isChecking.value = false
    
    // Проверяем авторизацию асинхронно, не блокируя UI
    try {
      // Если есть токен, проверяем его валидность
      if (adminAuth.token.value) {
        adminAuth.checkAuth().then((isAuth) => {
          if (!isAuth) {
            showLoginModal.value = true
          }
        }).catch(() => {
          showLoginModal.value = true
        })
      } else {
        // Если токена нет, сразу показываем модальное окно
        showLoginModal.value = true
      }
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error)
      showLoginModal.value = true
    }
  }
})

// Следим за изменением авторизации
watch(() => adminAuth.isAuthenticated.value, (isAuth) => {
  if (!isAuth && !isChecking.value) {
    showLoginModal.value = true
  } else if (isAuth) {
    showLoginModal.value = false
  }
})

const handleLoginSuccess = () => {
  showLoginModal.value = false
}

const handleModalClose = () => {
  // Если пользователь не авторизован, не позволяем закрыть модальное окно
  // Оно должно оставаться открытым до авторизации
  if (!adminAuth.isAuthenticated.value) {
    return
  }
  showLoginModal.value = false
}

// Показываем модальное окно, если пользователь не авторизован после инициализации
watch(() => [isChecking.value, adminAuth.isAuthenticated.value], ([checking, isAuth]) => {
  if (!checking && !isAuth && !showLoginModal.value) {
    showLoginModal.value = true
  }
}, { immediate: true })
</script>

<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Модальное окно входа -->
    <AdminLoginModal
      v-if="!isChecking"
      :open="showLoginModal && !adminAuth.isAuthenticated.value"
      @close="handleModalClose"
      @success="handleLoginSuccess" />

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
          <div v-if="adminAuth.isAuthenticated.value && adminAuth.admin.value" class="text-sm text-gray-400">
            {{ adminAuth.admin.value.name || adminAuth.admin.value.login }}
          </div>
          <button
            v-if="adminAuth.isAuthenticated.value"
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
</template>

