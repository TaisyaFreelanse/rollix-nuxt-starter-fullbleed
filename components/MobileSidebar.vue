
<script setup lang="ts">
const model = defineModel<boolean>({ required: true })
const cats = [
  { name: 'Роллы', icon: '🍣' }, { name: 'Тёплые роллы', icon: '🔥' },
  { name: 'Суши и Гунканы', icon: '🥢' }, { name: 'Сеты', icon: '🧩' },
  { name: 'Салаты и Закуски', icon: '🥗' }, { name: 'Супы', icon: '🥣' },
  { name: 'Шашлычки', icon: '🍢' }, { name: 'Горячее', icon: '🍱' },
  { name: 'Лапша, Wok & Рис', icon: '🍜' }, { name: 'Пицца и Бургеры', icon: '🍕' },
  { name: 'Десерты', icon: '🍰' }, { name: 'Бенто-ланч', icon: '🍱' },
  { name: 'Детское меню', icon: '🐣' }, { name: 'Напитки', icon: '🥤' }, { name: 'Соусы', icon: '🥫' },
]
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="model" class="fixed inset-0 z-[60] bg-black/60" @click="model=false"></div>
    </transition>
    <transition name="slide">
      <aside v-if="model" class="fixed z-[70] inset-y-0 left-0 w-80 bg-card border-r border-white/10 p-4 overflow-y-auto">
        <div class="flex items-center justify-between mb-3">
          <div class="text-sm text-gray-400 uppercase">Меню доставки</div>
          <button class="px-3 py-1.5 rounded bg-white/10 hover:bg-white/15" @click="model=false">Закрыть</button>
        </div>
        <nav class="space-y-1">
          <NuxtLink v-for="c in cats" :key="c.name" to="/catalog"
            class="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition"
            @click="model=false">
            <span class="text-lg">{{ c.icon }}</span>
            <span class="text-sm text-gray-300 group-hover:text-white">{{ c.name }}</span>
          </NuxtLink>
        </nav>
      </aside>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:opacity .2s ease}
.fade-enter-from,.fade-leave-to{opacity:0}
.slide-enter-active,.slide-leave-active{transition:transform .2s ease}
.slide-enter-from,.slide-leave-to{transform:translateX(-100%)}
</style>
