<script setup lang="ts">
const cartStore = useCartStore()
const router = useRouter()

if (cartStore.isEmpty) {
  router.push('/cart')
}

const deliveryType = ref<'delivery' | 'pickup'>('delivery')
const deliveryZones = ref<any[]>([])
const selectedZone = ref<any>(null)
const deliveryAddress = ref('')
const phone = ref('')
const name = ref('')
const comment = ref('')
const selectedTime = ref<string | null>(null)
const isLoadingZones = ref(false)

// Загрузка зон доставки
const loadDeliveryZones = async () => {
  isLoadingZones.value = true
  try {
    const data = await $fetch('/api/delivery-zones')
    deliveryZones.value = data.zones || []
    if (data.matchedZone) {
      selectedZone.value = data.matchedZone
    }
  } catch (error) {
    console.error('Ошибка загрузки зон доставки', error)
  } finally {
    isLoadingZones.value = false
  }
}

onMounted(() => {
  if (deliveryType.value === 'delivery') {
    loadDeliveryZones()
  }
})

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
      address: deliveryAddress.value,
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
      body: orderData
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
        body: { paymentMethod: 'CASH' }
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

<template>
  <main class="w-[100vw] px-4 sm:px-6 lg:px-8 py-6">
    <h1 class="text-2xl font-semibold mb-6">Оформление заказа</h1>

    <div v-if="cartStore.isEmpty" class="text-center py-12">
      <p class="text-gray-400 mb-4">Корзина пуста</p>
      <NuxtLink to="/catalog" class="text-accent hover:text-accent-700">
        Перейти в каталог
      </NuxtLink>
    </div>

    <div v-else class="grid lg:grid-cols-3 gap-6">
      <!-- Форма оформления -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Способ получения -->
        <div class="bg-card rounded-lg border border-white/5 p-6">
          <h2 class="text-xl font-semibold mb-4">Способ получения</h2>
          <div class="flex gap-4">
            <button
              :class="[
                'flex-1 p-4 rounded-lg border transition',
                deliveryType === 'delivery'
                  ? 'border-accent bg-accent/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              ]"
              @click="deliveryType = 'delivery'">
              <div class="text-lg mb-1">🚚 Доставка</div>
              <div class="text-sm text-gray-400">Доставим по указанному адресу</div>
            </button>
            <button
              :class="[
                'flex-1 p-4 rounded-lg border transition',
                deliveryType === 'pickup'
                  ? 'border-accent bg-accent/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              ]"
              @click="deliveryType = 'pickup'">
              <div class="text-lg mb-1">🏪 Самовывоз</div>
              <div class="text-sm text-gray-400">Заберите заказ сами</div>
            </button>
          </div>
        </div>

        <!-- Адрес доставки -->
        <div v-if="deliveryType === 'delivery'" class="bg-card rounded-lg border border-white/5 p-6">
          <h2 class="text-xl font-semibold mb-4">Адрес доставки</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Адрес</label>
              <input
                v-model="deliveryAddress"
                type="text"
                placeholder="Улица, дом, квартира"
                class="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none" />
            </div>
            <div v-if="!isLoadingZones && deliveryZones.length > 0">
              <label class="block text-sm text-gray-400 mb-2">Зона доставки</label>
              <select
                v-model="selectedZone"
                class="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none">
                <option :value="null">Выберите зону</option>
                <option
                  v-for="zone in deliveryZones"
                  :key="zone.id"
                  :value="zone">
                  {{ zone.name }} - {{ zone.deliveryPrice }} ₽
                  <span v-if="zone.freeDeliveryThreshold">
                    (бесплатно от {{ zone.freeDeliveryThreshold }} ₽)
                  </span>
                </option>
              </select>
              <p v-if="selectedZone" class="text-xs text-gray-400 mt-2">
                Время доставки: ~{{ selectedZone.estimatedTime }} мин
              </p>
            </div>
          </div>
        </div>

        <!-- Контактная информация -->
        <div class="bg-card rounded-lg border border-white/5 p-6">
          <h2 class="text-xl font-semibold mb-4">Контактная информация</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Телефон *</label>
              <input
                v-model="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                required
                class="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Имя</label>
              <input
                v-model="name"
                type="text"
                placeholder="Ваше имя"
                class="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none" />
            </div>
          </div>
        </div>

        <!-- Время доставки -->
        <div class="bg-card rounded-lg border border-white/5 p-6">
          <h2 class="text-xl font-semibold mb-4">Время доставки</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
            <button
              v-for="slot in timeSlots"
              :key="slot"
              :class="[
                'p-3 rounded border text-sm transition',
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
        <div class="bg-card rounded-lg border border-white/5 p-6">
          <h2 class="text-xl font-semibold mb-4">Комментарий к заказу</h2>
          <textarea
            v-model="comment"
            placeholder="Дополнительные пожелания..."
            rows="3"
            class="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none"></textarea>
        </div>
      </div>

      <!-- Итого -->
      <div class="lg:col-span-1">
        <div class="bg-card rounded-lg border border-white/5 p-6 sticky top-4">
          <h2 class="text-xl font-semibold mb-4">Итого</h2>
          <div class="space-y-3 mb-4">
            <div class="flex justify-between text-gray-400">
              <span>Товары:</span>
              <span>{{ cartStore.subtotal.toFixed(2) }} ₽</span>
            </div>
            <div v-if="cartStore.promoCode" class="flex justify-between text-green-400">
              <span>Скидка:</span>
              <span>−{{ cartStore.discount.toFixed(2) }} ₽</span>
            </div>
            <div class="flex justify-between text-gray-400">
              <span>Доставка:</span>
              <span>
                {{ deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice.toFixed(2)} ₽` }}
              </span>
            </div>
          </div>
          <div class="pt-4 border-t border-white/10 mb-4">
            <div class="flex justify-between text-xl font-semibold">
              <span>К оплате:</span>
              <span>{{ finalTotal.toFixed(2) }} ₽</span>
            </div>
          </div>
          <button
            :disabled="isSubmitting || !phone || (deliveryType === 'delivery' && (!deliveryAddress || !selectedZone))"
            class="w-full py-3 bg-accent hover:bg-accent-700 rounded-lg text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
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
  </main>
</template>

