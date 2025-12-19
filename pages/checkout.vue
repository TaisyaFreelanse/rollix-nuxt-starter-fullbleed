<script setup lang="ts">
const cartStore = useCartStore()
const router = useRouter()
const auth = useAuth()

const showAuthModal = ref(false)

if (cartStore.isEmpty) {
  router.push('/cart')
}

const deliveryType = ref<'delivery' | 'pickup'>('delivery')
const deliveryZones = ref<any[]>([])
const selectedZone = ref<any>(null)
const deliveryAddress = ref('')
const deliveryCoordinates = ref<[number, number] | null>(null)
const phone = ref('')
const name = ref('')
const comment = ref('')
const selectedTime = ref<string | null>(null)
const isLoadingZones = ref(false)
const isCalculatingDelivery = ref(false)
const agreeToOffer = ref(true)

// Функция для форматирования телефона
const formatPhoneForInput = (phoneNumber: string) => {
  // Убираем все нецифровые символы
  const cleaned = phoneNumber.replace(/\D/g, '')
  
  // Форматируем в +7 (999) 123-45-67
  if (cleaned.startsWith('7') && cleaned.length === 11) {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`
  }
  if (cleaned.startsWith('8') && cleaned.length === 11) {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`
  }
  if (cleaned.length === 10) {
    return `+7 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8, 10)}`
  }
  return phoneNumber
}

const handleAuthSuccess = async (authPhone: string) => {
  showAuthModal.value = false
  await nextTick()
  
  // После успешной авторизации автоматически заполняем телефон
  if (auth.user.value?.phone && !phone.value) {
    phone.value = formatPhoneForInput(auth.user.value.phone)
  }
  // Также заполняем имя, если оно есть
  if (auth.user.value?.name && !name.value) {
    name.value = auth.user.value.name
  }
}

const handleAuthCancel = () => {
  // Если пользователь отменил авторизацию, возвращаем в корзину
  router.push('/cart')
  showAuthModal.value = false
}

// Загрузка зон доставки (для отображения информации, не для выбора)
const loadDeliveryZones = async () => {
  isLoadingZones.value = true
  try {
    const data = await $fetch('/api/delivery-zones')
    deliveryZones.value = data.zones || []
  } catch (error) {
    console.error('Ошибка загрузки зон доставки', error)
  } finally {
    isLoadingZones.value = false
  }
}

// Автоматический расчет доставки при выборе адреса
const calculateDelivery = async (coordinates: [number, number]) => {
  if (!coordinates) return

  isCalculatingDelivery.value = true
  try {
    const result = await $fetch('/api/delivery-zones/calculate', {
      method: 'POST',
      body: {
        lat: coordinates[0],
        lng: coordinates[1],
        subtotal: cartStore.subtotal
      }
    })

    selectedZone.value = {
      id: result.zone.id,
      name: result.zone.name,
      estimatedTime: result.zone.estimatedTime,
      deliveryPrice: result.deliveryPrice,
      freeDeliveryThreshold: result.freeDeliveryThreshold,
      minOrderAmount: result.minOrderAmount
    }
  } catch (error: any) {
    console.error('Ошибка расчета доставки:', error)
    selectedZone.value = null
    if (error.data?.message) {
      const toast = useToast()
      toast.error(error.data.message)
    }
  } finally {
    isCalculatingDelivery.value = false
  }
}

// Обработчик выбора адреса на карте
const handleAddressSelected = (data: { address: string; coordinates: [number, number] }) => {
  deliveryAddress.value = data.address
  deliveryCoordinates.value = data.coordinates
  calculateDelivery(data.coordinates)
}

onMounted(() => {
  // Проверяем авторизацию при загрузке страницы
  if (!auth.isAuthenticated.value) {
    showAuthModal.value = true
  } else {
    // Если пользователь авторизован, автоматически заполняем телефон
    if (auth.user.value?.phone && !phone.value) {
      phone.value = formatPhoneForInput(auth.user.value.phone)
    }
    // Также заполняем имя, если оно есть
    if (auth.user.value?.name && !name.value) {
      name.value = auth.user.value.name
    }
  }
  
  if (deliveryType.value === 'delivery') {
    loadDeliveryZones()
  }
})

// Следим за изменениями авторизации и обновляем данные
watch(() => auth.isAuthenticated.value, (isAuth) => {
  if (isAuth && auth.user.value?.phone && !phone.value) {
    phone.value = formatPhoneForInput(auth.user.value.phone)
  }
  if (isAuth && auth.user.value?.name && !name.value) {
    name.value = auth.user.value.name
  }
})

// Следим за изменениями user объекта
watch(() => auth.user.value, (user) => {
  if (user?.phone && !phone.value) {
    phone.value = formatPhoneForInput(user.phone)
  }
  if (user?.name && !name.value) {
    name.value = user.name
  }
}, { deep: true })

watch(deliveryType, (newType) => {
  if (newType === 'delivery') {
    loadDeliveryZones()
  } else {
    selectedZone.value = null
  }
})

// Вычисление стоимости доставки
const deliveryPrice = computed(() => {
  if (deliveryType.value === 'pickup') return 0
  if (!selectedZone.value) return 0

  const subtotal = cartStore.subtotal
  if (
    selectedZone.value.freeDeliveryThreshold &&
    subtotal >= selectedZone.value.freeDeliveryThreshold
  ) {
    return 0
  }

  return selectedZone.value.deliveryPrice || 0
})

// Итоговая сумма
const finalTotal = computed(() => {
  return cartStore.total + deliveryPrice.value
})

// Генерация доступных временных слотов
const timeSlots = computed(() => {
  const slots: string[] = []
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  // Начинаем с ближайшего часа
  let startHour = currentHour + 1
  if (currentMinute > 30) {
    startHour += 1
  }

  // Генерируем слоты на 2 дня вперед
  for (let day = 0; day < 2; day++) {
    const date = new Date(now)
    date.setDate(date.getDate() + day)
    date.setHours(day === 0 ? startHour : 10, 0, 0, 0)

    const endHour = day === 0 ? 23 : 22

    for (let hour = day === 0 ? startHour : 10; hour <= endHour; hour++) {
      date.setHours(hour, 0, 0, 0)
      slots.push(date.toISOString())

      if (hour < endHour) {
        date.setHours(hour, 30, 0, 0)
        slots.push(date.toISOString())
      }
    }
  }

  return slots
})

const formatTimeSlot = (isoString: string) => {
  const date = new Date(isoString)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const isToday = date.toDateString() === today.toDateString()
  const isTomorrow = date.toDateString() === tomorrow.toDateString()

  let dayLabel = ''
  if (isToday) dayLabel = 'Сегодня'
  else if (isTomorrow) dayLabel = 'Завтра'
  else dayLabel = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })

  const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })

  return `${dayLabel}, ${time}`
}

const isSubmitting = ref(false)
const showPaymentModal = ref(false)
const createdOrderId = ref<string | null>(null)
const payment = usePayment()
const toast = useToast()

const submitOrder = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  try {
    // Создаем заказ на сервере
    const orderData = {
      deliveryType: deliveryType.value,
      deliveryZoneId: selectedZone.value?.id,
      addressText: deliveryAddress.value,
      phone: phone.value,
      name: name.value,
      comment: comment.value,
      deliveryTime: selectedTime.value,
      items: cartStore.items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
        selectedModifiers: item.selectedModifiers
      })),
      promoCodeId: cartStore.promoCode?.code,
      subtotal: cartStore.subtotal,
      discount: cartStore.discount,
      deliveryPrice: deliveryPrice.value,
      total: finalTotal.value,
      paymentMethod: 'CASH' // По умолчанию наличные, изменится при выборе онлайн оплаты
    }

    const order = await $fetch('/api/orders', {
      method: 'POST',
      body: orderData,
      headers: auth.token.value ? { Authorization: `Bearer ${auth.token.value}` } : {}
    })

    createdOrderId.value = order.id

    // Показываем модальное окно оплаты
    showPaymentModal.value = true
  } catch (error: any) {
    console.error('Ошибка оформления заказа', error)
    toast.error(error?.data?.message || 'Произошла ошибка при оформлении заказа')
  } finally {
    isSubmitting.value = false
  }
}

const processPayment = async (paymentMethod: 'card' | 'cash') => {
  if (!createdOrderId.value) {
    toast.error('Заказ не создан')
    return
  }

  try {
    if (paymentMethod === 'cash') {
      // Наличные - заказ уже создан, просто обновляем метод оплаты
      await $fetch(`/api/orders/${createdOrderId.value}`, {
        method: 'PUT',
        body: { paymentMethod: 'CASH' },
        headers: auth.token.value ? { Authorization: `Bearer ${auth.token.value}` } : {}
      })
      
      toast.success('Заказ успешно оформлен!')
      cartStore.clear()
      showPaymentModal.value = false
      router.push('/profile?tab=orders')
    } else {
      // Онлайн оплата через ЮKassa
      const paymentResult = await payment.createPayment(
        createdOrderId.value,
        `${window.location.origin}/payment/callback`
      )

      // Перенаправляем на страницу оплаты
      if (paymentResult.confirmationUrl) {
        window.location.href = paymentResult.confirmationUrl
      } else {
        toast.info('Интеграция с ЮKassa будет реализована позже')
        showPaymentModal.value = false
      }
    }
  } catch (error: any) {
    console.error('Ошибка обработки платежа:', error)
    toast.error(error?.data?.message || 'Ошибка обработки платежа')
  }
}
</script>

<style scoped>
/* Кастомная стилизация чекбоксов */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  background-color: hsl(142, 76%, 36%);
  border-color: hsl(142, 76%, 36%);
}

input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%) rotate(45deg);
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
}
</style>

<template>
  <main class="w-full px-3 sm:px-4 lg:px-8 py-2 sm:py-3">
    <h1 class="text-sm sm:text-base font-semibold mb-2 sm:mb-3">Оформление заказа</h1>

    <div v-if="cartStore.isEmpty" class="text-center py-12">
      <p class="text-gray-400 mb-4">Корзина пуста</p>
      <NuxtLink to="/catalog" class="text-accent hover:text-accent-700">
        Перейти в каталог
      </NuxtLink>
    </div>

    <div v-else class="grid lg:grid-cols-3 gap-3 sm:gap-4">
      <!-- Форма оформления -->
      <div class="lg:col-span-2 space-y-3 sm:space-y-4">
        <!-- Способ получения -->
        <div class="bg-card rounded-lg border border-white/5 p-3 sm:p-4">
          <h2 class="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">Способ получения</h2>
          <div class="flex gap-2">
            <button
              :class="[
                'flex-1 p-1.5 sm:p-2 rounded-lg border transition',
                deliveryType === 'delivery'
                  ? 'border-accent bg-accent/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              ]"
              @click="deliveryType = 'delivery'">
              <div class="text-[10px] sm:text-xs mb-0.5">🚚 Доставка</div>
              <div class="text-[9px] sm:text-[10px] text-gray-400">Доставим по указанному адресу</div>
            </button>
            <button
              :class="[
                'flex-1 p-1.5 sm:p-2 rounded-lg border transition',
                deliveryType === 'pickup'
                  ? 'border-accent bg-accent/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              ]"
              @click="deliveryType = 'pickup'">
              <div class="text-[10px] sm:text-xs mb-0.5">🏪 Самовывоз</div>
              <div class="text-[9px] sm:text-[10px] text-gray-400">Заберите заказ сами</div>
            </button>
          </div>
        </div>

        <!-- Адрес доставки -->
        <div v-if="deliveryType === 'delivery'" class="bg-card rounded-lg border border-white/5 p-3 sm:p-4">
          <h2 class="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">Адрес доставки</h2>
          <div class="space-y-2 sm:space-y-3">
            <div>
              <label class="block text-[10px] sm:text-xs text-gray-400 mb-1">Указать адрес доставки</label>
              <AddressMapPicker
                v-model="deliveryAddress"
                :coordinates="deliveryCoordinates"
                @address-selected="handleAddressSelected" />
            </div>
            <div v-if="isCalculatingDelivery" class="text-[9px] sm:text-[10px] text-gray-400">
              ⏳ Расчет доставки...
            </div>
            <div v-else-if="selectedZone" class="p-2 bg-white/5 rounded border border-white/10">
              <div class="text-[10px] sm:text-xs font-medium text-white mb-1">
                Зона доставки: {{ selectedZone.name }}
              </div>
              <div class="text-[9px] sm:text-[10px] text-gray-400">
                Время доставки: ~{{ selectedZone.estimatedTime }} мин
              </div>
              <div v-if="selectedZone.minOrderAmount" class="text-[9px] sm:text-[10px] text-yellow-400 mt-1">
                Минимальная сумма заказа: {{ selectedZone.minOrderAmount }} ₽
              </div>
            </div>
            <div v-else-if="deliveryAddress && !isCalculatingDelivery" class="text-[9px] sm:text-[10px] text-red-400">
              ⚠️ Адрес не входит в зону доставки
            </div>
          </div>
        </div>

        <!-- Контактная информация -->
        <div class="bg-card rounded-lg border border-white/5 p-3 sm:p-4">
          <h2 class="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">Контактная информация</h2>
          <div class="space-y-2 sm:space-y-3">
            <div>
              <label class="block text-[10px] sm:text-xs text-gray-400 mb-1">Телефон *</label>
              <input
                v-model="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                required
                class="w-full px-2 sm:px-3 py-1.5 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none text-[10px] sm:text-xs" />
            </div>
            <div>
              <label class="block text-[10px] sm:text-xs text-gray-400 mb-1">Имя</label>
              <input
                v-model="name"
                type="text"
                placeholder="Ваше имя"
                class="w-full px-2 sm:px-3 py-1.5 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none text-[10px] sm:text-xs" />
            </div>
          </div>
        </div>

        <!-- Время доставки -->
        <div class="bg-card rounded-lg border border-white/5 p-3 sm:p-4">
          <h2 class="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">Время доставки</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto">
            <button
              v-for="slot in timeSlots"
              :key="slot"
              :class="[
                'p-2 rounded border text-[10px] sm:text-xs transition',
                selectedTime === slot
                  ? 'border-accent bg-accent/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              ]"
              @click="selectedTime = slot">
              {{ formatTimeSlot(slot) }}
            </button>
          </div>
        </div>

        <!-- Комментарий -->
        <div class="bg-card rounded-lg border border-white/5 p-3 sm:p-4">
          <h2 class="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">Комментарий к заказу</h2>
          <textarea
            v-model="comment"
            placeholder="Дополнительные пожелания..."
            rows="3"
            class="w-full px-2 sm:px-3 py-1.5 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none text-[10px] sm:text-xs"></textarea>
        </div>

        <!-- Согласия -->
        <div class="bg-card rounded-lg border border-white/5 p-2 sm:p-3">
          <label class="flex items-start gap-2 cursor-pointer group">
            <input
              v-model="agreeToOffer"
              type="checkbox"
              class="mt-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-white/20 bg-white/5 text-accent focus:ring-2 focus:ring-accent/50 focus:ring-offset-0 focus:ring-offset-transparent transition-all cursor-pointer accent-accent" />
            <span class="flex-1 text-[10px] sm:text-xs text-gray-300 group-hover:text-white transition">
              С условиями 
              <NuxtLink to="/oferta" class="text-accent hover:text-accent-700 underline" target="_blank">
                оферты
              </NuxtLink>
              согласен.
            </span>
          </label>
        </div>
      </div>

      <!-- Итого -->
      <div class="lg:col-span-1">
        <div class="bg-card rounded-lg border border-white/5 p-3 sm:p-4 sticky top-4">
          <h2 class="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">Итого</h2>
          <div class="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
            <div class="flex justify-between text-[10px] sm:text-xs text-gray-400">
              <span>Товары:</span>
              <span>{{ cartStore.subtotal.toFixed(2) }} ₽</span>
            </div>
            <div v-if="cartStore.promoCode" class="flex justify-between text-[10px] sm:text-xs text-green-400">
              <span>Скидка:</span>
              <span>−{{ cartStore.discount.toFixed(2) }} ₽</span>
            </div>
            <div class="flex justify-between text-[10px] sm:text-xs text-gray-400">
              <span>Доставка:</span>
              <span>
                {{ deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice.toFixed(2)} ₽` }}
              </span>
            </div>
          </div>
          <div class="pt-2 border-t border-white/10 mb-2 sm:mb-3">
            <div class="flex justify-between text-xs sm:text-sm font-semibold">
              <span>К оплате:</span>
              <span>{{ finalTotal.toFixed(2) }} ₽</span>
            </div>
          </div>
          <button
            :disabled="isSubmitting || !phone || (deliveryType === 'delivery' && (!deliveryAddress || !selectedZone || isCalculatingDelivery))"
            class="w-full py-2 bg-accent hover:bg-accent-700 rounded-lg text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed text-xs"
            @click="submitOrder">
            {{ isSubmitting ? 'Оформление...' : 'Оформить заказ' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Модальное окно оплаты (заглушка) -->
    <Modal :open="showPaymentModal" title="Выберите способ оплаты" @close="showPaymentModal = false">
      <div class="space-y-3">
        <button
          class="w-full p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-left"
          @click="processPayment('card')">
          <div class="font-medium mb-1">💳 Онлайн оплата</div>
          <div class="text-sm text-gray-400">Картой через ЮKassa/Сбербанк</div>
        </button>
        <button
          class="w-full p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-left"
          @click="processPayment('cash')">
          <div class="font-medium mb-1">💵 Наличными</div>
          <div class="text-sm text-gray-400">Оплата при получении</div>
        </button>
      </div>
      <template #footer>
        <button
          class="w-full py-2 text-gray-400 hover:text-white transition"
          @click="showPaymentModal = false">
          Отмена
        </button>
      </template>
    </Modal>

    <!-- Модальное окно авторизации -->
    <Modal :open="showAuthModal" title="Для оформления заказа требуется регистрация" @close="handleAuthCancel">
      <SmsAuth @success="handleAuthSuccess" @cancel="handleAuthCancel" />
    </Modal>
  </main>
</template>

