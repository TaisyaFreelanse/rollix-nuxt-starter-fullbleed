export default defineNuxtPlugin(() => {
  const cartStore = useCartStore()

  // Загружаем корзину из localStorage при инициализации
  if (process.client) {
    const saved = localStorage.getItem('cart')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        cartStore.$patch(data)
      } catch (e) {
        console.error('Ошибка загрузки корзины из localStorage', e)
      }
    }

    // Сохраняем корзину в localStorage при изменениях
    cartStore.$subscribe((mutation, state) => {
      localStorage.setItem('cart', JSON.stringify({
        items: state.items,
        promoCode: state.promoCode,
        promoCodeInput: state.promoCodeInput
      }))
    })
  }
})

