import { db } from "./index";
import { sarees, sareeDetails } from "./schema";
import { SAREE_COLLECTION } from "../data/sarees";

async function main() {
  console.log("🌱 Starting database seeding...");

  try {
    // 1. Clean existing tables
    console.log("🧹 Cleaning old database records...");
    await db.delete(sareeDetails);
    await db.delete(sarees);
    console.log("✓ Tables cleared.");

    // 2. Insert collections
    console.log("📝 Inserting saree catalog items...");
    for (const item of SAREE_COLLECTION) {
      // Insert main Saree
      await db.insert(sarees).values({
        id: item.id,
        name: item.name,
        category: item.category,
        material: item.material,
        price: item.price,
        description: item.description,
        image: item.image,
        craftName: item.craftName,
        origin: item.origin,
        inStock: item.inStock,
      });

      // Insert respective detail lines
      console.log(`  - Seeding details for: ${item.name}`);
      for (let i = 0; i < item.details.length; i++) {
        await db.insert(sareeDetails).values({
          id: `${item.id}-detail-${i}`,
          sareeId: item.id,
          detailText: item.details[i],
          sortOrder: i,
        });
      }
    }

    console.log("\n✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
