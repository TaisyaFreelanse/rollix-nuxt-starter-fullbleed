<script setup lang="ts">
// Состояние видимости баннера - изначально false, устанавливается при монтировании
const isVisible = ref(false)

// Проверяем, было ли уже принято согласие при монтировании компонента
onMounted(() => {
  if (process.client) {
    // Читаем значение из localStorage
    const accepted = localStorage.getItem('cookie-consent')
    
    // Показываем баннер ТОЛЬКО если согласие еще не было дано
    // Если accepted !== 'true', значит согласие не было дано - показываем баннер
    // Баннер останется видимым до тех пор, пока пользователь не нажмет кнопку "Согласен"
    if (accepted !== 'true') {
      isVisible.value = true
    } else {
      // Согласие уже было дано ранее - скрываем баннер
      isVisible.value = false
    }
  }
})

// Обработчик нажатия на кнопку "Согласен"
// Это ЕДИНСТВЕННЫЙ способ скрыть баннер - только через явное нажатие кнопки
const acceptCookies = () => {
  if (process.client) {
    // Сохраняем согласие в localStorage
    localStorage.setItem('cookie-consent', 'true')
    // Скрываем баннер ТОЛЬКО после нажатия кнопки
    isVisible.value = false
  }
}
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="isVisible"
      class="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur border-t border-white/10 p-4 md:p-3">
      <div class="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-xs md:text-sm max-w-7xl mx-auto">
        <span class="text-gray-300 text-center">Продолжая пользоваться сайтом, вы соглашаетесь с политикой и cookie.</span>
        <button
          class="px-6 py-2.5 md:px-4 md:py-2 rounded-lg bg-accent hover:bg-accent-700 text-white font-medium transition cursor-pointer whitespace-nowrap"
          @click="acceptCookies">
          Согласен
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
