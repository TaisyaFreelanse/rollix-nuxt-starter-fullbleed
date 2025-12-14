export default defineNitroPlugin(async (nitroApp) => {
  // Проверяем и создаем необходимые таблицы при запуске сервера
  nitroApp.hooks.hook('ready', async () => {
    try {
      const { createSmsCodesTable, createBannersTable } = await import('~/server/utils/migrations')
      await createSmsCodesTable()
      await createBannersTable()
    } catch (error: any) {
      console.error('❌ Error initializing database tables:', error.message)
      // Не прерываем запуск приложения
    }

    // Автоматическая синхронизация меню из iikoCloud при старте (только если настроено)
    try {
      // Проверяем переменные окружения напрямую
      const iikoApiKey = process.env.IIKO_API_KEY
      const iikoOrganizationId = process.env.IIKO_ORGANIZATION_ID
      const iikoTerminalGroupId = process.env.IIKO_TERMINAL_GROUP_ID
      
      console.log('[iikoCloud Auto-sync] Проверка переменных окружения...')
      console.log(`  - IIKO_API_KEY: ${iikoApiKey ? 'установлен (' + iikoApiKey.substring(0, 8) + '...)' : 'не установлен'}`)
      console.log(`  - IIKO_ORGANIZATION_ID: ${iikoOrganizationId ? 'установлен' : 'не установлен'}`)
      console.log(`  - IIKO_TERMINAL_GROUP_ID: ${iikoTerminalGroupId ? 'установлен' : 'не установлен'}`)
      
      if (iikoApiKey && iikoOrganizationId && iikoTerminalGroupId) {
        console.log('🔄 Запуск автоматической синхронизации меню из iikoCloud через 10 секунд...')
        
        // Запускаем синхронизацию в фоне, не блокируя старт приложения
        setTimeout(async () => {
          try {
            const { aikoClient } = await import('~/server/utils/aiko-client')
            const iikoMenu = await aikoClient.getMenu()
            
            console.log(`📦 Получено из iiko: ${iikoMenu.categories.length} категорий, ${iikoMenu.products.length} товаров`)
            
            const { prisma } = await import('~/server/utils/prisma')
            let syncedCategories = 0
            let syncedProducts = 0

            // Синхронизация категорий
            for (const category of iikoMenu.categories) {
              try {
                await prisma.category.upsert({
                  where: { slug: category.slug },
                  create: {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    isActive: true
                  },
                  update: {
                    name: category.name,
                    isActive: true
                  }
                })
                syncedCategories++
              } catch (error: any) {
                console.error(`[iikoCloud] Ошибка категории ${category.name}:`, error.message)
              }
            }

            // Синхронизация товаров
            for (const product of iikoMenu.products) {
              try {
                let categoryId = product.categoryId
                if (categoryId) {
                  const category = await prisma.category.findUnique({
                    where: { id: categoryId }
                  })
                  if (!category) {
                    const firstCategory = await prisma.category.findFirst({
                      where: { isActive: true }
                    })
                    if (firstCategory) {
                      categoryId = firstCategory.id
                    }
                  }
                }

                if (!categoryId) {
                  console.warn(`⚠️  Пропущен товар ${product.name}: нет категории`)
                  continue
                }

                const slug = (product.name || product.id)
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9-а-яё]/g, '')
                  .substring(0, 100)

                const existing = await prisma.product.findUnique({
                  where: { slug }
                })

                const productData = {
                  name: product.name,
                  description: product.description || null,
                  price: product.price || 0,
                  categoryId,
                  image: product.image || null,
                  isActive: true
                }

                if (existing) {
                  await prisma.product.update({
                    where: { id: existing.id },
                    data: productData
                  })
                } else {
                  await prisma.product.create({
                    data: {
                      id: product.id,
                      slug,
                      ...productData
                    }
                  })
                  syncedProducts++
                }
              } catch (error: any) {
                console.error(`[iikoCloud] Ошибка товара ${product.name}:`, error.message)
              }
            }

            console.log(`✅ Автоматическая синхронизация завершена: ${syncedCategories} категорий, ${syncedProducts} товаров`)
          } catch (error: any) {
            console.error('❌ Ошибка автоматической синхронизации меню:', error.message)
            console.error('Stack:', error.stack)
            // Не прерываем работу приложения
          }
        }, 10000) // Запускаем через 10 секунд после старта (больше времени на инициализацию)
        console.log('[iikoCloud Auto-sync] Таймер установлен, синхронизация запустится через 10 секунд')
      } else {
        console.log('ℹ️  iikoCloud API не настроен - автоматическая синхронизация отключена')
        console.log('   Проверьте переменные окружения: IIKO_API_KEY, IIKO_ORGANIZATION_ID, IIKO_TERMINAL_GROUP_ID')
      }
    } catch (error: any) {
      console.error('❌ Ошибка при проверке настроек iikoCloud:', error.message)
      // Не прерываем запуск приложения
    }
  })
})

