<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const categoryId = route.params.id as string
const isNew = categoryId === 'new'

const form = ref({
  name: '',
  description: '',
  slug: '',
  icon: '',
  isActive: true,
  sortOrder: 0
})

const isLoading = ref(false)

const loadCategory = async () => {
  if (isNew) return

  isLoading.value = true
  try {
    const category = await $fetch(`/api/categories/${categoryId}`)
    form.value = {
      name: category.name || '',
      description: category.description || '',
      slug: category.slug || '',
      icon: category.icon || '',
      isActive: category.isActive ?? true,
      sortOrder: category.sortOrder || 0
    }
  } catch (error: any) {
    console.error('Ошибка загрузки категории:', error)
    const errorMessage = error?.data?.message || error?.message || 'Категория не найдена'
    alert(errorMessage)
    router.push('/admin?tab=categories')
  } finally {
    isLoading.value = false
  }
}

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

watch(() => form.value.name, (newName) => {
  if (isNew && !form.value.slug) {
    form.value.slug = generateSlug(newName)
  }
})

const saveCategory = async () => {
  isLoading.value = true
  try {
    if (isNew) {
      await $fetch('/api/categories', {
        method: 'POST',
        body: form.value
      })
    } else {
      await $fetch(`/api/categories/${categoryId}`, {
        method: 'PUT',
        body: form.value
      })
    }
    router.push('/admin?tab=categories')
  } catch (error: any) {
    const errorMessage = error?.data?.message || error?.message || 'Ошибка сохранения категории'
    alert(errorMessage)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadCategory()
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">
        {{ isNew ? 'Добавить категорию' : 'Редактировать категорию' }}
      </h1>
      <NuxtLink
        to="/admin?tab=categories"
        class="text-gray-400 hover:text-white transition-colors">
        ← Назад к списку
      </NuxtLink>
    </div>

    <form v-if="!isLoading || isNew" @submit.prevent="saveCategory" class="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Название *</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Slug *</label>
          <input
            v-model="form.slug"
            type="text"
            required
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">Описание</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Иконка (эмодзи)</label>
          <input
            v-model="form.icon"
            type="text"
            placeholder="📁"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Порядок сортировки</label>
          <input
            v-model.number="form.sortOrder"
            type="number"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>
      </div>

      <div>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="form.isActive"
            type="checkbox"
            class="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent" />
          <span class="text-gray-300">Активна</span>
        </label>
      </div>

      <div class="flex items-center justify-end gap-4 pt-4 border-t border-gray-700">
        <NuxtLink
          to="/admin?tab=categories"
          class="px-6 py-2 text-gray-400 hover:text-white transition-colors">
          Отмена
        </NuxtLink>
        <button
          type="submit"
          :disabled="isLoading"
          class="bg-accent hover:bg-accent-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50">
          {{ isLoading ? 'Сохранение...' : 'Сохранить' }}
        </button>
      </div>
    </form>
  </div>
</template>

