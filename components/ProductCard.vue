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
    class="card card-hover group cursor-pointer h-full flex flex-col"
    @click="handleClick">
    <!-- Изображение - фиксированная высота -->
    <div class="relative overflow-hidden rounded-t-lg flex-shrink-0">
      <img
        :src="imageUrl"
        :alt="product?.name || ''"
        loading="lazy"
        class="w-full h-44 sm:h-48 object-cover opacity-95 transition-transform duration-300 group-hover:scale-110" />
      <!-- Теги New и Hot - верхний правый угол -->
      <div v-if="product?.isNew || product?.isHot" class="absolute top-2 right-2 flex gap-1 z-10">
        <!-- Тег New (оранжевый) -->
        <div
          v-if="product?.isNew"
          class="px-1.5 py-0.5 rounded text-[8px] font-semibold text-white bg-orange-500 border border-orange-400 shadow-lg">
          NEW
        </div>
        <!-- Тег Hot (розовый) -->
        <div
          v-if="product?.isHot"
          class="px-1.5 py-0.5 rounded text-[8px] font-semibold text-white bg-pink-500 border border-pink-400 shadow-lg">
          HOT
        </div>
      </div>
      <!-- Бейдж акции -->
      <div
        v-if="hasDiscount"
        class="absolute top-3 right-3 badge border-accent text-accent bg-accent/20 backdrop-blur-sm">
        -{{ discountPercent }}%
      </div>
      <!-- Бейдж популярного -->
      <div
        v-if="product?.isPopular"
        class="absolute bottom-3 left-3 badge border-yellow-500 text-yellow-300 bg-yellow-500/20 backdrop-blur-sm">
        ⭐ Популярное
      </div>
      <!-- Overlay при hover -->
      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center pointer-events-none">
        <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 bg-accent rounded-lg text-white font-medium text-sm">
          Подробнее
        </span>
      </div>
    </div>
    <!-- Контент карточки - растягивается для выравнивания -->
    <div class="p-4 flex flex-col flex-grow">
      <!-- Название - фиксированная высота с обрезкой -->
      <h3 class="text-white font-medium group-hover:text-accent transition-colors line-clamp-2 h-12">
        {{ product?.name || '' }}
      </h3>
      <!-- Описание - фиксированная высота с обрезкой -->
      <p class="text-sm text-gray-400 line-clamp-2 mt-1 group-hover:text-gray-300 transition-colors h-10">
        {{ product?.description || '' }}
      </p>
      <!-- Цена и вес - всегда внизу -->
      <div class="flex items-center justify-between mt-auto pt-3">
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

  </article>
</template>

<style scoped>
.card {
  @apply bg-card rounded-lg overflow-hidden border border-white/5 hover:border-white/10;
}
</style>
