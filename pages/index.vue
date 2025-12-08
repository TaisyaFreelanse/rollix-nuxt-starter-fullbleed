<script setup lang="ts">
import type { Category, Product } from '~/composables/useCatalog'

const { categories, fetchCategories, fetchProducts } = useCatalog()
const categoriesWithProducts = ref<Array<{ category: Category; products: Product[] }>>([])
const loading = ref(true)

// Загружаем категории и товары для каждой
onMounted(async () => {
  try {
    loading.value = true
    
    // Загружаем категории
    const cats = await fetchCategories()
    
    // Фильтруем только активные категории и сортируем
    const activeCategories = cats
      .filter(cat => cat.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder)
    
    // Загружаем товары для каждой категории
    const promises = activeCategories.map(async (category) => {
      try {
        const response = await fetchProducts({
          categoryId: category.id,
          limit: 20, // Лимит товаров на категорию
          sortBy: 'sortOrder',
          sortOrder: 'asc'
        })
        return {
          category,
          products: response.products || []
        }
      } catch (error) {
        console.error(`Ошибка загрузки товаров для категории ${category.name}:`, error)
        return {
          category,
          products: []
        }
      }
    })
    
    categoriesWithProducts.value = await Promise.all(promises)
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="w-full">
    <!-- Баннеры карусель -->
    <BannerCarousel />

    <!-- Меню категорий - под баннером в мобильной версии -->
    <HorizontalCategoryMenu />

    <!-- Все категории с товарами -->
    <div class="py-6 md:py-10">
      <div v-if="loading" class="flex items-center justify-center py-20">
        <LoadingSpinner />
      </div>

      <div v-else-if="categoriesWithProducts.length === 0" class="flex items-center justify-center py-20 text-gray-400">
        <div class="text-center">
          <div class="text-4xl mb-4">🍽️</div>
          <div class="text-lg">Категории не найдены</div>
        </div>
      </div>

      <template v-else>
        <CategorySection
          v-for="item in categoriesWithProducts"
          :key="item.category.id"
          :category="item.category"
          :products="item.products"
        />
      </template>
    </div>
  </main>
</template>
