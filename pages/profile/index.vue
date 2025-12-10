<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()
const router = useRouter()
const activeTab = ref<'orders' | 'bonuses'>('orders')

// Дополнительная проверка на клиенте
onMounted(() => {
  if (!auth.isAuthenticated.value) {
    router.push('/')
  }
})
</script>

<template>
  <main class="w-full px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
    <h1 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Личный кабинет</h1>

    <!-- Табы -->
    <div class="flex gap-1 sm:gap-2 mb-3 sm:mb-4 border-b border-white/10 overflow-x-auto">
      <button
        :class="[
          'px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition border-b-2',
          activeTab === 'orders'
            ? 'border-accent text-white'
            : 'border-transparent text-gray-400 hover:text-white'
        ]"
        @click="activeTab = 'orders'">
        Заказы
      </button>
      <button
        :class="[
          'px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition border-b-2',
          activeTab === 'bonuses'
            ? 'border-accent text-white'
            : 'border-transparent text-gray-400 hover:text-white'
        ]"
        @click="activeTab = 'bonuses'">
        Бонусы
      </button>
    </div>

    <!-- Контент табов -->
    <div>
      <ProfileOrders v-if="activeTab === 'orders'" />
      <ProfileBonuses v-if="activeTab === 'bonuses'" />
    </div>
  </main>
</template>

