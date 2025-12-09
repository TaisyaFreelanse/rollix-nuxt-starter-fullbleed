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

const isActive = (categoryId: string) => {
  return selectedCategoryId.value === categoryId
}

const selectCategory = async (categoryId: string) => {
  // Если мы не на главной странице, переходим на неё
  if (route.path !== '/') {
    await router.push('/')
    // Ждём, пока страница загрузится
    await nextTick()
    // Небольшая задержка для рендеринга
    setTimeout(() => {
      scrollToCategory(categoryId)
    }, 100)
  } else {
    // Если уже на главной странице, просто скроллим
    scrollToCategory(categoryId)
  }
}

const scrollToCategory = (categoryId: string) => {
  const element = document.getElementById(`category-${categoryId}`)
  if (element) {
    const headerOffset = 80 // Высота хедера + меню
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    
    // Обновляем URL без перезагрузки страницы
    router.replace({ path: '/', query: { categoryId } })
  }
}

// Прокрутка страницы к секции категории при загрузке
watch(
  () => [route.path, selectedCategoryId.value],
  ([path, categoryId]) => {
    if (path === '/' && categoryId) {
      nextTick(() => {
        setTimeout(() => {
          scrollToCategory(categoryId)
        }, 300) // Задержка для загрузки контента
      })
    }
  },
  { immediate: true }
)
</script>

<template>
  <aside
    class="hidden lg:block w-64 shrink-0 border-r border-white/5 bg-card sticky top-16 h-[calc(100dvh-4rem)] overflow-y-auto smooth-scroll">
    <div class="p-3 pb-24">
      <nav class="space-y-1">
        <button
          v-for="category in categories"
          :key="category.id"
          type="button"
          :class="[
            'group flex items-center gap-3 px-3 py-2 rounded-lg transition w-full text-left',
            isActive(category.id)
              ? 'bg-accent/20 text-white'
              : 'hover:bg-white/5 text-gray-300'
          ]"
          @click="selectCategory(category.id)">
          <span class="text-lg">{{ category.icon || '🍽️' }}</span>
          <span class="text-sm flex-1">{{ category.name }}</span>
        </button>
      </nav>
    </div>
  </aside>
</template>
