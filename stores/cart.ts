import { defineStore } from 'pinia'
import type { Product, ProductModifier } from '~/composables/useCatalog'

export interface CartItemModifier {
  modifierId: string
  optionIds: string[]
}

export interface CartItem {
  id: string // Уникальный ID элемента корзины
  product: Product
  quantity: number
  selectedModifiers: CartItemModifier[]
  price: number // Итоговая цена с учетом модификаторов
}

export interface PromoCode {
  code: string
  discountType: 'PERCENT' | 'FIXED'
  discountValue: number
  minOrderAmount: number
  maxDiscount?: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    promoCode: null as PromoCode | null,
    promoCodeInput: '' as string
  }),

  getters: {
    totalItems: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },

    subtotal: (state) => {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },

    discount: (state) => {
      if (!state.promoCode) return 0

      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

      if (subtotal < state.promoCode.minOrderAmount) return 0

      let discount = 0
      if (state.promoCode.discountType === 'PERCENT') {
        discount = (subtotal * state.promoCode.discountValue) / 100
        if (state.promoCode.maxDiscount) {
          discount = Math.min(discount, state.promoCode.maxDiscount)
        }
      } else {
        discount = state.promoCode.discountValue
      }

      return discount
    },

    total: (state) => {
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const discount = state.promoCode
        ? state.promoCode.discountType === 'PERCENT'
          ? Math.min(
              (subtotal * state.promoCode.discountValue) / 100,
              state.promoCode.maxDiscount || Infinity
            )
          : state.promoCode.discountValue
        : 0

      const finalSubtotal = subtotal >= (state.promoCode?.minOrderAmount || 0) ? subtotal : subtotal
      return Math.max(0, finalSubtotal - discount)
    },

    isEmpty: (state) => state.items.length === 0
  },

  actions: {
    addItem(product: Product, quantity: number = 1, selectedModifiers: CartItemModifier[] = []) {
      // Вычисляем итоговую цену с учетом модификаторов
      let itemPrice = product.price

      selectedModifiers.forEach((modifier) => {
        modifier.optionIds.forEach((optionId) => {
          product.modifiers.forEach((mod) => {
            const option = mod.options.find((opt) => opt.id === optionId)
            if (option) {
              itemPrice += option.price
            }
          })
        })
      })

      // Проверяем, есть ли уже такой же товар с такими же модификаторами
      const existingItemIndex = this.items.findIndex((item) => {
        if (item.product.id !== product.id) return false
        if (item.selectedModifiers.length !== selectedModifiers.length) return false

        const itemModifiers = JSON.stringify(
          item.selectedModifiers.sort((a, b) => a.modifierId.localeCompare(b.modifierId))
        )
        const newModifiers = JSON.stringify(
          selectedModifiers.sort((a, b) => a.modifierId.localeCompare(b.modifierId))
        )

        return itemModifiers === newModifiers
      })

      if (existingItemIndex > -1) {
        // Увеличиваем количество существующего элемента
        this.items[existingItemIndex].quantity += quantity
      } else {
        // Создаем новый элемент
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}-${Math.random()}`,
          product,
          quantity,
          selectedModifiers,
          price: itemPrice
        }
        this.items.push(newItem)
      }
    },

    removeItem(itemId: string) {
      const index = this.items.findIndex((item) => item.id === itemId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },

    updateQuantity(itemId: string, quantity: number) {
      const item = this.items.find((item) => item.id === itemId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(itemId)
        } else {
          item.quantity = quantity
        }
      }
    },

    clear() {
      this.items = []
      this.promoCode = null
      this.promoCodeInput = ''
    },

    async applyPromoCode(code: string) {
      try {
        const promoCode = await $fetch<PromoCode>(`/api/promo-codes/${code}`)
        this.promoCode = promoCode
        this.promoCodeInput = code
        return { success: true, promoCode }
      } catch (error: any) {
        this.promoCode = null
        this.promoCodeInput = ''
        return {
          success: false,
          error: error?.data?.message || 'Промокод не найден или недействителен'
        }
      }
    },

    removePromoCode() {
      this.promoCode = null
      this.promoCodeInput = ''
    }
  },

})

