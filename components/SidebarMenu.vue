
<script setup lang="ts">
const cats = [
  { name: 'Роллы', icon: '🍣' },
  { name: 'Тёплые роллы', icon: '🔥' },
  { name: 'Суши и Гунканы', icon: '🥢' },
  { name: 'Сеты', icon: '🧩' },
  { name: 'Салаты и Закуски', icon: '🥗' },
  { name: 'Супы', icon: '🥣' },
  { name: 'Шашлычки', icon: '🍢' },
  { name: 'Горячее', icon: '🍱' },
  { name: 'Лапша, Wok & Рис', icon: '🍜' },
  { name: 'Пицца и Бургеры', icon: '🍕' },
  { name: 'Десерты', icon: '🍰' },
  { name: 'Бенто-ланч', icon: '🍱' },
  { name: 'Детское меню', icon: '🐣' },
  { name: 'Напитки', icon: '🥤' },
  { name: 'Соусы', icon: '🥫' },
]
</script>

<template>
  <aside
    class="w-64 shrink-0 border-r border-white/5 bg-card sticky top-16 h-[calc(100dvh-4rem)] overflow-y-auto">
    <div class="p-3 pb-24">
      <div class="text-xs uppercase tracking-wider text-gray-400 mb-2">Меню доставки</div>
      <div class="flex items-center gap-2 mb-3">
        <button class="px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-700 transition text-sm text-white">Категории</button>
        <button class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm">Ингредиенты</button>
      </div>
      <nav class="space-y-1">
        <NuxtLink
          v-for="c in cats" :key="c.name"
          to="/catalog"
          class="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition">
          <span class="text-lg">{{ c.icon }}</span>
          <span class="text-sm text-gray-300 group-hover:text-white">{{ c.name }}</span>
        </NuxtLink>
      </nav>
    </div>
  </aside>
</template>
