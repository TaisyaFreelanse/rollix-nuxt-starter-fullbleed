<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()
const router = useRouter()
const activeTab = ref<'orders' | 'addresses' | 'favorites' | 'bonuses'>('orders')

// Дополнительная проверка на клиенте
onMounted(() => {
  if (!auth.isAuthenticated.value) {
    router.push('/')
  }
})
</script>

<template>
  <main class="w-[100vw] px-4 sm:px-6 lg:px-8 py-6">
    <h1 class="text-2xl font-semibold mb-6">Личный кабинет</h1>

    <!-- Табы -->
    <div class="flex gap-2 mb-6 border-b border-white/10 overflow-x-auto">
      <button
        :class="[
          'px-4 py-2 text-sm font-medium transition border-b-2',
          activeTab === 'orders'
            ? 'border-accent text-white'
            : 'border-transparent text-gray-400 hover:text-white'
        ]"
        @click="activeTab = 'orders'">
        Заказы
      </button>
      <button
        :class="[
          'px-4 py-2 text-sm font-medium transition border-b-2',
          activeTab === 'addresses'
            ? 'border-accent text-white'
            : 'border-transparent text-gray-400 hover:text-white'
        ]"
        @click="activeTab = 'addresses'">
        Адреса
      </button>
      <button
        :class="[
          'px-4 py-2 text-sm font-medium transition border-b-2',
          activeTab === 'favorites'
            ? 'border-accent text-white'
            : 'border-transparent text-gray-400 hover:text-white'
        ]"
        @click="activeTab = 'favorites'">
        Избранное
      </button>
      <button
        :class="[
          'px-4 py-2 text-sm font-medium transition border-b-2',
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
      <ProfileAddresses v-if="activeTab === 'addresses'" />
      <ProfileFavorites v-if="activeTab === 'favorites'" />
      <ProfileBonuses v-if="activeTab === 'bonuses'" />
    </div>
  </main>
</template>

