
<script setup lang="ts">
const route = useRoute()
const cartOpen = useState('cartOpen', () => false)

// Проверяем, используется ли админ-лейаут
const isAdminPage = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-bg overflow-x-hidden max-w-full">
    <!-- Основной контент сайта - скрыт на админ-страницах -->
    <template v-if="!isAdminPage">
      <HeaderBar />
      <CartSidebar v-model="cartOpen" />
      <!-- Меню категорий - скрыто на главной странице в мобильной версии (там оно под баннером) -->
      <HorizontalCategoryMenu v-if="route.path !== '/'" />

      <!-- Full-width site grid -->
      <div class="flex-1 w-full pb-20 lg:pb-0">
        <div class="grid lg:grid-cols-[16rem_1fr]">
          <SidebarMenu class="hidden lg:block" />
          <div class="min-w-0">
            <NuxtPage />
          </div>
        </div>
      </div>

      <FooterBar />
      <BottomNavigation />
      <FloatingCartButton />
      <CookieBar />
    </template>
    
    <!-- Админ-страницы рендерятся через свой layout -->
    <NuxtPage v-else />

    <!-- ToastContainer показываем всегда -->
    <ToastContainer />
  </div>
</template>
