import { spawn } from "child_process";
import fs from "fs";

// Load local environment variables from Vercel env pull
const envFile = fs.readFileSync(".env.local", "utf8");
const env = { ...process.env };
for (const line of envFile.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const idx = trimmed.indexOf("=");
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx).trim();
  let val = trimmed.slice(idx + 1).trim();
  if (val.startsWith('"') && val.endsWith('"')) {
    val = val.slice(1, -1);
  } else if (val.startsWith("'") && val.endsWith("'")) {
    val = val.slice(1, -1);
  }
  env[key] = val;
}

function runCmd(cmd, args) {
  return new Promise((resolve, reject) => {
    const cp = spawn(cmd, args, { env, stdio: "inherit", shell: true });
    cp.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command ${cmd} exited with code ${code}`));
    });
  });
}

async function main() {
  try {
    console.log("🚀 Pushing database schema to Turso...");
    await runCmd("npx", ["drizzle-kit", "push"]);
    console.log("✓ Schema pushed successfully.");

    console.log("\n🌱 Seeding database on Turso...");
    await runCmd("npx", ["tsx", "src/db/seed.ts"]);
    console.log("✓ Seeding complete.");

    console.log("\n🎉 Turso production database successfully deployed!");
  } catch (error) {
    console.error("\n❌ Error deploying Turso DB:", error.message);
    process.exit(1);
  }
}

main();
