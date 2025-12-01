
<script setup lang="ts">
defineProps<{ title: string; price: string; desc?: string; badge?: string; img?: string }>()
</script>

<template>
  <article class="card">
    <div class="relative overflow-hidden">
      <img :src="img || '/product.svg'" alt="" class="w-full h-56 object-cover opacity-95 transition hover:scale-[1.04]"/>
      <div v-if="badge" class="absolute top-3 left-3 badge border-red-500 text-red-300 bg-red-500/10">{{ badge }}</div>
    </div>
    <div class="p-4">
      <h3 class="text-white font-medium">{{ title }}</h3>
      <p v-if="desc" class="text-sm text-gray-400 line-clamp-2 mt-1">{{ desc }}</p>
      <div class="flex items-center justify-between mt-4">
        <div class="text-white font-semibold">{{ price }}</div>
        <div class="qty"><button>-</button><span>0</span><button>+</button></div>
      </div>
    </div>
  </article>
</template>
