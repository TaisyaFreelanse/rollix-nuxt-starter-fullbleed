
<template>
  <main class="w-[100vw] px-0">
    <h1 class="text-2xl font-semibold mt-6 mb-4 px-4 lg:px-8">Карта доставки</h1>
    <div id="zones" class="rounded-2xl overflow-hidden border border-white/10 mx-4 lg:mx-8">
      <div class="h-[50vh] min-h-[360px] bg-gradient-to-tr from-green-700/40 via-yellow-600/30 to-sky-600/30 grid place-items-center">
        <div class="text-center">
          <div class="text-5xl">🗺️</div>
          <div class="mt-3 text-gray-200">Интерактивная карта зон (Leaflet/Mapbox)</div>
        </div>
      </div>
    </div>
    <div class="grid gap-4 md:grid-cols-3 px-4 lg:px-8 mt-8">
      <div class="card p-5">
        <h3 class="text-white font-semibold mb-2">Как сделать заказ</h3>
        <p class="text-gray-400 text-sm">Выберите блюда, добавьте в корзину, укажите адрес и удобное время.</p>
      </div>
      <div class="card p-5">
        <h3 class="text-white font-semibold mb-2">Оплата</h3>
        <p class="text-gray-400 text-sm">Онлайн (СБП/карта) или наличными курьеру. Чеки отправляем на e-mail.</p>
      </div>
      <div class="card p-5">
        <h3 class="text-white font-semibold mb-2">Сроки доставки</h3>
        <p class="text-gray-400 text-sm">Обычно 45–60 минут. В часы пик может добавляться +30–60 минут.</p>
      </div>
    </div>
  </main>
</template>
