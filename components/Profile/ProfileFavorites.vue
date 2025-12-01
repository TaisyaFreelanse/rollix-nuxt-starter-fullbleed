<script setup lang="ts">
const favorites = ref<any[]>([])
const loading = ref(false)

const fetchFavorites = async () => {
  loading.value = true
  try {
    favorites.value = await $fetch('/api/profile/favorites')
  } catch (error) {
    console.error('Ошибка загрузки избранного', error)
  } finally {
    loading.value = false
  }
}

const removeFavorite = async (productId: string) => {
  try {
    await $fetch(`/api/profile/favorites/${productId}`, {
      method: 'DELETE'
    })
    await fetchFavorites()
  } catch (error) {
    console.error('Ошибка удаления из избранного', error)
  }
}

onMounted(() => {
  fetchFavorites()
})
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Избранные товары</h2>

    <div v-if="loading" class="text-center py-12 text-gray-400">Загрузка...</div>

    <div v-else-if="favorites.length === 0" class="text-center py-12 text-gray-400">
      <div class="text-4xl mb-4">❤️</div>
      <div class="text-lg mb-2">У вас пока нет избранных товаров</div>
      <NuxtLink to="/catalog" class="text-accent hover:text-accent-700">
        Перейти в каталог
      </NuxtLink>
    </div>

    <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="favorite in favorites"
        :key="favorite.id"
        class="bg-card rounded-lg border border-white/5 overflow-hidden group">
        <NuxtLink :to="`/catalog?productId=${favorite.product.id}`" class="block">
          <img
            :src="favorite.product.image || '/product.svg'"
            :alt="favorite.product.name"
            class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="font-medium mb-2 group-hover:text-accent transition">
              {{ favorite.product.name }}
            </h3>
            <div class="text-lg font-semibold">{{ Number(favorite.product.price).toFixed(2) }} ₽</div>
          </div>
        </NuxtLink>
        <button
          class="absolute top-2 right-2 p-2 bg-red-500/20 hover:bg-red-500/30 rounded-full transition"
          @click="removeFavorite(favorite.product.id)">
          ❤️
        </button>
      </div>
    </div>
  </div>
</template>

