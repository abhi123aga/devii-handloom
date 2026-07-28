import type { Config } from "drizzle-kit";

const isProduction = 
  process.env.TURSO_DATABASE_URL && 
  !process.env.TURSO_DATABASE_URL.startsWith("file:");

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: isProduction ? "turso" : "sqlite",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || "file:./data.db",
    authToken: isProduction ? process.env.TURSO_AUTH_TOKEN : undefined,
  },
} satisfies Config;
