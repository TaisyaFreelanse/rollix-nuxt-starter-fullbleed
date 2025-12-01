<script setup lang="ts">
import type { CartItem } from '~/stores/cart'

interface Props {
  item: CartItem
}

const props = defineProps<Props>()
const cartStore = useCartStore()

const increment = () => {
  cartStore.updateQuantity(props.item.id, props.item.quantity + 1)
}

const decrement = () => {
  cartStore.updateQuantity(props.item.id, props.item.quantity - 1)
}

const remove = () => {
  cartStore.removeItem(props.item.id)
}

const getModifierText = () => {
  if (!props.item.selectedModifiers || props.item.selectedModifiers.length === 0) {
    return ''
  }

  const texts: string[] = []
  props.item.selectedModifiers.forEach((modifier) => {
    const productModifier = props.item.product.modifiers.find((m) => m.id === modifier.modifierId)
    if (productModifier) {
      const optionNames = modifier.optionIds
        .map((optionId) => {
          const option = productModifier.options.find((opt) => opt.id === optionId)
          return option?.name
        })
        .filter(Boolean)
        .join(', ')

      if (optionNames) {
        texts.push(`${productModifier.name}: ${optionNames}`)
      }
    }
  })

  return texts.join('; ')
}
</script>

<template>
  <div v-if="item && item.product" class="flex gap-4 p-4 bg-card rounded-lg border border-white/5">
    <!-- Изображение -->
    <div class="flex-shrink-0">
      <img
        :src="item.product.image || '/product.svg'"
        :alt="item.product.name"
        class="w-20 h-20 object-cover rounded-lg" />
    </div>

    <!-- Информация -->
    <div class="flex-1 min-w-0">
      <h3 class="text-white font-medium mb-1">{{ item.product.name }}</h3>
      <p v-if="getModifierText()" class="text-xs text-gray-400 mb-2">
        {{ getModifierText() }}
      </p>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button
            class="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 transition touch-target"
            @click="decrement">
            −
          </button>
          <span class="text-white font-medium w-8 text-center">{{ item.quantity }}</span>
          <button
            class="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 transition touch-target"
            @click="increment">
            +
          </button>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-white font-semibold">{{ (item.price * item.quantity).toFixed(2) }} ₽</div>
          <button
            class="text-red-400 hover:text-red-300 transition p-2 touch-target"
            @click="remove">
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

