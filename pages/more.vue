<script setup lang="ts">
const auth = useAuth()
const router = useRouter()
const showAuthModal = ref(false)

const handleAuthSuccess = (phone: string) => {
  showAuthModal.value = false
  // После успешной авторизации можно перейти в профиль
  router.push('/profile')
}

const handleAuthCancel = () => {
  showAuthModal.value = false
}

const handleLogin = () => {
  if (auth.isAuthenticated.value) {
    router.push('/profile')
  } else {
    showAuthModal.value = true
  }
}

const handleContact = () => {
  // Можно открыть форму обратной связи или перейти на страницу контактов
  // Пока просто показываем alert
  alert('Связаться с нами:\nТелефон: +7 (415) 231-31-21\nEmail: info@rollix.ru')
}

const handleAbout = () => {
  router.push('/about')
}
</script>

<template>
  <main class="w-full min-h-screen pb-20">
    <div class="flex flex-col items-center px-4 py-8">
      <!-- Логотип -->
      <div class="mb-8 mt-4">
        <img src="/logo.svg" alt="Rollix" class="h-16 w-auto" />
      </div>

      <!-- Кнопки -->
      <div class="w-full max-w-md space-y-3">
        <!-- Войти -->
        <button
          @click="handleLogin"
          class="w-full px-6 py-4 bg-card border border-white/10 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between group">
          <div class="flex items-center gap-3">
            <span class="text-2xl">👤</span>
            <span class="text-white font-medium">{{ auth.isAuthenticated ? 'Личный кабинет' : 'Войти' }}</span>
          </div>
          <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
        </button>

        <!-- Связаться с нами -->
        <button
          @click="handleContact"
          class="w-full px-6 py-4 bg-card border border-white/10 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between group">
          <div class="flex items-center gap-3">
            <span class="text-2xl">✉️</span>
            <span class="text-white font-medium">Связаться с нами</span>
          </div>
          <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
        </button>

        <!-- О сайте -->
        <button
          @click="handleAbout"
          class="w-full px-6 py-4 bg-card border border-white/10 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between group">
          <div class="flex items-center gap-3">
            <span class="text-2xl">ℹ️</span>
            <span class="text-white font-medium">О сайте</span>
          </div>
          <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
        </button>
      </div>
    </div>

    <!-- Модальное окно авторизации -->
    <Modal :open="showAuthModal" title="Быстрая регистрация" @close="showAuthModal = false">
      <SmsAuth @success="handleAuthSuccess" @cancel="handleAuthCancel" />
    </Modal>
  </main>
</template>

