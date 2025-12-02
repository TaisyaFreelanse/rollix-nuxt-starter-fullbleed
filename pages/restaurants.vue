<script setup lang="ts">
// Московские рестораны с реальными улицами
const restaurants = [
  { id: 1, name: 'Уасаби на Арбате', address: 'ул. Арбат, 24', metro: 'Арбатская' },
  { id: 2, name: 'Уасаби Патриаршие', address: 'Патриарший пер., 8', metro: 'Маяковская' },
  { id: 3, name: 'Уасаби Тверская', address: 'Тверская ул., 15', metro: 'Тверская' },
  { id: 4, name: 'Уасаби Китай-Город', address: 'ул. Маросейка, 12', metro: 'Китай-город' },
  { id: 5, name: 'Уасаби Белорусская', address: 'ул. Лесная, 5', metro: 'Белорусская' },
  { id: 6, name: 'Уасаби Курская', address: 'Садовая-Черногрязская ул., 3Б', metro: 'Курская' },
  { id: 7, name: 'Уасаби Павелецкая', address: 'Дубининская ул., 71', metro: 'Павелецкая' },
  { id: 8, name: 'Уасаби Пушкинская', address: 'Страстной бульвар, 4', metro: 'Пушкинская' },
  { id: 9, name: 'Уасаби Сокол', address: 'Ленинградский пр-т, 74', metro: 'Сокол' },
  { id: 10, name: 'Уасаби Таганская', address: 'ул. Таганская, 31/22', metro: 'Таганская' },
  { id: 11, name: 'Уасаби ВДНХ', address: 'пр-т Мира, 119', metro: 'ВДНХ' },
  { id: 12, name: 'Уасаби Новослободская', address: 'Новослободская ул., 16', metro: 'Новослободская' },
  { id: 13, name: 'Уасаби Октябрьская', address: 'Ленинский пр-т, 6', metro: 'Октябрьская' },
  { id: 14, name: 'Уасаби Парк Культуры', address: 'Комсомольский пр-т, 15', metro: 'Парк Культуры' },
  { id: 15, name: 'Уасаби Баррикадная', address: 'Кудринская пл., 1', metro: 'Баррикадная' },
  { id: 16, name: 'Уасаби Добрынинская', address: 'Люсиновская ул., 36', metro: 'Добрынинская' },
  { id: 17, name: 'Уасаби Чистые пруды', address: 'Чистопрудный бульвар, 12', metro: 'Чистые пруды' },
  { id: 18, name: 'Уасаби Красные ворота', address: 'Садовая-Спасская ул., 19', metro: 'Красные Ворота' }
]

const selectedCity = ref('Москва')
const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Нижний Новгород']
</script>

<template>
  <main class="w-full px-4 lg:px-8 pb-8">
    <h1 class="text-2xl font-semibold mt-6 mb-4">Рестораны</h1>
    <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
      <select v-model="selectedCity" class="px-3 py-2 rounded-lg bg-white/5 border border-white/10 max-w-xs text-white">
        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
      </select>
      <div class="flex flex-wrap gap-2">
        <button class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm">Открыты сейчас</button>
        <button class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm">Детская комната</button>
        <button class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm">Летняя веранда</button>
        <button class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm">Парковка</button>
      </div>
    </div>
    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="card p-4 hover:border-white/20 transition">
        <h3 class="text-white font-semibold mb-1">{{ restaurant.name }}</h3>
        <p class="text-gray-400 text-sm">{{ restaurant.address }}, Москва</p>
        <p class="text-gray-500 text-xs mt-1">м. {{ restaurant.metro }}</p>
        <div class="mt-3 text-sm text-gray-300">Пн-Вс 10:00–23:00</div>
        <div class="mt-4">
          <button class="px-3 py-1.5 rounded bg-accent hover:bg-accent-700 text-white text-sm transition">
            На карте
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
