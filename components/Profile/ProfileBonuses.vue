<script setup lang="ts">
const bonusBalance = ref(0)
const bonusHistory = ref<any[]>([])
const loading = ref(false)

const fetchBonuses = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/profile/bonuses')
    bonusBalance.value = data.balance || 0
    bonusHistory.value = data.history || []
  } catch (error) {
    console.error('Ошибка загрузки бонусов', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBonuses()
})
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Бонусная программа</h2>

    <!-- Баланс бонусов -->
    <div class="bg-card rounded-lg border border-white/5 p-6 mb-6">
      <div class="text-sm text-gray-400 mb-2">Ваш баланс бонусов</div>
      <div class="text-4xl font-bold text-accent mb-4">{{ bonusBalance }}</div>
      <div class="text-sm text-gray-400">
        Начисляется 1% с каждого заказа. 1 бонус = 1 рубль
      </div>
    </div>

    <!-- История начислений -->
    <div>
      <h3 class="text-lg font-semibold mb-4">История начислений</h3>
      <div v-if="loading" class="text-center py-12 text-gray-400">Загрузка...</div>
      <div v-else-if="bonusHistory.length === 0" class="text-center py-12 text-gray-400">
        <div class="text-4xl mb-4">🎁</div>
        <div>История начислений пуста</div>
      </div>
      <div v-else class="space-y-3">
        <div
          v-for="item in bonusHistory"
          :key="item.id"
          class="bg-card rounded-lg border border-white/5 p-4 flex items-center justify-between">
          <div>
            <div class="font-medium">{{ item.description || 'Начисление бонусов' }}</div>
            <div class="text-sm text-gray-400">
              {{ new Date(item.createdAt).toLocaleDateString('ru-RU') }}
            </div>
          </div>
          <div
            :class="[
              'font-semibold',
              item.amount > 0 ? 'text-green-400' : 'text-red-400'
            ]">
            {{ item.amount > 0 ? '+' : '' }}{{ item.amount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

