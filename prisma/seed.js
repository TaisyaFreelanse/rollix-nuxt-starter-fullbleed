// Compiled version of seed.ts for production use
// This file will be generated from seed.ts
// For now, we'll create a simple JS version

const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

let prisma;

if (databaseUrl.startsWith('prisma+')) {
  prisma = new PrismaClient({
    accelerateUrl: databaseUrl
  });
} else {
  const pool = new Pool({
    connectionString: databaseUrl
  });
  
  const adapter = new PrismaPg(pool);
  
  prisma = new PrismaClient({
    adapter: adapter
  });
}

// Import seed data
async function main() {
  console.log('🌱 Starting database seed...');
  
  // Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Роллы',
        slug: 'rolls',
        description: 'Классические и авторские роллы',
        image: '/categories/rolls.jpg',
        icon: '🍣',
        isActive: true,
        sortOrder: 1
      }
    }),
    prisma.category.create({
      data: {
        name: 'Суши',
        slug: 'sushi',
        description: 'Традиционные суши',
        image: '/categories/sushi.jpg',
        icon: '🍱',
        isActive: true,
        sortOrder: 2
      }
    }),
    prisma.category.create({
      data: {
        name: 'Сеты',
        slug: 'sets',
        description: 'Готовые наборы',
        image: '/categories/sets.jpg',
        icon: '📦',
        isActive: true,
        sortOrder: 3
      }
    })
  ]);

  console.log(`✅ Created ${categories.length} categories`);
  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

