<script setup lang="ts">
const router = useRouter()
const adminAuth = useAdminAuth()

// Состояния - начинаем с показа формы входа по умолчанию
const isAuthorized = ref(false)
const isChecking = ref(false) // Проверка идёт
const mounted = ref(false) // Компонент смонтирован

// Форма входа
const loginForm = ref({
  login: '',
  password: ''
})
const loginError = ref('')
const loginLoading = ref(false)

const goToMain = () => {
  router.push('/')
}

const handleLogout = async () => {
  await adminAuth.logout()
  isAuthorized.value = false
}

const handleLogin = async () => {
  if (!loginForm.value.login || !loginForm.value.password) {
    loginError.value = 'Введите логин и пароль'
    return
  }
  
  loginLoading.value = true
  loginError.value = ''
  
  try {
    const result = await adminAuth.login(loginForm.value.login, loginForm.value.password)
    if (result.success) {
      isAuthorized.value = true
    } else {
      loginError.value = result.error || 'Ошибка входа'
    }
  } catch (error: any) {
    loginError.value = error.message || 'Ошибка входа'
  } finally {
    loginLoading.value = false
  }
}

// Проверяем авторизацию только на клиенте
onMounted(async () => {
  mounted.value = true
  isChecking.value = true
  
  try {
    const isValid = await adminAuth.checkAuth()
    isAuthorized.value = isValid
  } catch (error) {
    isAuthorized.value = false
  } finally {
    isChecking.value = false
  }
})

// Вычисляемое свойство для показа формы
const showLoginForm = computed(() => {
  // На сервере всегда показываем форму
  if (!mounted.value) return true
  // Если проверка идёт - показываем спиннер
  if (isChecking.value) return false
  // Если не авторизован - показываем форму
  return !isAuthorized.value
})

const showSpinner = computed(() => {
  return mounted.value && isChecking.value
})

const showContent = computed(() => {
  return mounted.value && !isChecking.value && isAuthorized.value
})
</script>

<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Спиннер проверки -->
    <div v-if="showSpinner" class="fixed inset-0 flex items-center justify-center bg-gray-900 z-[9999]">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-gray-400">Проверка авторизации...</p>
      </div>
    </div>

    <!-- Форма входа -->
    <div v-if="showLoginForm" class="fixed inset-0 flex items-center justify-center bg-gray-900 z-[9999]">
      <div class="bg-gray-800 rounded-2xl p-8 w-full max-w-md border border-gray-700 shadow-2xl">
        <h2 class="text-2xl font-bold text-white mb-6 text-center">🔐 Вход для администраторов</h2>
        
        <div v-if="loginError" class="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {{ loginError }}
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Логин</label>
            <input
              v-model="loginForm.login"
              type="text"
              placeholder="admin"
              autocomplete="username"
              class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              :disabled="loginLoading"
              @keypress.enter="handleLogin" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Пароль</label>
            <input
              v-model="loginForm.password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              :disabled="loginLoading"
              @keypress.enter="handleLogin" />
          </div>
        </div>
        
        <div class="mt-6 flex items-center justify-between">
          <NuxtLink to="/" class="text-gray-400 hover:text-white text-sm transition-colors">
            ← На сайт
          </NuxtLink>
          <button
            @click="handleLogin"
            :disabled="loginLoading || !loginForm.login || !loginForm.password"
            class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {{ loginLoading ? 'Вход...' : 'Войти' }}
          </button>
        </div>
        
        <p class="mt-4 text-center text-xs text-gray-500">
          Логин: admin / Пароль: admin123
        </p>
      </div>
    </div>

    <!-- Контент админ-панели -->
    <div v-if="showContent">
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
  </div>
</template>
