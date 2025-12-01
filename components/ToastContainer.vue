<script setup lang="ts">
import { useToastStore } from '~/stores/toast'

const toastStore = useToastStore()

const getToastIcon = (type: string) => {
  switch (type) {
    case 'success':
      return '✓'
    case 'error':
      return '✕'
    case 'warning':
      return '⚠'
    case 'info':
      return 'ℹ'
    default:
      return '•'
  }
}

const getToastColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-500/20 border-green-500/50 text-green-300'
    case 'error':
      return 'bg-red-500/20 border-red-500/50 text-red-300'
    case 'warning':
      return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300'
    case 'info':
      return 'bg-blue-500/20 border-blue-500/50 text-blue-300'
    default:
      return 'bg-white/10 border-white/20 text-white'
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <TransitionGroup name="toast" tag="div">
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          :class="[
            'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm shadow-lg min-w-[300px] max-w-md',
            getToastColor(toast.type)
          ]">
          <div
            :class="[
              'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold',
              toast.type === 'success'
                ? 'bg-green-500'
                : toast.type === 'error'
                  ? 'bg-red-500'
                  : toast.type === 'warning'
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
            ]">
            {{ getToastIcon(toast.type) }}
          </div>
          <div class="flex-1 text-sm">{{ toast.message }}</div>
          <button
            class="flex-shrink-0 text-current opacity-70 hover:opacity-100 transition"
            @click="toastStore.remove(toast.id)">
            ✕
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.2s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>

