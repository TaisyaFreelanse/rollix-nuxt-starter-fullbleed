<script setup lang="ts">
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/vue'

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

const close = () => {
  emit('close')
}
</script>

<template>
  <Transition appear :show="open">
    <Dialog as="div" class="relative z-50" @close="closeOnOverlay ? close : undefined">
      <TransitionChild
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
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              :class="[
                'w-full transform overflow-hidden rounded-2xl bg-card border border-white/10 shadow-xl transition-all',
                sizeClasses[size]
              ]">
              <div v-if="title || $slots.header" class="flex items-center justify-between p-6 border-b border-white/10">
                <DialogTitle v-if="title" class="text-xl font-semibold">
                  {{ title }}
                </DialogTitle>
                <slot name="header" />
                <button
                  class="p-2 rounded-full bg-white/5 hover:bg-white/10 transition text-gray-400 hover:text-white"
                  @click="close">
                  ✕
                </button>
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
  </Transition>
</template>

