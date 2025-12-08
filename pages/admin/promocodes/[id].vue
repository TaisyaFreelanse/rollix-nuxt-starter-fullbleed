<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const promocodeId = route.params.id as string
const isNew = promocodeId === 'new'

const form = ref({
  code: '',
  description: '',
  discountType: 'PERCENT' as 'PERCENT' | 'FIXED',
  discountValue: 0,
  minOrderAmount: null as number | null,
  maxDiscount: null as number | null,
  usageLimit: null as number | null,
  validFrom: '',
  validUntil: '',
  isActive: true
})

const isLoading = ref(false)

const loadPromocode = async () => {
  if (isNew) return

  isLoading.value = true
  try {
    const promo = await $fetch(`/api/promo-codes/${promocodeId}`, {
      // Подавляем логирование 404 ошибок
      onResponseError({ response }) {
        if (response.status === 404) {
          // 404 - это нормально, промокод просто не найден
          // Не логируем и не выбрасываем ошибку дальше
          return
        }
      }
    }).catch((error: any) => {
      // Если это 404, не пробрасываем ошибку дальше с флагом подавления
      if (error?.statusCode === 404 || error?.status === 404) {
        throw { ...error, _suppress: true }
      }
      throw error
    })
    form.value = {
      code: promo.code || '',
      description: promo.description || '',
      discountType: promo.discountType || 'PERCENT',
      discountValue: Number(promo.discountValue) || 0,
      minOrderAmount: promo.minOrderAmount ? Number(promo.minOrderAmount) : null,
      maxDiscount: promo.maxDiscount ? Number(promo.maxDiscount) : null,
      usageLimit: promo.usageLimit || null,
      validFrom: promo.validFrom ? new Date(promo.validFrom).toISOString().split('T')[0] : '',
      validUntil: promo.validUntil ? new Date(promo.validUntil).toISOString().split('T')[0] : '',
      isActive: promo.isActive ?? true
    }
  } catch (error: any) {
    // Не логируем 404 ошибки - это нормальная ситуация
    // Также не показываем alert для 404, если это нормальная ситуация
    if (error?.statusCode === 404 || error?.status === 404 || error?._suppress) {
      // Просто перенаправляем без логирования
      router.push('/admin/promocodes')
      return
    }
    console.error('Ошибка загрузки промокода:', error)
    alert('Ошибка загрузки промокода')
    router.push('/admin/promocodes')
  } finally {
    isLoading.value = false
  }
}

const savePromocode = async () => {
  isLoading.value = true
  try {
    const data = {
      ...form.value,
      validFrom: form.value.validFrom ? new Date(form.value.validFrom).toISOString() : null,
      validUntil: form.value.validUntil ? new Date(form.value.validUntil).toISOString() : null
    }

    if (isNew) {
      await $fetch('/api/promo-codes', {
        method: 'POST',
        body: data
      })
    } else {
      await $fetch(`/api/promo-codes/${promocodeId}`, {
        method: 'PUT',
        body: data
      })
    }
    router.push('/admin/promocodes')
  } catch (error: any) {
    alert(error?.data?.message || 'Ошибка сохранения промокода')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadPromocode()
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">
        {{ isNew ? 'Создать промокод' : 'Редактировать промокод' }}
      </h1>
      <NuxtLink
        to="/admin/promocodes"
        class="text-gray-400 hover:text-white transition-colors">
        ← Назад к списку
      </NuxtLink>
    </div>

    <form v-if="!isLoading || isNew" @submit.prevent="savePromocode" class="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Код *</label>
          <input
            v-model="form.code"
            type="text"
            required
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none font-mono uppercase" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Тип скидки *</label>
          <select
            v-model="form.discountType"
            required
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none">
            <option value="PERCENT">Процент</option>
            <option value="FIXED">Фиксированная сумма</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">Описание</label>
        <textarea
          v-model="form.description"
          rows="2"
          class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Значение скидки *</label>
          <input
            v-model.number="form.discountValue"
            type="number"
            step="0.01"
            min="0"
            required
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Мин. сумма заказа</label>
          <input
            v-model.number="form.minOrderAmount"
            type="number"
            step="0.01"
            min="0"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Макс. скидка</label>
          <input
            v-model.number="form.maxDiscount"
            type="number"
            step="0.01"
            min="0"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Лимит использований</label>
          <input
            v-model.number="form.usageLimit"
            type="number"
            min="0"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Действует с</label>
          <input
            v-model="form.validFrom"
            type="date"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Действует до</label>
          <input
            v-model="form.validUntil"
            type="date"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>
      </div>

      <div>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="form.isActive"
            type="checkbox"
            class="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent" />
          <span class="text-gray-300">Активен</span>
        </label>
      </div>

      <div class="flex items-center justify-end gap-4 pt-4 border-t border-gray-700">
        <NuxtLink
          to="/admin/promocodes"
          class="px-6 py-2 text-gray-400 hover:text-white transition-colors">
          Отмена
        </NuxtLink>
        <button
          type="submit"
          :disabled="isLoading"
          class="bg-accent hover:bg-accent-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50">
          {{ isLoading ? 'Сохранение...' : 'Сохранить' }}
        </button>
      </div>
    </form>
  </div>
</template>

