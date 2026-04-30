import { adminDb } from "../lib/firebase";
import { LANDING_DATA } from "../data/landing";

async function seedData() {
  if (!adminDb) {
    console.error("Firestore Admin not initialized. Check your .env.local");
    return;
  }

  console.log("Seeding listings...");
  
  for (const listing of LANDING_DATA.listings) {
    const docRef = adminDb.collection("listings").doc(listing.id);
    await docRef.set({
      ...listing,
      createdAt: new Date().toISOString(),
      sellerId: "system_default",
      status: "active"
    });
    console.log(`Added listing: ${listing.title}`);
  }

  console.log("Seeding insights...");
  for (const article of LANDING_DATA.insights.articles) {
    const docRef = adminDb.collection("insights").doc(article.id);
    await docRef.set({
      ...article,
      createdAt: new Date().toISOString()
    });
    console.log(`Added article: ${article.title}`);
  }

  console.log("Seed complete!");
}

seedData().catch(console.error);
