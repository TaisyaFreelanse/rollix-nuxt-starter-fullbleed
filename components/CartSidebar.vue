<script setup lang="ts">
const model = defineModel<boolean>({ required: true })
const cartStore = useCartStore()
const router = useRouter()

const promoCodeInput = ref('')
const isApplyingPromo = ref(false)
const promoError = ref<string | null>(null)

const applyPromo = async () => {
  if (!promoCodeInput.value.trim()) return

  isApplyingPromo.value = true
  promoError.value = null

  const result = await cartStore.applyPromoCode(promoCodeInput.value.trim().toUpperCase())

  if (!result.success) {
    promoError.value = result.error || 'Ошибка применения промокода'
  }

  isApplyingPromo.value = false
}

const removePromo = () => {
  cartStore.removePromoCode()
  promoCodeInput.value = ''
  promoError.value = null
}

const proceedToCheckout = () => {
  if (cartStore.isEmpty) return
  model.value = false
  router.push('/checkout')
}

// Закрытие по Escape
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && model.value) {
    model.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <teleport to="body">
    <!-- Overlay -->
    <transition name="fade">
      <div
        v-if="model"
        class="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
        @click="model = false" />
    </transition>

    <!-- Sidebar -->
    <transition name="slide-right">
      <aside
        v-if="model"
        class="fixed z-[100] inset-y-0 right-0 w-full max-w-md bg-card border-l border-white/10 flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-white/10">
          <h2 class="text-xl font-semibold text-white">Корзина</h2>
          <button
            class="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-gray-400 hover:text-white"
            @click="model = false">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Cart Content -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <div v-if="cartStore.isEmpty" class="flex flex-col items-center justify-center py-12 text-gray-400">
            <div class="text-4xl mb-4">🛒</div>
            <div class="text-lg mb-2">Корзина пуста</div>
            <button
              class="text-accent hover:text-accent-700 transition"
              @click="model = false">
              Продолжить покупки
            </button>
          </div>

          <div v-else class="space-y-4">
            <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
          </div>
        </div>

        <!-- Footer with Summary -->
        <div v-if="!cartStore.isEmpty" class="border-t border-white/10 p-4 space-y-4 bg-card">
          <!-- Промокод -->
          <div class="space-y-2">
            <div v-if="!cartStore.promoCode" class="space-y-2">
              <input
                v-model="promoCodeInput"
                type="text"
                placeholder="Промокод"
                class="w-full px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none text-sm text-white placeholder-gray-400"
                @keyup.enter="applyPromo" />
              <button
                :disabled="isApplyingPromo || !promoCodeInput.trim()"
                class="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded transition text-sm disabled:opacity-50 text-white"
                @click="applyPromo">
                {{ isApplyingPromo ? 'Применение...' : 'Применить' }}
              </button>
              <p v-if="promoError" class="text-xs text-red-400">{{ promoError }}</p>
            </div>
            <div v-else class="flex items-center justify-between p-2 bg-green-500/20 rounded">
              <div>
                <div class="text-sm text-green-400 font-medium">{{ cartStore.promoCode.code }}</div>
                <div class="text-xs text-gray-400">
                  Скидка: {{ cartStore.discount.toFixed(2) }} ₽
                </div>
              </div>
              <button
                class="text-red-400 hover:text-red-300 transition"
                @click="removePromo">
                ✕
              </button>
            </div>
          </div>

          <!-- Summary -->
          <div class="space-y-2 pt-4 border-t border-white/10">
            <div class="flex justify-between text-sm text-gray-400">
              <span>Товаров: {{ cartStore.totalItems }}</span>
              <span>{{ cartStore.subtotal.toFixed(2) }} ₽</span>
            </div>

            <div v-if="cartStore.promoCode && cartStore.discount > 0" class="flex justify-between text-sm text-green-400">
              <span>Скидка:</span>
              <span>−{{ cartStore.discount.toFixed(2) }} ₽</span>
            </div>

            <div class="flex justify-between text-xl font-semibold text-white pt-2 border-t border-white/10">
              <span>К оплате:</span>
              <span>{{ cartStore.total.toFixed(2) }} ₽</span>
            </div>
          </div>

          <!-- Checkout Button -->
          <button
            class="w-full py-3 bg-accent hover:bg-accent-700 rounded-lg text-white font-medium transition"
            @click="proceedToCheckout">
            Оформить заказ
          </button>
        </div>
      </aside>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>

