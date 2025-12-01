
<script setup lang="ts">
const mobileOpen = useState('mobileOpen', () => false)
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-bg">
    <HeaderBar />
    <MobileSidebar v-model="mobileOpen" />

    <!-- Full-width site grid -->
    <div class="flex-1 w-[100vw]">
      <div class="grid lg:grid-cols-[16rem_1fr]">
        <SidebarMenu class="hidden lg:block" />
        <div class="min-w-0">
          <NuxtPage />
        </div>
      </div>
    </div>

    <FooterBar />
    <CookieBar />
    <ChatButton />
    <ToastContainer />
  </div>
</template>
