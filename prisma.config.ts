import { defineConfig } from '@prisma/config'

export default defineConfig({
  datasource: {
    // Di Vercel, ini akan otomatis mengambil dari Environment Variables
    url: process.env.DATABASE_URL,
  },
})