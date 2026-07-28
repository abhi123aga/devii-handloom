import { db } from "./index";
import { sarees, sareeDetails, inquiries } from "./schema";
import { eq } from "drizzle-orm";

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
    });
    return id;
  } catch (error) {
    console.error("Error saving inquiry to DB:", error);
    throw error;
  }
}
