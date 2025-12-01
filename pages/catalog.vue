
<template>
  <main class="w-[100vw] px-4 lg:px-8">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 mb-4">
      <h1 class="text-2xl font-semibold">Роллы</h1>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10">Фильтр</button>
        <button class="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10">Сортировка</button>
        <button class="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10">Вид</button>
      </div>
    </div>
    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      <ProductCard v-for="i in 18" :key="i" title="Гринзэй" price="265 ₴" desc="Снежный краб, огурец, сыр, соус унаги." badge="акция" />
    </div>
  </main>
</template>
