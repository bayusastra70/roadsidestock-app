// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: "postgresql://postgres:87Rte321123xc@db.lrcprlkxmuleybtpttuf.supabase.co:5432/postgres",
  },
  // Hapus experimental staleTimes karena menyebabkan invalid config di v16
};

export default nextConfig;