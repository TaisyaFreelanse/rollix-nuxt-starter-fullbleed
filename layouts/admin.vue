<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const menuItems = [
  { label: 'Товары', path: '/admin/products', icon: '📦' },
  { label: 'Категории', path: '/admin/categories', icon: '📁' },
  { label: 'Промокоды', path: '/admin/promocodes', icon: '🎟️' },
  { label: 'Баннеры', path: '/admin/banners', icon: '🖼️' },
  { label: 'Зоны доставки', path: '/admin/delivery-zones', icon: '🚚' },
  { label: 'Заказы', path: '/admin/orders', icon: '📋' },
  { label: 'Настройки', path: '/admin/settings', icon: '⚙️' }
]

const isActive = (path: string) => {
  return route.path.startsWith(path)
}

const goToMain = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700">
      <div class="p-6">
        <div class="flex items-center gap-3 mb-8 cursor-pointer" @click="goToMain">
          <img src="/logo.svg" alt="Logo" class="h-10 w-auto" />
          <div>
            <h1 class="text-xl font-bold text-white">Админ-панель</h1>
            <p class="text-xs text-gray-400">Управление контентом</p>
          </div>
        </div>

        <nav class="space-y-2">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
              isActive(item.path)
                ? 'bg-accent text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            ]">
            <span class="text-xl">{{ item.icon }}</span>
            <span class="font-medium">{{ item.label }}</span>
          </NuxtLink>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-64 p-8">
      <slot />
    </main>
  </div>
</template>

