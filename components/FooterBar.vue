
<template>
  <footer class="hidden lg:block border-t border-white/5 mt-16">
    <div class="w-[100vw] px-4 lg:px-8 py-12 grid md:grid-cols-4 gap-8 text-sm">
      <div>
        <img src="/logo.svg" class="h-10 mb-3" alt="logo"/>
        <p class="text-gray-400 mb-4">Сервис заказа роллов и других блюд. Приём заказов: 10:00–23:30.</p>
        
        <!-- Адрес -->
        <div class="flex items-start gap-2 mb-3">
          <span class="text-gray-400 mt-0.5">📍</span>
          <p class="text-gray-400">
            Камчатский край, Петропавловск-Камчатский,<br />
            Ул Озерновская коса, д11
          </p>
        </div>
        
        <!-- Телефон -->
        <div class="flex items-center gap-2">
          <span class="text-gray-400">📞</span>
          <a href="tel:+74152313121" class="text-gray-400 hover:text-white transition-colors">
            +7 (415) 231-31-21
          </a>
        </div>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-3">Rollix</h4>
        <ul class="space-y-2 text-gray-400">
          <li><NuxtLink to="/promo" class="hover:text-white">Новости и акции</NuxtLink></li>
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
