export type ProductGoal =
  | "Muscle Gain"
  | "Fat Loss"
  | "Protein"
  | "Strength"
  | "Recovery"
  | "Energy";

export type CommerceProduct = {
  id: number;
  slug: string;
  name: string;
  category: string;
  brand: string;
  goal: ProductGoal;
  image: string;
  gallery: string[];
  price: number;
  oldPrice: number;
  discount: string;
  rating: number;
  reviews: number;
  stock: number;
  popularity: number;
  createdAt: string;
  shortDescription: string;
  description: string;
  nutrition: {
    servingSize: string;
    protein: string;
    carbs: string;
    calories: string;
    keyIngredients: string[];
  };
};

export const categories = [
  {
    name: "Whey Protein",
    slug: "whey-protein",
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1200&auto=format&fit=crop",
    description: "Lean muscle recovery blends",
  },
  {
    name: "Mass Gainer",
    slug: "mass-gainer",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    description: "Calorie dense bulking stacks",
  },
  {
    name: "Creatine",
    slug: "creatine",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    description: "Strength and power essentials",
  },
  {
    name: "Pre Workout",
    slug: "pre-workout",
    image:
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1200&auto=format&fit=crop",
    description: "Energy, pump and focus",
  },
];

export const products: CommerceProduct[] = [
  {
    id: 1,
    slug: "elite-whey-isolate",
    name: "Elite Whey Isolate",
    category: "Whey Protein",
    brand: "Muscleyn Elite",
    goal: "Protein",
    image: "/images/products/1.jpeg",
    gallery: [
      "/images/products/1.jpeg",
      "/images/products/1.jpeg",
    ],
    price: 2499,
    oldPrice: 3499,
    discount: "30% OFF",
    rating: 4.9,
    reviews: 128,
    stock: 18,
    popularity: 98,
    createdAt: "2026-05-10",
    shortDescription: "Fast digesting isolate for lean recovery and strength.",
    description:
      "A clean, fast-absorbing whey isolate crafted for serious lifters who want high protein, smooth mixability, and a premium recovery experience.",
    nutrition: {
      servingSize: "33g",
      protein: "27g",
      carbs: "2g",
      calories: "122 kcal",
      keyIngredients: ["Whey protein isolate", "Digestive enzymes", "Cocoa"],
    },
  },
  {
    id: 2,
    slug: "mass-forge-gainer",
    name: "Mass Forge Gainer",
    category: "Mass Gainer",
    brand: "Muscleyn Bulk",
    goal: "Muscle Gain",
    image: "/images/products/2.jpeg",
    gallery: [
      "/images/products/2.jpeg",
      "/images/products/2.jpeg",
    ],
    price: 3299,
    oldPrice: 4299,
    discount: "23% OFF",
    rating: 4.7,
    reviews: 96,
    stock: 11,
    popularity: 89,
    createdAt: "2026-04-28",
    shortDescription: "High-calorie lean bulk formula with complex carbs.",
    description:
      "A performance mass blend made for athletes struggling to hit surplus calories without compromising on taste or quality.",
    nutrition: {
      servingSize: "150g",
      protein: "32g",
      carbs: "92g",
      calories: "560 kcal",
      keyIngredients: ["Whey blend", "Oat carbs", "MCT", "Creatine"],
    },
  },
  {
    id: 3,
    slug: "creatine-monohydrate-pro",
    name: "Creatine Monohydrate Pro",
    category: "Creatine",
    brand: "Muscleyn Lab",
    goal: "Strength",
    image: "/images/products/3.jpeg",
    gallery: [
      "/images/products/3.jpeg",
      "/images/products/3.jpeg",
    ],
    price: 1499,
    oldPrice: 1999,
    discount: "25% OFF",
    rating: 4.8,
    reviews: 74,
    stock: 32,
    popularity: 93,
    createdAt: "2026-05-16",
    shortDescription: "Micronized creatine for power, volume, and recovery.",
    description:
      "Pure micronized creatine monohydrate designed to improve training output, strength progression, and muscle cell hydration.",
    nutrition: {
      servingSize: "5g",
      protein: "0g",
      carbs: "0g",
      calories: "0 kcal",
      keyIngredients: ["Micronized creatine monohydrate"],
    },
  },
  {
    id: 4,
    slug: "rage-pre-workout",
    name: "Rage Pre Workout",
    category: "Pre Workout",
    brand: "Muscleyn Ignite",
    goal: "Energy",
    image: "/images/products/4.jpeg",
    gallery: [
      "/images/products/4.jpeg",
      "/images/products/4.jpeg",
    ],
    price: 1999,
    oldPrice: 2699,
    discount: "26% OFF",
    rating: 4.6,
    reviews: 88,
    stock: 9,
    popularity: 84,
    createdAt: "2026-04-15",
    shortDescription: "High-intensity pump and focus formula.",
    description:
      "A powerful pre-workout built for athletes who want clean energy, sharper focus, and a strong pump without a heavy crash.",
    nutrition: {
      servingSize: "12g",
      protein: "0g",
      carbs: "1g",
      calories: "8 kcal",
      keyIngredients: ["Citrulline", "Beta alanine", "Caffeine", "Taurine"],
    },
  },
  {
    id: 5,
    slug: "night-recovery-casein",
    name: "Night Recovery Casein",
    category: "Whey Protein",
    brand: "Muscleyn Elite",
    goal: "Recovery",
    image: "/images/products/5.jpeg",
    gallery: [
      "/images/products/5.jpeg",
    ],
    price: 2799,
    oldPrice: 3599,
    discount: "22% OFF",
    rating: 4.5,
    reviews: 42,
    stock: 15,
    popularity: 71,
    createdAt: "2026-03-22",
    shortDescription: "Slow-release protein for overnight recovery.",
    description:
      "A rich micellar casein blend designed to support sustained amino acid delivery while you sleep.",
    nutrition: {
      servingSize: "35g",
      protein: "25g",
      carbs: "4g",
      calories: "138 kcal",
      keyIngredients: ["Micellar casein", "Magnesium", "Cocoa"],
    },
  },
  {
    id: 6,
    slug: "lean-burn-l-carnitine",
    name: "Lean Burn L-Carnitine",
    category: "Fat Burner",
    brand: "Muscleyn Cut",
    goal: "Fat Loss",
    image: "/images/products/6.jpeg",
    gallery: [
      "/images/products/6.jpeg",
    ],
    price: 1199,
    oldPrice: 1699,
    discount: "29% OFF",
    rating: 4.4,
    reviews: 55,
    stock: 21,
    popularity: 76,
    createdAt: "2026-05-01",
    shortDescription: "Cutting support for active fat metabolism.",
    description:
      "A clean L-Carnitine formula for athletes combining disciplined nutrition with high-output training.",
    nutrition: {
      servingSize: "10ml",
      protein: "0g",
      carbs: "0g",
      calories: "5 kcal",
      keyIngredients: ["L-Carnitine", "Green tea extract", "B vitamins"],
    },
  },
];

export const goals: ProductGoal[] = [
  "Muscle Gain",
  "Fat Loss",
  "Protein",
  "Strength",
  "Recovery",
  "Energy",
];

export const brands = Array.from(
  new Set(products.map((product) => product.brand))
);

export const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Men's Physique Athlete",
    quote:
      "The recovery stack feels premium and reliable. My training volume went up without feeling wrecked.",
  },
  {
    name: "Nisha Kapoor",
    role: "Strength Coach",
    quote:
      "Clean formulas, bold flavor, and a brand experience my clients actually trust.",
  },
  {
    name: "Rohan Iyer",
    role: "Transformation Client",
    quote:
      "The whey and creatine combo helped me stay consistent through a 14-week transformation.",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
