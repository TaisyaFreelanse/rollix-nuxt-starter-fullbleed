<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const promocodes = ref<any[]>([])
const isLoading = ref(true)

const loadPromocodes = async () => {
  isLoading.value = true
  try {
    promocodes.value = await $fetch('/api/promo-codes')
  } catch (error) {
    console.error('Ошибка загрузки промокодов:', error)
  } finally {
    isLoading.value = false
  }
}

const deletePromocode = async (id: string) => {
  if (!confirm('Вы уверены, что хотите удалить этот промокод?')) return

  try {
    await $fetch(`/api/promo-codes/${id}`, { method: 'DELETE' })
    await loadPromocodes()
  } catch (error) {
    alert('Ошибка удаления промокода')
  }
}

onMounted(() => {
  loadPromocodes()
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">Промокоды</h1>
      <NuxtLink
        to="/admin/promocodes/new"
        class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors">
        ➕ Создать промокод
      </NuxtLink>
    </div>

    <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div v-if="isLoading" class="p-8 text-center text-gray-400">
        Загрузка...
      </div>
      <div v-else-if="promocodes.length === 0" class="p-8 text-center text-gray-400">
        Промокоды не найдены
      </div>
      <table v-else class="w-full">
        <thead class="bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Код</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Тип скидки</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Значение</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Использований</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Статус</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">Действия</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-for="promo in promocodes" :key="promo.id" class="hover:bg-gray-700">
            <td class="px-6 py-4">
              <div class="font-mono font-semibold text-white">{{ promo.code }}</div>
              <div v-if="promo.description" class="text-sm text-gray-400 mt-1">
                {{ promo.description }}
              </div>
            </td>
            <td class="px-6 py-4 text-gray-300">
              {{ promo.discountType === 'PERCENT' ? 'Процент' : 'Фиксированная сумма' }}
            </td>
            <td class="px-6 py-4 text-white font-medium">
              {{ promo.discountType === 'PERCENT' ? `${promo.discountValue}%` : `${promo.discountValue} ₽` }}
            </td>
            <td class="px-6 py-4 text-gray-300">
              {{ promo.usedCount }} / {{ promo.usageLimit || '∞' }}
            </td>
            <td class="px-6 py-4">
              <span
                :class="[
                  'px-2 py-1 rounded text-xs font-medium',
                  promo.isActive
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                ]">
                {{ promo.isActive ? 'Активен' : 'Неактивен' }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <NuxtLink
                  :to="`/admin/promocodes/${promo.id}`"
                  class="text-accent hover:text-accent-700 transition-colors">
                  ✏️
                </NuxtLink>
                <button
                  @click="deletePromocode(promo.id)"
                  class="text-red-400 hover:text-red-500 transition-colors">
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

