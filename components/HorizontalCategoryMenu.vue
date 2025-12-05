<script setup lang="ts">
import type { Category } from '~/composables/useCatalog'

const { categories, fetchCategories } = useCatalog()
const route = useRoute()
const router = useRouter()

const selectedCategoryId = computed(() => route.query.categoryId as string | undefined)

onMounted(async () => {
  if (categories.value.length === 0) {
    await fetchCategories()
  }
})

// Фильтруем только активные категории и сортируем
const activeCategories = computed(() => {
  return categories.value
    .filter(cat => cat.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
})

const isActive = (categoryId: string) => {
  return selectedCategoryId.value === categoryId
}

const selectCategory = (categoryId: string) => {
  router.push({ path: '/catalog', query: { categoryId } })
}

// Прокрутка к активной категории
const categoryMenuRef = ref<HTMLElement | null>(null)
const activeCategoryRef = ref<HTMLElement | null>(null)

watch(
  () => selectedCategoryId.value,
  () => {
    nextTick(() => {
      if (activeCategoryRef.value && categoryMenuRef.value) {
        const container = categoryMenuRef.value
        const activeItem = activeCategoryRef.value
        const containerWidth = container.offsetWidth
        const itemLeft = activeItem.offsetLeft
        const itemWidth = activeItem.offsetWidth
        const scrollLeft = container.scrollLeft
        const itemCenter = itemLeft + itemWidth / 2 - scrollLeft
        const targetScroll = scrollLeft + itemCenter - containerWidth / 2

        container.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: 'smooth'
        })
      }
    })
  },
  { immediate: true }
)
</script>

<template>
  <div class="lg:hidden w-full bg-card border-b border-white/5 sticky top-16 z-40">
    <div
      ref="categoryMenuRef"
      class="flex items-center gap-2 overflow-x-auto px-4 py-2.5 smooth-scroll scrollbar-hide"
      style="scrollbar-width: none; -ms-overflow-style: none;">
      <button
        v-for="category in activeCategories"
        :key="category.id"
        :ref="isActive(category.id) ? (el) => { activeCategoryRef = el as HTMLElement } : null"
        type="button"
        :class="[
          'flex-shrink-0 px-3 py-1.5 text-sm font-medium transition whitespace-nowrap relative',
          isActive(category.id)
            ? 'text-white'
            : 'text-gray-400 hover:text-white'
        ]"
        @click="selectCategory(category.id)">
        <span>{{ category.name }}</span>
        <span
          v-if="isActive(category.id)"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.smooth-scroll {
  scroll-behavior: smooth;
}
</style>
