import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const databaseUrl = process.env.DATABASE_URL

const prismaClientSingleton = () => {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set in environment variables')
  }

  if (databaseUrl.startsWith('prisma+')) {
    // Prisma Accelerate
    return new PrismaClient({
      accelerateUrl: databaseUrl
    })
  } else {
    // Обычное подключение через адаптер
    const pool = new Pool({
      connectionString: databaseUrl
    })
    
    const adapter = new PrismaPg(pool)
    
    return new PrismaClient({
      adapter: adapter
    })
  }
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

