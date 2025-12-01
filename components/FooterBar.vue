
<template>
  <footer class="border-t border-white/5 mt-16">
    <div class="w-[100vw] px-4 lg:px-8 py-12 grid md:grid-cols-4 gap-8 text-sm">
      <div>
        <img src="/logo.svg" class="h-7 mb-3" alt="logo"/>
        <p class="text-gray-400">Сервис заказа роллов и других блюд. Приём заказов: 10:00–23:30.</p>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-3">Rollix</h4>
        <ul class="space-y-2 text-gray-400">
          <li><NuxtLink to="/promo" class="hover:text-white">Новости и акции</NuxtLink></li>
          <li><NuxtLink to="/restaurants" class="hover:text-white">Меню ресторанов</NuxtLink></li>
          <li><a href="#" class="hover:text-white">Обратная связь</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-3">Доставка</h4>
        <ul class="space-y-2 text-gray-400">
          <li><NuxtLink to="/delivery" class="hover:text-white">Условия доставки</NuxtLink></li>
          <li><NuxtLink to="/delivery#zones" class="hover:text-white">Карта зон</NuxtLink></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-3">Юридическая информация</h4>
        <ul class="space-y-2 text-gray-400">
          <li><a href="#" class="hover:text-white">Политика конфиденциальности</a></li>
          <li><a href="#" class="hover:text-white">Пользовательское соглашение</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>
