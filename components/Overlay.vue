<script setup lang="ts">
interface Props {
  show: boolean
  blur?: boolean
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  blur: true,
  zIndex: 40
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <Transition
    enter="duration-200 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-150 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0">
    <div
      v-if="show"
      :class="[
        'fixed inset-0 bg-black/60 transition-opacity',
        blur ? 'backdrop-blur-sm' : ''
      ]"
      :style="{ zIndex }"
      @click="handleClick" />
  </Transition>
</template>

