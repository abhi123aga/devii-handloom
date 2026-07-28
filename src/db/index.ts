import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

// Load configuration details dynamically
const url = process.env.TURSO_DATABASE_URL || "file:./data.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

// Create database client
export const client = createClient({
  url,
  authToken,
});

// Create Drizzle ORM client
export const db = drizzle(client, { schema });
