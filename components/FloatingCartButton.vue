<script setup lang="ts">
const cartStore = useCartStore()
const cartOpen = useState('cartOpen', () => false)

const cartItemsCount = computed(() => cartStore.totalItems)
const cartTotal = computed(() => cartStore.total)

const openCart = () => {
  cartOpen.value = true
}
</script>

<template>
  <button
    v-if="cartItemsCount > 0"
    class="hidden lg:flex fixed bottom-6 right-6 z-40 items-center gap-3 px-6 py-4 bg-accent hover:bg-accent-700 text-white rounded-lg shadow-lg transition-all hover:scale-105"
    @click="openCart">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    <div class="flex flex-col items-start">
      <span class="text-sm font-medium">Корзина {{ cartItemsCount }} ×</span>
      <span class="text-lg font-bold">{{ cartTotal.toFixed(2) }} ₽</span>
    </div>
  </button>
</template>

