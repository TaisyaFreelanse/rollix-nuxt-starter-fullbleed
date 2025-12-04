<script setup lang="ts">
const router = useRouter()
const adminAuth = useAdminAuth()

// Простые состояния
const isAuthorized = ref(false)
const isReady = ref(false)

// Форма входа
const login = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  if (!login.value || !password.value) {
    error.value = 'Введите логин и пароль'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const result = await adminAuth.login(login.value, password.value)
    if (result.success) {
      isAuthorized.value = true
    } else {
      error.value = result.error || 'Неверный логин или пароль'
    }
  } catch (e: any) {
    error.value = e.message || 'Ошибка входа'
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  await adminAuth.logout()
  isAuthorized.value = false
}

// Проверка при монтировании
onMounted(async () => {
  const valid = await adminAuth.checkAuth()
  isAuthorized.value = valid
  isReady.value = true
})
</script>

<template>
  <div style="min-height: 100vh; background: #111827;">
    <!-- ФОРМА ВХОДА - показываем если НЕ авторизован -->
    <div 
      v-show="!isAuthorized"
      style="position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: #111827; z-index: 99999;">
      <div style="background: #1f2937; border-radius: 16px; padding: 32px; width: 100%; max-width: 400px; border: 1px solid #374151; margin: 16px;">
        <h2 style="font-size: 24px; font-weight: bold; color: white; margin-bottom: 24px; text-align: center;">
          🔐 Вход в админ-панель
        </h2>
        
        <div v-if="error" style="margin-bottom: 16px; padding: 12px; background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.5); border-radius: 8px; color: #f87171; font-size: 14px;">
          {{ error }}
        </div>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 14px; color: #d1d5db; margin-bottom: 8px;">Логин</label>
          <input
            v-model="login"
            type="text"
            placeholder="admin"
            :disabled="loading"
            @keypress.enter="handleLogin"
            style="width: 100%; background: #374151; color: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #4b5563; outline: none; box-sizing: border-box;" />
        </div>
        
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 14px; color: #d1d5db; margin-bottom: 8px;">Пароль</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            :disabled="loading"
            @keypress.enter="handleLogin"
            style="width: 100%; background: #374151; color: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #4b5563; outline: none; box-sizing: border-box;" />
        </div>
        
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <NuxtLink to="/" style="color: #9ca3af; font-size: 14px; text-decoration: none;">
            ← На сайт
          </NuxtLink>
          <button
            @click="handleLogin"
            :disabled="loading || !login || !password"
            style="padding: 12px 24px; background: #16a34a; color: white; border-radius: 8px; font-weight: 500; border: none; cursor: pointer; opacity: 1;"
            :style="{ opacity: (loading || !login || !password) ? 0.5 : 1 }">
            {{ loading ? 'Вход...' : 'Войти' }}
          </button>
        </div>
        
        <p style="margin-top: 16px; text-align: center; font-size: 12px; color: #6b7280;">
          Логин: <b>admin</b> / Пароль: <b>admin123</b>
        </p>
      </div>
    </div>

    <!-- КОНТЕНТ АДМИН-ПАНЕЛИ - показываем если авторизован -->
    <div v-show="isAuthorized">
      <header style="background: #1f2937; border-bottom: 1px solid #374151; padding: 16px 32px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px; cursor: pointer;" @click="router.push('/')">
            <img src="/logo.svg" alt="Logo" style="height: 48px; width: auto;" />
            <div>
              <h1 style="font-size: 20px; font-weight: bold; color: white;">Админ-панель</h1>
              <p style="font-size: 12px; color: #9ca3af;">Управление контентом</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <span v-if="adminAuth.admin.value" style="font-size: 14px; color: #9ca3af;">
              {{ adminAuth.admin.value.name || adminAuth.admin.value.login }}
            </span>
            <button @click="handleLogout" style="color: #9ca3af; background: none; border: none; cursor: pointer; font-size: 14px;">
              Выйти
            </button>
            <NuxtLink to="/" style="color: #9ca3af; font-size: 14px; text-decoration: none;">
              ← На сайт
            </NuxtLink>
          </div>
        </div>
      </header>

      <main style="padding: 32px;">
        <slot />
      </main>
    </div>
  </div>
</template>
