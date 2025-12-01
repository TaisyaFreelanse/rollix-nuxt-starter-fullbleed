import { useToastStore } from '~/stores/toast'

export const useToast = () => {
  const toastStore = useToastStore()

  return {
    success: (message: string, duration?: number) => toastStore.success(message, duration),
    error: (message: string, duration?: number) => toastStore.error(message, duration),
    warning: (message: string, duration?: number) => toastStore.warning(message, duration),
    info: (message: string, duration?: number) => toastStore.info(message, duration),
    show: (message: string, type?: 'success' | 'error' | 'warning' | 'info', duration?: number) =>
      toastStore.show(message, type, duration)
  }
}

