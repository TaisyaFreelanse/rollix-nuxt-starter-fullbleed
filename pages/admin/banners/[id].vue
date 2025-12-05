<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const adminAuth = useAdminAuth()
const bannerId = route.params.id as string
const isNew = bannerId === 'new'

const form = ref({
  title: '',
  image: '',
  link: '',
  isActive: true,
  sortOrder: 0
})

const isLoading = ref(false)

const loadBanner = async () => {
  if (isNew) return

  isLoading.value = true
  try {
    const banner = await adminAuth.$fetchWithAuth(`/api/admin/banners/${bannerId}`)
    form.value = {
      title: banner.title || '',
      image: banner.image || '',
      link: banner.link || '',
      isActive: banner.isActive !== undefined ? banner.isActive : true,
      sortOrder: banner.sortOrder || 0
    }
  } catch (error: any) {
    console.error('Ошибка загрузки баннера:', error)
    alert(error?.data?.message || 'Баннер не найден')
    router.push('/admin?tab=banners')
  } finally {
    isLoading.value = false
  }
}

const saveBanner = async () => {
  if (!form.value.title || !form.value.image) {
    alert('Заполните все обязательные поля')
    return
  }

  isLoading.value = true
  try {
    if (isNew) {
      await adminAuth.$fetchWithAuth('/api/admin/banners', {
        method: 'POST',
        body: form.value
      })
    } else {
      await adminAuth.$fetchWithAuth(`/api/admin/banners/${bannerId}`, {
        method: 'PUT',
        body: form.value
      })
    }
    router.push('/admin?tab=banners')
  } catch (error: any) {
    alert(error?.data?.message || 'Ошибка сохранения баннера')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadBanner()
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">
        {{ isNew ? 'Добавить баннер' : 'Редактировать баннер' }}
      </h1>
      <NuxtLink
        to="/admin?tab=banners"
        class="text-gray-400 hover:text-white transition-colors">
        ← Назад к списку
      </NuxtLink>
    </div>

    <div v-if="isLoading && !isNew" class="text-center py-12 text-gray-400">
      Загрузка...
    </div>
    <form v-else @submit.prevent="saveBanner" class="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Название *</label>
          <input
            v-model="form.title"
            type="text"
            required
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
        <label class="block text-sm font-medium text-gray-300 mb-2">Изображение (URL) *</label>
        <input
          v-model="form.image"
          type="url"
          required
          class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">Ссылка</label>
        <input
          v-model="form.link"
          type="text"
          placeholder="/catalog"
          class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
      </div>

      <div>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="form.isActive"
            type="checkbox"
            class="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent" />
          <span class="text-gray-300">Активен</span>
        </label>
      </div>


      <div class="flex items-center justify-end gap-4 pt-4 border-t border-gray-700">
        <NuxtLink
          to="/admin?tab=banners"
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

