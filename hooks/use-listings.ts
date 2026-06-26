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
    
    // Simplified query to diagnose permission/index issues
    let q = query(
      collection(db, "listings")
    );

    // Re-add status filter if it doesn't cause permission issues
    // q = query(q, where("status", "==", "active"));

    if (category && category !== "All") {
      q = query(q, where("category", "==", category));
    }

    if (sellerId) {
      q = query(q, where("sellerId", "==", sellerId));
    }

    console.log("Fetching listings with query...", { category, sellerId });

    const fetchListings = async () => {
      try {
        const snapshot = await getDocs(q);
        console.log("Listings snapshot received via getDocs, size:", snapshot.size);
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Listing[];
        setListings(items);
      } catch (err: any) {
        console.error("Firestore Permission/Query Error:", err.message, err.code);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [category, sellerId]);

  const refresh = async () => {
    setLoading(true);
    let q = query(collection(db, "listings"));
    if (category && category !== "All") q = query(q, where("category", "==", category));
    if (sellerId) q = query(q, where("sellerId", "==", sellerId));

    try {
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Listing[];
      setListings(items);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

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

  return { listings: filteredListings, loading, error, refresh };
}
