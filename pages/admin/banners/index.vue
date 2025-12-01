<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

// Заглушка для баннеров
const banners = ref([
  {
    id: '1',
    title: 'Главный баннер',
    image: '/banner1.jpg',
    link: '/catalog',
    isActive: true,
    sortOrder: 1
  }
])

const isLoading = ref(false)

const deleteBanner = async (id: string) => {
  if (!confirm('Вы уверены, что хотите удалить этот баннер?')) return
  banners.value = banners.value.filter((b) => b.id !== id)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">Баннеры</h1>
      <NuxtLink
        to="/admin/banners/new"
        class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors">
        ➕ Добавить баннер
      </NuxtLink>
    </div>

    <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div v-if="banners.length === 0" class="p-8 text-center text-gray-400">
        Баннеры не найдены
      </div>
      <div v-else class="divide-y divide-gray-700">
        <div
          v-for="banner in banners"
          :key="banner.id"
          class="p-6 hover:bg-gray-700 transition-colors">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <img
                :src="banner.image"
                :alt="banner.title"
                class="w-24 h-24 object-cover rounded" />
              <div>
                <h3 class="text-lg font-semibold text-white">{{ banner.title }}</h3>
                <p class="text-sm text-gray-400 mt-1">Ссылка: {{ banner.link }}</p>
                <div class="flex items-center gap-4 mt-2">
                  <span class="text-xs text-gray-500">Порядок: {{ banner.sortOrder }}</span>
                  <span
                    :class="[
                      'px-2 py-1 rounded text-xs font-medium',
                      banner.isActive
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    ]">
                    {{ banner.isActive ? 'Активен' : 'Неактивен' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <NuxtLink
                :to="`/admin/banners/${banner.id}`"
                class="text-accent hover:text-accent-700 transition-colors">
                ✏️
              </NuxtLink>
              <button
                @click="deleteBanner(banner.id)"
                class="text-red-400 hover:text-red-500 transition-colors">
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
      <p class="text-yellow-400 text-sm">
        ⚠️ Управление баннерами - заглушка. Реальная реализация будет добавлена позже.
      </p>
    </div>
  </div>
</template>

