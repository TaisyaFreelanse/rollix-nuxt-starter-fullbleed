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
  <main class="w-full px-3 sm:px-4 lg:px-8 py-2 sm:py-3">
    <h1 class="text-sm sm:text-base font-semibold mb-2 sm:mb-3">Личный кабинет</h1>

    <!-- Табы -->
    <div class="flex gap-1 sm:gap-2 mb-2 sm:mb-3 border-b border-white/10 overflow-x-auto">
      <button
        :class="[
          'px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition border-b-2',
          activeTab === 'orders'
            ? 'border-accent text-white'
            : 'border-transparent text-gray-400 hover:text-white'
        ]"
        @click="activeTab = 'orders'">
        Заказы
      </button>
      <button
        :class="[
          'px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition border-b-2',
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

