<script setup lang="ts">
const cartStore = useCartStore()
const router = useRouter()
const auth = useAuth()
// const { fetchProducts } = useCatalog()

const promoCodeInput = ref('')
const isApplyingPromo = ref(false)
const promoError = ref<string | null>(null)
const showAuthModal = ref(false)

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
  
  // Проверяем авторизацию перед переходом к оформлению заказа
  if (!auth.isAuthenticated.value) {
    // Показываем модальное окно авторизации
    showAuthModal.value = true
    return
  }
  
  // Если пользователь авторизован, переходим к оформлению заказа
  router.push('/checkout')
}

const handleAuthSuccess = async (_phone: string) => {
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
  <main class="w-full px-3 sm:px-4 lg:px-8 py-2 sm:py-3">
    <h1 class="text-sm sm:text-base font-semibold mb-2 sm:mb-3">Корзина</h1>

    <div v-if="cartStore.isEmpty" class="flex flex-col items-center justify-center py-12 text-gray-400">
      <div class="text-4xl mb-4">🛒</div>
      <div class="text-sm mb-2">Корзина пуста</div>
      <NuxtLink to="/catalog" class="text-accent hover:text-accent-700 transition text-sm">
        Перейти в каталог
      </NuxtLink>
    </div>

    <div v-else class="space-y-4">
      <!-- Основные товары -->
      <div class="space-y-2">
        <CartItem 
          v-for="item in cartStore.items.filter((item: any) => {
            const productId = item.product.id
            const isUtensil = utensils.value.some((u: any) => u.id === productId)
            const isSpice = spices.value.some((s: any) => s.id === productId)
            return !isUtensil && !isSpice
          })" 
          :key="item.id" 
          :item="item" />
      </div>

      <!-- Вкладки Приборы и Специи -->
      <div class="space-y-2">
        <div class="flex gap-2 border-b border-white/10">
          <button
            :class="[
              'px-3 py-1.5 text-[11px] font-medium transition-colors border-b-2',
              activeTab === 'utensils'
                ? 'text-accent border-accent'
                : 'text-gray-400 border-transparent hover:text-gray-300'
            ]"
            @click="activeTab = 'utensils'">
            Добавить приборы
          </button>
          <button
            :class="[
              'px-3 py-1.5 text-[11px] font-medium transition-colors border-b-2',
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
              class="flex items-center justify-between p-1.5 bg-card rounded-lg border border-white/5">
              <div class="flex items-center gap-2 flex-1">
                <div class="w-6 h-6 flex items-center justify-center bg-white/5 rounded text-[10px]">🍴</div>
                <div class="flex-1">
                  <div class="text-[10px] font-medium">{{ utensil.name }}</div>
                  <div class="text-[9px] text-gray-400">{{ utensil.price }} Р</div>
                </div>
              </div>
              <div class="flex items-center gap-1.5">
                <button
                  v-if="getItemQuantity(utensil.id) > 0"
                  class="w-6 h-6 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 transition text-[10px]"
                  @click="decrementUtensilOrSpice(utensil)">
                  −
                </button>
                <span v-if="getItemQuantity(utensil.id) > 0" class="text-[10px] text-gray-400 w-5 text-center">
                  {{ getItemQuantity(utensil.id) }}
                </span>
                <button
                  class="w-6 h-6 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 transition text-[10px]"
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
              class="flex-shrink-0 w-20 bg-card rounded-lg border border-white/5 p-1.5">
              <div class="flex flex-col items-center gap-0.5">
                <div class="relative w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-0.5">
                  <span class="text-sm">
                    {{ spice.name.includes('Имбирь') ? '🫚' : spice.name.includes('Васаби') ? '🌿' : spice.name.includes('Соевый') ? '🥢' : '🍯' }}
                  </span>
                  <span
                    v-if="getItemQuantity(spice.id) > 0"
                    class="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] flex items-center justify-center text-[8px] font-bold text-white bg-accent rounded-full px-0.5">
                    {{ getItemQuantity(spice.id) }}
                  </span>
                </div>
                <div class="text-[9px] font-medium text-center leading-tight">{{ spice.name }}</div>
                <div class="text-[9px] text-gray-400 mb-0.5">+{{ spice.price }} Р</div>
                <div v-if="getItemQuantity(spice.id) > 0" class="flex items-center gap-1 w-full">
                  <button
                    class="flex-1 h-5 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 transition text-[9px]"
                    @click="decrementUtensilOrSpice(spice)">
                    −
                  </button>
                  <span class="text-[9px] text-gray-400 w-3 text-center">{{ getItemQuantity(spice.id) }}</span>
                  <button
                    class="flex-1 h-5 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 transition text-[9px]"
                    @click="incrementUtensilOrSpice(spice)">
                    +
                  </button>
                </div>
                <button
                  v-else
                  class="w-full h-5 flex items-center justify-center rounded bg-accent/20 hover:bg-accent/30 transition text-[10px] font-medium"
                  @click="incrementUtensilOrSpice(spice)">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Промокод -->
      <div class="space-y-1.5">
        <div v-if="!cartStore.promoCode">
          <div class="flex gap-1.5">
            <input
              v-model="promoCodeInput"
              type="text"
              placeholder="Введите промокод"
              class="flex-1 px-2 py-1.5 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none text-[10px]"
              @keyup.enter="applyPromo" />
            <button
              :disabled="isApplyingPromo || !promoCodeInput.trim()"
              class="px-3 py-1.5 bg-accent hover:bg-accent-700 rounded transition text-[10px] disabled:opacity-50 flex items-center justify-center"
              @click="applyPromo">
              >
            </button>
          </div>
          <p v-if="promoError" class="text-[9px] text-red-400 px-1">{{ promoError }}</p>
        </div>
        <div v-else class="flex items-center justify-between p-1.5 bg-green-500/20 rounded">
          <div>
            <div class="text-[10px] text-green-400 font-medium">{{ cartStore.promoCode.code }}</div>
            <div class="text-[9px] text-gray-400">
              Скидка: {{ cartStore.discount.toFixed(2) }} ₽
            </div>
          </div>
          <button
            class="text-red-400 hover:text-red-300 transition text-[10px]"
            @click="removePromo">
            ✕
          </button>
        </div>
      </div>

      <!-- Итого -->
      <div class="space-y-1.5 pt-1.5 border-t border-white/10">
        <div class="flex justify-between text-[10px] text-gray-400">
          <span>Сумма заказа</span>
          <span>{{ Math.round(cartStore.subtotal).toLocaleString('ru-RU') }} Р</span>
        </div>
        <div v-if="cartStore.promoCode && cartStore.discount > 0" class="flex justify-between text-[10px] text-green-400">
          <span>Скидка {{ cartStore.promoCode.discountType === 'PERCENT' ? Math.round(cartStore.promoCode.discountValue) + '%' : '' }}</span>
          <span>{{ Math.round(cartStore.discount).toLocaleString('ru-RU') }} Р</span>
        </div>
        <div class="flex justify-between text-[10px] text-gray-400">
          <span>Сервисный сбор</span>
          <span>0 Р</span>
        </div>
        <div class="flex justify-between text-xs font-semibold pt-1.5 border-t border-white/10">
          <span>Итого</span>
          <span>{{ Math.round(cartStore.total).toLocaleString('ru-RU') }} Р</span>
        </div>
      </div>

      <!-- Кнопка оформления -->
      <button
        class="w-full py-2 bg-accent hover:bg-accent-700 rounded-lg text-white font-medium transition text-xs"
        @click="proceedToCheckout">
        Оформить заказ за {{ Math.round(cartStore.total).toLocaleString('ru-RU') }} Р
      </button>
    </div>

    <!-- Модальное окно авторизации -->
    <Modal :open="showAuthModal" title="Для оформления заказа требуется регистрация" @close="handleAuthCancel">
      <SmsAuth @success="handleAuthSuccess" @cancel="handleAuthCancel" />
    </Modal>
  </main>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
