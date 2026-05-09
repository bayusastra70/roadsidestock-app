import { PrismaClient } from '@prisma/client'
import config from '../prisma.config' // Impor config Prisma 7 Bli

const prismaClientSingleton = () => {
  // Prisma 7 butuh adapter atau konfigurasi dari prisma.config.ts
  return new PrismaClient(config as any)
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma