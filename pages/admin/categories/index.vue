<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const categories = ref<any[]>([])
const isLoading = ref(true)

const loadCategories = async () => {
  isLoading.value = true
  try {
    categories.value = await $fetch('/api/categories')
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error)
  } finally {
    isLoading.value = false
  }
}

const deleteCategory = async (id: string) => {
  if (!confirm('Вы уверены, что хотите удалить эту категорию?')) return

  try {
    await $fetch(`/api/categories/${id}`, { method: 'DELETE' })
    await loadCategories()
  } catch (error) {
    alert('Ошибка удаления категории')
  }
}

onMounted(() => {
  loadCategories()
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">Категории</h1>
      <NuxtLink
        to="/admin/categories/new"
        class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors">
        ➕ Добавить категорию
      </NuxtLink>
    </div>

    <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div v-if="isLoading" class="p-8 text-center text-gray-400">
        Загрузка...
      </div>
      <div v-else-if="categories.length === 0" class="p-8 text-center text-gray-400">
        Категории не найдены
      </div>
      <div v-else class="divide-y divide-gray-700">
        <div
          v-for="category in categories"
          :key="category.id"
          class="p-6 hover:bg-gray-700 transition-colors">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div v-if="category.icon" class="text-4xl">{{ category.icon }}</div>
              <div>
                <h3 class="text-lg font-semibold text-white">{{ category.name }}</h3>
                <p v-if="category.description" class="text-sm text-gray-400 mt-1">
                  {{ category.description }}
                </p>
                <div class="flex items-center gap-4 mt-2">
                  <span class="text-xs text-gray-500">Порядок: {{ category.sortOrder }}</span>
                  <span
                    :class="[
                      'px-2 py-1 rounded text-xs font-medium',
                      category.isActive
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    ]">
                    {{ category.isActive ? 'Активна' : 'Неактивна' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <NuxtLink
                :to="`/admin/categories/${category.id}`"
                class="text-accent hover:text-accent-700 transition-colors">
                ✏️
              </NuxtLink>
              <button
                @click="deleteCategory(category.id)"
                class="text-red-400 hover:text-red-500 transition-colors">
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

