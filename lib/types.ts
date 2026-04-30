export interface Listing {
  id: string;
  title: string;
  price: string;
  location: string;
  category: "Vehicles" | "Property" | "Electronics" | "Luxury" | "Business" | string;
  image: string;
  badge?: string;
  sellerId: string;
  createdAt: string;
  status: "active" | "sold" | "pending";
  description?: string;
  specs?: Record<string, string>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Article {
  id: string;
  category: string;
  title: string;
  date: string;
  image: string;
  createdAt: string;
}
