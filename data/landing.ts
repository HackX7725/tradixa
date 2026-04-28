export const LANDING_DATA = {
  navigation: {
    logo: "Tradixa",
    links: [
      { label: "Marketplace", href: "/marketplace" },
      { label: "Properties", href: "/properties" },
      { label: "Vehicles", href: "/vehicles" },
      { label: "Insights", href: "/insights" },
    ],
    auth: {
      login: "Sign In",
      register: "Join",
    }
  },
  hero: {
    badge: "Launching in Pakistan",
    title: "The premier marketplace for Pakistan's",
    highlight: "elite assets.",
    subtitle: "Buy, sell, and trade high-value properties, luxury vehicles, and technology with unmatched security in Karachi, Lahore, and Islamabad.",
    searchPlaceholder: "Search for luxury cars, DHA property, or high-end electronics...",
    trending: ["Toyota Land Cruiser", "DHA Phase 6", "iPhone 15 Pro Max", "Bahria Town"],
  },
  sell: {
    title: "Sell your assets faster in Pakistan",
    subtitle: "List your high-value property or vehicles and reach a verified network of elite buyers across the country.",
    button: "Post your Ad",
    image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=1200"
  },
  featured: {
    badge: "Spotlight",
    title: "Luxury Living in Islamabad",
    subtitle: "Discover the most exclusive penthouses and villas in E-7 and Gulberg, curated for the modern investor.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    button: "View Listings"
  },
  categories: [
    { id: "vehicles", label: "Vehicles", icon: "Car" },
    { id: "property", label: "Property", icon: "Home" },
    { id: "electronics", label: "Electronics", icon: "Cpu" },
    { id: "luxury", label: "Luxury", icon: "Gem" },
    { id: "business", label: "Business", icon: "Briefcase" },
    { id: "more", label: "More", icon: "PlusCircle" },
  ],
  listings: [
    {
      id: "1",
      title: "2024 Toyota Land Cruiser V8",
      price: "Rs 85,000,000",
      location: "Lahore, PK",
      category: "Vehicles",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800",
      badge: "Featured",
    },
    {
      id: "2",
      title: "1 Kanal Modern Villa - DHA Phase 6",
      price: "Rs 125,000,000",
      location: "Lahore, PK",
      category: "Property",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "3",
      title: "Custom AI Workstation (Nvidia RTX 4090)",
      price: "Rs 1,200,000",
      location: "Karachi, PK",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800",
      badge: "New",
    },
    {
      id: "4",
      title: "Luxury Apartment - Centaurus",
      price: "Rs 45,000,000",
      location: "Islamabad, PK",
      category: "Property",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
    },
  ],
  insights: {
    title: "Pakistan Market Insights",
    articles: [
      { id: "1", category: "Report", title: "The Future of Real Estate in Ravi City", date: "May 12, 2026", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
      { id: "2", category: "Analysis", title: "Automotive Import Trends in 2026", date: "May 10, 2026", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800" },
      { id: "3", category: "Insight", title: "Luxury Retail Growth in Karachi", date: "May 08, 2026", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" },
    ]
  },
  security: {
    title: "Pakistan's Safest Marketplace",
    subtitle: "Tradixa ensures a secure environment for buyers and sellers across Pakistan through verified identity audits.",
    features: [
      { title: "CNIC Verification", desc: "Every user is verified via institutional identity audits." },
      { title: "Escrow Protocol", desc: "Secure settlement for high-value transactions." },
      { title: "Nationwide Logistics", desc: "Verified delivery partners for all cities." }
    ]
  },
  global: {
    title: "Browse by City",
    subtitle: "Explore premium assets in your local city.",
    cities: [
      { name: "Karachi", region: "Sindh" },
      { name: "Lahore", region: "Punjab" },
      { name: "Islamabad", region: "Capital" },
      { name: "Faisalabad", region: "Punjab" },
      { name: "Rawalpindi", region: "Punjab" }
    ]
  },
  partners: [
    "DHA", "Bahria Town", "Emaar Pakistan", "Habib Bank", "Lucky One"
  ],
  cta: {
    title: "Ready to trade in Pakistan?",
    subtitle: "Join the country's most elite trading network today.",
    button: "Post your Ad"
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      { q: "How do I verify my institutional identity?", a: "Verification requires a valid CNIC audit and biometric onboarding via our secure vault." },
      { q: "What are the trading fees on Tradixa?", a: "Fees are transparent and competitive, scaled based on asset value and volume." },
      { q: "Is international shipping handled by the platform?", a: "Yes, our white-glove logistics partners handle all international transport and insurance." },
    ]
  },
  footer: {
    copyright: "© 2026 Tradixa Pakistan. All rights reserved.",
    columns: [
      {
        title: "Platform",
        links: [
          { label: "Marketplace", href: "#" },
          { label: "Properties", href: "#" },
          { label: "Vehicles", href: "#" },
          { label: "Support", href: "#" }
        ]
      },
      {
        title: "Cities",
        links: [
          { label: "Karachi", href: "#" },
          { label: "Lahore", href: "#" },
          { label: "Islamabad", href: "#" },
          { label: "Faisalabad", href: "#" }
        ]
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Use", href: "#" },
          { label: "Safety Tips", href: "#" },
          { label: "Compliance", href: "#" }
        ]
      }
    ],
    socials: ["Twitter", "LinkedIn", "Instagram", "Facebook"]
  }
};
