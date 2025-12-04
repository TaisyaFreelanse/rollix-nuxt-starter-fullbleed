<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'

interface Props {
  open: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closeOnOverlay: true
})

const emit = defineEmits<{
  close: []
}>()

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-4'
}

const closeButtonRef = ref<HTMLButtonElement | null>(null)

const close = () => {
  emit('close')
}
</script>

<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" class="relative z-[9999]" :initial-focus="closeButtonRef" @close="closeOnOverlay ? close() : undefined">
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
              :class="[
                'w-full transform overflow-hidden rounded-2xl bg-card border border-white/10 shadow-xl transition-all relative',
                sizeClasses[size]
              ]">
              <!-- Кнопка закрытия всегда видна -->
              <button
                ref="closeButtonRef"
                type="button"
                class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition text-gray-400 hover:text-white"
                @click="close">
                ✕
              </button>
              
              <div v-if="title || $slots.header" class="flex items-center justify-between p-6 border-b border-white/10 pr-14">
                <DialogTitle v-if="title" class="text-xl font-semibold text-white">
                  {{ title }}
                </DialogTitle>
                <slot name="header" />
              </div>

              <div class="p-6">
                <slot />
              </div>

              <div v-if="$slots.footer" class="p-6 border-t border-white/10">
                <slot name="footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
