import { PrismaClient, DiscountType, OrderStatus, DeliveryType, PaymentMethod, PaymentStatus } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set in environment variables')
}

// Для Prisma 7 с обычным PostgreSQL подключением
let prisma: PrismaClient

if (databaseUrl.startsWith('prisma+')) {
  // Prisma Accelerate
  prisma = new PrismaClient({
    accelerateUrl: databaseUrl
  })
} else {
  // Обычное подключение через адаптер
  const pool = new Pool({
    connectionString: databaseUrl
  })
  
  const adapter = new PrismaPg(pool)
  
  prisma = new PrismaClient({
    adapter: adapter
  })
}

async function main() {
  console.log('🌱 Начало заполнения базы данных...')

  // Очистка базы данных
  console.log('🧹 Очистка существующих данных...')
  await prisma.orderItemModifier.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.productFavorite.deleteMany()
  await prisma.modifierOption.deleteMany()
  await prisma.productModifier.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.address.deleteMany()
  await prisma.user.deleteMany()
  await prisma.promoCode.deleteMany()
  await prisma.deliveryZone.deleteMany()

  // Создание категорий
  console.log('📁 Создание категорий...')
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Роллы',
        slug: 'rolls',
        icon: '🍣',
        description: 'Классические и авторские роллы',
        sortOrder: 1,
        isActive: true
      }
    }),
    prisma.category.create({
      data: {
        name: 'Суши',
        slug: 'sushi',
        icon: '🍱',
        description: 'Традиционные суши',
        sortOrder: 2,
        isActive: true
      }
    }),
    prisma.category.create({
      data: {
        name: 'Сеты',
        slug: 'sets',
        icon: '🍽️',
        description: 'Готовые наборы',
        sortOrder: 3,
        isActive: true
      }
    }),
    prisma.category.create({
      data: {
        name: 'Напитки',
        slug: 'drinks',
        icon: '🥤',
        description: 'Напитки и соки',
        sortOrder: 4,
        isActive: true
      }
    })
  ])

  // Создание товаров
  console.log('🍣 Создание товаров...')
  const products = await Promise.all([
    // Роллы
    prisma.product.create({
      data: {
        categoryId: categories[0].id,
        name: 'Филадельфия классическая',
        slug: 'philadelphia-classic',
        description: 'Лосось, огурец, авокадо, сыр',
        image: '/products/photo_2025-12-01_16-29-44.jpg',
        price: 450,
        weight: 250,
        calories: 320,
        isActive: true,
        isPopular: true,
        sortOrder: 1
      }
    }),
    prisma.product.create({
      data: {
        categoryId: categories[0].id,
        name: 'Калифорния',
        slug: 'california',
        description: 'Краб, огурец, авокадо',
        image: '/products/photo_2025-12-01_16-29-59.jpg',
        price: 380,
        weight: 220,
        calories: 280,
        isActive: true,
        isPopular: true,
        sortOrder: 2
      }
    }),
    prisma.product.create({
      data: {
        categoryId: categories[0].id,
        name: 'Дракон',
        slug: 'dragon',
        description: 'Угорь, огурец, авокадо, соус унаги',
        image: '/products/photo_2025-12-01_16-30-08.jpg',
        price: 520,
        oldPrice: 580,
        weight: 280,
        calories: 380,
        isActive: true,
        isPopular: false,
        sortOrder: 3
      }
    }),
    // Суши
    prisma.product.create({
      data: {
        categoryId: categories[1].id,
        name: 'Суши с лососем',
        slug: 'sushi-salmon',
        description: 'Свежий лосось',
        image: '/products/photo_2025-12-01_16-30-13.jpg',
        price: 180,
        weight: 30,
        calories: 45,
        isActive: true,
        isPopular: false,
        sortOrder: 1
      }
    }),
    // Сеты
    prisma.product.create({
      data: {
        categoryId: categories[2].id,
        name: 'Сет "Ролл-Мания"',
        slug: 'set-roll-mania',
        description: 'Филадельфия, Калифорния, Дракон, 8 шт',
        image: '/products/photo_2025-12-01_16-30-16.jpg',
        price: 1200,
        oldPrice: 1350,
        weight: 750,
        calories: 980,
        isActive: true,
        isPopular: true,
        sortOrder: 1
      }
    }),
    // Напитки
    prisma.product.create({
      data: {
        categoryId: categories[3].id,
        name: 'Coca-Cola 0.5л',
        slug: 'coca-cola-05',
        description: 'Газированный напиток',
        image: '/products/photo_2025-12-01_16-30-18.jpg',
        price: 120,
        weight: 500,
        calories: 0,
        isActive: true,
        isPopular: false,
        sortOrder: 1
      }
    })
  ])

  // Создание модификаторов для товаров
  console.log('🔧 Создание модификаторов...')
  const modifiers = await Promise.all([
    // Модификаторы для роллов
    prisma.productModifier.create({
      data: {
        productId: products[0].id,
        name: 'Соус',
        price: 0,
        isRequired: false,
        isMultiple: true,
        sortOrder: 1
      }
    }),
    prisma.productModifier.create({
      data: {
        productId: products[0].id,
        name: 'Палочки',
        price: 0,
        isRequired: false,
        isMultiple: false,
        sortOrder: 2
      }
    }),
    prisma.productModifier.create({
      data: {
        productId: products[0].id,
        name: 'Васаби',
        price: 0,
        isRequired: false,
        isMultiple: false,
        sortOrder: 3
      }
    })
  ])

  // Создание вариантов модификаторов
  console.log('⚙️ Создание вариантов модификаторов...')
  await Promise.all([
    prisma.modifierOption.create({
      data: {
        modifierId: modifiers[0].id,
        name: 'Соевый соус',
        price: 0,
        isDefault: true,
        sortOrder: 1
      }
    }),
    prisma.modifierOption.create({
      data: {
        modifierId: modifiers[0].id,
        name: 'Соус унаги',
        price: 50,
        isDefault: false,
        sortOrder: 2
      }
    }),
    prisma.modifierOption.create({
      data: {
        modifierId: modifiers[0].id,
        name: 'Спайси соус',
        price: 30,
        isDefault: false,
        sortOrder: 3
      }
    }),
    prisma.modifierOption.create({
      data: {
        modifierId: modifiers[1].id,
        name: 'Да',
        price: 0,
        isDefault: true,
        sortOrder: 1
      }
    }),
    prisma.modifierOption.create({
      data: {
        modifierId: modifiers[1].id,
        name: 'Нет',
        price: 0,
        isDefault: false,
        sortOrder: 2
      }
    }),
    prisma.modifierOption.create({
      data: {
        modifierId: modifiers[2].id,
        name: 'Да',
        price: 0,
        isDefault: true,
        sortOrder: 1
      }
    }),
    prisma.modifierOption.create({
      data: {
        modifierId: modifiers[2].id,
        name: 'Нет',
        price: 0,
        isDefault: false,
        sortOrder: 2
      }
    })
  ])

  // Создание промокодов
  console.log('🎟️ Создание промокодов...')
  await Promise.all([
    prisma.promoCode.create({
      data: {
        code: 'WELCOME10',
        description: 'Скидка 10% для новых клиентов',
        discountType: DiscountType.PERCENT,
        discountValue: 10,
        minOrderAmount: 500,
        maxDiscount: 200,
        usageLimit: null,
        validFrom: new Date(),
        validUntil: null,
        isActive: true
      }
    }),
    prisma.promoCode.create({
      data: {
        code: 'FREEDELIVERY',
        description: 'Бесплатная доставка',
        discountType: DiscountType.FIXED,
        discountValue: 0,
        minOrderAmount: 1000,
        usageLimit: 100,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 дней
        isActive: true
      }
    }),
    prisma.promoCode.create({
      data: {
        code: 'SAVE500',
        description: 'Скидка 500 рублей',
        discountType: DiscountType.FIXED,
        discountValue: 500,
        minOrderAmount: 2000,
        maxDiscount: 500,
        usageLimit: 50,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 дней
        isActive: true
      }
    })
  ])

  // Создание зон доставки
  console.log('🗺️ Создание зон доставки...')
  await Promise.all([
    prisma.deliveryZone.create({
      data: {
        name: 'Центр города',
        description: 'Центральная часть города',
        coordinates: {
          type: 'Polygon',
          coordinates: [
            [
              [37.5, 55.7],
              [37.6, 55.7],
              [37.6, 55.8],
              [37.5, 55.8],
              [37.5, 55.7]
            ]
          ]
        },
        minOrderAmount: 500,
        deliveryPrice: 200,
        freeDeliveryThreshold: 1500,
        estimatedTime: 45,
        isActive: true
      }
    }),
    prisma.deliveryZone.create({
      data: {
        name: 'Окраины',
        description: 'Отдаленные районы',
        coordinates: {
          type: 'Polygon',
          coordinates: [
            [
              [37.4, 55.6],
              [37.7, 55.6],
              [37.7, 55.9],
              [37.4, 55.9],
              [37.4, 55.6]
            ]
          ]
        },
        minOrderAmount: 800,
        deliveryPrice: 350,
        freeDeliveryThreshold: 2000,
        estimatedTime: 60,
        isActive: true
      }
    })
  ])

  // Создание тестового пользователя
  console.log('👤 Создание тестового пользователя...')
  const user = await prisma.user.create({
    data: {
      phone: '+79991234567',
      email: 'test@example.com',
      name: 'Тестовый Пользователь'
    }
  })

  // Создание адреса для пользователя
  await prisma.address.create({
    data: {
      userId: user.id,
      street: 'Ленина',
      house: '10',
      apartment: '25',
      entrance: '2',
      floor: '3',
      isDefault: true
    }
  })

  console.log('✅ База данных успешно заполнена!')
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при заполнении базы данных:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

