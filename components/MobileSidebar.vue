<script setup lang="ts">
const model = defineModel<boolean>({ required: true })
const route = useRoute()
const router = useRouter()
const { categories, fetchCategories } = useCatalog()
const touchGestures = useTouchGestures()

const selectedCategoryId = computed(() => route.query.categoryId as string | undefined)

onMounted(async () => {
  if (categories.value.length === 0) {
    await fetchCategories()
  }

  // Закрытие по свайпу влево
  const sidebar = document.querySelector('[data-mobile-sidebar]') as HTMLElement
  if (sidebar) {
    touchGestures.bindTouchHandlers(sidebar, {
      onSwipeLeft: () => {
        if (model.value) {
          model.value = false
        }
      }
    })
  }
})

const isActive = (categoryId: string) => {
  return selectedCategoryId.value === categoryId
}

const selectCategory = async (categoryId: string) => {
  // Закрываем боковое меню
  model.value = false
  
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
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="model"
        class="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        @click="model = false" />
    </transition>
    <transition name="slide">
      <aside
        v-if="model"
        data-mobile-sidebar
        class="fixed z-[70] inset-y-0 left-0 w-80 bg-card border-r border-white/10 p-4 overflow-y-auto touch-pan-y smooth-scroll">
        <div class="flex items-center justify-between mb-3">
          <div class="text-sm text-gray-400 uppercase">Меню доставки</div>
          <button
            class="px-3 py-1.5 rounded bg-white/10 hover:bg-white/15 transition"
            @click="model = false">
            Закрыть
          </button>
        </div>
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
            <span
              v-if="category._count?.products"
              class="text-xs text-gray-500 group-hover:text-gray-400">
              {{ category._count.products }}
            </span>
          </button>
        </nav>
      </aside>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
