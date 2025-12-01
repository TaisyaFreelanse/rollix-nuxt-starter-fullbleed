<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import type { Product } from '~/composables/useCatalog'

interface Props {
  product: Product
  open: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const quantity = ref(1)
const selectedModifiers = ref<Record<string, string[]>>({})

// Сброс состояния при открытии модального окна
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      quantity.value = 1
      initModifiers()
    }
  }
)

// Инициализация модификаторов
const initModifiers = () => {
  if (props.product && props.product.modifiers) {
    selectedModifiers.value = {}
    props.product.modifiers.forEach((modifier) => {
      if (modifier.isRequired) {
        const defaultOption = modifier.options.find((opt) => opt.isDefault) || modifier.options[0]
        if (defaultOption) {
          selectedModifiers.value[modifier.id] = [defaultOption.id]
        }
      } else {
        selectedModifiers.value[modifier.id] = []
      }
    })
  }
}

watch(() => props.product, initModifiers, { immediate: true })

const totalPrice = computed(() => {
  if (!props.product) return 0
  let basePrice = Number(props.product.price) * quantity.value

  Object.values(selectedModifiers.value).forEach((optionIds) => {
    optionIds.forEach((optionId) => {
      props.product?.modifiers?.forEach((modifier) => {
        const option = modifier.options.find((opt) => opt.id === optionId)
        if (option) {
          basePrice += Number(option.price) * quantity.value
        }
      })
    })
  })

  return basePrice
})

const toggleModifierOption = (modifierId: string, optionId: string) => {
  if (!selectedModifiers.value[modifierId]) {
    selectedModifiers.value[modifierId] = []
  }

  const modifier = props.product.modifiers.find((m) => m.id === modifierId)
  if (!modifier) return

  if (modifier.isMultiple) {
    const index = selectedModifiers.value[modifierId].indexOf(optionId)
    if (index > -1) {
      selectedModifiers.value[modifierId].splice(index, 1)
    } else {
      selectedModifiers.value[modifierId].push(optionId)
    }
  } else {
    selectedModifiers.value[modifierId] = [optionId]
  }
}

const isOptionSelected = (modifierId: string, optionId: string) => {
  return selectedModifiers.value[modifierId]?.includes(optionId) || false
}

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const cartStore = useCartStore()
const toast = useToast()

const addToCart = () => {
  if (!props.product) return

  // Преобразуем selectedModifiers в формат для корзины
  const cartModifiers: Array<{ modifierId: string; optionIds: string[] }> = []
  Object.entries(selectedModifiers.value).forEach(([modifierId, optionIds]) => {
    if (optionIds.length > 0) {
      cartModifiers.push({ modifierId, optionIds })
    }
  })

  cartStore.addItem(props.product, quantity.value, cartModifiers)
  toast.success(`${props.product.name} добавлен в корзину`)
  emit('close')
}

const closeButtonRef = ref<HTMLButtonElement | null>(null)

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" class="relative z-[100]" :initial-focus="closeButtonRef" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-card border border-white/10 shadow-xl">
              <!-- Закрыть -->
              <button
                ref="closeButtonRef"
                type="button"
                class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition text-gray-400 hover:text-white"
                @click="closeModal">
                ✕
              </button>

              <div class="flex flex-col md:flex-row max-h-[90vh] overflow-hidden">
                <!-- Изображение -->
                <div class="md:w-1/2 bg-gray-900 flex items-center justify-center p-4 md:p-8">
                  <img
                    :src="product?.image || '/product.svg'"
                    :alt="product?.name || ''"
                    class="max-w-full max-h-48 md:max-h-64 object-cover rounded-lg" />
                </div>

                <!-- Контент -->
                <div class="md:w-1/2 flex flex-col overflow-y-auto p-4 md:p-6">
                  <DialogTitle class="text-2xl font-semibold text-white mb-2">
                    {{ product?.name }}
                  </DialogTitle>

                  <p v-if="product?.description" class="text-gray-400 mb-4">
                    {{ product.description }}
                  </p>

                  <div class="flex items-center gap-4 mb-6 text-sm text-gray-400">
                    <span v-if="product?.weight">{{ product.weight }}г</span>
                    <span v-if="product?.calories">{{ product.calories }} ккал</span>
                  </div>

                  <!-- Модификаторы -->
                  <div v-if="product?.modifiers && product.modifiers.length > 0" class="space-y-4 mb-6">
                    <div
                      v-for="modifier in product.modifiers"
                      :key="modifier.id"
                      class="space-y-2">
                      <div class="flex items-center justify-between">
                        <label class="text-white font-medium">
                          {{ modifier.name }}
                          <span v-if="modifier.isRequired" class="text-red-400">*</span>
                        </label>
                        <span v-if="modifier.price > 0" class="text-sm text-gray-400">
                          +{{ modifier.price }} ₽
                        </span>
                      </div>
                      <div class="space-y-2">
                        <button
                          v-for="option in modifier.options"
                          :key="option.id"
                          type="button"
                          :class="[
                            'w-full text-left px-4 py-2 rounded-lg border transition',
                            isOptionSelected(modifier.id, option.id)
                              ? 'border-accent bg-accent/20 text-white'
                              : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                          ]"
                          @click="toggleModifierOption(modifier.id, option.id)">
                          <div class="flex items-center justify-between">
                            <span>{{ option.name }}</span>
                            <span v-if="option.price > 0" class="text-sm">
                              +{{ option.price }} ₽
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Количество и цена -->
                  <div class="mt-auto pt-6 border-t border-white/10">
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center gap-3">
                        <span class="text-gray-400">Количество:</span>
                        <div class="flex items-center gap-2 border border-white/10 rounded-lg">
                          <button
                            type="button"
                            class="px-3 py-1 hover:bg-white/10 transition"
                            @click="decrementQuantity">
                            −
                          </button>
                          <span class="px-4 py-1 text-white font-medium">{{ quantity }}</span>
                          <button
                            type="button"
                            class="px-3 py-1 hover:bg-white/10 transition"
                            @click="incrementQuantity">
                            +
                          </button>
                        </div>
                      </div>
                      <div class="text-2xl font-semibold text-white">
                        {{ totalPrice.toFixed(2) }} ₽
                      </div>
                    </div>

                    <button
                      type="button"
                      class="w-full py-3 bg-accent hover:bg-accent-700 rounded-lg text-white font-medium transition"
                      @click="addToCart">
                      Добавить в корзину
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
