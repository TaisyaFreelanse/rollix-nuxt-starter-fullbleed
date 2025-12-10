<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const productId = route.params.id as string
const isNew = productId === 'new'

const form = ref({
  name: '',
  description: '',
  price: 0,
  oldPrice: null as number | null,
  image: '',
  categoryId: '',
  weight: null as number | null,
  calories: null as number | null,
      isActive: true,
      isPopular: false,
      isNew: false,
      isHot: false,
      sortOrder: 0
})

const categories = ref<any[]>([])
const isLoading = ref(false)

const loadCategories = async () => {
  try {
    categories.value = await $fetch('/api/categories')
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error)
  }
}

const loadProduct = async () => {
  if (isNew) return

  isLoading.value = true
  try {
    const product = await $fetch(`/api/products/${productId}`)
    form.value = {
      name: product.name || '',
      description: product.description || '',
      price: Number(product.price) || 0,
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
      image: product.image || '',
      categoryId: product.categoryId || '',
      weight: product.weight || null,
      calories: product.calories || null,
      isActive: product.isActive ?? true,
      isPopular: product.isPopular ?? false,
      isNew: product.isNew ?? false,
      isHot: product.isHot ?? false,
      sortOrder: product.sortOrder || 0
    }
  } catch (error) {
    console.error('Ошибка загрузки товара:', error)
    alert('Товар не найден')
    router.push('/admin/products')
  } finally {
    isLoading.value = false
  }
}

const saveProduct = async () => {
  isLoading.value = true
  try {
    // Подготавливаем данные: преобразуем пустые значения в null
    const dataToSend = {
      ...form.value,
      oldPrice: form.value.oldPrice === null || form.value.oldPrice === undefined || form.value.oldPrice === '' || isNaN(Number(form.value.oldPrice)) || Number(form.value.oldPrice) <= 0 
        ? null 
        : Number(form.value.oldPrice),
      weight: form.value.weight === null || form.value.weight === undefined || form.value.weight === '' || isNaN(Number(form.value.weight)) || Number(form.value.weight) <= 0 
        ? null 
        : Number(form.value.weight),
      calories: form.value.calories === null || form.value.calories === undefined || form.value.calories === '' || isNaN(Number(form.value.calories)) || Number(form.value.calories) <= 0 
        ? null 
        : Number(form.value.calories)
    }
    
    if (isNew) {
      await $fetch('/api/products', {
        method: 'POST',
        body: dataToSend
      })
    } else {
      await $fetch(`/api/products/${productId}`, {
        method: 'PUT',
        body: dataToSend
      })
    }
    router.push('/admin/products')
  } catch (error: any) {
    alert(error?.data?.message || 'Ошибка сохранения товара')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadCategories()
  loadProduct()
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">
        {{ isNew ? 'Добавить товар' : 'Редактировать товар' }}
      </h1>
      <NuxtLink
        to="/admin/products"
        class="text-gray-400 hover:text-white transition-colors">
        ← Назад к списку
      </NuxtLink>
    </div>

    <div v-if="isLoading && !isNew" class="text-center text-gray-400 py-8">
      Загрузка...
    </div>

    <form v-else @submit.prevent="saveProduct" class="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
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
          <label class="block text-sm font-medium text-gray-300 mb-2">Категория *</label>
          <select
            v-model="form.categoryId"
            required
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none">
            <option value="">Выберите категорию</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">Описание</label>
        <textarea
          v-model="form.description"
          rows="4"
          class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Цена *</label>
          <input
            v-model.number="form.price"
            type="number"
            step="0.01"
            min="0"
            required
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Старая цена</label>
          <input
            v-model.number="form.oldPrice"
            type="number"
            step="0.01"
            min="0"
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

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Изображение (URL)</label>
          <input
            v-model="form.image"
            type="url"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Вес (г)</label>
          <input
            v-model.number="form.weight"
            type="number"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Калории</label>
          <input
            v-model.number="form.calories"
            type="number"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
        </div>
      </div>

      <div class="flex items-center gap-6">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="form.isActive"
            type="checkbox"
            class="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent" />
          <span class="text-gray-300">Активен</span>
        </label>

        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="form.isPopular"
            type="checkbox"
            class="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent" />
          <span class="text-gray-300">⭐ Популярное</span>
        </label>

        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="form.isNew"
            type="checkbox"
            class="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent" />
          <span class="text-gray-300">🆕 New</span>
        </label>

        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="form.isHot"
            type="checkbox"
            class="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent" />
          <span class="text-gray-300">🔥 Hot</span>
        </label>
      </div>

      <div class="flex items-center justify-end gap-4 pt-4 border-t border-gray-700">
        <NuxtLink
          to="/admin/products"
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

