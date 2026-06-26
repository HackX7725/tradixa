"use server";

import { adminDb, adminApp } from "./firebase";
import { getStorage } from "firebase-admin/storage";
import { Listing } from "./types";

export async function createListing(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const location = formData.get("location") as string;
    const sellerId = formData.get("sellerId") as string;
    const imageFiles = formData.getAll("images") as File[];

    const imageUrls: string[] = [];
    
    // 1. Convert Images to Base64 (Server-side)
    for (const file of imageFiles) {
      if (file.size === 0) continue;
      
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const dataUrl = `data:${file.type};base64,${base64}`;
      imageUrls.push(dataUrl);
    }

    // 2. Create Firestore Doc using Admin SDK
    const docRef = await adminDb!.collection("listings").add({
      title,
      category,
      description,
      price,
      location,
      sellerId,
      image: imageUrls[0] || "",
      images: imageUrls,
      status: "active",
      createdAt: new Date().toISOString(),
    });

    return { id: docRef.id };
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
}

export async function deleteListing(id: string) {
  try {
    await adminDb!.collection("listings").doc(id).delete();
    return { success: true };
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error;
  }
}
