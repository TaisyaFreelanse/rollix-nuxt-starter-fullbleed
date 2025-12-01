
<script setup lang="ts">
const mobileOpen = useState('mobileOpen', () => false)
</script>

<template>
  <header class="sticky top-0 z-50 bg-[#121315]/90 backdrop-blur border-b border-white/5">
    <div class="w-[100vw] px-4 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button class="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10" @click="mobileOpen=true">☰</button>
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/logo.svg" class="h-7" alt="logo" />
        </NuxtLink>
      </div>
      <nav class="hidden md:flex items-center gap-2">
        <NuxtLink to="/promo" class="px-4 py-2 rounded-lg hover:bg-white/5 transition" exact-active-class="text-white">Акции</NuxtLink>
        <NuxtLink to="/restaurants" class="px-4 py-2 rounded-lg hover:bg-white/5 transition" exact-active-class="text-white">Рестораны</NuxtLink>
        <NuxtLink to="/delivery" class="px-4 py-2 rounded-lg hover:bg-white/5 transition" exact-active-class="text-white">О доставке</NuxtLink>
      </nav>
      <div class="flex items-center gap-3">
        <button class="hidden md:inline px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm">Киев</button>
        <NuxtLink to="/cart" class="relative px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm">
          Корзина
          <span class="absolute -top-2 -right-2 text-xs bg-accent rounded-full px-1.5">0</span>
        </NuxtLink>
        <button class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm">Войти</button>
      </div>
    </div>
  </header>
</template>
