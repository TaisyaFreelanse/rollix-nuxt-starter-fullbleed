<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const products = ref<any[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)
const categories = ref<any[]>([])

const filteredProducts = computed(() => {
  let filtered = products.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((p) =>
      p.name?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter((p) => p.categoryId === selectedCategory.value)
  }

  return filtered
})

const loadProducts = async () => {
  isLoading.value = true
  try {
    const response = await $fetch('/api/products')
    products.value = response.products || []
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error)
  } finally {
    isLoading.value = false
  }
}

const loadCategories = async () => {
  try {
    categories.value = await $fetch('/api/categories')
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error)
  }
}

const deleteProduct = async (id: string) => {
  if (!confirm('Вы уверены, что хотите удалить этот товар?')) return

  try {
    await $fetch(`/api/products/${id}`, { method: 'DELETE' })
    await loadProducts()
  } catch (error) {
    alert('Ошибка удаления товара')
  }
}

onMounted(() => {
  loadProducts()
  loadCategories()
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">Товары</h1>
      <NuxtLink
        to="/admin/products/new"
        class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors">
        ➕ Добавить товар
      </NuxtLink>
    </div>

    <!-- Фильтры -->
    <div class="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск товаров..."
          class="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        <select
          v-model="selectedCategory"
          class="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none">
          <option :value="null">Все категории</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Таблица товаров -->
    <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div v-if="isLoading" class="p-8 text-center text-gray-400">
        Загрузка...
      </div>
      <div v-else-if="filteredProducts.length === 0" class="p-8 text-center text-gray-400">
        Товары не найдены
      </div>
      <table v-else class="w-full">
        <thead class="bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Товар</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Категория</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Цена</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Статус</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">Действия</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-700">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <img
                  :src="product.image || '/product.svg'"
                  :alt="product.name"
                  class="w-12 h-12 object-cover rounded" />
                <div>
                  <div class="font-medium text-white">{{ product.name }}</div>
                  <div class="text-sm text-gray-400 line-clamp-1">{{ product.description }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-gray-300">
              {{ product.category?.name || '-' }}
            </td>
            <td class="px-6 py-4">
              <div class="text-white font-medium">{{ product.price }} ₽</div>
              <div v-if="product.oldPrice" class="text-sm text-gray-500 line-through">
                {{ product.oldPrice }} ₽
              </div>
            </td>
            <td class="px-6 py-4">
              <span
                :class="[
                  'px-2 py-1 rounded text-xs font-medium',
                  product.isActive
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                ]">
                {{ product.isActive ? 'Активен' : 'Неактивен' }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <NuxtLink
                  :to="`/admin/products/${product.id}`"
                  class="text-accent hover:text-accent-700 transition-colors">
                  ✏️
                </NuxtLink>
                <button
                  @click="deleteProduct(product.id)"
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

