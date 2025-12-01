<script setup lang="ts">
import type { Product } from '~/composables/useCatalog'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [product: Product]
}>()

if (!props.product) {
  throw new Error('ProductCard: product prop is required')
}

const imageUrl = computed(() => props.product?.image || '/product.svg')
const hasDiscount = computed(() => props.product?.oldPrice && props.product.oldPrice > props.product.price)
const discountPercent = computed(() => {
  if (!hasDiscount.value || !props.product?.oldPrice) return 0
  return Math.round(((props.product.oldPrice - props.product.price) / props.product.oldPrice) * 100)
})

const handleClick = () => {
  emit('click', props.product)
}
</script>

<template>
  <article
    class="card group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
    @click="handleClick">
    <div class="relative overflow-hidden rounded-t-lg">
      <img
        :src="imageUrl"
        :alt="product?.name || ''"
        loading="lazy"
        class="w-full h-48 sm:h-56 object-cover opacity-95 transition-transform duration-300 group-hover:scale-110" />
      <!-- Бейдж акции -->
      <div
        v-if="hasDiscount"
        class="absolute top-3 left-3 badge border-red-500 text-red-300 bg-red-500/20 backdrop-blur-sm">
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
        class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button class="px-4 py-2 bg-accent hover:bg-accent-700 rounded-lg text-white font-medium text-sm transition">
            Подробнее
          </button>
        </div>
      </div>
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
  </article>
</template>

<style scoped>
.card {
  @apply bg-card rounded-lg overflow-hidden border border-white/5 hover:border-white/10 transition-all;
}
</style>
