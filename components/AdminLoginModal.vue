<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  success: [admin: any]
}>()

const adminAuth = useAdminAuth()
const router = useRouter()
const route = useRoute()

const login = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const handleLogin = async () => {
  if (!login.value || !password.value) {
    error.value = 'Введите логин и пароль'
    return
  }

  loading.value = true
  error.value = null

  try {
    const result = await adminAuth.login(login.value, password.value)
    
    if (result.success) {
      emit('success', result.admin)
      
      // Перенаправляем на страницу, на которую хотели зайти, или на дашборд
      const returnUrl = route.query.returnUrl as string
      if (returnUrl) {
        router.push(returnUrl)
      } else {
        router.push('/admin')
      }
    } else {
      error.value = result.error || 'Ошибка входа в систему'
    }
  } catch (err: any) {
    error.value = err.message || 'Ошибка входа в систему'
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
  if (!loading.value) {
    // Не закрываем модальное окно, если пользователь не авторизован
    // Только сбрасываем форму
    login.value = ''
    password.value = ''
    error.value = null
    // emit('close') - не закрываем модальное окно, так как требуется авторизация
  }
}

// Обработка Enter
const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !loading.value) {
    handleLogin()
  }
}
</script>

<template>
  <Modal :open="open" title="Вход для администраторов" :close-on-overlay="false" @close="() => {}" size="md">
    <div class="space-y-4">
      <div v-if="error" class="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
        {{ error }}
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Логин
        </label>
        <input
          v-model="login"
          type="text"
          placeholder="Введите логин"
          class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"
          :disabled="loading"
          @keypress="handleKeyPress" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Пароль
        </label>
        <input
          v-model="password"
          type="password"
          placeholder="Введите пароль"
          class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"
          :disabled="loading"
          @keypress="handleKeyPress" />
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <button
          type="button"
          @click="handleClose"
          :disabled="loading"
          class="px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50">
          Отмена
        </button>
        <button
          type="button"
          @click="handleLogin"
          :disabled="loading || !login || !password"
          class="px-6 py-2 bg-accent hover:bg-accent-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>
      </div>
    </template>
  </Modal>
</template>

