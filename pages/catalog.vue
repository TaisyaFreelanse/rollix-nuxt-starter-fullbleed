<script setup lang="ts">
import type { Product } from '~/composables/useCatalog'

const route = useRoute()
const { products, totalProducts, loading, fetchProducts, fetchCategories } = useCatalog()

const selectedCategoryId = computed(() => route.query.categoryId as string | undefined)
const searchQuery = ref(route.query.search as string || '')
const sortBy = ref((route.query.sortBy as string) || 'sortOrder')
const sortOrder = ref<'asc' | 'desc'>((route.query.sortOrder as 'asc' | 'desc') || 'asc')
const showFilters = ref(false)
const viewMode = ref<'grid' | 'list'>('grid')

const sortOptions = [
  { value: 'sortOrder', label: 'По умолчанию' },
  { value: 'price', label: 'По цене' },
  { value: 'name', label: 'По названию' }
]

const selectedProduct = ref<Product | null>(null)
const showProductModal = ref(false)

const loadProducts = async () => {
  await fetchProducts({
    categoryId: selectedCategoryId.value,
    search: searchQuery.value || undefined,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
    limit: 100
  })
}

watch(
  () => [selectedCategoryId.value, searchQuery.value, sortBy.value, sortOrder.value],
  async () => {
    await loadProducts()
  },
  { immediate: true }
)

onMounted(async () => {
  await fetchCategories()
  await loadProducts()
})

const handleSearch = () => {
  loadProducts()
}

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const openProductModal = async (product: Product) => {
  selectedProduct.value = product
  showProductModal.value = true
}

const closeProductModal = () => {
  showProductModal.value = false
  selectedProduct.value = null
}
</script>

<template>
  <main class="w-[100vw] px-4 sm:px-6 lg:px-8">
    <!-- Заголовок и фильтры -->
    <div class="flex flex-col gap-3 mt-4 sm:mt-6 mb-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
          <h1 class="text-xl sm:text-2xl font-semibold">Каталог</h1>
          <span v-if="totalProducts > 0" class="text-xs sm:text-sm text-gray-400">
            {{ totalProducts }} {{ totalProducts === 1 ? 'товар' : totalProducts < 5 ? 'товара' : 'товаров' }}
          </span>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <!-- Поиск -->
        <div class="relative flex-1 sm:flex-initial min-w-[150px]">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск..."
            class="w-full px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 focus:border-accent focus:outline-none text-sm"
            @keyup.enter="handleSearch" />
          <button
            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            @click="handleSearch">
            🔍
          </button>
        </div>
        <!-- Сортировка -->
        <select
          v-model="sortBy"
          class="px-3 py-1.5 rounded bg-[#1a1b1e] hover:bg-[#25262b] border border-white/10 focus:border-accent focus:outline-none text-sm text-white cursor-pointer">
          <option
            v-for="option in sortOptions"
            :key="option.value"
            :value="option.value"
            class="bg-[#1a1b1e] text-white py-2">
            {{ option.label }}
          </option>
        </select>
        <button
          class="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 transition"
          @click="toggleSortOrder">
          {{ sortOrder === 'asc' ? '↑' : '↓' }}
        </button>
        <!-- Вид -->
        <button
          class="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 transition"
          @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'">
          {{ viewMode === 'grid' ? '☰' : '⊞' }}
        </button>
      </div>
    </div>

    <!-- Загрузка -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      <ProductCardSkeleton v-for="i in 12" :key="i" />
    </div>

    <!-- Список товаров -->
    <div
      v-else-if="products.length > 0"
      :class="[
        'grid gap-4',
        viewMode === 'grid'
          ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
          : 'grid-cols-1'
      ]">
      <ProductCard
        v-for="(product, index) in products.filter(p => p && p.id && p.name)"
        :key="product.id"
        :product="product"
        :class="`stagger-item`"
        :style="{ animationDelay: `${Math.min(index * 50, 500)}ms` }"
        @click="openProductModal(product)" />
    </div>

    <!-- Пустое состояние -->
    <div v-else class="flex flex-col items-center justify-center py-12 text-gray-400">
      <div class="text-4xl mb-4">🍽️</div>
      <div class="text-lg mb-2">Товары не найдены</div>
      <div class="text-sm">Попробуйте изменить параметры поиска</div>
    </div>

    <!-- Модальное окно товара -->
    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      :open="showProductModal"
      @close="closeProductModal" />
  </main>
</template>
