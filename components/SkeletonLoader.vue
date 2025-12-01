<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  rounded?: boolean
  count?: number
}

withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '1rem',
  rounded: false,
  count: 1
})
</script>

<template>
  <div class="skeleton-container">
    <div
      v-for="i in count"
      :key="i"
      class="skeleton"
      :class="{ 'rounded-full': rounded }"
      :style="{ width, height }"
    />
  </div>
</template>

<style scoped>
.skeleton-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>

