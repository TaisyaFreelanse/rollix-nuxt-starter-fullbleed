<script setup lang="ts">
const auth = useAuth()
const bonusBalance = ref(0)
const bonusHistory = ref<any[]>([])
const loading = ref(false)

const fetchBonuses = async () => {
  loading.value = true
  try {
    const data = await auth.$fetchWithAuth('/api/profile/bonuses')
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
    <h2 class="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Бонусная программа</h2>

    <!-- Баланс бонусов -->
    <div class="bg-card rounded-lg border border-white/5 p-3 sm:p-4 mb-4 sm:mb-6">
      <div class="text-xs sm:text-sm text-gray-400 mb-2">Ваш баланс бонусов</div>
      <div class="text-3xl sm:text-4xl font-bold text-accent mb-3 sm:mb-4">{{ Math.round(bonusBalance) }}</div>
      <div class="text-xs sm:text-sm text-gray-400">
        Начисляется 1% с каждого оплаченного заказа. 1 бонус = 1 рубль
      </div>
    </div>

    <!-- История начислений -->
    <div>
      <h3 class="text-sm sm:text-base font-semibold mb-3 sm:mb-4">История начислений</h3>
      <div v-if="loading" class="text-center py-12 text-gray-400 text-sm">Загрузка...</div>
      <div v-else-if="bonusHistory.length === 0" class="text-center py-12 text-gray-400 text-sm">
        <div class="text-4xl mb-4">🎁</div>
        <div>История начислений пуста</div>
      </div>
      <div v-else class="space-y-2 sm:space-y-3">
        <div
          v-for="item in bonusHistory"
          :key="item.id"
          class="bg-card rounded-lg border border-white/5 p-3 sm:p-4 flex items-center justify-between">
          <div class="flex-1">
            <div class="text-xs sm:text-sm font-medium mb-1">{{ item.description || 'Начисление бонусов' }}</div>
            <div class="text-[10px] sm:text-xs text-gray-400">
              {{ new Date(item.createdAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) }}
            </div>
          </div>
          <div
            :class="[
              'text-sm sm:text-base font-semibold ml-4',
              item.amount > 0 ? 'text-green-400' : 'text-red-400'
            ]">
            {{ item.amount > 0 ? '+' : '' }}{{ Math.round(item.amount) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

