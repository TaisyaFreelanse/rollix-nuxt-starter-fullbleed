
<template>
  <main class="w-[100vw]">
    <!-- FULL BLEED HERO -->
    <section class="relative w-[100vw]">
      <div class="relative">
        <div class="h-[50vh] min-h-[380px] bg-[url('/product.svg')] bg-cover bg-center opacity-80"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
        <div class="absolute inset-0 flex items-center">
          <div class="w-full px-4 lg:px-8">
            <div class="ml-0 lg:ml-64">
              <div class="text-center lg:text-left max-w-3xl">
                <h1 class="text-3xl md:text-5xl font-semibold mb-3">Согреваемся в Rollix!</h1>
                <p class="text-gray-300 mb-6 text-base md:text-lg">Сезонные горячие напитки и лучшие роллы</p>
                <NuxtLink to="/catalog" class="px-5 py-3 rounded-xl bg-accent hover:bg-accent-700 text-white inline-flex items-center gap-2">
                  Перейти в меню →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content full width -->
    <section class="px-4 lg:px-8 mt-10">
      <h2 class="text-xl md:text-2xl font-semibold mb-4">Популярное</h2>
      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <ProductCard v-for="i in 12" :key="i"
          title="Филадельфия Прайм" price="299 ₴"
          desc="Лосось, сыр, авокадо, рис, нори. Соус унаги."
          badge="hit"
        />
      </div>
    </section>
  </main>
</template>
