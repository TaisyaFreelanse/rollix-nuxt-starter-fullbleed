<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const auth = useAuth()
const showAuthModal = ref(false)

const cartItemsCount = computed(() => cartStore.totalItems)

// Определяем активную страницу
const isActive = (path: string) => {
  if (path === '/profile') {
    return route.path.startsWith('/profile')
  }
  if (path === '/') {
    return route.path === '/' || route.path === '/catalog' || route.path.startsWith('/catalog')
  }
  if (path === '/more') {
    return route.path === '/more' || route.path.startsWith('/more')
  }
  return route.path === path || route.path.startsWith(path + '/')
}

// Навигационные пункты
const navItems = [
  {
    name: 'Каталог',
    path: '/',
    icon: '🍜',
    hasBadge: false
  },
  {
    name: 'Акции',
    path: '/promo',
    icon: '%',
    hasBadge: false
  },
  {
    name: 'Заказы',
    path: '/profile',
    icon: '🕐',
    hasBadge: false,
    requiresAuth: true
  },
  {
    name: 'Корзина',
    path: '/cart',
    icon: '🛍️',
    hasBadge: true
  },
  {
    name: 'Ещё',
    path: '/more',
    icon: '⋯',
    hasBadge: false
  }
]

const handleAuthSuccess = (phone: string) => {
  showAuthModal.value = false
  // После успешной авторизации переходим в профиль
  router.push('/profile')
}

const handleAuthCancel = () => {
  showAuthModal.value = false
}

const cartOpen = useState('cartOpen', () => false)

const handleNavClick = (item: typeof navItems[0]) => {
  // Для "Заказы" проверяем авторизацию
  if (item.requiresAuth) {
    const isAuth = auth.isAuthenticated.value
    const hasToken = !!auth.token.value
    
    if (isAuth && hasToken) {
      router.push('/profile')
    } else {
      // Показываем модальное окно авторизации
      showAuthModal.value = true
    }
    return
  }
  
  // Для корзины открываем боковую панель вместо перехода на страницу
  if (item.path === '/cart') {
    cartOpen.value = true
    return
  }
  
  // Для "Ещё" переходим на страницу
  if (item.path === '/more') {
    router.push('/more')
    return
  }
  
  router.push(item.path)
}
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#121315] border-t border-white/10 backdrop-blur-md">
    <div class="flex items-center justify-center h-16 px-2 safe-area-bottom max-w-md mx-auto">
      <button
        v-for="(item, index) in navItems"
        :key="`nav-${index}-${item.name}`"
        :class="[
          'flex flex-col items-center justify-center gap-1 h-full relative transition-colors',
          isActive(item.path)
            ? 'text-accent'
            : 'text-gray-400 hover:text-gray-300'
        ]"
        :style="{ width: `${100 / navItems.length}%` }"
        @click="handleNavClick(item)">
        <span class="text-2xl relative">
          {{ item.icon }}
          <!-- Бейдж для корзины -->
          <Transition name="badge">
            <span
              v-if="item.hasBadge && cartItemsCount > 0"
              class="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-accent rounded-full px-1">
              {{ cartItemsCount > 99 ? '99+' : cartItemsCount }}
            </span>
          </Transition>
        </span>
        <span
          :class="[
            'text-[10px] font-medium transition-colors',
            isActive(item.path) ? 'text-accent' : 'text-gray-400'
          ]">
          {{ item.name }}
        </span>
        <!-- Индикатор активной страницы -->
        <div
          v-if="isActive(item.path)"
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-accent rounded-t-full" />
      </button>
    </div>

    <!-- Модальное окно авторизации -->
    <Modal :open="showAuthModal" title="Быстрая регистрация" @close="showAuthModal = false">
      <SmsAuth @success="handleAuthSuccess" @cancel="handleAuthCancel" />
    </Modal>
  </nav>
</template>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

/* Анимация для бейджа */
.badge-enter-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.badge-leave-active {
  transition: all 0.2s ease-in;
}

.badge-enter-from {
  opacity: 0;
  transform: scale(0) rotate(-180deg);
}

.badge-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
