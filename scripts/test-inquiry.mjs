import fs from "fs";

// Load env variables
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

// Test payload
const payload = {
  name: "Arunika Sharma",
  email: env.NOTIFICATION_EMAIL || "test@deviihandloom.in",
  phone: "+91 99999 88888",
  saree: "Vaikuntha Emerald",
  message: "Hello! This is a test inquiry verifying that form submissions successfully log to the SQLite/Turso database AND dispatch email notifications via Resend sandbox.",
  channel: "WhatsApp"
};

console.log("Triggering test inquiry request to localhost dev server...");

try {
  const response = await fetch("http://localhost:3000/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const result = await response.json();

  if (response.ok) {
    console.log("\n✅ Test successful!");
    console.log("Response:", result);
    console.log(`\nCheck the inbox of "${payload.email}" for the notification email.`);
  } else {
    console.error("\n❌ Submission failed:", result);
  }
} catch (error) {
  console.error("\n❌ Request error:", error.message);
}
