import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getWishlist, toggleWishlist } from "@/db/queries";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const list = await getWishlist(userId);
    return NextResponse.json(list);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sareeId } = await request.json();
    if (!sareeId) {
      return NextResponse.json({ error: "Missing sareeId" }, { status: 400 });
    }

    const res = await toggleWishlist(userId, sareeId);
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
