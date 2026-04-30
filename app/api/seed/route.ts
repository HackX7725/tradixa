import { adminDb } from "@/lib/firebase";
import { LANDING_DATA } from "@/data/landing";
import { NextResponse } from "next/server";

export async function GET() {
  if (!adminDb) {
    return NextResponse.json({ error: "Firestore Admin not initialized" }, { status: 500 });
  }

  try {
    console.log("Seeding listings...");
    for (const listing of LANDING_DATA.listings) {
      const docRef = adminDb.collection("listings").doc(listing.id);
      await docRef.set({
        ...listing,
        createdAt: new Date().toISOString(),
        sellerId: "system_default",
        status: "active"
      });
    }

    console.log("Seeding insights...");
    for (const article of LANDING_DATA.insights.articles) {
      const docRef = adminDb.collection("insights").doc(article.id);
      await docRef.set({
        ...article,
        createdAt: new Date().toISOString()
      });
    }

    return NextResponse.json({ message: "Seed complete!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
