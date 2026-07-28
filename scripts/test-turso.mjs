import { createClient } from "@libsql/client";
import fs from "fs";

// Load env
const envFile = fs.readFileSync(".env.local", "utf8");
const env = {};
for (const line of envFile.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const idx = trimmed.indexOf("=");
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx).trim();
  let val = trimmed.slice(idx + 1).trim();
  if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
  env[key] = val;
}

const url = env.TURSO_DATABASE_URL;
const authToken = env.TURSO_AUTH_TOKEN;

console.log("Testing connection to Turso URL:", url);

if (!url || !authToken) {
  console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
  process.exit(1);
}

try {
  const client = createClient({ url, authToken });
  const result = await client.execute("SELECT 1;");
  console.log("✓ Connection successful! Query result:", result.rows);
  process.exit(0);
} catch (error) {
  console.error("❌ Connection failed:", error.message);
  process.exit(1);
}
