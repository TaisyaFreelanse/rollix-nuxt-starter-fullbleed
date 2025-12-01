<script setup lang="ts">
import type { Category } from '~/composables/useCatalog'

const { categories, fetchCategories } = useCatalog()
const route = useRoute()

const selectedCategoryId = computed(() => route.query.categoryId as string | undefined)

onMounted(async () => {
  if (categories.value.length === 0) {
    await fetchCategories()
  }
})

const isActive = (categoryId: string) => {
  return selectedCategoryId.value === categoryId
}
</script>

<template>
  <aside
    class="hidden lg:block w-64 shrink-0 border-r border-white/5 bg-card sticky top-16 h-[calc(100dvh-4rem)] overflow-y-auto smooth-scroll">
    <div class="p-3 pb-24">
      <div class="text-xs uppercase tracking-wider text-gray-400 mb-2">Меню доставки</div>
      <div class="flex items-center gap-2 mb-3">
        <NuxtLink
          to="/catalog"
          class="px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-700 transition text-sm text-white">
          Категории
        </NuxtLink>
        <button
          class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm text-gray-400 cursor-not-allowed"
          disabled
          title="Скоро">
          Ингредиенты
        </button>
      </div>
      <nav class="space-y-1">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="{ path: '/catalog', query: { categoryId: category.id } }"
          :class="[
            'group flex items-center gap-3 px-3 py-2 rounded-lg transition',
            isActive(category.id)
              ? 'bg-accent/20 text-white'
              : 'hover:bg-white/5 text-gray-300'
          ]">
          <span class="text-lg">{{ category.icon || '🍽️' }}</span>
          <span class="text-sm flex-1">{{ category.name }}</span>
          <span
            v-if="category._count?.products"
            class="text-xs text-gray-500 group-hover:text-gray-400">
            {{ category._count.products }}
          </span>
        </NuxtLink>
      </nav>
    </div>
  </aside>
</template>
