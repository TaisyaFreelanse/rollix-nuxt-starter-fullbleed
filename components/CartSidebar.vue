<script setup lang="ts">
const model = defineModel<boolean>({ required: true })
const cartStore = useCartStore()
const router = useRouter()

const promoCodeInput = ref('')
const isApplyingPromo = ref(false)
const promoError = ref<string | null>(null)

// Активная вкладка для приборов/специй
const activeTab = ref<'utensils' | 'spices'>('utensils')

// Товары для специй и приборов (статические данные)
const utensils = ref([
  {
    id: 'utensils-chopsticks',
    name: 'Палочки',
    price: 8,
    image: '/placeholder-utensils.png',
    category: { id: 'utensils', name: 'Приборы' }
  }
])

const spices = ref([
  {
    id: 'spice-ginger',
    name: 'Имбирь',
    price: 70,
    image: '/placeholder-ginger.png',
    category: { id: 'spices', name: 'Специи' }
  },
  {
    id: 'spice-wasabi',
    name: 'Васаби',
    price: 70,
    image: '/placeholder-wasabi.png',
    category: { id: 'spices', name: 'Специи' }
  },
  {
    id: 'spice-soy',
    name: 'Соевый соус',
    price: 70,
    image: '/placeholder-soy.png',
    category: { id: 'spices', name: 'Специи' }
  }
])

// Получить количество товара в корзине
const getItemQuantity = (productId: string) => {
  const item = cartStore.items.find((i: any) => i.product.id === productId)
  return item?.quantity || 0
}

// Увеличить количество товара
const incrementUtensilOrSpice = (product: any) => {
  const existingItem = cartStore.items.find((i: any) => i.product.id === product.id)
  if (existingItem) {
    cartStore.updateQuantity(existingItem.id, existingItem.quantity + 1)
  } else {
    // Создаем объект продукта в правильном формате
    const productObj = {
      ...product,
      modifiers: [],
      description: '',
      slug: product.id,
      isActive: true
    }
    cartStore.addItem(productObj, 1, [])
  }
}

// Уменьшить количество товара
const decrementUtensilOrSpice = (product: any) => {
  const existingItem = cartStore.items.find((i: any) => i.product.id === product.id)
  if (existingItem) {
    if (existingItem.quantity > 1) {
      cartStore.updateQuantity(existingItem.id, existingItem.quantity - 1)
    } else {
      cartStore.removeItem(existingItem.id)
    }
  }
}

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
        <div class="flex items-center justify-between p-3 sm:p-4 border-b border-white/10">
          <h2 class="text-sm sm:text-base font-semibold text-white">Корзина</h2>
          <button
            class="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-gray-400 hover:text-white"
            @click="model = false">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Cart Content -->
        <div class="flex-1 overflow-y-auto p-2 sm:p-3 space-y-3">
          <div v-if="cartStore.isEmpty" class="flex flex-col items-center justify-center py-8 text-gray-400">
            <div class="text-3xl mb-3">🛒</div>
            <div class="text-sm mb-2">Корзина пуста</div>
            <button
              class="text-accent hover:text-accent-700 transition"
              @click="model = false">
              Продолжить покупки
            </button>
          </div>

          <div v-else class="space-y-4">
            <!-- Основные товары (исключаем приборы и специи) -->
            <CartItem 
              v-for="item in cartStore.items.filter((item: any) => {
                const productId = item.product.id
                const isUtensil = utensils.value.some((u: any) => u.id === productId)
                const isSpice = spices.value.some((s: any) => s.id === productId)
                return !isUtensil && !isSpice
              })" 
              :key="item.id" 
              :item="item" />
            
            <!-- Вкладки Приборы и Специи -->
            <div class="space-y-2 pt-2 border-t border-white/10">
              <div class="flex gap-2 border-b border-white/10">
                <button
                  :class="[
                    'px-3 py-1.5 text-xs font-medium transition-colors border-b-2',
                    activeTab === 'utensils'
                      ? 'text-accent border-accent'
                      : 'text-gray-400 border-transparent hover:text-gray-300'
                  ]"
                  @click="activeTab = 'utensils'">
                  Добавить приборы
                </button>
                <button
                  :class="[
                    'px-3 py-1.5 text-xs font-medium transition-colors border-b-2',
                    activeTab === 'spices'
                      ? 'text-accent border-accent'
                      : 'text-gray-400 border-transparent hover:text-gray-300'
                  ]"
                  @click="activeTab = 'spices'">
                  Добавьте специи
                </button>
              </div>

              <!-- Контент вкладки Приборы -->
              <div v-show="activeTab === 'utensils'" class="space-y-2 pt-2">
                <div v-if="utensils.length > 0" class="space-y-2">
                  <div
                    v-for="utensil in utensils"
                    :key="utensil.id"
                    class="flex items-center justify-between p-2 bg-card rounded-lg border border-white/5">
                    <div class="flex items-center gap-2 flex-1">
                      <div class="w-8 h-8 flex items-center justify-center bg-white/5 rounded text-xs">🍴</div>
                      <div class="flex-1">
                        <div class="text-xs font-medium">{{ utensil.name }}</div>
                        <div class="text-xs text-gray-400">{{ utensil.price }} Р</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <button
                        v-if="getItemQuantity(utensil.id) > 0"
                        class="w-7 h-7 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 transition text-xs"
                        @click="decrementUtensilOrSpice(utensil)">
                        −
                      </button>
                      <span v-if="getItemQuantity(utensil.id) > 0" class="text-xs text-gray-400 w-6 text-center">
                        {{ getItemQuantity(utensil.id) }}
                      </span>
                      <button
                        class="w-7 h-7 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 transition text-xs"
                        @click="incrementUtensilOrSpice(utensil)">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Контент вкладки Специи -->
              <div v-show="activeTab === 'spices'" class="space-y-2 pt-2">
                <div v-if="spices.length > 0" class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <div
                    v-for="spice in spices"
                    :key="spice.id"
                    class="flex-shrink-0 w-24 bg-card rounded-lg border border-white/5 p-2">
                    <div class="flex flex-col items-center gap-1">
                      <div class="relative w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-1">
                        <span class="text-base">
                          {{ spice.name.includes('Имбирь') ? '🫚' : spice.name.includes('Васаби') ? '🌿' : spice.name.includes('Соевый') ? '🥢' : '🍯' }}
                        </span>
                        <span
                          v-if="getItemQuantity(spice.id) > 0"
                          class="absolute -top-1 -right-1 min-w-[16px] h-[16px] flex items-center justify-center text-[9px] font-bold text-white bg-accent rounded-full px-0.5">
                          {{ getItemQuantity(spice.id) }}
                        </span>
                      </div>
                      <div class="text-[10px] font-medium text-center mb-1 leading-tight">{{ spice.name }}</div>
                      <div class="text-[10px] text-gray-400 mb-1">+{{ spice.price }} Р</div>
                      <div v-if="getItemQuantity(spice.id) > 0" class="flex items-center gap-1 w-full">
                        <button
                          class="flex-1 h-6 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 transition text-[10px]"
                          @click="decrementUtensilOrSpice(spice)">
                          −
                        </button>
                        <span class="text-[10px] text-gray-400 w-4 text-center">{{ getItemQuantity(spice.id) }}</span>
                        <button
                          class="flex-1 h-6 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 transition text-[10px]"
                          @click="incrementUtensilOrSpice(spice)">
                          +
                        </button>
                      </div>
                      <button
                        v-else
                        class="w-full h-6 flex items-center justify-center rounded bg-accent/20 hover:bg-accent/30 transition text-xs font-medium"
                        @click="incrementUtensilOrSpice(spice)">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer with Summary -->
        <div v-if="!cartStore.isEmpty" class="border-t border-white/10 p-2 sm:p-3 space-y-2 sm:space-y-3 bg-card">
          <!-- Промокод -->
          <div class="space-y-1.5">
            <div v-if="!cartStore.promoCode" class="space-y-1.5">
              <input
                v-model="promoCodeInput"
                type="text"
                placeholder="Введите промокод"
                class="w-full px-2 sm:px-3 py-1.5 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none text-[10px] sm:text-xs text-white placeholder-gray-400"
                @keyup.enter="applyPromo" />
              <button
                :disabled="isApplyingPromo || !promoCodeInput.trim()"
                class="w-full px-3 py-1.5 bg-accent hover:bg-accent-700 rounded transition text-[10px] sm:text-xs disabled:opacity-50 text-white"
                @click="applyPromo">
                {{ isApplyingPromo ? 'Применение...' : 'Применить' }}
              </button>
              <p v-if="promoError" class="text-[9px] sm:text-[10px] text-red-400">{{ promoError }}</p>
            </div>
            <div v-else class="flex items-center justify-between p-1.5 sm:p-2 bg-green-500/20 rounded">
              <div>
                <div class="text-[10px] sm:text-xs text-green-400 font-medium">{{ cartStore.promoCode.code }}</div>
                <div class="text-[9px] sm:text-[10px] text-gray-400">
                  Скидка: {{ cartStore.discount.toFixed(2) }} ₽
                </div>
              </div>
              <button
                class="text-red-400 hover:text-red-300 transition text-[10px] sm:text-xs"
                @click="removePromo">
                ✕
              </button>
            </div>
          </div>

          <!-- Summary -->
          <div class="space-y-1.5 pt-2 border-t border-white/10">
            <div class="flex justify-between text-[10px] sm:text-xs text-gray-400">
              <span>Сумма заказа</span>
              <span>{{ Math.round(cartStore.subtotal).toLocaleString('ru-RU') }} Р</span>
            </div>

            <div v-if="cartStore.promoCode && cartStore.discount > 0" class="flex justify-between text-[10px] sm:text-xs text-green-400">
              <span>Скидка:</span>
              <span>−{{ Math.round(cartStore.discount).toLocaleString('ru-RU') }} Р</span>
            </div>

            <div class="flex justify-between text-[10px] sm:text-xs text-gray-400">
              <span>Сервисный сбор</span>
              <span>0 Р</span>
            </div>

            <div class="flex justify-between text-xs sm:text-sm font-semibold text-white pt-1.5 border-t border-white/10">
              <span>Итого</span>
              <span>{{ Math.round(cartStore.total).toLocaleString('ru-RU') }} Р</span>
            </div>
          </div>

          <!-- Checkout Button -->
          <button
            class="w-full py-2 sm:py-2.5 bg-accent hover:bg-accent-700 rounded-lg text-white font-medium transition text-xs sm:text-sm"
            @click="proceedToCheckout">
            Оформить заказ за {{ Math.round(cartStore.total).toLocaleString('ru-RU') }} Р
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

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

