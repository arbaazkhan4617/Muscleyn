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
  categoryName?: string;
  subCategoryName?: string;
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
  updatedAt?: string;
  isBestSeller?: boolean;
  isOffer?: boolean;
  shortDescription: string;
  description: string;
  nutrition: {
    servingSize: string;
    protein: string;
    carbs: string;
    calories: string;
    keyIngredients: string[];
  };
  customFacts?: any[];
  customBenefits?: string[];
  richDetails?: any;
  variants?: any[];
  productReportUrl?: string | null;
  reportProteinPercentage?: string;
  reportHeavyMetal?: string;
  reportAminoAcidProfile?: string;
  reportMicrobialSafety?: string;
  reportTestDetails?: string | null;
  amazonUrl?: string;
  flipkartUrl?: string;
};


export const categories = [
  {
    name: "Whey Protein",
    slug: "whey-protein",
    image: "",
    description: "Lean muscle recovery blends",
  },
  {
    name: "Mass Gainer",
    slug: "mass-gainer",
    image: "",
    description: "Calorie dense bulking stacks",
  },
  {
    name: "Creatine",
    slug: "creatine",
    image: "",
    description: "Strength and power essentials",
  },
  {
    name: "Pre Workout",
    slug: "pre-workout",
    image: "",
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
    image: "",
    gallery: [],
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
    image: "",
    gallery: [],
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
    image: "",
    gallery: [],
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
    image: "",
    gallery: [],
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
    image: "",
    gallery: [],
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
    image: "",
    gallery: [],
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

export const getBackendImageUrl = (url?: string | null): string => {
  let fallback = "/logo.png";
  if (typeof window !== "undefined") {
    fallback = localStorage.getItem("websiteLogo") || "/logo.png";
  }
  if (!url || url === "" || url === "/images/products/1.jpeg" || url.includes("unsplash.com")) {
    return fallback;
  }
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8081/api";
  const host = apiBase.replace(/\/api$/, "");
  return `${host}${url.startsWith("/") ? "" : "/"}${url}`;
};

export const mapBackendProductToCommerce = (backendProd: any): CommerceProduct => {
  const primaryVariant = backendProd.variants?.[0];
  const priceVal = primaryVariant?.price ? Number(primaryVariant.price) : 0;
  const oldPriceVal = primaryVariant?.oldPrice ? Number(primaryVariant.oldPrice) : 0;
  
  let discountStr = "";
  if (oldPriceVal > priceVal) {
    const diff = oldPriceVal - priceVal;
    const pct = Math.round((diff / oldPriceVal) * 100);
    discountStr = `${pct}% OFF`;
  }
  
  let nutritionObj = {
    servingSize: "1 Scoop (30g)",
    protein: "0g",
    carbs: "0g",
    calories: "0 kcal",
    keyIngredients: [] as string[]
  };
  
  if (backendProd.nutrition) {
    try {
      const parsed = JSON.parse(backendProd.nutrition);
      nutritionObj.servingSize = parsed.servingSize || "1 Scoop (30g)";
      nutritionObj.keyIngredients = parsed.ingredients ? parsed.ingredients.split(",").map((s: string) => s.trim()) : [];
      
      const facts = parsed.facts || [];
      const proteinFact = facts.find((f: any) => f.label?.toLowerCase() === "protein");
      const carbsFact = facts.find((f: any) => f.label?.toLowerCase() === "carbs");
      const caloriesFact = facts.find((f: any) => f.label?.toLowerCase() === "calories");
      
      nutritionObj.protein = proteinFact?.value || "0g";
      nutritionObj.carbs = carbsFact?.value || "0g";
      nutritionObj.calories = caloriesFact?.value || "0 kcal";
    } catch (e) {
      console.error(e);
    }
  }

  let parsedBenefits = [
    "Accelerates muscle protein synthesis",
    "Reduces muscle soreness and fatigue",
    "Mixes instantly with no clumps",
    "Zero artificial colors or dyes",
    "Enhanced with digestive enzymes",
    "Incredible, award-winning taste"
  ];
  let richDetailsObj: any = null;
  if (backendProd.benefits) {
    try {
      const parsed = JSON.parse(backendProd.benefits);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed) && parsed.isRichDetails) {
        richDetailsObj = parsed;
        if (parsed.benefits && Array.isArray(parsed.benefits)) {
          parsedBenefits = parsed.benefits.map((b: any) => typeof b === "string" ? b : (b.title || ""));
        } else if (parsed.advantage && Array.isArray(parsed.advantage.points)) {
          parsedBenefits = parsed.advantage.points;
        }
      } else if (Array.isArray(parsed)) {
        parsedBenefits = parsed;
      }
    } catch (e) {
      console.error(e);
    }
  }

  const galleryImages = backendProd.productImages?.map((img: any) => img.imageUrl) || [];

  let goalVal: ProductGoal = "Protein";
  const catAndSub = `${backendProd.categoryName || ""} ${backendProd.subCategoryName || ""} ${backendProd.name || ""}`.toLowerCase();
  if (catAndSub.includes("gainer") || catAndSub.includes("bulk") || catAndSub.includes("mass")) {
    goalVal = "Muscle Gain";
  } else if (catAndSub.includes("fat") || catAndSub.includes("burn") || catAndSub.includes("carnitine") || catAndSub.includes("cut") || catAndSub.includes("weight management")) {
    goalVal = "Fat Loss";
  } else if (catAndSub.includes("creatine") || catAndSub.includes("strength") || catAndSub.includes("power")) {
    goalVal = "Strength";
  } else if (catAndSub.includes("recovery") || catAndSub.includes("bcaa") || catAndSub.includes("casein") || catAndSub.includes("glutamine") || catAndSub.includes("amino")) {
    goalVal = "Recovery";
  } else if (catAndSub.includes("pre-workout") || catAndSub.includes("pre workout") || catAndSub.includes("energy") || catAndSub.includes("ignite") || catAndSub.includes("rage")) {
    goalVal = "Energy";
  } else if (catAndSub.includes("protein") || catAndSub.includes("whey") || catAndSub.includes("isolate")) {
    goalVal = "Protein";
  }

  return {
    id: backendProd.id,
    variantId: primaryVariant?.id,
    slug: backendProd.name ? backendProd.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "",
    name: backendProd.name || "",
    category: backendProd.subCategoryName || backendProd.categoryName || "Whey Protein",
    categoryName: backendProd.categoryName || "",
    subCategoryName: backendProd.subCategoryName || "",
    brand: backendProd.brandName || "Muscleyn Elite",
    productReportUrl: backendProd.productReportUrl || null,
    reportProteinPercentage: backendProd.reportProteinPercentage || "Pass",
    reportHeavyMetal: backendProd.reportHeavyMetal || "Pass",
    reportAminoAcidProfile: backendProd.reportAminoAcidProfile || "Pass",
    reportMicrobialSafety: backendProd.reportMicrobialSafety || "Pass",
    reportTestDetails: backendProd.reportTestDetails || null,
    goal: goalVal,
    image: getBackendImageUrl(galleryImages.length > 0 ? galleryImages[0] : backendProd.imageUrl),
    gallery: galleryImages.length > 0 
      ? galleryImages.map((img: any) => getBackendImageUrl(img)) 
      : [getBackendImageUrl(backendProd.imageUrl)],
    price: priceVal,
    oldPrice: oldPriceVal,
    discount: discountStr,
    rating: 4.8,
    reviews: 120,
    stock: primaryVariant?.stock ? Number(primaryVariant.stock) : 10,
    popularity: 90,
    createdAt: backendProd.createdAt || new Date().toISOString(),
    updatedAt: backendProd.updatedAt || new Date().toISOString(),
    isBestSeller: backendProd.isBestSeller || false,
    isOffer: backendProd.isOffer || false,
    shortDescription: backendProd.description ? backendProd.description.substring(0, 100) + "..." : "",
    description: backendProd.description || "",
    nutrition: nutritionObj,
    customFacts: backendProd.nutrition ? (() => {
      try {
        return JSON.parse(backendProd.nutrition).facts || [];
      } catch (e) { return []; }
    })() : [],
    customBenefits: parsedBenefits,
    richDetails: richDetailsObj,
    variants: backendProd.variants || [],
    amazonUrl: backendProd.amazonUrl || null,
    flipkartUrl: backendProd.flipkartUrl || null
  } as any;
};
