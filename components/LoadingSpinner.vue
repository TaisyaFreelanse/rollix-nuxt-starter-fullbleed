<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'accent'
})

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12'
}

const colorClasses = {
  accent: 'border-accent',
  white: 'border-white',
  gray: 'border-gray-400'
}
</script>

<template>
  <div
    class="spinner border-4 border-t-transparent rounded-full"
    :class="[sizeClasses[size], colorClasses[color]]"
  />
</template>

