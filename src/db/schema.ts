import { sqliteTable, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core";

// Catalog of Sarees
export const sarees = sqliteTable("sarees", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  material: text("material").notNull(),
  price: text("price").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  craftName: text("craft_name").notNull(),
  origin: text("origin").notNull(),
  inStock: integer("in_stock", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
});

// Detailed bullet points for each Saree
export const sareeDetails = sqliteTable("saree_details", {
  id: text("id").primaryKey(),
  sareeId: text("saree_id")
    .notNull()
    .references(() => sarees.id, { onDelete: "cascade" }),
  detailText: text("detail_text").notNull(),
  sortOrder: integer("sort_order").notNull(),
});

// Customer Form Inquiries
export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  sareeName: text("saree_name"),
  message: text("message").notNull(),
  channel: text("channel").notNull(),
  userId: text("user_id"), // Linked to Clerk userId if authenticated
  status: text("status").notNull().default("Pending"), // Pending, In Discussion, Dispatched, Completed
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
});

// Member Saree Wishlist
export const wishlists = sqliteTable("wishlists", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  sareeId: text("saree_id")
    .notNull()
    .references(() => sarees.id, { onDelete: "cascade" }),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
}, (table) => {
  return {
    userSareeIdx: uniqueIndex("user_saree_idx").on(table.userId, table.sareeId),
  };
});
