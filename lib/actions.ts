import { db, storage } from "./firebase-client";
import { collection, addDoc, serverTimestamp, doc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Listing } from "./types";

export async function createListing(data: Partial<Listing>, images: File[]) {
  try {
    const imageUrls: string[] = [];

    // 1. Upload Images
    for (const image of images) {
      const storageRef = ref(storage, `listings/${Date.now()}-${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      imageUrls.push(url);
    }

    // 2. Create Firestore Doc
    const docRef = await addDoc(collection(db, "listings"), {
      ...data,
      image: imageUrls[0] || "", // Main image
      images: imageUrls,
      status: "active",
      createdAt: new Date().toISOString(),
      serverTimestamp: serverTimestamp(),
    });

    return { id: docRef.id };
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
}
export async function deleteListing(id: string) {
  try {
    await deleteDoc(doc(db, "listings", id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error;
  }
}
