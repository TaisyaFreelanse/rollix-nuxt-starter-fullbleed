/**
 * Composable для обработки touch-жестов
 */
export const useTouchGestures = () => {
  const touchStart = ref<{ x: number; y: number; time: number } | null>(null)
  const touchEnd = ref<{ x: number; y: number; time: number } | null>(null)

  const minSwipeDistance = 50
  const maxSwipeTime = 300

  /**
   * Обработка начала касания
   */
  const onTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0]
    touchStart.value = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
    touchEnd.value = null
  }

  /**
   * Обработка окончания касания
   */
  const onTouchEnd = (event: TouchEvent) => {
    const touch = event.changedTouches[0]
    touchEnd.value = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
    handleSwipe()
  }

  /**
   * Обработка свайпа
   */
  const handleSwipe = () => {
    if (!touchStart.value || !touchEnd.value) return

    const distanceX = touchEnd.value.x - touchStart.value.x
    const distanceY = touchEnd.value.y - touchStart.value.y
    const timeDiff = touchEnd.value.time - touchStart.value.time

    // Проверяем, что это быстрый жест
    if (timeDiff > maxSwipeTime) return

    // Определяем направление свайпа
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Горизонтальный свайп
      if (Math.abs(distanceX) > minSwipeDistance) {
        if (distanceX > 0) {
          return { direction: 'right', distance: distanceX }
        } else {
          return { direction: 'left', distance: Math.abs(distanceX) }
        }
      }
    } else {
      // Вертикальный свайп
      if (Math.abs(distanceY) > minSwipeDistance) {
        if (distanceY > 0) {
          return { direction: 'down', distance: distanceY }
        } else {
          return { direction: 'up', distance: Math.abs(distanceY) }
        }
      }
    }

    return null
  }

  /**
   * Обработчик свайпа влево
   */
  const onSwipeLeft = (callback: () => void) => {
    const result = handleSwipe()
    if (result?.direction === 'left') {
      callback()
    }
  }

  /**
   * Обработчик свайпа вправо
   */
  const onSwipeRight = (callback: () => void) => {
    const result = handleSwipe()
    if (result?.direction === 'right') {
      callback()
    }
  }

  /**
   * Обработчик свайпа вверх
   */
  const onSwipeUp = (callback: () => void) => {
    const result = handleSwipe()
    if (result?.direction === 'up') {
      callback()
    }
  }

  /**
   * Обработчик свайпа вниз
   */
  const onSwipeDown = (callback: () => void) => {
    const result = handleSwipe()
    if (result?.direction === 'down') {
      callback()
    }
  }

  /**
   * Привязка обработчиков к элементу
   */
  const bindTouchHandlers = (element: HTMLElement | null, callbacks: {
    onSwipeLeft?: () => void
    onSwipeRight?: () => void
    onSwipeUp?: () => void
    onSwipeDown?: () => void
  }) => {
    if (!element) return

    element.addEventListener('touchstart', onTouchStart, { passive: true })
    element.addEventListener('touchend', (e) => {
      onTouchEnd(e)
      const result = handleSwipe()
      if (result) {
        switch (result.direction) {
          case 'left':
            callbacks.onSwipeLeft?.()
            break
          case 'right':
            callbacks.onSwipeRight?.()
            break
          case 'up':
            callbacks.onSwipeUp?.()
            break
          case 'down':
            callbacks.onSwipeDown?.()
            break
        }
      }
    }, { passive: true })

    return () => {
      element.removeEventListener('touchstart', onTouchStart)
      element.removeEventListener('touchend', onTouchEnd)
    }
  }

  return {
    onTouchStart,
    onTouchEnd,
    handleSwipe,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    bindTouchHandlers
  }
}

