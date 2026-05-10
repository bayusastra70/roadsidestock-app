import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: "postgresql://postgres:87Rte321123xc@db.lrcprlkxmuleybtpttuf.supabase.co:5432/postgres",
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0
    }
  }
};

export default nextConfig;