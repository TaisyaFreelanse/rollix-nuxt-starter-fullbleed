<script setup lang="ts">
const auth = useAuth()
const addresses = ref<any[]>([])
const loading = ref(false)
const showAddForm = ref(false)
const editingAddress = ref<any>(null)

const form = ref({
  street: '',
  house: '',
  apartment: '',
  entrance: '',
  floor: '',
  intercom: '',
  comment: '',
  isDefault: false
})

const fetchAddresses = async () => {
  loading.value = true
  try {
    addresses.value = await auth.$fetchWithAuth('/api/profile/addresses')
  } catch (error: any) {
    console.error('Ошибка загрузки адресов', error)
    if (error?.statusCode === 401) {
      alert('Требуется авторизация')
    }
  } finally {
    loading.value = false
  }
}

const saveAddress = async () => {
  if (!form.value.street || !form.value.house) {
    alert('Заполните обязательные поля (улица и дом)')
    return
  }

  try {
    if (editingAddress.value) {
      await auth.$fetchWithAuth(`/api/profile/addresses/${editingAddress.value.id}`, {
        method: 'PUT',
        body: form.value
      })
    } else {
      await auth.$fetchWithAuth('/api/profile/addresses', {
        method: 'POST',
        body: form.value
      })
    }
    await fetchAddresses()
    resetForm()
  } catch (error: any) {
    console.error('Ошибка сохранения адреса', error)
    alert(error?.data?.message || error?.message || 'Ошибка сохранения адреса')
  }
}

const deleteAddress = async (id: string) => {
  if (!confirm('Удалить этот адрес?')) return

  try {
    await auth.$fetchWithAuth(`/api/profile/addresses/${id}`, {
      method: 'DELETE'
    })
    await fetchAddresses()
  } catch (error: any) {
    console.error('Ошибка удаления адреса', error)
    alert(error?.data?.message || error?.message || 'Ошибка удаления адреса')
  }
}

const editAddress = (address: any) => {
  editingAddress.value = address
  form.value = {
    street: address.street,
    house: address.house,
    apartment: address.apartment || '',
    entrance: address.entrance || '',
    floor: address.floor || '',
    intercom: address.intercom || '',
    comment: address.comment || '',
    isDefault: address.isDefault
  }
  showAddForm.value = true
}

const resetForm = () => {
  form.value = {
    street: '',
    house: '',
    apartment: '',
    entrance: '',
    floor: '',
    intercom: '',
    comment: '',
    isDefault: false
  }
  editingAddress.value = null
  showAddForm.value = false
}

onMounted(() => {
  fetchAddresses()
})
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Мои адреса</h2>
      <button
        class="px-4 py-2 bg-accent hover:bg-accent-700 rounded-lg text-sm transition"
        @click="showAddForm = true">
        + Добавить адрес
      </button>
    </div>

    <!-- Форма добавления/редактирования -->
    <div v-if="showAddForm" class="bg-card rounded-lg border border-white/5 p-6 mb-4">
      <h3 class="text-lg font-semibold mb-4">
        {{ editingAddress ? 'Редактировать адрес' : 'Новый адрес' }}
      </h3>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Улица *</label>
            <input
              v-model="form.street"
              type="text"
              class="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none"
              required />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Дом *</label>
            <input
              v-model="form.house"
              type="text"
              class="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none"
              required />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Квартира</label>
            <input
              v-model="form.apartment"
              type="text"
              class="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Подъезд</label>
            <input
              v-model="form.entrance"
              type="text"
              class="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Этаж</label>
            <input
              v-model="form.floor"
              type="text"
              class="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Домофон</label>
            <input
              v-model="form.intercom"
              type="text"
              class="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none" />
          </div>
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Комментарий</label>
          <textarea
            v-model="form.comment"
            rows="2"
            class="w-full px-4 py-2 rounded bg-white/5 border border-white/10 focus:border-accent focus:outline-none"></textarea>
        </div>
        <div class="flex items-center gap-2">
          <input
            v-model="form.isDefault"
            type="checkbox"
            id="isDefault"
            class="w-4 h-4 rounded bg-white/5 border-white/10" />
          <label for="isDefault" class="text-sm text-gray-400">Сделать адресом по умолчанию</label>
        </div>
        <div class="flex gap-2">
          <button
            class="px-4 py-2 bg-accent hover:bg-accent-700 rounded-lg transition"
            @click="saveAddress">
            Сохранить
          </button>
          <button
            class="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition"
            @click="resetForm">
            Отмена
          </button>
        </div>
      </div>
    </div>

    <!-- Список адресов -->
    <div v-if="loading" class="text-center py-12 text-gray-400">Загрузка...</div>

    <div v-else-if="addresses.length === 0" class="text-center py-12 text-gray-400">
      <div class="text-4xl mb-4">📍</div>
      <div class="text-lg mb-2">У вас пока нет сохраненных адресов</div>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="address in addresses"
        :key="address.id"
        :class="[
          'bg-card rounded-lg border p-6',
          address.isDefault ? 'border-accent/50' : 'border-white/5'
        ]">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <div class="font-semibold">
                {{ address.street }}, д. {{ address.house }}
                <span v-if="address.apartment">, кв. {{ address.apartment }}</span>
              </div>
              <span
                v-if="address.isDefault"
                class="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                По умолчанию
              </span>
            </div>
            <div class="text-sm text-gray-400 space-y-1">
              <div v-if="address.entrance">Подъезд: {{ address.entrance }}</div>
              <div v-if="address.floor">Этаж: {{ address.floor }}</div>
              <div v-if="address.intercom">Домофон: {{ address.intercom }}</div>
              <div v-if="address.comment">{{ address.comment }}</div>
            </div>
          </div>
          <div class="flex gap-2 ml-4">
            <button
              class="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded text-sm transition"
              @click="editAddress(address)">
              ✏️
            </button>
            <button
              class="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded text-sm transition text-red-300"
              @click="deleteAddress(address.id)">
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

