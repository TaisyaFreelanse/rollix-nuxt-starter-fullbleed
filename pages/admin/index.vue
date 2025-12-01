<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const stats = ref({
  products: 0,
  categories: 0,
  orders: 0,
  revenue: 0
})

onMounted(async () => {
  try {
    // Загружаем статистику
    const [productsRes, categoriesRes, ordersRes] = await Promise.all([
      $fetch('/api/products').catch(() => ({ total: 0 })),
      $fetch('/api/categories').catch(() => []),
      $fetch('/api/profile/orders').catch(() => [])
    ])

    stats.value = {
      products: productsRes.total || 0,
      categories: Array.isArray(categoriesRes) ? categoriesRes.length : 0,
      orders: Array.isArray(ordersRes) ? ordersRes.length : 0,
      revenue: 0 // TODO: Рассчитать выручку
    }
  } catch (error) {
    console.error('Ошибка загрузки статистики:', error)
  }
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-white mb-8">Панель управления</h1>

    <!-- Статистика -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm mb-1">Товаров</p>
            <p class="text-3xl font-bold text-white">{{ stats.products }}</p>
          </div>
          <div class="text-4xl">📦</div>
        </div>
      </div>

      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm mb-1">Категорий</p>
            <p class="text-3xl font-bold text-white">{{ stats.categories }}</p>
          </div>
          <div class="text-4xl">📁</div>
        </div>
      </div>

      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm mb-1">Заказов</p>
            <p class="text-3xl font-bold text-white">{{ stats.orders }}</p>
          </div>
          <div class="text-4xl">📋</div>
        </div>
      </div>

      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm mb-1">Выручка</p>
            <p class="text-3xl font-bold text-white">{{ stats.revenue.toLocaleString() }} ₽</p>
          </div>
          <div class="text-4xl">💰</div>
        </div>
      </div>
    </div>

    <!-- Быстрые действия -->
    <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 class="text-xl font-semibold text-white mb-4">Быстрые действия</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink
          to="/admin/products/new"
          class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors text-center">
          ➕ Добавить товар
        </NuxtLink>
        <NuxtLink
          to="/admin/categories/new"
          class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors text-center">
          ➕ Добавить категорию
        </NuxtLink>
        <NuxtLink
          to="/admin/promocodes/new"
          class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors text-center">
          ➕ Создать промокод
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

