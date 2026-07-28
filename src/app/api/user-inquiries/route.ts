import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserInquiries } from "@/db/queries";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const inquiriesList = await getUserInquiries(userId);
    return NextResponse.json(inquiriesList);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
