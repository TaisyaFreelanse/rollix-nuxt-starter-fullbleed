<script setup lang="ts">
const router = useRouter()
const adminAuth = useAdminAuth()
const showLoginModal = ref(false)

const goToMain = () => {
  router.push('/')
}

const handleLogout = async () => {
  await adminAuth.logout()
  showLoginModal.value = true
}

// Следим за изменением авторизации и сразу показываем модальное окно, если не авторизован
watch(() => adminAuth.isAuthenticated.value, (isAuth) => {
  if (!isAuth) {
    showLoginModal.value = true
  } else {
    showLoginModal.value = false
  }
}, { immediate: true })

// Проверяем авторизацию при загрузке
onMounted(() => {
  if (process.client) {
    // Если нет токена, сразу показываем модальное окно (уже показано через watch)
    if (!adminAuth.token.value) {
      showLoginModal.value = true
    } else {
      // Если есть токен, проверяем его валидность асинхронно
      adminAuth.checkAuth().catch(() => {
        showLoginModal.value = true
      })
    }
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
    <!-- Модальное окно входа -->
    <AdminLoginModal
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

