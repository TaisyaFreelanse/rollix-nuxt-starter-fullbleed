<script setup lang="ts">
interface Props {
  code?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: '3101',
  description: 'Специальное предложение'
})
</script>

<template>
  <article class="card overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
    <div class="p-6 flex items-center justify-between">
      <div class="flex-1">
        <div class="text-sm text-gray-400 mb-1">Промокод</div>
        <h3 class="text-white font-semibold text-xl mb-2">{{ props.description }}</h3>
      </div>
      <div class="flex-shrink-0 ml-4">
        <div class="bg-accent text-white font-bold text-2xl px-6 py-4 rounded-lg text-center min-w-[100px]">
          {{ props.code }}
        </div>
      </div>
    </div>
  </article>
</template>
