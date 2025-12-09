<script setup lang="ts">
import type { Category, Product } from '~/composables/useCatalog'

const { categories, fetchCategories, fetchProducts } = useCatalog()
const categoriesWithProducts = ref<Array<{ category: Category; products: Product[] }>>([])
const loading = ref(true)
const route = useRoute()

// Функция прокрутки к категории
const scrollToCategory = (categoryId: string) => {
  const element = document.getElementById(`category-${categoryId}`)
  if (element) {
    // Высота хедера (64px) + меню категорий (примерно 48px) = 112px
    const headerOffset = 112
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

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
    
    // После загрузки данных, если есть categoryId в query, прокручиваем к нему
    const categoryId = route.query.categoryId as string | undefined
    if (categoryId) {
      await nextTick()
      setTimeout(() => {
        scrollToCategory(categoryId)
      }, 100)
    }
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  } finally {
    loading.value = false
  }
})

// Отслеживаем изменения categoryId в query для прокрутки
watch(
  () => route.query.categoryId,
  (categoryId) => {
    if (categoryId && !loading.value) {
      nextTick(() => {
        setTimeout(() => {
          scrollToCategory(categoryId as string)
        }, 100)
      })
    }
  }
)
</script>

<template>
  <main class="w-full">
    <!-- Баннеры карусель -->
    <BannerCarousel />

    <!-- Статичное меню категорий (fixed - всегда видно при скролле в мобильной версии) -->
    <HorizontalCategoryMenu />
    
    <!-- Отступ для фиксированного меню в мобильной версии -->
    <div class="lg:hidden h-[48px]"></div>

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
