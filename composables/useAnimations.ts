/**
 * Composable для управления анимациями
 */
export const useAnimations = () => {
  /**
   * Анимация добавления в корзину
   */
  const animateAddToCart = (element: HTMLElement | null) => {
    if (!element) return

    element.classList.add('add-to-cart-animation')
    setTimeout(() => {
      element.classList.remove('add-to-cart-animation')
    }, 400)
  }

  /**
   * Анимация счетчика корзины
   */
  const animateCartCount = (element: HTMLElement | null) => {
    if (!element) return

    element.classList.add('cart-bounce')
    setTimeout(() => {
      element.classList.remove('cart-bounce')
    }, 300)
  }

  /**
   * Плавное появление элемента
   */
  const fadeIn = (element: HTMLElement | null, direction: 'up' | 'down' | 'left' | 'right' | 'fade' = 'fade') => {
    if (!element) return

    const classes = {
      up: 'fade-in-up',
      down: 'fade-in-down',
      left: 'fade-in-left',
      right: 'fade-in-right',
      fade: 'fade-in'
    }

    element.classList.add(classes[direction])
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        element.classList.remove(classes[direction])
        resolve()
      }, 400)
    })
  }

  /**
   * Плавное исчезновение элемента
   */
  const fadeOut = (element: HTMLElement | null) => {
    if (!element) return Promise.resolve()

    element.classList.add('fade-out')
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        element.classList.remove('fade-out')
        resolve()
      }, 300)
    })
  }

  /**
   * Анимация нажатия кнопки
   */
  const animateButtonPress = (element: HTMLElement | null) => {
    if (!element) return

    element.classList.add('button-press')
    setTimeout(() => {
      element.classList.remove('button-press')
    }, 200)
  }

  /**
   * Показать элемент с анимацией
   */
  const showWithAnimation = async (
    element: HTMLElement | null,
    direction: 'up' | 'down' | 'left' | 'right' | 'fade' = 'fade'
  ) => {
    if (!element) return

    element.style.display = ''
    element.style.opacity = '0'
    await nextTick()
    await fadeIn(element, direction)
  }

  /**
   * Скрыть элемент с анимацией
   */
  const hideWithAnimation = async (element: HTMLElement | null) => {
    if (!element) return

    await fadeOut(element)
    element.style.display = 'none'
  }

  /**
   * Анимация для списка элементов (stagger)
   */
  const animateStagger = (container: HTMLElement | null) => {
    if (!container) return

    const items = container.querySelectorAll('.stagger-item')
    items.forEach((item) => {
      item.classList.add('stagger-item')
    })
  }

  /**
   * Создать skeleton loader
   */
  const createSkeleton = (width?: string, height?: string) => {
    const skeleton = document.createElement('div')
    skeleton.className = 'skeleton'
    if (width) skeleton.style.width = width
    if (height) skeleton.style.height = height || '1rem'
    return skeleton
  }

  /**
   * Анимация загрузки (spinner)
   */
  const showSpinner = (element: HTMLElement | null) => {
    if (!element) return

    element.classList.add('spinner')
  }

  const hideSpinner = (element: HTMLElement | null) => {
    if (!element) return

    element.classList.remove('spinner')
  }

  return {
    animateAddToCart,
    animateCartCount,
    fadeIn,
    fadeOut,
    animateButtonPress,
    showWithAnimation,
    hideWithAnimation,
    animateStagger,
    createSkeleton,
    showSpinner,
    hideSpinner
  }
}

