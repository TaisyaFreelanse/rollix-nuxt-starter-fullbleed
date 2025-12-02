
<template>
  <main class="w-full">
    <!-- Content full width -->
    <section class="px-4 sm:px-6 lg:px-8 mt-10">
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
