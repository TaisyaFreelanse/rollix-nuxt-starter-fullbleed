<script setup lang="ts">
console.log('[ADMIN LAYOUT] Script setup started')

const router = useRouter()

// Простые состояния - форма показана по умолчанию
const isAuthorized = ref(false)
const isReady = ref(false)

// Форма входа
const login = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const debugInfo = ref('Инициализация...')

console.log('[ADMIN LAYOUT] Initial state - isAuthorized:', isAuthorized.value)

// Безопасный вызов useAdminAuth
let adminAuth: any = null
try {
  adminAuth = useAdminAuth()
  console.log('[ADMIN LAYOUT] useAdminAuth loaded')
} catch (e) {
  console.error('[ADMIN LAYOUT] Error loading useAdminAuth:', e)
  debugInfo.value = 'Ошибка загрузки auth: ' + String(e)
}

const handleLogin = async () => {
  console.log('[ADMIN LAYOUT] handleLogin called')
  debugInfo.value = 'Попытка входа...'
  
  if (!login.value || !password.value) {
    error.value = 'Введите логин и пароль'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    if (!adminAuth) {
      error.value = 'Ошибка инициализации'
      return
    }
    
    console.log('[ADMIN LAYOUT] Calling adminAuth.login')
    const result = await adminAuth.login(login.value, password.value)
    console.log('[ADMIN LAYOUT] Login result:', result)
    
    if (result.success) {
      isAuthorized.value = true
      debugInfo.value = 'Вход успешен!'
    } else {
      error.value = result.error || 'Неверный логин или пароль'
      debugInfo.value = 'Ошибка: ' + (result.error || 'unknown')
    }
  } catch (e: any) {
    console.error('[ADMIN LAYOUT] Login error:', e)
    error.value = e.message || 'Ошибка входа'
    debugInfo.value = 'Exception: ' + String(e)
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  console.log('[ADMIN LAYOUT] handleLogout called')
  try {
    if (adminAuth) {
      await adminAuth.logout()
    }
  } catch (e) {
    console.error('[ADMIN LAYOUT] Logout error:', e)
  }
  isAuthorized.value = false
  debugInfo.value = 'Вышли из системы'
}

// Проверка при монтировании
onMounted(async () => {
  console.log('[ADMIN LAYOUT] onMounted called')
  debugInfo.value = 'Монтирование...'
  
  try {
    if (!adminAuth) {
      console.error('[ADMIN LAYOUT] adminAuth is null in onMounted')
      debugInfo.value = 'adminAuth не инициализирован'
      isReady.value = true
      return
    }
    
    console.log('[ADMIN LAYOUT] Checking auth...')
    debugInfo.value = 'Проверка авторизации...'
    
    const valid = await adminAuth.checkAuth()
    console.log('[ADMIN LAYOUT] checkAuth result:', valid)
    
    isAuthorized.value = valid
    debugInfo.value = valid ? 'Авторизован' : 'Не авторизован'
  } catch (e) {
    console.error('[ADMIN LAYOUT] onMounted error:', e)
    isAuthorized.value = false
    debugInfo.value = 'Ошибка проверки: ' + String(e)
  } finally {
    isReady.value = true
    console.log('[ADMIN LAYOUT] Ready, isAuthorized:', isAuthorized.value)
  }
})

// Следим за изменением isAuthorized
watch(isAuthorized, (val) => {
  console.log('[ADMIN LAYOUT] isAuthorized changed to:', val)
})
</script>

<template>
  <div style="min-height: 100vh; background: #111827; color: white;">
    <!-- DEBUG INFO - всегда видно -->
    <div style="position: fixed; bottom: 10px; left: 10px; background: rgba(0,0,0,0.8); color: lime; padding: 8px 12px; border-radius: 4px; font-size: 12px; z-index: 999999; font-family: monospace;">
      DEBUG: {{ debugInfo }} | Auth: {{ isAuthorized }} | Ready: {{ isReady }}
    </div>

    <!-- ФОРМА ВХОДА -->
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
            type="button"
            @click="handleLogin"
            :disabled="loading || !login || !password"
            style="padding: 12px 24px; background: #16a34a; color: white; border-radius: 8px; font-weight: 500; border: none; cursor: pointer;"
            :style="{ opacity: (loading || !login || !password) ? 0.5 : 1 }">
            {{ loading ? 'Вход...' : 'Войти' }}
          </button>
        </div>
        
        <p style="margin-top: 16px; text-align: center; font-size: 12px; color: #6b7280;">
          Логин: <b style="color: #10b981;">admin</b> / Пароль: <b style="color: #10b981;">admin123</b>
        </p>
      </div>
    </div>

    <!-- КОНТЕНТ АДМИН-ПАНЕЛИ -->
    <div v-show="isAuthorized">
      <header style="background: #1f2937; border-bottom: 1px solid #374151; padding: 16px 32px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px; cursor: pointer;" @click="router.push('/')">
            <img src="/logo.svg" alt="Logo" style="height: 48px; width: auto;" />
            <div>
              <h1 style="font-size: 20px; font-weight: bold; color: white; margin: 0;">Админ-панель</h1>
              <p style="font-size: 12px; color: #9ca3af; margin: 0;">Управление контентом</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <span v-if="adminAuth?.admin?.value" style="font-size: 14px; color: #9ca3af;">
              {{ adminAuth.admin.value.name || adminAuth.admin.value.login }}
            </span>
            <button type="button" @click="handleLogout" style="color: #9ca3af; background: none; border: none; cursor: pointer; font-size: 14px;">
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
