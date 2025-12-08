
<script setup lang="ts">
const promocodeWidget = ref<any | null>(null)
const promotions = ref<any[]>([])
const loading = ref(true)

const loadPromocodeWidget = async () => {
  try {
    const widget = await $fetch('/api/promocode-widget')
    console.log('[Promo] Загружен виджет промокода:', widget)
    promocodeWidget.value = widget
  } catch (error: any) {
    console.error('Ошибка загрузки виджета промокода:', error)
    promocodeWidget.value = null
  }
}

const loadPromotions = async () => {
  try {
    promotions.value = await $fetch('/api/promotions')
  } catch (error) {
    console.error('Ошибка загрузки акций:', error)
  }
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(async () => {
  loading.value = true
  await Promise.all([loadPromocodeWidget(), loadPromotions()])
  loading.value = false
})
</script>

<template>
  <main class="w-full px-4 lg:px-8">
    <h1 class="text-2xl font-semibold mt-6 mb-6">Новости и акции</h1>
    
    <!-- Промокод карточка -->
    <div v-if="promocodeWidget && promocodeWidget.isActive" class="mb-8">
      <PromocodeCard :code="promocodeWidget.code" :description="promocodeWidget.description" />
    </div>
    
    <div v-if="loading" class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      <article v-for="i in 6" :key="i" class="card overflow-hidden">
        <div class="w-full h-48 md:h-56 bg-gray-800 animate-pulse"></div>
        <div class="p-4">
          <div class="h-4 bg-gray-800 rounded animate-pulse mb-2"></div>
          <div class="h-5 bg-gray-800 rounded animate-pulse mb-2"></div>
          <div class="h-4 bg-gray-800 rounded animate-pulse w-3/4"></div>
        </div>
      </article>
    </div>
    
    <div v-else-if="promotions.length === 0" class="text-center py-12 text-gray-400">
      Акции пока не добавлены
    </div>
    
    <div v-else class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      <article v-for="promo in promotions" :key="promo.id" class="card overflow-hidden">
        <img
          :src="promo.image || '/product.svg'"
          :alt="promo.title"
          class="w-full h-48 md:h-56 object-cover" />
        <div class="p-4">
          <div v-if="promo.date" class="text-xs text-gray-400">{{ formatDate(promo.date) }}</div>
          <h3 class="text-white font-semibold mt-1">{{ promo.title }}</h3>
          <p v-if="promo.description" class="text-sm text-gray-400 mt-1">{{ promo.description }}</p>
        </div>
      </article>
    </div>
  </main>
</template>
