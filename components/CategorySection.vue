<script setup lang="ts">
import type { Category, Product } from '~/composables/useCatalog'

interface Props {
  category: Category
  products: Product[]
}

const props = defineProps<Props>()

const router = useRouter()
const selectedProduct = ref<Product | null>(null)
const showProductModal = ref(false)

const handleProductClick = (product: Product) => {
  selectedProduct.value = product
  showProductModal.value = true
}

const handleCloseModal = () => {
  showProductModal.value = false
  selectedProduct.value = null
}

const openCategory = () => {
  router.push(`/catalog?categoryId=${props.category.id}`)
}
</script>

<template>
  <section class="mb-10 md:mb-12">
    <!-- Заголовок категории -->
    <div class="flex items-center justify-between mb-4 px-3 sm:px-6 lg:px-8">
      <h2 class="text-xl md:text-2xl font-semibold text-white">{{ category.name }}</h2>
      <button
        @click="openCategory"
        class="text-sm text-gray-400 hover:text-accent transition-colors">
        Открыть категорию →
      </button>
    </div>

    <!-- Горизонтальный скролл товаров -->
    <div class="relative">
      <div
        class="flex gap-4 overflow-x-auto scrollbar-hide px-3 sm:px-6 lg:px-8 pb-4 items-stretch"
        style="scroll-snap-type: x mandatory;">
        <div
          v-for="product in products"
          :key="product.id"
          class="flex-shrink-0 h-full"
          style="scroll-snap-align: start; width: 260px;">
          <ProductCard :product="product" @click="handleProductClick" />
        </div>
        <!-- Пустое состояние -->
        <div
          v-if="products.length === 0"
          class="flex items-center justify-center w-full py-12 text-gray-400">
          <div class="text-center">
            <div class="text-4xl mb-2">🍽️</div>
            <div>Товары в этой категории пока отсутствуют</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно товара -->
    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      :open="showProductModal"
      @close="handleCloseModal" />
  </section>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Плавная прокрутка */
.scrollbar-hide {
  scroll-behavior: smooth;
}
</style>
