/**
 * Middleware для проверки режима технических работ
 * Блокирует доступ к сайту (кроме админ-панели) при включенном режиме техработ
 */
export default defineNuxtRouteMiddleware(async (to) => {
  // Пропускаем админ-панель и API
  if (to.path.startsWith('/admin') || to.path.startsWith('/api')) {
    return
  }

  try {
    const settings = await $fetch('/api/admin/settings').catch(() => null)
    
    if (settings?.isMaintenanceMode) {
      // Перенаправляем на страницу технических работ
      return navigateTo({
        path: '/maintenance',
        query: { message: settings.maintenanceMessage }
      })
    }
  } catch (error) {
    // При ошибке пропускаем запрос
    console.error('Ошибка проверки режима технических работ:', error)
  }
})

