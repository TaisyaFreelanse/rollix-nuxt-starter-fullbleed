
<script setup lang="ts">
const mobileOpen = useState('mobileOpen', () => false)
const auth = useAuth()
const router = useRouter()
const showAuthModal = ref(false)
const isScrolled = ref(false)

// Отслеживание скролла для анимации шапки
if (process.client) {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 10
  }
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
}

// Отслеживание изменений авторизации для обновления UI
watch(() => auth.isAuthenticated.value, (isAuth) => {
  // Принудительно обновляем компонент при изменении авторизации
  if (isAuth) {
    // Пользователь авторизован
  }
})

const handleAuthSuccess = (phone: string) => {
  showAuthModal.value = false
  // Токен уже сохранен в useAuth через SmsAuth
  // Принудительно обновляем состояние для реактивности
  nextTick(() => {
    // Состояние должно обновиться автоматически через useAuth
  })
}

const handleProfileClick = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
  
  // Проверяем авторизацию еще раз перед переходом
  const isAuth = auth.isAuthenticated.value
  const hasToken = !!auth.token.value
  
  if (isAuth && hasToken) {
    router.push('/profile')
  } else {
    showAuthModal.value = true
  }
}

const handleAuthCancel = () => {
  showAuthModal.value = false
}
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-[#121315]/95 backdrop-blur-md border-b border-white/10 shadow-lg'
        : 'bg-[#121315]/90 backdrop-blur border-b border-white/5'
    ]">
    <div class="w-[100vw] px-3 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <button class="md:hidden p-1.5 rounded-lg bg-white/5 hover:bg-white/10" @click="mobileOpen=true">☰</button>
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="/logo.svg" class="h-8 sm:h-10 md:h-12 w-auto" alt="Уасаби" />
        </NuxtLink>
      </div>
      <div class="hidden md:flex items-center gap-4">
        <nav class="flex items-center gap-2">
          <NuxtLink to="/promo" class="px-4 py-2 rounded-lg hover:bg-white/5 transition" exact-active-class="text-white">Акции</NuxtLink>
          <NuxtLink to="/delivery" class="px-4 py-2 rounded-lg hover:bg-white/5 transition" exact-active-class="text-white">О доставке</NuxtLink>
        </nav>
        <a href="tel:+74152313121" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition text-sm">
          <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span class="text-white">+7 (415) 231-31-21</span>
        </a>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm cursor-pointer relative z-10 flex items-center gap-2"
          @click.stop="handleProfileClick">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>{{ auth.isAuthenticated.value ? 'Профиль' : 'Войти' }}</span>
        </button>
      </div>
    </div>

    <!-- Модальное окно авторизации -->
    <Modal :open="showAuthModal" title="Быстрая регистрация" @close="showAuthModal = false">
      <SmsAuth @success="handleAuthSuccess" @cancel="handleAuthCancel" />
    </Modal>
  </header>
</template>

