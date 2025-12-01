import { defineStore } from 'pinia'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[]
  }),

  actions: {
    show(message: string, type: ToastType = 'info', duration: number = 3000) {
      const id = `toast-${Date.now()}-${Math.random()}`
      const toast: Toast = { id, message, type, duration }

      this.toasts.push(toast)

      // Автоматическое удаление
      if (duration > 0) {
        setTimeout(() => {
          this.remove(id)
        }, duration)
      }

      return id
    },

    success(message: string, duration?: number) {
      return this.show(message, 'success', duration)
    },

    error(message: string, duration?: number) {
      return this.show(message, 'error', duration)
    },

    warning(message: string, duration?: number) {
      return this.show(message, 'warning', duration)
    },

    info(message: string, duration?: number) {
      return this.show(message, 'info', duration)
    },

    remove(id: string) {
      const index = this.toasts.findIndex((t) => t.id === id)
      if (index > -1) {
        this.toasts.splice(index, 1)
      }
    },

    clear() {
      this.toasts = []
    }
  }
})

