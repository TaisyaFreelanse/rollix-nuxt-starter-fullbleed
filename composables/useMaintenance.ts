/**
 * Composable для проверки режима технических работ
 */
export const useMaintenance = () => {
  const isMaintenanceMode = ref(false)
  const maintenanceMessage = ref('Сайт временно недоступен. Ведутся технические работы.')

  const checkMaintenance = async () => {
    try {
      const settings = await $fetch('/api/admin/settings').catch(() => null)
      if (settings) {
        isMaintenanceMode.value = settings.isMaintenanceMode || false
        maintenanceMessage.value = settings.maintenanceMessage || maintenanceMessage.value
      }
    } catch (error) {
      console.error('Ошибка проверки режима технических работ:', error)
    }
  }

  return {
    isMaintenanceMode: readonly(isMaintenanceMode),
    maintenanceMessage: readonly(maintenanceMessage),
    checkMaintenance
  }
}

