
<script setup lang="ts">
const mobileOpen = useState('mobileOpen', () => false)
const cartStore = useCartStore()
const auth = useAuth()
const showAuthModal = ref(false)
const isScrolled = ref(false)
const cartItemsCount = computed(() => cartStore.totalItems)
const prevCartCount = ref(cartItemsCount.value)
const cartBounce = ref(false)

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

// Анимация при добавлении товара в корзину
watch(cartItemsCount, (newCount, oldCount) => {
  if (newCount > oldCount && oldCount > 0) {
    cartBounce.value = true
    setTimeout(() => {
      cartBounce.value = false
    }, 600)
  }
  prevCartCount.value = newCount
})

const handleAuthSuccess = (phone: string) => {
  showAuthModal.value = false
  // Токен уже сохранен в useAuth через SmsAuth
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
    <div class="w-[100vw] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button class="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10" @click="mobileOpen=true">☰</button>
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/logo.svg" class="h-10 w-auto" alt="Уасаби" />
        </NuxtLink>
      </div>
      <nav class="hidden md:flex items-center gap-2">
        <NuxtLink to="/promo" class="px-4 py-2 rounded-lg hover:bg-white/5 transition" exact-active-class="text-white">Акции</NuxtLink>
        <NuxtLink to="/restaurants" class="px-4 py-2 rounded-lg hover:bg-white/5 transition" exact-active-class="text-white">Рестораны</NuxtLink>
        <NuxtLink to="/delivery" class="px-4 py-2 rounded-lg hover:bg-white/5 transition" exact-active-class="text-white">О доставке</NuxtLink>
      </nav>
      <div class="flex items-center gap-3">
        <button class="hidden md:inline px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm">Москва</button>
        <NuxtLink
          :class="[
            'relative px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-sm',
            cartBounce ? 'animate-bounce' : ''
          ]"
          to="/cart">
          Корзина
          <Transition name="cart-badge">
            <span
              v-if="cartItemsCount > 0"
              data-cart-count
              :class="[
                'absolute -top-2 -right-2 text-xs bg-accent rounded-full px-1.5 min-w-[1.25rem] text-center font-semibold',
                cartBounce ? 'scale-125' : ''
              ]">
              {{ cartItemsCount }}
            </span>
          </Transition>
        </NuxtLink>
        <NuxtLink
          v-if="auth.isAuthenticated"
          to="/profile"
          class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm">
          Профиль
        </NuxtLink>
        <button
          v-else
          type="button"
          class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm cursor-pointer"
          @click.stop="showAuthModal = true">
          Войти
        </button>
      </div>
    </div>

    <!-- Модальное окно авторизации -->
    <Modal :open="showAuthModal" title="Быстрая регистрация" @close="showAuthModal = false">
      <SmsAuth @success="handleAuthSuccess" @cancel="handleAuthCancel" />
    </Modal>
  </header>
</template>

<style scoped>
.cart-badge-enter-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.cart-badge-leave-active {
  transition: all 0.2s ease-in;
}

.cart-badge-enter-from {
  opacity: 0;
  transform: scale(0) rotate(-180deg);
}

.cart-badge-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
