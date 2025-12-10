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
  <div v-if="item && item.product" class="flex gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-card rounded-lg border border-white/5">
    <!-- Изображение -->
    <div class="flex-shrink-0">
      <img
        :src="item.product.image || '/product.svg'"
        :alt="item.product.name"
        class="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg" />
    </div>

    <!-- Информация -->
    <div class="flex-1 min-w-0">
      <h3 class="text-white text-[10px] sm:text-xs font-medium mb-0.5">{{ item.product.name }}</h3>
      <p v-if="getModifierText()" class="text-[9px] text-gray-400 mb-1">
        {{ getModifierText() }}
      </p>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <button
            class="w-6 h-6 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 transition text-[10px]"
            @click="decrement">
            −
          </button>
          <span class="text-white text-[10px] font-medium w-5 text-center">{{ item.quantity }}</span>
          <button
            class="w-6 h-6 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 transition text-[10px]"
            @click="increment">
            +
          </button>
        </div>
        <div class="flex items-center gap-1.5 sm:gap-2">
          <div class="text-white text-[10px] sm:text-xs font-semibold">{{ Math.round(item.price * item.quantity).toLocaleString('ru-RU') }} Р</div>
          <button
            class="text-red-400 hover:text-red-300 transition p-0.5 text-[10px]"
            @click="remove">
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

