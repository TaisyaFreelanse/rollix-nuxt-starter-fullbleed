
<template>
  <main class="w-[100vw] px-4 lg:px-8">
    <h1 class="text-2xl font-semibold mt-6 mb-4">Рестораны</h1>
    <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
      <select class="px-3 py-2 rounded-lg bg-white/5 max-w-xs">
        <option>Киев и область</option><option>Львов</option><option>Одесса</option>
      </select>
      <div class="flex flex-wrap gap-2">
        <button class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10">Открыты сейчас</button>
        <button class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10">Детская комната</button>
        <button class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10">Летняя веранда</button>
        <button class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10">Парковка</button>
      </div>
    </div>
    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      <div v-for="i in 18" :key="i" class="card p-4">
        <h3 class="text-white font-semibold mb-1">Ресторан №{{ i }}</h3>
        <p class="text-gray-400 text-sm">ул. Вкусная, {{ 10 + i }}, Киев</p>
        <div class="mt-3 text-sm text-gray-300">Пн-Вс 10:00–23:30</div>
        <div class="mt-4"><button class="px-3 py-1.5 rounded bg-accent hover:bg-accent-700 text-white">На карте</button></div>
      </div>
    </div>
  </main>
</template>
