<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const zoneId = route.params.id as string
const isNew = zoneId === 'new'

const form = ref({
  name: '',
  description: '',
  minOrderAmount: 0,
  deliveryPrice: 0,
  freeDeliveryThreshold: null as number | null,
  estimatedTime: 60,
  isActive: true,
  coordinates: [] as number[][]
})

const isLoading = ref(false)

const adminAuth = useAdminAuth()

const loadZone = async () => {
  if (isNew) return

  isLoading.value = true
  try {
    const zone = await adminAuth.$fetchWithAuth(`/api/admin/delivery-zones/${zoneId}`)

    form.value = {
      name: zone.name || '',
      description: zone.description || '',
      minOrderAmount: Number(zone.minOrderAmount) || 0,
      deliveryPrice: Number(zone.deliveryPrice) || 0,
      freeDeliveryThreshold: zone.freeDeliveryThreshold ? Number(zone.freeDeliveryThreshold) : null,
      estimatedTime: zone.estimatedTime || 60,
      isActive: zone.isActive ?? true,
      coordinates: zone.coordinates || []
    }
  } catch (error: any) {
    console.error('Ошибка загрузки зоны доставки:', error)
    alert('Ошибка загрузки зоны доставки')
    router.push('/admin?tab=delivery-zones')
  } finally {
    isLoading.value = false
  }
}

const saveZone = async () => {
  if (!form.value.name || form.value.minOrderAmount < 0 || form.value.deliveryPrice < 0) {
    alert('Заполните все обязательные поля')
    return
  }

  isLoading.value = true
  try {
    const zoneData = {
      name: form.value.name,
      description: form.value.description || null,
      minOrderAmount: form.value.minOrderAmount,
      deliveryPrice: form.value.deliveryPrice,
      freeDeliveryThreshold: form.value.freeDeliveryThreshold || null,
      estimatedTime: form.value.estimatedTime,
      isActive: form.value.isActive,
      coordinates: form.value.coordinates.length > 0 ? form.value.coordinates : [[53.0194, 158.6509], [53.0194, 158.6510], [53.0195, 158.6510], [53.0195, 158.6509]]
    }

    if (isNew) {
      await adminAuth.$fetchWithAuth('/api/admin/delivery-zones', {
        method: 'POST',
        body: zoneData
      })
    } else {
      await adminAuth.$fetchWithAuth(`/api/admin/delivery-zones/${zoneId}`, {
        method: 'PUT',
        body: zoneData
      })
    }
    router.push('/admin?tab=delivery-zones')
  } catch (error: any) {
    alert(error?.data?.message || 'Ошибка сохранения зоны доставки')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadZone()
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">
        {{ isNew ? 'Добавить зону доставки' : 'Редактировать зону доставки' }}
      </h1>
      <NuxtLink
        to="/admin?tab=delivery-zones"
        class="text-gray-400 hover:text-white transition-colors">
        ← Назад к списку
      </NuxtLink>
    </div>

    <form v-if="!isLoading || isNew" @submit.prevent="saveZone" class="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Название *</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Время доставки (мин) *</label>
          <input
            v-model.number="form.estimatedTime"
            type="number"
            min="1"
            required
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">Описание</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Минимальная сумма заказа (₽) *</label>
          <input
            v-model.number="form.minOrderAmount"
            type="number"
            step="0.01"
            min="0"
            required
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Стоимость доставки (₽) *</label>
          <input
            v-model.number="form.deliveryPrice"
            type="number"
            step="0.01"
            min="0"
            required
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Бесплатная доставка от (₽)</label>
          <input
            v-model.number="form.freeDeliveryThreshold"
            type="number"
            step="0.01"
            min="0"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>
      </div>

      <div>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="form.isActive"
            type="checkbox"
            class="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent" />
          <span class="text-gray-300">Активна</span>
        </label>
      </div>

      <div class="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
        <p class="text-yellow-400 text-sm">
          ⚠️ Настройка координат зоны доставки будет добавлена позже. Сейчас используется зона по умолчанию.
        </p>
      </div>

      <div class="flex items-center justify-end gap-4 pt-4 border-t border-gray-700">
        <NuxtLink
          to="/admin?tab=delivery-zones"
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

