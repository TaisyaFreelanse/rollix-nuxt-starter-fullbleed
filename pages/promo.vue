
<template>
  <main class="w-full px-4 lg:px-8">
    <h1 class="text-2xl font-semibold mt-6 mb-6">Новости и акции</h1>
    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      <article v-for="i in 12" :key="i" class="card overflow-hidden">
        <img src="/product.svg" alt="promo" class="w-full h-48 md:h-56 object-cover" />
        <div class="p-4">
          <div class="text-xs text-gray-400">1 октября 2025</div>
          <h3 class="text-white font-semibold mt-1">Согреваемся в Rollix!</h3>
          <p class="text-sm text-gray-400 mt-1">Сезонные горячие напитки и специальные предложения.</p>
        </div>
      </article>
    </div>
    <div class="flex justify-center">
      <button class="mt-8 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10">Загрузить еще</button>
    </div>
  </main>
</template>
