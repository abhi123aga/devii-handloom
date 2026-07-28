import { NextResponse } from "next/server";
import { getSarees } from "@/db/queries";

export async function GET() {
  try {
    const sareesList = await getSarees();
    return NextResponse.json(sareesList);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
