<script setup lang="ts">
const cartStore = useCartStore()
const router = useRouter()
const auth = useAuth()

const promoCodeInput = ref('')
const isApplyingPromo = ref(false)
const promoError = ref<string | null>(null)
const showAuthModal = ref(false)

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
  
  // Проверяем авторизацию перед переходом к оформлению заказа
  if (!auth.isAuthenticated.value) {
    // Показываем модальное окно авторизации
    showAuthModal.value = true
    return
  }
  
  // Если пользователь авторизован, переходим к оформлению заказа
  router.push('/checkout')
}

const handleAuthSuccess = async (phone: string) => {
  showAuthModal.value = false
  // После успешной авторизации ждем обновления состояния и переходим к оформлению
  await nextTick()
  router.push('/checkout')
}

const handleAuthCancel = () => {
  showAuthModal.value = false
}
</script>

<template>
  <main class="w-full px-4 sm:px-6 lg:px-8 py-6">
    <h1 class="text-2xl font-semibold mb-6">Корзина</h1>

    <div v-if="cartStore.isEmpty" class="flex flex-col items-center justify-center py-12 text-gray-400">
      <div class="text-4xl mb-4">🛒</div>
      <div class="text-lg mb-2">Корзина пуста</div>
      <NuxtLink to="/catalog" class="text-accent hover:text-accent-700 transition">
        Перейти в каталог
      </NuxtLink>
    </div>

    <div v-else class="grid lg:grid-cols-3 gap-6">
      <!-- Список товаров -->
      <div class="lg:col-span-2 space-y-4">
        <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
      </div>

      <!-- Итого -->
      <div class="lg:col-span-1">
        <div class="bg-card rounded-lg border border-white/5 p-6 sticky top-4">
          <h2 class="text-xl font-semibold mb-4">Итого</h2>

          <div class="space-y-3 mb-4">
            <div class="flex justify-between text-gray-400">
              <span>Товаров: {{ cartStore.totalItems }}</span>
              <span>{{ cartStore.subtotal.toFixed(2) }} ₽</span>
            </div>

            <!-- Промокод -->
            <div class="pt-3 border-t border-white/10">
              <div v-if="!cartStore.promoCode" class="space-y-2">
                <input
                  v-model="promoCodeInput"
                  type="text"
                  placeholder="Промокод"
                  class="w-full px-3 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none text-sm"
                  @keyup.enter="applyPromo" />
                <button
                  :disabled="isApplyingPromo || !promoCodeInput.trim()"
                  class="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded transition text-sm disabled:opacity-50"
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

            <div v-if="cartStore.promoCode && cartStore.discount > 0" class="flex justify-between text-green-400">
              <span>Скидка:</span>
              <span>−{{ cartStore.discount.toFixed(2) }} ₽</span>
            </div>
          </div>

          <div class="pt-4 border-t border-white/10 mb-4">
            <div class="flex justify-between text-xl font-semibold">
              <span>К оплате:</span>
              <span>{{ cartStore.total.toFixed(2) }} ₽</span>
            </div>
          </div>

          <button
            class="w-full py-3 bg-accent hover:bg-accent-700 rounded-lg text-white font-medium transition btn-mobile"
            @click="proceedToCheckout">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>

    <!-- Модальное окно авторизации -->
    <Modal :open="showAuthModal" title="Для оформления заказа требуется регистрация" @close="handleAuthCancel">
      <SmsAuth @success="handleAuthSuccess" @cancel="handleAuthCancel" />
    </Modal>
  </main>
</template>
