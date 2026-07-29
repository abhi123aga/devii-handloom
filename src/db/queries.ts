import { db } from "./index";
import { sarees, sareeDetails, inquiries, wishlists } from "./schema";
import { eq, and, desc } from "drizzle-orm";

// Fetch all sarees with their respective bullet specifications
export async function getSarees() {
  try {
    const allSarees = await db.select().from(sarees);
    const allDetails = await db.select().from(sareeDetails);

    return allSarees.map((saree) => {
      const details = allDetails
        .filter((d) => d.sareeId === saree.id)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((d) => d.detailText);

      return {
        ...saree,
        details,
      };
    });
  } catch (error) {
    console.error("Error fetching sarees from DB:", error);
    return []; // Return empty array as fallback
  }
}

// Save a customer form submission to the inquiries table
export async function saveInquiry(inquiryData: {
  name: string;
  email: string;
  phone?: string;
  sareeName?: string;
  message: string;
  channel: string;
  userId?: string;
}) {
  try {
    const id = `inquiry-${Date.now()}`;
    await db.insert(inquiries).values({
      id,
      name: inquiryData.name,
      email: inquiryData.email,
      phone: inquiryData.phone || null,
      sareeName: inquiryData.sareeName || null,
      message: inquiryData.message,
      channel: inquiryData.channel,
      userId: inquiryData.userId || null,
    });
    return id;
  } catch (error) {
    console.error("Error saving inquiry to DB:", error);
    throw error;
  }
}

// Fetch all wishlist items for a given user
export async function getWishlist(userId: string) {
  try {
    const list = await db
      .select()
      .from(wishlists)
      .where(eq(wishlists.userId, userId));
    return list.map((w) => w.sareeId);
  } catch (error) {
    console.error("Error getting wishlist:", error);
    return [];
  }
}

// Add/Remove a saree from wishlist
export async function toggleWishlist(userId: string, sareeId: string) {
  try {
    const existing = await db
      .select()
      .from(wishlists)
      .where(and(eq(wishlists.userId, userId), eq(wishlists.sareeId, sareeId)))
      .limit(1);

    if (existing.length > 0) {
      await db
        .delete(wishlists)
        .where(and(eq(wishlists.userId, userId), eq(wishlists.sareeId, sareeId)));
      return { wishlisted: false };
    } else {
      const id = `wishlist-${Date.now()}`;
      await db.insert(wishlists).values({
        id,
        userId,
        sareeId,
      });
      return { wishlisted: true };
    }
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    throw error;
  }
}

// Retrieve past inquiries submitted by user
export async function getUserInquiries(userId: string) {
  try {
    return await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.userId, userId))
      .orderBy(desc(inquiries.createdAt));
  } catch (error) {
    console.error("Error getting user inquiries:", error);
    return [];
  }
}

// Add a new saree with details
export async function addSaree(sareeData: {
  id: string;
  name: string;
  category: string;
  material: string;
  price: string;
  description: string;
  image: string;
  craftName: string;
  origin: string;
  inStock?: boolean;
}, detailsList: string[]) {
  try {
    await db.insert(sarees).values({
      id: sareeData.id,
      name: sareeData.name,
      category: sareeData.category,
      material: sareeData.material,
      price: sareeData.price,
      description: sareeData.description,
      image: sareeData.image,
      craftName: sareeData.craftName,
      origin: sareeData.origin,
      inStock: sareeData.inStock ?? true,
    });

    if (detailsList && detailsList.length > 0) {
      const detailsValues = detailsList.map((textVal, index) => ({
        id: `detail-${Date.now()}-${index}`,
        sareeId: sareeData.id,
        detailText: textVal.trim(),
        sortOrder: index,
      }));
      await db.insert(sareeDetails).values(detailsValues);
    }
    return sareeData.id;
  } catch (error) {
    console.error("Error adding saree to DB:", error);
    throw error;
  }
}

// Delete a saree and its details
export async function deleteSaree(sareeId: string) {
  try {
    await db.delete(sareeDetails).where(eq(sareeDetails.sareeId, sareeId));
    await db.delete(sarees).where(eq(sarees.id, sareeId));
    return true;
  } catch (error) {
    console.error("Error deleting saree from DB:", error);
    throw error;
  }
}

// Update stock status of a saree
export async function updateSareeStock(sareeId: string, inStock: boolean) {
  try {
    await db.update(sarees).set({ inStock }).where(eq(sarees.id, sareeId));
    return true;
  } catch (error) {
    console.error("Error updating stock status:", error);
    throw error;
  }
}

