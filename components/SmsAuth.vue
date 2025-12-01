<script setup lang="ts">
const phone = ref('')
const code = ref('')
const step = ref<'phone' | 'code'>('phone')
const isLoading = ref(false)
const error = ref<string | null>(null)

const emit = defineEmits<{
  success: [phone: string]
  cancel: []
}>()

const sendCode = async () => {
  if (!phone.value.trim() || phone.value.length < 10) {
    error.value = 'Введите корректный номер телефона'
    return
  }

  isLoading.value = true
  error.value = null

  try {
    // TODO: Реализовать отправку SMS через API
    await $fetch('/api/auth/send-sms', {
      method: 'POST',
      body: { phone: phone.value }
    })

    step.value = 'code'
  } catch (err: any) {
    error.value = err?.data?.message || 'Ошибка отправки SMS'
  } finally {
    isLoading.value = false
  }
}

const verifyCode = async () => {
  if (!code.value.trim() || code.value.length !== 4) {
    error.value = 'Введите 4-значный код'
    return
  }

  isLoading.value = true
  error.value = null

  try {
    // TODO: Реализовать проверку кода через API
    await $fetch('/api/auth/verify-sms', {
      method: 'POST',
      body: { phone: phone.value, code: code.value }
    })

    emit('success', phone.value)
  } catch (err: any) {
    error.value = err?.data?.message || 'Неверный код'
  } finally {
    isLoading.value = false
  }
}

const formatPhone = (value: string) => {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.startsWith('7')) {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`
  }
  if (cleaned.startsWith('8')) {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`
  }
  return `+7 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8, 10)}`
}

watch(phone, (newValue) => {
  phone.value = formatPhone(newValue)
})
</script>

<template>
  <div class="space-y-4">
    <div v-if="step === 'phone'">
      <label class="block text-sm text-gray-400 mb-2">Номер телефона</label>
      <input
        v-model="phone"
        type="tel"
        placeholder="+7 (999) 123-45-67"
        maxlength="18"
        class="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none"
        @keyup.enter="sendCode" />
      <p v-if="error" class="text-xs text-red-400 mt-2">{{ error }}</p>
      <button
        :disabled="isLoading || !phone.trim()"
        class="w-full mt-4 py-2 bg-accent hover:bg-accent-700 rounded-lg text-white font-medium transition disabled:opacity-50"
        @click="sendCode">
        {{ isLoading ? 'Отправка...' : 'Отправить код' }}
      </button>
    </div>

    <div v-else>
      <label class="block text-sm text-gray-400 mb-2">Код из SMS</label>
      <input
        v-model="code"
        type="text"
        placeholder="1234"
        maxlength="4"
        class="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none text-center text-2xl tracking-widest"
        @keyup.enter="verifyCode" />
      <p v-if="error" class="text-xs text-red-400 mt-2">{{ error }}</p>
      <div class="flex gap-2 mt-4">
        <button
          :disabled="isLoading || !code.trim()"
          class="flex-1 py-2 bg-accent hover:bg-accent-700 rounded-lg text-white font-medium transition disabled:opacity-50"
          @click="verifyCode">
          {{ isLoading ? 'Проверка...' : 'Подтвердить' }}
        </button>
        <button
          class="px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
          @click="step = 'phone'; code = ''; error = null">
          Назад
        </button>
      </div>
      <button
        class="w-full mt-2 text-sm text-gray-400 hover:text-white transition"
        @click="sendCode">
        Отправить код повторно
      </button>
    </div>

    <button
      class="w-full py-2 text-gray-400 hover:text-white transition text-sm"
      @click="emit('cancel')">
      Отмена
    </button>
  </div>
</template>

