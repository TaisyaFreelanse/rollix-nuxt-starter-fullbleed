<script setup lang="ts">
definePageMeta({
  layout: false, // Без layout - всё в странице
  ssr: false
})

const route = useRoute()
const router = useRouter()
const adminAuth = useAdminAuth()

// ========== АВТОРИЗАЦИЯ ==========
const isAuthorized = ref(false)
const isChecking = ref(true)
const loginForm = reactive({ login: '', password: '' })
const loginError = ref('')
const loginLoading = ref(false)

const handleLogin = async () => {
  if (!loginForm.login || !loginForm.password) {
    loginError.value = 'Введите логин и пароль'
    return
  }
  
  // Очищаем все токены перед логином, чтобы избежать путаницы
  if (process.client) {
    // Очищаем токен пользователя, если он есть
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    // Очищаем старый токен админа, если он есть
    const adminToken = localStorage.getItem('admin_token')
    if (adminToken) {
      try {
        const base64 = adminToken.replace(/-/g, '+').replace(/_/g, '/')
        const decodedStr = atob(base64)
        const decoded = JSON.parse(decodedStr)
        if (decoded.userId || decoded.phone) {
          // Это токен пользователя - очищаем
          console.log('⚠️ Очищаю токен пользователя перед логином админа')
          localStorage.removeItem('admin_token')
          localStorage.removeItem('admin_user')
        }
      } catch (e) {
        // Если не удалось декодировать, очищаем на всякий случай
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
      }
    }
    adminAuth.clearAuth()
  }
  
  loginLoading.value = true
  loginError.value = ''
  try {
    const result = await adminAuth.login(loginForm.login, loginForm.password)
    if (result.success) {
      // Даем время токену установиться в state
      await nextTick()
      // Проверяем, что токен точно установлен
      if (process.client) {
        const savedToken = localStorage.getItem('admin_token')
        if (!savedToken) {
          console.error('⚠️ Токен не сохранился после логина!')
          loginError.value = 'Ошибка сохранения токена. Попробуйте еще раз.'
          return
        }
      }
      isAuthorized.value = true
    } else {
      loginError.value = result.error || 'Неверный логин или пароль'
    }
  } catch (e: any) {
    loginError.value = e.message || 'Ошибка входа'
  } finally {
    loginLoading.value = false
  }
}

const handleLogout = async () => {
  await adminAuth.logout()
  isAuthorized.value = false
}

onMounted(async () => {
  // Очищаем токен пользователя из admin_token, если он там есть
  if (process.client) {
    try {
      const adminToken = localStorage.getItem('admin_token')
      if (adminToken) {
        // Проверяем, что это токен админа, а не пользователя
        const base64 = adminToken.replace(/-/g, '+').replace(/_/g, '/')
        const decodedStr = atob(base64)
        const decoded = JSON.parse(decodedStr)
        
        // Если это токен пользователя, очищаем его
        if (decoded.userId || decoded.phone) {
          console.log('⚠️ Обнаружен токен пользователя в admin_token при загрузке страницы. Очищаю...')
          localStorage.removeItem('admin_token')
          localStorage.removeItem('admin_user')
          adminAuth.clearAuth()
        }
      }
    } catch (e) {
      // Игнорируем ошибки декодирования
    }
  }
  
  try {
    const valid = await adminAuth.checkAuth()
    isAuthorized.value = valid
  } catch {
    isAuthorized.value = false
  } finally {
    isChecking.value = false
  }
})

// Активная вкладка
const activeTab = ref<string>(route.query.tab as string || 'dashboard')

// Список вкладок
const tabs = [
  { id: 'dashboard', label: 'Дашборд', icon: '📊' },
  { id: 'products', label: 'Товары', icon: '📦' },
  { id: 'categories', label: 'Категории', icon: '📁' },
  { id: 'orders', label: 'Заказы', icon: '📋' },
  { id: 'promocodes', label: 'Промокоды', icon: '🎟️' },
  { id: 'promotions', label: 'Акции', icon: '🎁' },
  { id: 'bonuses', label: 'Бонусная программа', icon: '💎' },
  { id: 'banners', label: 'Баннеры', icon: '🖼️' },
  { id: 'delivery-zones', label: 'Зоны доставки', icon: '🚚' },
  { id: 'admins', label: 'Админы', icon: '👥' },
  { id: 'settings', label: 'Настройки', icon: '⚙️' }
]

// Переключение вкладок
const switchTab = (tabId: string) => {
  activeTab.value = tabId
  router.replace({ query: { ...route.query, tab: tabId } })
}

// Устанавливаем активную вкладку из query параметра
watch(() => route.query.tab, (newTab) => {
  if (newTab && typeof newTab === 'string') {
    activeTab.value = newTab
  }
}, { immediate: true })

// ========== ДАШБОРД ==========
const stats = ref({
  products: 0,
  categories: 0,
  orders: 0,
  revenue: 0
})

const loadDashboardStats = async () => {
  try {
    const [productsRes, categoriesRes, ordersRes] = await Promise.all([
      $fetch('/api/products').catch(() => ({ total: 0 })),
      $fetch('/api/categories').catch(() => []),
      $fetch('/api/orders/all').catch(() => ({ orders: [] }))
    ])

    stats.value = {
      products: productsRes.total || productsRes.products?.length || 0,
      categories: Array.isArray(categoriesRes) ? categoriesRes.length : 0,
      orders: ordersRes.orders?.length || 0,
      revenue: 0
    }
  } catch (error) {
    console.error('Ошибка загрузки статистики:', error)
  }
}

// ========== ТОВАРЫ ==========
const products = ref<any[]>([])
const productsLoading = ref(false)
const productsSearchQuery = ref('')
const productsSelectedCategory = ref<string | null>(null)
const productsCategories = ref<any[]>([])

const filteredProducts = computed(() => {
  let filtered = products.value

  if (productsSearchQuery.value) {
    const query = productsSearchQuery.value.toLowerCase()
    filtered = filtered.filter((p) =>
      p.name?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query)
    )
  }

  if (productsSelectedCategory.value) {
    filtered = filtered.filter((p) => p.categoryId === productsSelectedCategory.value)
  }

  return filtered
})

const loadProducts = async () => {
  productsLoading.value = true
  try {
    const response = await $fetch('/api/products')
    products.value = response.products || []
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error)
  } finally {
    productsLoading.value = false
  }
}

const loadProductsCategories = async () => {
  try {
    productsCategories.value = await $fetch('/api/categories')
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error)
  }
}

const deleteProduct = async (id: string) => {
  if (!confirm('Вы уверены, что хотите удалить этот товар?')) return
  try {
    await $fetch(`/api/products/${id}`, { method: 'DELETE' })
    await loadProducts()
  } catch (error) {
    alert('Ошибка удаления товара')
  }
}

// ========== КАТЕГОРИИ ==========
const categories = ref<any[]>([])
const categoriesLoading = ref(false)

const loadCategories = async () => {
  categoriesLoading.value = true
  try {
    categories.value = await $fetch('/api/categories')
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error)
  } finally {
    categoriesLoading.value = false
  }
}

const deleteCategory = async (id: string) => {
  if (!confirm('Вы уверены, что хотите удалить эту категорию?')) return
  try {
    await $fetch(`/api/categories/${id}`, { method: 'DELETE' })
    await loadCategories()
  } catch (error) {
    alert('Ошибка удаления категории')
  }
}

// ========== ЗАКАЗЫ ==========
const orders = ref<any[]>([])
const ordersLoading = ref(false)
const ordersSearchQuery = ref('')
const ordersStatusFilter = ref<string | null>(null)
const ordersDateFilter = ref<string | null>(null)

const ordersStatusOptions = [
  { value: null, label: 'Все статусы' },
  { value: 'PENDING', label: 'Ожидает' },
  { value: 'CONFIRMED', label: 'Подтвержден' },
  { value: 'PREPARING', label: 'Готовится' },
  { value: 'READY', label: 'Готов' },
  { value: 'DELIVERING', label: 'Доставляется' },
  { value: 'DELIVERED', label: 'Доставлен' },
  { value: 'CANCELLED', label: 'Отменен' }
]

const filteredOrders = computed(() => {
  let filtered = orders.value

  if (ordersSearchQuery.value) {
    const query = ordersSearchQuery.value.toLowerCase()
    filtered = filtered.filter((o) =>
      o.orderNumber?.toLowerCase().includes(query) ||
      o.phone?.toLowerCase().includes(query) ||
      o.name?.toLowerCase().includes(query)
    )
  }

  if (ordersStatusFilter.value) {
    filtered = filtered.filter((o) => o.status === ordersStatusFilter.value)
  }

  if (ordersDateFilter.value) {
    const filterDate = new Date(ordersDateFilter.value)
    filtered = filtered.filter((o) => {
      const orderDate = new Date(o.createdAt)
      return orderDate.toDateString() === filterDate.toDateString()
    })
  }

  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

const loadOrders = async () => {
  ordersLoading.value = true
  try {
    const response = await $fetch('/api/orders/all').catch(() => ({ orders: [] }))
    orders.value = response.orders || []
  } catch (error) {
    console.error('Ошибка загрузки заказов:', error)
    orders.value = []
  } finally {
    ordersLoading.value = false
  }
}

const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    await $fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      body: { status: newStatus }
    })
    await loadOrders()
  } catch (error: any) {
    alert(error?.data?.message || 'Ошибка обновления статуса заказа')
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getOrderStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-500/20 text-yellow-400',
    CONFIRMED: 'bg-blue-500/20 text-blue-400',
    PREPARING: 'bg-orange-500/20 text-orange-400',
    READY: 'bg-purple-500/20 text-purple-400',
    DELIVERING: 'bg-indigo-500/20 text-indigo-400',
    DELIVERED: 'bg-green-500/20 text-green-400',
    CANCELLED: 'bg-red-500/20 text-red-400'
  }
  return colors[status] || 'bg-gray-500/20 text-gray-400'
}

const getOrderStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    PENDING: 'Ожидает',
    CONFIRMED: 'Подтвержден',
    PREPARING: 'Готовится',
    READY: 'Готов',
    DELIVERING: 'Доставляется',
    DELIVERED: 'Доставлен',
    CANCELLED: 'Отменен'
  }
  return labels[status] || status
}

// ========== ПРОМОКОДЫ ==========
const promocodes = ref<any[]>([])
const promocodesLoading = ref(false)

const loadPromocodes = async () => {
  promocodesLoading.value = true
  try {
    promocodes.value = await $fetch('/api/promo-codes')
  } catch (error) {
    console.error('Ошибка загрузки промокодов:', error)
  } finally {
    promocodesLoading.value = false
  }
}

const deletePromocode = async (id: string) => {
  if (!confirm('Вы уверены, что хотите удалить этот промокод?')) return
  try {
    await $fetch(`/api/promo-codes/${id}`, { method: 'DELETE' })
    await loadPromocodes()
  } catch (error) {
    alert('Ошибка удаления промокода')
  }
}

// ========== АКЦИИ ==========
const promotions = ref<any[]>([])
const promotionsLoading = ref(false)
const showPromotionForm = ref(false)
const editingPromotion = ref<any | null>(null)
const promotionFormData = ref({
  title: '',
  description: '',
  image: '',
  date: '',
  isActive: true,
  sortOrder: 0
})

// Виджет промокода
const promocodeWidget = ref<any | null>(null)
const promocodeWidgetLoading = ref(false)
const showPromocodeWidgetForm = ref(false)
const promocodeWidgetFormData = ref({
  code: '',
  description: '',
  isActive: true
})

const loadPromotions = async () => {
  promotionsLoading.value = true
  try {
    const response = await adminAuth.$fetchWithAuth('/api/admin/promotions')
    promotions.value = Array.isArray(response) ? response.filter(p => p != null) : []
  } catch (error: any) {
    console.error('Ошибка загрузки акций:', error)
    promotions.value = []
    // Не сбрасываем авторизацию сразу - пользователь может продолжить работу
    // Авторизация будет проверена при следующей попытке
  } finally {
    promotionsLoading.value = false
  }
}

const loadPromocodeWidget = async () => {
  promocodeWidgetLoading.value = true
  try {
    promocodeWidget.value = await adminAuth.$fetchWithAuth('/api/admin/promocode-widget')
    if (promocodeWidget.value) {
      promocodeWidgetFormData.value = {
        code: promocodeWidget.value.code || '',
        description: promocodeWidget.value.description || '',
        isActive: promocodeWidget.value.isActive !== undefined ? promocodeWidget.value.isActive : true
      }
    }
  } catch (error: any) {
    console.error('Ошибка загрузки виджета промокода:', error)
    promocodeWidget.value = null
    // Не сбрасываем авторизацию сразу
  } finally {
    promocodeWidgetLoading.value = false
  }
}

const openPromotionForm = (promotion: any = null) => {
  editingPromotion.value = promotion
  if (promotion) {
    promotionFormData.value = {
      title: promotion.title || '',
      description: promotion.description || '',
      image: promotion.image || '',
      date: promotion.date ? new Date(promotion.date).toISOString().split('T')[0] : '',
      isActive: promotion.isActive !== undefined ? promotion.isActive : true,
      sortOrder: promotion.sortOrder || 0
    }
  } else {
    promotionFormData.value = {
      title: '',
      description: '',
      image: '',
      date: '',
      isActive: true,
      sortOrder: promotions.value.length
    }
  }
  showPromotionForm.value = true
}

const closePromotionForm = () => {
  showPromotionForm.value = false
  editingPromotion.value = null
  promotionFormData.value = {
    title: '',
    description: '',
    image: '',
    date: '',
    isActive: true,
    sortOrder: 0
  }
}

const savePromotion = async () => {
  if (!promotionFormData.value.title) {
    alert('Введите название акции')
    return
  }

  try {
    if (editingPromotion.value) {
      await adminAuth.$fetchWithAuth(`/api/admin/promotions/${editingPromotion.value.id}`, {
        method: 'PUT',
        body: promotionFormData.value
      })
    } else {
      await adminAuth.$fetchWithAuth('/api/admin/promotions', {
        method: 'POST',
        body: promotionFormData.value
      })
    }
    await loadPromotions()
    closePromotionForm()
  } catch (error: any) {
    alert(error.data?.message || 'Ошибка сохранения акции')
  }
}

const deletePromotion = async (id: string) => {
  if (!confirm('Вы уверены, что хотите удалить эту акцию?')) return
  try {
    await adminAuth.$fetchWithAuth(`/api/admin/promotions/${id}`, {
      method: 'DELETE'
    })
    await loadPromotions()
  } catch (error: any) {
    alert(error.data?.message || 'Ошибка удаления акции')
  }
}

const openPromocodeWidgetForm = () => {
  showPromocodeWidgetForm.value = true
}

const closePromocodeWidgetForm = () => {
  showPromocodeWidgetForm.value = false
}

const savePromocodeWidget = async () => {
  if (!promocodeWidgetFormData.value.code || !promocodeWidgetFormData.value.description) {
    alert('Введите код и описание промокода')
    return
  }

  try {
    await adminAuth.$fetchWithAuth('/api/admin/promocode-widget', {
      method: 'PUT',
      body: promocodeWidgetFormData.value
    })
    await loadPromocodeWidget()
    closePromocodeWidgetForm()
  } catch (error: any) {
    alert(error.data?.message || 'Ошибка сохранения виджета промокода')
  }
}

const formatPromotionDate = (dateString: string) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// ========== БАННЕРЫ ==========
const banners = ref([
  {
    id: '1',
    title: 'Главный баннер',
    image: '/baner1.jpg',
    link: '/catalog',
    isActive: true,
    sortOrder: 1
  }
])

const deleteBanner = async (id: string) => {
  if (!confirm('Вы уверены, что хотите удалить этот баннер?')) return
  banners.value = banners.value.filter((b) => b.id !== id)
}

// ========== ЗОНЫ ДОСТАВКИ ==========
const zones = ref<any[]>([])
const zonesLoading = ref(false)

const loadZones = async () => {
  zonesLoading.value = true
  try {
    zones.value = await adminAuth.$fetchWithAuth('/api/admin/delivery-zones')
    // Исправляем несоответствие полей: API возвращает estimatedTime, но фронтенд ожидает deliveryTime
    zones.value = zones.value.map((zone: any) => ({
      ...zone,
      deliveryTime: zone.deliveryTime || zone.estimatedTime
    }))
  } catch (error: any) {
    console.error('Ошибка загрузки зон доставки:', error)
    zones.value = []
    // Не сбрасываем авторизацию сразу
  } finally {
    zonesLoading.value = false
  }
}

const deleteZone = async (id: string) => {
  if (!confirm('Вы уверены, что хотите удалить эту зону доставки?')) return
  try {
    await adminAuth.$fetchWithAuth(`/api/delivery-zones/${id}`, { method: 'DELETE' })
    await loadZones()
  } catch (error) {
    alert('Ошибка удаления зоны доставки')
  }
}

// ========== БОНУСНАЯ ПРОГРАММА ==========
const bonusSettings = ref({
  isEnabled: true,
  accrualPercent: 1, // Процент начисления бонусов с заказа
  minOrderAmount: 0, // Минимальная сумма заказа для начисления бонусов
  bonusToRubles: 1, // Курс конвертации: 1 бонус = X рублей
  minBonusSpend: 0, // Минимальная сумма бонусов для списания
  maxBonusPercent: 50, // Максимальный процент оплаты бонусами от суммы заказа
  description: 'Начисляется 1% с каждого заказа. 1 бонус = 1 рубль'
})

const bonusSettingsLoading = ref(false)

const loadBonusSettings = async () => {
  try {
    const saved = localStorage.getItem('admin-bonus-settings')
    if (saved) {
      bonusSettings.value = { ...bonusSettings.value, ...JSON.parse(saved) }
    }
  } catch (error) {
    console.error('Ошибка загрузки настроек бонусной программы:', error)
  }
}

const saveBonusSettings = async () => {
  bonusSettingsLoading.value = true
  try {
    localStorage.setItem('admin-bonus-settings', JSON.stringify(bonusSettings.value))
    alert('Настройки бонусной программы сохранены')
  } catch (error) {
    alert('Ошибка сохранения настроек бонусной программы')
  } finally {
    bonusSettingsLoading.value = false
  }
}

// ========== НАСТРОЙКИ ==========
const settings = ref({
  isMaintenanceMode: false,
  maintenanceMessage: 'Сайт временно недоступен. Ведутся технические работы.',
  estimatedReadyTime: 30,
  maxConcurrentOrders: 10,
  currentOrdersCount: 0
})

const settingsLoading = ref(false)

const loadSettings = async () => {
  try {
    const saved = localStorage.getItem('admin-settings')
    if (saved) {
      settings.value = { ...settings.value, ...JSON.parse(saved) }
    }
  } catch (error) {
    console.error('Ошибка загрузки настроек:', error)
  }
}

const saveSettings = async () => {
  settingsLoading.value = true
  try {
    localStorage.setItem('admin-settings', JSON.stringify(settings.value))
    alert('Настройки сохранены')
  } catch (error) {
    alert('Ошибка сохранения настроек')
  } finally {
    settingsLoading.value = false
  }
}

const loadCurrentOrders = async () => {
  try {
    const orders = await $fetch('/api/orders/all').catch(() => ({ orders: [] }))
    const activeOrders = orders.orders?.filter((o: any) => 
      !['DELIVERED', 'CANCELLED'].includes(o.status)
    ) || []
    settings.value.currentOrdersCount = activeOrders.length
  } catch (error) {
    console.error('Ошибка загрузки заказов:', error)
  }
}

// ========== АДМИНЫ ==========
const admins = ref<any[]>([])

const adminsLoading = ref(false)
const showAdminForm = ref(false)
const editingAdmin = ref<any | null>(null)
const adminFormData = ref({
  login: '',
  password: '',
  name: '',
  isActive: true
})

const loadAdmins = async () => {
  adminsLoading.value = true
  try {
    admins.value = await adminAuth.$fetchWithAuth('/api/admin/admins')
  } catch (error: any) {
    console.error('Ошибка загрузки администраторов:', error)
    // Не сбрасываем авторизацию сразу - пользователь может продолжить работу
  } finally {
    adminsLoading.value = false
  }
}

const openAdminForm = (admin: any = null) => {
  editingAdmin.value = admin
  if (admin) {
    adminFormData.value = {
      login: admin.login,
      password: '',
      name: admin.name || '',
      isActive: admin.isActive
    }
  } else {
    adminFormData.value = {
      login: '',
      password: '',
      name: '',
      isActive: true
    }
  }
  showAdminForm.value = true
}

const closeAdminForm = () => {
  showAdminForm.value = false
  editingAdmin.value = null
  adminFormData.value = {
    login: '',
    password: '',
    name: '',
    isActive: true
  }
}

const saveAdmin = async () => {
  if (!adminFormData.value.login) {
    alert('Введите логин')
    return
  }

  if (!editingAdmin.value && !adminFormData.value.password) {
    alert('Введите пароль')
    return
  }

  try {
    if (editingAdmin.value) {
      // Обновляем существующего админа
      await adminAuth.$fetchWithAuth(`/api/admin/admins/${editingAdmin.value.id}`, {
        method: 'PUT',
        body: adminFormData.value
      })
    } else {
      // Создаем нового админа
      await adminAuth.$fetchWithAuth('/api/admin/admins', {
        method: 'POST',
        body: adminFormData.value
      })
    }
    await loadAdmins()
    closeAdminForm()
  } catch (error: any) {
    alert(error.data?.message || 'Ошибка сохранения администратора')
  }
}

const deleteAdmin = async (id: string) => {
  if (!confirm('Вы уверены, что хотите удалить этого администратора?')) return
  try {
    await adminAuth.$fetchWithAuth(`/api/admin/admins/${id}`, {
      method: 'DELETE'
    })
    await loadAdmins()
  } catch (error: any) {
    alert(error.data?.message || 'Ошибка удаления администратора')
  }
}

const formatDateAdmin = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Функция загрузки данных для текущей вкладки
const loadTabData = async (tab: string) => {
  // Проверяем авторизацию перед загрузкой данных
  if (!isAuthorized.value) {
    return
  }
  
  try {
    if (tab === 'dashboard') {
      await loadDashboardStats()
    } else if (tab === 'products') {
      await loadProducts()
      await loadProductsCategories()
    } else if (tab === 'categories') {
      await loadCategories()
    } else if (tab === 'orders') {
      await loadOrders()
    } else if (tab === 'promocodes') {
      await loadPromocodes()
    } else if (tab === 'promotions') {
      await loadPromotions()
      await loadPromocodeWidget()
    } else if (tab === 'delivery-zones') {
      await loadZones()
    } else if (tab === 'bonuses') {
      await loadBonusSettings()
    } else if (tab === 'settings') {
      await loadSettings()
      await loadCurrentOrders()
    } else if (tab === 'admins') {
      await loadAdmins()
    }
  } catch (error: any) {
    // Не делаем повторную проверку токена - это может создать бесконечный цикл
    // Просто логируем ошибку, пользователь может продолжить работу
    console.error('Ошибка загрузки данных вкладки:', error)
  }
}

// Загрузка данных при переключении вкладок
watch(activeTab, async (newTab) => {
  await loadTabData(newTab)
})

// Загружаем начальные данные после авторизации
watch(isAuthorized, async (val) => {
  if (val) {
    await loadTabData(activeTab.value)
  }
}, { immediate: false })
</script>

<template>
  <div style="min-height: 100vh; background: #111827;">
    <!-- ЗАГРУЗКА -->
    <div v-if="isChecking" style="position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: #111827; z-index: 99999;">
      <div style="text-align: center;">
        <div style="width: 48px; height: 48px; border: 4px solid #22c55e; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px;"></div>
        <p style="color: #9ca3af;">Проверка авторизации...</p>
      </div>
    </div>

    <!-- ФОРМА ВХОДА -->
    <div v-else-if="!isAuthorized" style="position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: #111827; z-index: 99999;">
      <div style="background: #1f2937; border-radius: 16px; padding: 32px; width: 100%; max-width: 400px; border: 1px solid #374151; margin: 16px;">
        <h2 style="font-size: 24px; font-weight: bold; color: white; margin-bottom: 24px; text-align: center;">
          🔐 Вход в админ-панель
        </h2>
        
        <div v-if="loginError" style="margin-bottom: 16px; padding: 12px; background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.5); border-radius: 8px; color: #f87171; font-size: 14px;">
          {{ loginError }}
        </div>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 14px; color: #d1d5db; margin-bottom: 8px;">Логин</label>
          <input v-model="loginForm.login" type="text" placeholder="admin" :disabled="loginLoading" @keypress.enter="handleLogin"
            style="width: 100%; background: #374151; color: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #4b5563; outline: none; box-sizing: border-box;" />
        </div>
        
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 14px; color: #d1d5db; margin-bottom: 8px;">Пароль</label>
          <input v-model="loginForm.password" type="password" placeholder="••••••••" :disabled="loginLoading" @keypress.enter="handleLogin"
            style="width: 100%; background: #374151; color: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #4b5563; outline: none; box-sizing: border-box;" />
        </div>
        
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <NuxtLink to="/" style="color: #9ca3af; font-size: 14px; text-decoration: none;">← На сайт</NuxtLink>
          <button type="button" @click="handleLogin" :disabled="loginLoading || !loginForm.login || !loginForm.password"
            :style="{ padding: '12px 24px', background: '#16a34a', color: 'white', borderRadius: '8px', fontWeight: '500', border: 'none', cursor: 'pointer', opacity: (loginLoading || !loginForm.login || !loginForm.password) ? 0.5 : 1 }">
            {{ loginLoading ? 'Вход...' : 'Войти' }}
          </button>
        </div>
        
        <p style="margin-top: 16px; text-align: center; font-size: 12px; color: #6b7280;">
          Логин: <b style="color: #10b981;">admin</b> / Пароль: <b style="color: #10b981;">admin123</b>
        </p>
      </div>
    </div>

    <!-- АДМИН-ПАНЕЛЬ (после авторизации) -->
    <div v-else>
      <!-- Header -->
      <header style="background: #1f2937; border-bottom: 1px solid #374151; padding: 16px 32px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px; cursor: pointer;" @click="router.push('/')">
            <img src="/logo.svg" alt="Logo" style="height: 48px; width: auto;" />
            <div>
              <h1 style="font-size: 20px; font-weight: bold; color: white; margin: 0;">Админ-панель</h1>
              <p style="font-size: 12px; color: #9ca3af; margin: 0;">Управление контентом</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <span v-if="adminAuth.admin.value" style="font-size: 14px; color: #9ca3af;">
              {{ adminAuth.admin.value.name || adminAuth.admin.value.login }}
            </span>
            <button type="button" @click="handleLogout" style="color: #9ca3af; background: none; border: none; cursor: pointer; font-size: 14px;">Выйти</button>
            <NuxtLink to="/" style="color: #9ca3af; font-size: 14px; text-decoration: none;">← На сайт</NuxtLink>
          </div>
        </div>
      </header>

      <!-- Контент -->
      <div style="padding: 32px;">
        <!-- Вкладки -->
        <div class="bg-gray-800 border-b border-gray-700 mb-6">
          <div class="flex overflow-x-auto">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="switchTab(tab.id)"
              :class="[
                'px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap border-b-2',
                activeTab === tab.id
                  ? 'border-accent text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              ]">
              <span class="mr-2">{{ tab.icon }}</span>
              {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Контент вкладок -->
        <div class="min-h-[500px]">
      <!-- ДАШБОРД -->
      <div v-if="activeTab === 'dashboard'">
        <h1 class="text-3xl font-bold text-white mb-8">Панель управления</h1>

        <!-- Статистика -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-sm mb-1">Товаров</p>
                <p class="text-3xl font-bold text-white">{{ stats.products }}</p>
              </div>
              <div class="text-4xl">📦</div>
            </div>
          </div>

          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-sm mb-1">Категорий</p>
                <p class="text-3xl font-bold text-white">{{ stats.categories }}</p>
              </div>
              <div class="text-4xl">📁</div>
            </div>
          </div>

          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-sm mb-1">Заказов</p>
                <p class="text-3xl font-bold text-white">{{ stats.orders }}</p>
              </div>
              <div class="text-4xl">📋</div>
            </div>
          </div>

          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-sm mb-1">Выручка</p>
                <p class="text-3xl font-bold text-white">{{ stats.revenue.toLocaleString() }} ₽</p>
              </div>
              <div class="text-4xl">💰</div>
            </div>
          </div>
        </div>

        <!-- Быстрые действия -->
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 class="text-xl font-semibold text-white mb-4">Быстрые действия</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              @click="switchTab('products')"
              class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors text-center">
              ➕ Добавить товар
            </button>
            <button
              @click="switchTab('categories')"
              class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors text-center">
              ➕ Добавить категорию
            </button>
            <button
              @click="switchTab('promocodes')"
              class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors text-center">
              ➕ Создать промокод
            </button>
          </div>
        </div>
      </div>

      <!-- ТОВАРЫ -->
      <div v-else-if="activeTab === 'products'">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-white">Товары</h1>
          <NuxtLink
            to="/admin/products/new"
            class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors">
            ➕ Добавить товар
          </NuxtLink>
        </div>

        <!-- Фильтры -->
        <div class="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              v-model="productsSearchQuery"
              type="text"
              placeholder="Поиск товаров..."
              class="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
            <select
              v-model="productsSelectedCategory"
              class="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none">
              <option :value="null">Все категории</option>
              <option v-for="cat in productsCategories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Таблица товаров -->
        <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div v-if="productsLoading" class="p-8 text-center text-gray-400">
            Загрузка...
          </div>
          <div v-else-if="filteredProducts.length === 0" class="p-8 text-center text-gray-400">
            Товары не найдены
          </div>
          <table v-else class="w-full">
            <thead class="bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Товар</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Категория</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Цена</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Статус</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
              <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-700">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <img
                      :src="product.image || '/product.svg'"
                      :alt="product.name"
                      class="w-12 h-12 object-cover rounded" />
                    <div>
                      <div class="font-medium text-white">{{ product.name }}</div>
                      <div class="text-sm text-gray-400 line-clamp-1">{{ product.description }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-gray-300">
                  {{ product.category?.name || '-' }}
                </td>
                <td class="px-6 py-4">
                  <div class="text-white font-medium">{{ product.price }} ₽</div>
                  <div v-if="product.oldPrice" class="text-sm text-gray-500 line-through">
                    {{ product.oldPrice }} ₽
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'px-2 py-1 rounded text-xs font-medium',
                      product.isActive
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    ]">
                    {{ product.isActive ? 'Активен' : 'Неактивен' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <NuxtLink
                      :to="`/admin/products/${product.id}`"
                      class="text-accent hover:text-accent-700 transition-colors">
                      ✏️
                    </NuxtLink>
                    <button
                      @click="deleteProduct(product.id)"
                      class="text-red-400 hover:text-red-500 transition-colors">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- КАТЕГОРИИ -->
      <div v-else-if="activeTab === 'categories'">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-white">Категории</h1>
          <NuxtLink
            to="/admin/categories/new"
            class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors">
            ➕ Добавить категорию
          </NuxtLink>
        </div>

        <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div v-if="categoriesLoading" class="p-8 text-center text-gray-400">
            Загрузка...
          </div>
          <div v-else-if="categories.length === 0" class="p-8 text-center text-gray-400">
            Категории не найдены
          </div>
          <div v-else class="divide-y divide-gray-700">
            <div
              v-for="category in categories"
              :key="category.id"
              class="p-6 hover:bg-gray-700 transition-colors">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div v-if="category.icon" class="text-4xl">{{ category.icon }}</div>
                  <div>
                    <h3 class="text-lg font-semibold text-white">{{ category.name }}</h3>
                    <p v-if="category.description" class="text-sm text-gray-400 mt-1">
                      {{ category.description }}
                    </p>
                    <div class="flex items-center gap-4 mt-2">
                      <span class="text-xs text-gray-500">Порядок: {{ category.sortOrder }}</span>
                      <span
                        :class="[
                          'px-2 py-1 rounded text-xs font-medium',
                          category.isActive
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        ]">
                        {{ category.isActive ? 'Активна' : 'Неактивна' }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <NuxtLink
                    :to="`/admin/categories/${category.id}`"
                    class="text-accent hover:text-accent-700 transition-colors">
                    ✏️
                  </NuxtLink>
                  <button
                    @click="deleteCategory(category.id)"
                    class="text-red-400 hover:text-red-500 transition-colors">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ЗАКАЗЫ -->
      <div v-else-if="activeTab === 'orders'">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-white">Заказы</h1>
        </div>

        <!-- Фильтры -->
        <div class="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              v-model="ordersSearchQuery"
              type="text"
              placeholder="Поиск по номеру, телефону, имени..."
              class="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
            <select
              v-model="ordersStatusFilter"
              class="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none">
              <option v-for="option in ordersStatusOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <input
              v-model="ordersDateFilter"
              type="date"
              class="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
          </div>
        </div>

        <!-- Таблица заказов -->
        <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div v-if="ordersLoading" class="p-8 text-center text-gray-400">
            Загрузка...
          </div>
          <div v-else-if="filteredOrders.length === 0" class="p-8 text-center text-gray-400">
            Заказы не найдены
          </div>
          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Номер</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Клиент</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Тип</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Сумма</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Статус</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Дата</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">Действия</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-700">
                  <td class="px-6 py-4">
                    <div class="font-mono font-semibold text-white">#{{ order.orderNumber }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-white">{{ order.name || '-' }}</div>
                    <div class="text-sm text-gray-400">{{ order.phone }}</div>
                  </td>
                  <td class="px-6 py-4 text-gray-300">
                    {{ order.deliveryType === 'DELIVERY' ? '🚚 Доставка' : '🏪 Самовывоз' }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-white font-medium">{{ Number(order.total).toLocaleString() }} ₽</div>
                  </td>
                  <td class="px-6 py-4">
                    <select
                      :value="order.status"
                      @change="updateOrderStatus(order.id, ($event.target as HTMLSelectElement).value)"
                      :class="[
                        'px-3 py-1 rounded text-sm font-medium border-0 focus:outline-none focus:ring-2 focus:ring-accent',
                        getOrderStatusColor(order.status)
                      ]">
                      <option v-for="option in ordersStatusOptions.filter(o => o.value)" :key="option.value" :value="option.value">
                        {{ option.label }}
                      </option>
                    </select>
                  </td>
                  <td class="px-6 py-4 text-gray-300 text-sm">
                    {{ formatDate(order.createdAt) }}
                  </td>
                  <td class="px-6 py-4 text-right">
                    <NuxtLink
                      :to="`/admin/orders/${order.id}`"
                      class="text-accent hover:text-accent-700 transition-colors">
                      Подробнее →
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ПРОМОКОДЫ -->
      <div v-else-if="activeTab === 'promocodes'">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-white">Промокоды</h1>
          <NuxtLink
            to="/admin/promocodes/new"
            class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors">
            ➕ Создать промокод
          </NuxtLink>
        </div>

        <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div v-if="promocodesLoading" class="p-8 text-center text-gray-400">
            Загрузка...
          </div>
          <div v-else-if="promocodes.length === 0" class="p-8 text-center text-gray-400">
            Промокоды не найдены
          </div>
          <table v-else class="w-full">
            <thead class="bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Код</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Тип скидки</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Значение</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Использований</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Статус</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
              <tr v-for="promo in promocodes" :key="promo.id" class="hover:bg-gray-700">
                <td class="px-6 py-4">
                  <div class="font-mono font-semibold text-white">{{ promo.code }}</div>
                  <div v-if="promo.description" class="text-sm text-gray-400 mt-1">
                    {{ promo.description }}
                  </div>
                </td>
                <td class="px-6 py-4 text-gray-300">
                  {{ promo.discountType === 'PERCENT' ? 'Процент' : 'Фиксированная сумма' }}
                </td>
                <td class="px-6 py-4 text-white font-medium">
                  {{ promo.discountType === 'PERCENT' ? `${promo.discountValue}%` : `${promo.discountValue} ₽` }}
                </td>
                <td class="px-6 py-4 text-gray-300">
                  {{ promo.usedCount }} / {{ promo.usageLimit || '∞' }}
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'px-2 py-1 rounded text-xs font-medium',
                      promo.isActive
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    ]">
                    {{ promo.isActive ? 'Активен' : 'Неактивен' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <NuxtLink
                      :to="`/admin/promocodes/${promo.id}`"
                      class="text-accent hover:text-accent-700 transition-colors">
                      ✏️
                    </NuxtLink>
                    <button
                      @click="deletePromocode(promo.id)"
                      class="text-red-400 hover:text-red-500 transition-colors">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- АКЦИИ -->
      <div v-else-if="activeTab === 'promotions'">
        <h1 class="text-3xl font-bold text-white mb-6">Акции и объявления</h1>

        <!-- Виджет промокода -->
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-white">Виджет промокода</h2>
            <button
              @click="openPromocodeWidgetForm()"
              class="bg-accent hover:bg-accent-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
              ✏️ Редактировать
            </button>
          </div>
          
          <div v-if="promocodeWidgetLoading" class="text-gray-400 text-sm">
            Загрузка...
          </div>
          <div v-else-if="promocodeWidget" class="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm text-gray-400 mb-1">Промокод</div>
                <div class="text-white font-semibold">{{ promocodeWidget.description }}</div>
              </div>
              <div class="bg-accent text-white font-bold text-xl px-6 py-3 rounded-lg">
                {{ promocodeWidget.code }}
              </div>
            </div>
            <div class="mt-3">
              <span
                :class="[
                  'px-2 py-1 rounded text-xs font-medium',
                  promocodeWidget.isActive
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                ]">
                {{ promocodeWidget.isActive ? 'Активен' : 'Неактивен' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Акции/Объявления -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold text-white">Акции</h2>
          <button
            @click="openPromotionForm()"
            class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors">
            ➕ Добавить акцию
          </button>
        </div>

        <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div v-if="promotionsLoading" class="p-8 text-center text-gray-400">
            Загрузка...
          </div>
          <div v-else-if="promotions.length === 0" class="p-8 text-center text-gray-400">
            Акции не найдены
          </div>
          <table v-else class="w-full">
            <thead class="bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Изображение</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Название</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Дата</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Порядок</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Статус</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
              <tr v-for="promo in promotions" :key="promo.id" class="hover:bg-gray-700">
                <td class="px-6 py-4">
                  <img
                    v-if="promo.image"
                    :src="promo.image"
                    :alt="promo.title"
                    class="w-16 h-16 object-cover rounded" />
                  <div v-else class="w-16 h-16 bg-gray-700 rounded flex items-center justify-center text-gray-500 text-xs">
                    Нет фото
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="font-medium text-white">{{ promo.title }}</div>
                  <div v-if="promo.description" class="text-sm text-gray-400 line-clamp-1 mt-1">
                    {{ promo.description }}
                  </div>
                </td>
                <td class="px-6 py-4 text-gray-300 text-sm">
                  {{ formatPromotionDate(promo.date) }}
                </td>
                <td class="px-6 py-4 text-gray-300">
                  {{ promo.sortOrder }}
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'px-2 py-1 rounded text-xs font-medium',
                      promo.isActive
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    ]">
                    {{ promo.isActive ? 'Активна' : 'Неактивна' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="openPromotionForm(promo)"
                      class="text-accent hover:text-accent-700 transition-colors">
                      ✏️
                    </button>
                    <button
                      @click="deletePromotion(promo.id)"
                      class="text-red-400 hover:text-red-500 transition-colors">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Модальное окно создания/редактирования акции -->
        <Modal :open="showPromotionForm" :title="editingPromotion ? 'Редактировать акцию' : 'Добавить акцию'" @close="closePromotionForm" size="lg">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Название *
              </label>
              <input
                v-model="promotionFormData.title"
                type="text"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"
                placeholder="Введите название акции" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Описание
              </label>
              <textarea
                v-model="promotionFormData.description"
                rows="3"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"
                placeholder="Введите описание акции"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                URL изображения
              </label>
              <input
                v-model="promotionFormData.image"
                type="text"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"
                placeholder="Введите URL изображения" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Дата
              </label>
              <input
                v-model="promotionFormData.date"
                type="date"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Порядок сортировки
                </label>
                <input
                  v-model.number="promotionFormData.sortOrder"
                  type="number"
                  min="0"
                  class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
              </div>

              <div class="flex items-center gap-3 pt-8">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="promotionFormData.isActive"
                    type="checkbox"
                    class="w-5 h-5 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent" />
                  <span class="text-gray-300">Активна</span>
                </label>
              </div>
            </div>
          </div>

          <template #footer>
            <div class="flex items-center justify-end gap-3">
              <button
                type="button"
                @click="closePromotionForm"
                class="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                Отмена
              </button>
              <button
                type="button"
                @click="savePromotion"
                class="px-6 py-2 bg-accent hover:bg-accent-700 text-white rounded-lg transition-colors">
                Сохранить
              </button>
            </div>
          </template>
        </Modal>

        <!-- Модальное окно редактирования виджета промокода -->
        <Modal :open="showPromocodeWidgetForm" title="Редактировать виджет промокода" @close="closePromocodeWidgetForm" size="md">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Код промокода *
              </label>
              <input
                v-model="promocodeWidgetFormData.code"
                type="text"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"
                placeholder="Введите код промокода" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Описание *
              </label>
              <input
                v-model="promocodeWidgetFormData.description"
                type="text"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"
                placeholder="Введите описание" />
            </div>

            <div class="flex items-center gap-3">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="promocodeWidgetFormData.isActive"
                  type="checkbox"
                  class="w-5 h-5 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent" />
                <span class="text-gray-300">Активен</span>
              </label>
            </div>
          </div>

          <template #footer>
            <div class="flex items-center justify-end gap-3">
              <button
                type="button"
                @click="closePromocodeWidgetForm"
                class="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                Отмена
              </button>
              <button
                type="button"
                @click="savePromocodeWidget"
                class="px-6 py-2 bg-accent hover:bg-accent-700 text-white rounded-lg transition-colors">
                Сохранить
              </button>
            </div>
          </template>
        </Modal>
      </div>

      <!-- БОНУСНАЯ ПРОГРАММА -->
      <div v-else-if="activeTab === 'bonuses'">
        <h1 class="text-3xl font-bold text-white mb-6">Бонусная программа</h1>

        <div class="space-y-6">
          <!-- Основные настройки -->
          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 class="text-xl font-semibold text-white mb-4">Основные настройки</h2>
            
            <div class="space-y-6">
              <!-- Включение/отключение программы -->
              <div class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div>
                  <h3 class="text-lg font-medium text-white mb-1">Бонусная программа</h3>
                  <p class="text-sm text-gray-400">
                    {{ bonusSettings.isEnabled ? 'Программа активна' : 'Программа отключена' }}
                  </p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="bonusSettings.isEnabled"
                    type="checkbox"
                    class="sr-only peer" />
                  <div class="w-14 h-7 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>

              <!-- Дополнительные настройки (показываются только если программа включена) -->
              <div v-if="bonusSettings.isEnabled" class="space-y-4 pt-4 border-t border-gray-700">
                <!-- Процент начисления -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Процент начисления бонусов с заказа (%)
                  </label>
                  <input
                    v-model.number="bonusSettings.accrualPercent"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
                  <p class="text-xs text-gray-400 mt-1">
                    С каждого заказа будет начисляться {{ bonusSettings.accrualPercent }}% бонусов
                  </p>
                </div>

                <!-- Минимальная сумма заказа для начисления -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Минимальная сумма заказа для начисления бонусов (₽)
                  </label>
                  <input
                    v-model.number="bonusSettings.minOrderAmount"
                    type="number"
                    min="0"
                    step="1"
                    class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
                  <p class="text-xs text-gray-400 mt-1">
                    Бонусы начисляются только с заказов от {{ bonusSettings.minOrderAmount }} ₽
                  </p>
                </div>

                <!-- Курс конвертации -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Курс конвертации (1 бонус = X рублей)
                  </label>
                  <input
                    v-model.number="bonusSettings.bonusToRubles"
                    type="number"
                    min="0.01"
                    max="100"
                    step="0.01"
                    class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
                  <p class="text-xs text-gray-400 mt-1">
                    1 бонус = {{ bonusSettings.bonusToRubles }} ₽
                  </p>
                </div>

                <!-- Минимальная сумма для списания -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Минимальная сумма бонусов для списания
                  </label>
                  <input
                    v-model.number="bonusSettings.minBonusSpend"
                    type="number"
                    min="0"
                    step="1"
                    class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
                  <p class="text-xs text-gray-400 mt-1">
                    Можно потратить бонусы только при наличии минимум {{ bonusSettings.minBonusSpend }} бонусов
                  </p>
                </div>

                <!-- Максимальный процент оплаты бонусами -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Максимальный процент оплаты бонусами от суммы заказа (%)
                  </label>
                  <input
                    v-model.number="bonusSettings.maxBonusPercent"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
                  <p class="text-xs text-gray-400 mt-1">
                    Бонусами можно оплатить максимум {{ bonusSettings.maxBonusPercent }}% от суммы заказа
                  </p>
                </div>

                <!-- Описание для пользователей -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Описание программы (отображается пользователям)
                  </label>
                  <textarea
                    v-model="bonusSettings.description"
                    rows="3"
                    class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"></textarea>
                  <p class="text-xs text-gray-400 mt-1">
                    Это описание будет показываться пользователям в разделе "Бонусы"
                  </p>
                </div>
              </div>

              <!-- Предупреждение при отключении -->
              <div v-if="!bonusSettings.isEnabled" class="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                <p class="text-yellow-400 text-sm">
                  ⚠️ Бонусная программа отключена. Бонусы не будут начисляться и списываться с заказов.
                </p>
              </div>
            </div>
          </div>

          <!-- Статистика (можно добавить позже) -->
          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 class="text-xl font-semibold text-white mb-4">Статистика</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-gray-700/50 rounded-lg p-4">
                <div class="text-sm text-gray-400 mb-1">Всего начислено бонусов</div>
                <div class="text-2xl font-bold text-white">-</div>
              </div>
              <div class="bg-gray-700/50 rounded-lg p-4">
                <div class="text-sm text-gray-400 mb-1">Всего списано бонусов</div>
                <div class="text-2xl font-bold text-white">-</div>
              </div>
              <div class="bg-gray-700/50 rounded-lg p-4">
                <div class="text-sm text-gray-400 mb-1">Активных бонусов у пользователей</div>
                <div class="text-2xl font-bold text-white">-</div>
              </div>
            </div>
          </div>

          <!-- Кнопка сохранения -->
          <div class="flex items-center justify-end">
            <button
              @click="saveBonusSettings"
              :disabled="bonusSettingsLoading"
              class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50">
              {{ bonusSettingsLoading ? 'Сохранение...' : 'Сохранить настройки' }}
            </button>
          </div>
        </div>
      </div>

      <!-- БАННЕРЫ -->
      <div v-else-if="activeTab === 'banners'">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-white">Баннеры</h1>
          <NuxtLink
            to="/admin/banners/new"
            class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors">
            ➕ Добавить баннер
          </NuxtLink>
        </div>

        <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div v-if="banners.length === 0" class="p-8 text-center text-gray-400">
            Баннеры не найдены
          </div>
          <div v-else class="divide-y divide-gray-700">
            <div
              v-for="banner in banners"
              :key="banner.id"
              class="p-6 hover:bg-gray-700 transition-colors">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <img
                    :src="banner.image"
                    :alt="banner.title"
                    class="w-24 h-24 object-cover rounded" />
                  <div>
                    <h3 class="text-lg font-semibold text-white">{{ banner.title }}</h3>
                    <p class="text-sm text-gray-400 mt-1">Ссылка: {{ banner.link }}</p>
                    <div class="flex items-center gap-4 mt-2">
                      <span class="text-xs text-gray-500">Порядок: {{ banner.sortOrder }}</span>
                      <span
                        :class="[
                          'px-2 py-1 rounded text-xs font-medium',
                          banner.isActive
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        ]">
                        {{ banner.isActive ? 'Активен' : 'Неактивен' }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <NuxtLink
                    :to="`/admin/banners/${banner.id}`"
                    class="text-accent hover:text-accent-700 transition-colors">
                    ✏️
                  </NuxtLink>
                  <button
                    @click="deleteBanner(banner.id)"
                    class="text-red-400 hover:text-red-500 transition-colors">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
          <p class="text-yellow-400 text-sm">
            ⚠️ Управление баннерами - заглушка. Реальная реализация будет добавлена позже.
          </p>
        </div>
      </div>

      <!-- ЗОНЫ ДОСТАВКИ -->
      <div v-else-if="activeTab === 'delivery-zones'">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-white">Зоны доставки</h1>
          <NuxtLink
            to="/admin/delivery-zones/new"
            class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors">
            ➕ Добавить зону
          </NuxtLink>
        </div>

        <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div v-if="zonesLoading" class="p-8 text-center text-gray-400">
            Загрузка...
          </div>
          <div v-else-if="zones.length === 0" class="p-8 text-center text-gray-400">
            Зоны доставки не найдены
          </div>
          <div v-else class="divide-y divide-gray-700">
            <template v-for="zone in zones" :key="zone?.id">
            <div
              v-if="zone"
              class="p-6 hover:bg-gray-700 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-white">{{ zone.name }}</h3>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                    <div>
                      <span class="text-gray-400">Стоимость:</span>
                      <span class="text-white ml-2 font-medium">{{ zone.deliveryPrice }} ₽</span>
                    </div>
                    <div>
                      <span class="text-gray-400">Бесплатно от:</span>
                      <span class="text-white ml-2 font-medium">{{ zone.freeDeliveryThreshold }} ₽</span>
                    </div>
                    <div>
                      <span class="text-gray-400">Мин. заказ:</span>
                      <span class="text-white ml-2 font-medium">{{ zone.minOrderAmount }} ₽</span>
                    </div>
                    <div>
                      <span class="text-gray-400">Время:</span>
                      <span class="text-white ml-2 font-medium">{{ zone.deliveryTime }} мин</span>
                    </div>
                  </div>
                  <div class="mt-2">
                    <span
                      :class="[
                        'px-2 py-1 rounded text-xs font-medium',
                        zone.isActive
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      ]">
                      {{ zone.isActive ? 'Активна' : 'Неактивна' }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <NuxtLink
                    :to="`/admin/delivery-zones/${zone.id}`"
                    class="text-accent hover:text-accent-700 transition-colors">
                    ✏️
                  </NuxtLink>
                  <button
                    @click="deleteZone(zone.id)"
                    class="text-red-400 hover:text-red-500 transition-colors">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
            </template>
          </div>
        </div>
      </div>

      <!-- АДМИНЫ -->
      <div v-else-if="activeTab === 'admins'">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-white">Администраторы</h1>
          <button
            @click="openAdminForm()"
            class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors">
            ➕ Добавить администратора
          </button>
        </div>

        <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div v-if="adminsLoading" class="p-8 text-center text-gray-400">
            Загрузка...
          </div>
          <div v-else-if="admins.length === 0" class="p-8 text-center text-gray-400">
            Администраторы не найдены
          </div>
          <table v-else class="w-full">
            <thead class="bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Логин</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Имя</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Статус</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Создан</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
              <tr v-for="admin in admins" :key="admin.id" class="hover:bg-gray-700">
                <td class="px-6 py-4">
                  <div class="font-medium text-white">{{ admin.login }}</div>
                </td>
                <td class="px-6 py-4 text-gray-300">
                  {{ admin.name || '-' }}
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'px-2 py-1 rounded text-xs font-medium',
                      admin.isActive
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    ]">
                    {{ admin.isActive ? 'Активен' : 'Заблокирован' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-gray-300 text-sm">
                  {{ formatDateAdmin(admin.createdAt) }}
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="openAdminForm(admin)"
                      class="text-accent hover:text-accent-700 transition-colors">
                      ✏️
                    </button>
                    <button
                      @click="deleteAdmin(admin.id)"
                      :disabled="admin.id === adminAuth.admin.value?.id"
                      class="text-red-400 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      :title="admin.id === adminAuth.admin.value?.id ? 'Нельзя удалить собственный аккаунт' : 'Удалить'">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Модальное окно создания/редактирования админа -->
        <Modal :open="showAdminForm" :title="editingAdmin ? 'Редактировать администратора' : 'Добавить администратора'" @close="closeAdminForm" size="md">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Логин *
              </label>
              <input
                v-model="adminFormData.login"
                type="text"
                :disabled="!!editingAdmin"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Введите логин" />
              <p v-if="editingAdmin" class="text-xs text-gray-400 mt-1">Логин нельзя изменить</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Пароль {{ editingAdmin ? '' : '*' }}
              </label>
              <input
                v-model="adminFormData.password"
                type="password"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"
                :placeholder="editingAdmin ? 'Оставьте пустым, чтобы не менять пароль' : 'Введите пароль'" />
              <p v-if="editingAdmin" class="text-xs text-gray-400 mt-1">Оставьте пустым, чтобы не менять пароль</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Имя
              </label>
              <input
                v-model="adminFormData.name"
                type="text"
                class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"
                placeholder="Введите имя (необязательно)" />
            </div>

            <div class="flex items-center gap-3">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="adminFormData.isActive"
                  type="checkbox"
                  class="w-5 h-5 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent" />
                <span class="text-gray-300">Активен</span>
              </label>
            </div>
          </div>

          <template #footer>
            <div class="flex items-center justify-end gap-3">
              <button
                type="button"
                @click="closeAdminForm"
                class="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                Отмена
              </button>
              <button
                type="button"
                @click="saveAdmin"
                class="px-6 py-2 bg-accent hover:bg-accent-700 text-white rounded-lg transition-colors">
                Сохранить
              </button>
            </div>
          </template>
        </Modal>
      </div>

      <!-- НАСТРОЙКИ -->
      <div v-else-if="activeTab === 'settings'">
        <h1 class="text-3xl font-bold text-white mb-6">Настройки</h1>

        <div class="space-y-6">
          <!-- Технические работы -->
          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 class="text-xl font-semibold text-white mb-4">Технические работы</h2>
            
            <div class="space-y-4">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="settings.isMaintenanceMode"
                  type="checkbox"
                  class="w-5 h-5 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent" />
                <span class="text-gray-300">Включить режим технических работ (отключить прием заказов)</span>
              </label>

              <div v-if="settings.isMaintenanceMode" class="mt-4">
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Сообщение для пользователей
                </label>
                <textarea
                  v-model="settings.maintenanceMessage"
                  rows="3"
                  class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none"></textarea>
              </div>
            </div>
          </div>

          <!-- Управление временем готовности -->
          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 class="text-xl font-semibold text-white mb-4">Время готовности</h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Оценочное время готовности (минут)
                </label>
                <input
                  v-model.number="settings.estimatedReadyTime"
                  type="number"
                  min="0"
                  class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
                <p class="text-xs text-gray-400 mt-1">
                  Это время будет автоматически добавляться к выбранному времени доставки при высокой загруженности
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Максимальное количество одновременных заказов
                </label>
                <input
                  v-model.number="settings.maxConcurrentOrders"
                  type="number"
                  min="1"
                  class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-accent focus:outline-none" />
                <p class="text-xs text-gray-400 mt-1">
                  Текущее количество активных заказов: 
                  <span class="font-semibold" :class="settings.currentOrdersCount >= settings.maxConcurrentOrders ? 'text-red-400' : 'text-green-400'">
                    {{ settings.currentOrdersCount }} / {{ settings.maxConcurrentOrders }}
                  </span>
                </p>
                <p v-if="settings.currentOrdersCount >= settings.maxConcurrentOrders" class="text-xs text-orange-400 mt-1">
                  ⚠️ Достигнут лимит заказов. Время готовности будет увеличено на {{ settings.estimatedReadyTime }} минут.
                </p>
              </div>
            </div>
          </div>

          <!-- Кнопка сохранения -->
          <div class="flex items-center justify-end">
            <button
              @click="saveSettings"
              :disabled="settingsLoading"
              class="bg-accent hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50">
              {{ settingsLoading ? 'Сохранение...' : 'Сохранить настройки' }}
            </button>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
