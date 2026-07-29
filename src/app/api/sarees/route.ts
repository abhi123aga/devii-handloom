import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getSarees, addSaree, deleteSaree, updateSareeStock } from "@/db/queries";

export async function GET() {
  try {
    const sareesList = await getSarees();
    return NextResponse.json(sareesList);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

const ALLOWED_EMAILS = ["abhijeetagarwal35@gmail.com", "handloomdevii@gmail.com"];

async function checkAdminAuth() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  if (!user || !userEmail || !ALLOWED_EMAILS.includes(userEmail)) {
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  try {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await request.json();
    const { name, category, material, price, description, image, craftName, origin, details } = body;

    if (!name || !category || !material || !price || !description || !image || !craftName || !origin) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate unique ID
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now();

    await addSaree({
      id,
      name,
      category,
      material,
      price,
      description,
      image,
      craftName,
      origin,
      inStock: true,
    }, details || []);

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await request.json();
    const { id, inStock } = body;

    if (!id || typeof inStock !== "boolean") {
      return NextResponse.json({ error: "Missing ID or inStock boolean" }, { status: 400 });
    }

    await updateSareeStock(id, inStock);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
    }

    await deleteSaree(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
