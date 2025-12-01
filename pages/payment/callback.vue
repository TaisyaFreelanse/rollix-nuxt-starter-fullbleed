<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const payment = usePayment()
const toast = useToast()

const paymentId = route.query.payment_id as string
const status = route.query.status as string

onMounted(async () => {
  if (!paymentId) {
    toast.error('ID платежа не указан')
    router.push('/')
    return
  }

  try {
    // Проверяем статус платежа
    const paymentStatus = await payment.getPaymentStatus(paymentId)

    if (paymentStatus.paid) {
      toast.success('Платеж успешно выполнен!')
      router.push('/profile?tab=orders')
    } else if (paymentStatus.status === 'canceled') {
      toast.warning('Платеж отменен')
      router.push('/checkout')
    } else {
      toast.info('Платеж обрабатывается...')
      // Можно периодически проверять статус
    }
  } catch (error) {
    toast.error('Ошибка проверки статуса платежа')
    router.push('/')
  }
})
</script>

<template>
  <main class="w-[100vw] px-4 sm:px-6 lg:px-8 py-6">
    <div class="max-w-md mx-auto text-center">
      <div v-if="status === 'succeeded'" class="mb-4">
        <div class="text-6xl mb-4">✅</div>
        <h1 class="text-2xl font-semibold mb-2">Платеж успешно выполнен!</h1>
        <p class="text-gray-400">Ваш заказ принят в обработку</p>
      </div>
      <div v-else-if="status === 'canceled'" class="mb-4">
        <div class="text-6xl mb-4">❌</div>
        <h1 class="text-2xl font-semibold mb-2">Платеж отменен</h1>
        <p class="text-gray-400">Вы можете попробовать оплатить заказ снова</p>
      </div>
      <div v-else class="mb-4">
        <div class="text-6xl mb-4">⏳</div>
        <h1 class="text-2xl font-semibold mb-2">Обработка платежа...</h1>
        <p class="text-gray-400">Пожалуйста, подождите</p>
      </div>
    </div>
  </main>
</template>

