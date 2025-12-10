
<template>
  <main class="w-full px-0">
    <h1 class="text-sm sm:text-base font-semibold mt-2 mb-2 px-3 sm:px-4 lg:px-8">Карта доставки</h1>
    <div id="zones" class="rounded-lg overflow-hidden border border-white/10 mx-3 sm:mx-4 lg:mx-8">
      <div class="h-[40vh] min-h-[240px] bg-gradient-to-tr from-green-700/40 via-yellow-600/30 to-sky-600/30 grid place-items-center">
        <div class="text-center">
          <div class="text-3xl sm:text-4xl">🗺️</div>
          <div class="mt-2 text-gray-200 text-[10px] sm:text-xs">Интерактивная карта зон (Leaflet/Mapbox)</div>
        </div>
      </div>
    </div>
    <div class="grid gap-2 sm:gap-3 md:grid-cols-3 px-3 sm:px-4 lg:px-8 mt-3 sm:mt-4">
      <div class="card p-3 sm:p-4">
        <h3 class="text-white font-semibold mb-1.5 text-xs sm:text-sm">Как сделать заказ</h3>
        <p class="text-gray-400 text-[10px] sm:text-xs">Выберите блюда, добавьте в корзину, укажите адрес и удобное время.</p>
      </div>
      <div class="card p-3 sm:p-4">
        <h3 class="text-white font-semibold mb-1.5 text-xs sm:text-sm">Оплата</h3>
        <p class="text-gray-400 text-[10px] sm:text-xs">Онлайн (СБП/карта) или наличными курьеру. Чеки отправляем на e-mail.</p>
      </div>
      <div class="card p-3 sm:p-4">
        <h3 class="text-white font-semibold mb-1.5 text-xs sm:text-sm">Сроки доставки</h3>
        <p class="text-gray-400 text-[10px] sm:text-xs">Обычно 45–60 минут. В часы пик может добавляться +30–60 минут.</p>
      </div>
    </div>
  </main>
</template>
