
<script setup lang="ts">
const mobileOpen = useState('mobileOpen', () => false)
const cartOpen = useState('cartOpen', () => false)
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-bg">
    <HeaderBar />
    <MobileSidebar v-model="mobileOpen" />
    <CartSidebar v-model="cartOpen" />

    <!-- Full-width site grid -->
    <div class="flex-1 w-[100vw] pb-20 lg:pb-0">
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
    <ToastContainer />
  </div>
</template>
