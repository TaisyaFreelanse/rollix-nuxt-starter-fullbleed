<script setup lang="ts">
import type { Product } from '~/composables/useCatalog'

interface Props {
  product?: Product | null
}

const props = withDefaults(defineProps<Props>(), {
  product: null
})

const emit = defineEmits<{
  click: [product: Product]
}>()

// Проверка валидности продукта - если продукт невалиден, не рендерим компонент
const isValidProduct = computed(() => {
  return props.product && props.product.id && props.product.name
})

const isFavorite = ref(false)
const isLoadingFavorite = ref(false)
const showAuthModal = ref(false)

const auth = useAuth()
const toast = useToast()

// Проверяем, в избранном ли товар
const checkFavorite = async () => {
  if (!props.product?.id || !auth.isAuthenticated.value) return
  try {
    const response = await auth.$fetchWithAuth(`/api/profile/favorites/${props.product.id}`)
    isFavorite.value = response.isFavorite || false
  } catch (error) {
    // Товар не в избранном или ошибка
    isFavorite.value = false
  }
}

const toggleFavorite = async (e: Event) => {
  e.stopPropagation()
  if (!props.product?.id || isLoadingFavorite.value) return

  // Проверяем авторизацию
  if (!auth.isAuthenticated.value) {
    showAuthModal.value = true
    return
  }

  isLoadingFavorite.value = true
  try {
    if (isFavorite.value) {
      await auth.$fetchWithAuth(`/api/profile/favorites/${props.product.id}`, {
        method: 'DELETE'
      })
      isFavorite.value = false
      toast.success('Товар удален из избранного')
    } else {
      await auth.$fetchWithAuth(`/api/profile/favorites/${props.product.id}`, {
        method: 'POST'
      })
      isFavorite.value = true
      toast.success('Товар добавлен в избранное')
    }
  } catch (error) {
    console.error('Ошибка изменения избранного', error)
    toast.error('Ошибка при изменении избранного')
  } finally {
    isLoadingFavorite.value = false
  }
}

// Проверяем избранное при монтировании и при изменении авторизации
watch(() => auth.isAuthenticated.value, (isAuth) => {
  if (isAuth) {
    checkFavorite()
  } else {
    isFavorite.value = false
  }
}, { immediate: true })

onMounted(() => {
  if (auth.isAuthenticated.value) {
    checkFavorite()
  }
})

const imageUrl = computed(() => props.product?.image || '/product.svg')
const hasDiscount = computed(() => props.product?.oldPrice && props.product.oldPrice > props.product.price)
const discountPercent = computed(() => {
  if (!hasDiscount.value || !props.product?.oldPrice) return 0
  return Math.round(((props.product.oldPrice - props.product.price) / props.product.oldPrice) * 100)
})

const handleClick = () => {
  if (props.product) {
    emit('click', props.product)
  }
}
</script>

<template>
  <article
    v-if="isValidProduct"
    class="card card-hover group cursor-pointer"
    @click="handleClick">
    <div class="relative overflow-hidden rounded-t-lg">
      <img
        :src="imageUrl"
        :alt="product?.name || ''"
        loading="lazy"
        class="w-full h-40 sm:h-48 md:h-56 object-cover opacity-95 transition-transform duration-300 group-hover:scale-110" />
      <!-- Бейдж акции -->
      <div
        v-if="hasDiscount"
        class="absolute top-3 left-3 badge border-accent text-accent bg-accent/20 backdrop-blur-sm">
        -{{ discountPercent }}%
      </div>
      <!-- Бейдж популярного -->
      <div
        v-if="product?.isPopular"
        class="absolute top-3 right-3 badge border-yellow-500 text-yellow-300 bg-yellow-500/20 backdrop-blur-sm">
        ⭐ Популярное
      </div>
      <!-- Overlay при hover -->
      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center pointer-events-none">
        <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 bg-accent rounded-lg text-white font-medium text-sm">
          Подробнее
        </span>
      </div>
      <!-- Кнопка избранного (поверх overlay) -->
      <button
        type="button"
        :class="[
          'absolute bottom-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all',
          isFavorite
            ? 'bg-red-500/20 border border-red-500/50 text-red-500 hover:bg-red-500/30'
            : 'bg-white/10 border border-white/20 text-gray-400 hover:text-white hover:bg-white/20'
        ]"
        @click.stop="toggleFavorite">
        {{ isFavorite ? '♥️' : '🤍' }}
      </button>
    </div>
    <div class="p-4">
      <h3 class="text-white font-medium group-hover:text-accent transition-colors">
        {{ product?.name || '' }}
      </h3>
      <p
        v-if="product?.description"
        class="text-sm text-gray-400 line-clamp-2 mt-1 group-hover:text-gray-300 transition-colors">
        {{ product.description }}
      </p>
      <div class="flex items-center justify-between mt-4">
        <div class="flex items-center gap-2">
          <div class="text-white font-semibold text-lg">{{ product?.price || 0 }} ₽</div>
          <div
            v-if="hasDiscount"
            class="text-sm text-gray-500 line-through">
            {{ product?.oldPrice || 0 }} ₽
          </div>
        </div>
        <div class="flex items-center gap-1 text-xs text-gray-500">
          <span v-if="product?.weight">{{ product.weight }}г</span>
          <span v-if="product?.weight && product?.calories">•</span>
          <span v-if="product?.calories">{{ product.calories }} ккал</span>
        </div>
      </div>
    </div>

    <!-- Модальное окно авторизации -->
    <Modal :open="showAuthModal" title="Войдите, чтобы добавить в избранное" @close="showAuthModal = false">
      <SmsAuth 
        @success="(phone: string) => { showAuthModal.value = false; checkFavorite(); }" 
        @cancel="showAuthModal.value = false" />
    </Modal>
  </article>
</template>

<style scoped>
.card {
  @apply bg-card rounded-lg overflow-hidden border border-white/5 hover:border-white/10;
}
</style>
