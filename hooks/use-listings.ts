import { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase-client";
import { Listing } from "@/lib/types";

export function useListings(category?: string, searchTerm?: string, sellerId?: string) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    
    let q = query(
      collection(db, "listings"),
      where("status", "==", "active"),
      orderBy("createdAt", "desc")
    );

    if (category && category !== "All") {
      q = query(q, where("category", "==", category));
    }

    if (sellerId) {
      q = query(q, where("sellerId", "==", sellerId));
    }

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Listing[];
        setListings(items);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore Error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [category, sellerId]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredListings(listings);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = listings.filter(item => 
      item.title.toLowerCase().includes(term) || 
      item.description?.toLowerCase().includes(term) ||
      item.location.toLowerCase().includes(term)
    );
    setFilteredListings(filtered);
  }, [searchTerm, listings]);

  return { listings: filteredListings, loading, error };
}
