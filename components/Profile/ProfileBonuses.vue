<script setup lang="ts">
const auth = useAuth()
const bonusBalance = ref(0)
const bonusHistory = ref<any[]>([])
const loading = ref(false)

const fetchBonuses = async () => {
  loading.value = true
  try {
    const data = await auth.$fetchWithAuth('/api/profile/bonuses')
    bonusBalance.value = Number(data.balance || 0)
    bonusHistory.value = Array.isArray(data.history) ? data.history : []
  } catch (error: any) {
    console.error('Ошибка загрузки бонусов', error)
    // Устанавливаем значения по умолчанию при ошибке
    bonusBalance.value = 0
    bonusHistory.value = []
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
    <h2 class="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">Бонусная программа</h2>

    <!-- Баланс бонусов -->
    <div class="bg-card rounded-lg border border-white/5 p-2 sm:p-3 mb-3 sm:mb-4">
      <div class="text-[10px] sm:text-xs text-gray-400 mb-1.5">Ваш баланс бонусов</div>
      <div class="text-xl sm:text-2xl font-bold text-accent mb-2 sm:mb-3">{{ Math.round(bonusBalance) }}</div>
      <div class="text-[10px] sm:text-xs text-gray-400">
        Начисляется 1% с каждого оплаченного заказа. 1 бонус = 1 рубль
      </div>
    </div>

    <!-- История начислений -->
    <div>
      <h3 class="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">История начислений</h3>
      <div v-if="loading" class="text-center py-8 text-gray-400 text-[10px] sm:text-xs">Загрузка...</div>
      <div v-else-if="bonusHistory.length === 0" class="text-center py-8 text-gray-400 text-[10px] sm:text-xs">
        <div class="text-3xl mb-3">🎁</div>
        <div>История начислений пуста</div>
      </div>
      <div v-else class="space-y-1.5 sm:space-y-2">
        <div
          v-for="item in bonusHistory"
          :key="item.id"
          class="bg-card rounded-lg border border-white/5 p-2 sm:p-3 flex items-center justify-between">
          <div class="flex-1">
            <div class="text-[10px] sm:text-xs font-medium mb-1">{{ item.description || 'Начисление бонусов' }}</div>
            <div class="text-[9px] sm:text-[10px] text-gray-400">
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
              'text-xs sm:text-sm font-semibold ml-3',
              item.amount > 0 ? 'text-green-400' : 'text-red-400'
            ]">
            {{ item.amount > 0 ? '+' : '' }}{{ Math.round(item.amount) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

