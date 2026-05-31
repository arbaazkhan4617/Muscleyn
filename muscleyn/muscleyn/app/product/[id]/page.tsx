"use client";

import { use, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingCart,
  Zap,
  ArrowRight,
  ShieldCheck,
  Package,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PremiumProductCard from "@/components/product/PremiumProductCard";
import { useCartStore } from "@/store/cartStore";
import { products, formatPrice, CommerceProduct } from "@/lib/commerce";
import api from "@/services/api";

const mapBackendProductToCommerce = (backendProd: any): CommerceProduct => {
  const primaryVariant = backendProd.variants?.[0];
  const priceVal = primaryVariant?.price ? Number(primaryVariant.price) : 0;
  const oldPriceVal = primaryVariant?.oldPrice ? Number(primaryVariant.oldPrice) : 0;
  
  // Calculate discount percentage
  let discountStr = "";
  if (oldPriceVal > priceVal) {
    const diff = oldPriceVal - priceVal;
    const pct = Math.round((diff / oldPriceVal) * 100);
    discountStr = `${pct}% OFF`;
  }
  
  // Parse nutrition facts
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

  // Parse benefits list
  let parsedBenefits = [
    "Accelerates muscle protein synthesis",
    "Reduces muscle soreness and fatigue",
    "Mixes instantly with no clumps",
    "Zero artificial colors or dyes",
    "Enhanced with digestive enzymes",
    "Incredible, award-winning taste"
  ];
  if (backendProd.benefits) {
    try {
      parsedBenefits = JSON.parse(backendProd.benefits) || parsedBenefits;
    } catch (e) {
      console.error(e);
    }
  }

  const galleryImages = backendProd.productImages?.map((img: any) => img.imageUrl) || [];

  return {
    id: backendProd.id,
    variantId: primaryVariant?.id,
    slug: backendProd.name ? backendProd.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "",
    name: backendProd.name || "",
    category: backendProd.subCategoryName || backendProd.categoryName || "Whey Protein",
    brand: backendProd.brandName || "Muscleyn Elite",
    goal: "Protein",
    image: backendProd.imageUrl || "/images/products/1.jpeg",
    gallery: galleryImages.length > 0 ? galleryImages : [backendProd.imageUrl || "/images/products/1.jpeg"],
    price: priceVal,
    oldPrice: oldPriceVal,
    discount: discountStr,
    rating: 4.8,
    reviews: 120,
    stock: primaryVariant?.stock ? Number(primaryVariant.stock) : 10,
    popularity: 90,
    createdAt: new Date().toISOString(),
    shortDescription: backendProd.description ? backendProd.description.substring(0, 100) + "..." : "",
    description: backendProd.description || "",
    nutrition: nutritionObj,
    customFacts: backendProd.nutrition ? (() => {
      try {
        return JSON.parse(backendProd.nutrition).facts || [];
      } catch (e) { return []; }
    })() : [],
    customBenefits: parsedBenefits
  } as any;
};

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const { id } = use(params);

  const [product, setProduct] = useState<CommerceProduct | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  
  const imageRef = useRef<HTMLDivElement>(null);
  const hasInitializedQuantity = useRef(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        if (response.data && response.data.status && response.data.data) {
          const mapped = mapBackendProductToCommerce(response.data.data);
          setProduct(mapped);
          setActiveImage(mapped.image);
        } else {
          throw new Error("Invalid product data");
        }
      } catch (err) {
        console.warn("Could not load product from backend, using local mock data fallback.", err);
        const foundProduct = products.find((p) => p.id.toString() === id);
        if (foundProduct) {
          setProduct(foundProduct);
          setActiveImage(foundProduct.image);
        }
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (product && !hasInitializedQuantity.current && cartItems.length >= 0) {
      const existingItem = cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        setQuantity(existingItem.quantity);
      }
      hasInitializedQuantity.current = true;
    }
  }, [product, cartItems]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-3xl font-bold text-white">
        Loading Premium Details...
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    
    // Limit quantity to available stock
    const finalQuantity = Math.min(quantity, product.stock);

    if (existingItem) {
      updateQuantity(product.id, finalQuantity);
      toast.success(`${product.name} quantity in cart updated to ${finalQuantity}`);
    } else {
      addToCart({
        id: product.id,
        variantId: (product as any).variantId,
        name: product.name,
        image: product.image,
        price: formatPrice(product.price),
        stock: product.stock,
      }, finalQuantity);
      toast.success(`${finalQuantity} ${product.name} added to cart`);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <>
      <Navbar />

      <main className="bg-zinc-950 min-h-screen text-white pb-32">
        {/* BREADCRUMB */}
        <div className="border-b border-white/10 bg-zinc-900/50 backdrop-blur-md sticky top-[72px] z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition">Shop</Link>
            <span>/</span>
            <span className="text-red-500">{product.name}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24">
            
            {/* LEFT: GALLERY */}
            <div className="flex flex-col gap-6">
              <div 
                ref={imageRef}
                className="relative aspect-square w-full rounded-[2.5rem] bg-black overflow-hidden border border-white/10 cursor-zoom-in group shadow-2xl"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
                  priority
                />
                
                {/* Zoomed Image */}
                <div 
                  className={`absolute inset-0 z-10 transition-opacity duration-300 ${isZoomed ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                    backgroundSize: '200%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />

                <span className="absolute left-6 top-6 z-20 rounded-full bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white shadow-lg">
                  {product.discount}
                </span>
                
                <button className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 border border-white/20 backdrop-blur-md text-white transition hover:bg-red-600">
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              {/* THUMBNAILS */}
              <div className="grid grid-cols-4 gap-4">
                {[product.image, ...(product.gallery || [])].slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.3)] scale-95' : 'border-transparent bg-white/5 hover:border-white/20'}`}
                  >
                    <Image src={img} alt={`View ${i+1}`} fill className="object-cover opacity-80 hover:opacity-100 transition" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: INFO */}
            <div className="flex flex-col">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
                    {product.brand}
                  </span>
                  <div className="h-4 w-px bg-white/20" />
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">
                    {product.category}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 text-yellow-500 text-sm font-bold">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    {product.rating}
                  </div>
                  <span className="text-zinc-400 font-medium underline decoration-zinc-700 underline-offset-4 cursor-pointer hover:text-white">
                    Read {product.reviews} Reviews
                  </span>
                </div>
              </div>

              <p className="text-lg text-zinc-300 leading-relaxed mb-10 font-medium">
                {product.description}
              </p>

              {/* KEY NUTRITION (Mini) */}
              <div className={`grid gap-4 mb-10 ${
                (product as any).customFacts && (product as any).customFacts.length > 0
                  ? `grid-cols-2 sm:grid-cols-${Math.min(4, (product as any).customFacts.length)}`
                  : 'grid-cols-3'
              }`}>
                {(product as any).customFacts && (product as any).customFacts.length > 0 ? (
                  (product as any).customFacts.map((fact: any, index: number) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                      <span className="text-3xl font-black text-white">{fact.value}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">{fact.label}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                      <span className="text-3xl font-black text-white">{product.nutrition.protein}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">Protein</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                      <span className="text-3xl font-black text-white">{product.nutrition.carbs}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">Carbs</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                      <span className="text-3xl font-black text-white">{product.nutrition.calories}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">Calories</span>
                    </div>
                  </>
                )}
              </div>

              {/* PRICE & ADD TO CART */}
              <div className="p-8 rounded-[2rem] bg-zinc-900 border border-white/10 shadow-2xl mb-10">
                <div className="flex items-end gap-4 mb-8">
                  <span className="text-5xl font-black text-red-500">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xl font-bold text-zinc-500 line-through mb-1">
                    {formatPrice(product.oldPrice)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center justify-between bg-black border border-white/10 rounded-full px-4 sm:w-1/3 min-h-[60px]">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-black hover:bg-white/10 transition">-</button>
                    <span className="text-xl font-black">{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-black hover:bg-white/10 transition">+</button>
                  </div>
                  <button onClick={handleAddToCart} className="flex-1 min-h-[60px] bg-red-600 hover:bg-white hover:text-black rounded-full flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                    <ShoppingCart className="w-5 h-5" /> Add To Cart
                  </button>
                </div>
                <button onClick={handleBuyNow} className="w-full mt-4 min-h-[60px] bg-white text-black hover:bg-zinc-300 rounded-full flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest transition-all">
                  <Zap className="w-5 h-5" /> Buy Now
                </button>
                
                <div className="mt-6 flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-zinc-500">
                  <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Secure Checkout</div>
                  <div className="flex items-center gap-2"><Package className="w-4 h-4 text-blue-500" /> Free Shipping</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* DETAILS TABS */}
        <div className="max-w-7xl mx-auto px-4 mt-24">
          <div className="flex items-center justify-center gap-8 border-b border-white/10 pb-4 mb-12">
            {['description', 'nutrition', 'benefits'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-black uppercase tracking-widest pb-4 relative transition-colors ${activeTab === tab ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-[-17px] left-0 right-0 h-1 bg-red-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div key="desc" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}>
                  <h3 className="text-3xl font-black mb-6">Why {product.name}?</h3>
                  <p className="text-lg text-zinc-400 leading-relaxed mb-6">
                    Formulated for athletes who demand the best, this premium blend delivers rapidly absorbing nutrients to ignite muscle protein synthesis and accelerate recovery. Every scoop is packed with high-quality, bioavailable ingredients.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6 mt-10">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <Activity className="w-8 h-8 text-red-500 mb-4" />
                      <h4 className="text-xl font-black mb-2">Fast Absorption</h4>
                      <p className="text-zinc-400 text-sm">Micro-filtered for extreme purity and rapid digestion post-workout.</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <ShieldCheck className="w-8 h-8 text-red-500 mb-4" />
                      <h4 className="text-xl font-black mb-2">Banned Substance Tested</h4>
                      <p className="text-zinc-400 text-sm">Certified safe for sport and rigorously tested for heavy metals and impurities.</p>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === 'nutrition' && (
                <motion.div key="nutr" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}>
                  <div className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-white/10 bg-black/50">
                      <h3 className="text-2xl font-black">Supplement Facts</h3>
                      <p className="text-zinc-500 text-sm mt-1">Serving Size: {product.nutrition.servingSize}</p>
                    </div>
                    <div className="p-6 divide-y divide-white/5">
                      {(product as any).customFacts && (product as any).customFacts.length > 0 ? (
                        (product as any).customFacts.map((fact: any, index: number) => (
                          <div key={index} className="flex justify-between py-4">
                            <span className="font-bold text-zinc-300 uppercase tracking-wider text-sm">{fact.label}</span>
                            <span className="font-black text-white">{fact.value}</span>
                          </div>
                        ))
                      ) : (
                        Object.entries(product.nutrition).filter(([k])=>k!=='keyIngredients'&&k!=='servingSize').map(([key, val]) => (
                          <div key={key} className="flex justify-between py-4">
                            <span className="font-bold text-zinc-300 uppercase tracking-wider text-sm">{key}</span>
                            <span className="font-black text-white">{val as string}</span>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-6 bg-white/5 border-t border-white/10">
                      <p className="font-bold text-zinc-300 uppercase tracking-wider text-sm mb-3">Key Ingredients</p>
                      <p className="text-zinc-400 leading-relaxed font-medium">
                        {product.nutrition.keyIngredients.join(", ")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === 'benefits' && (
                <motion.div key="bene" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="grid sm:grid-cols-2 gap-6">
                  {((product as any).customBenefits || [
                    "Accelerates muscle protein synthesis",
                    "Reduces muscle soreness and fatigue",
                    "Mixes instantly with no clumps",
                    "Zero artificial colors or dyes",
                    "Enhanced with digestive enzymes",
                    "Incredible, award-winning taste"
                  ]).map((benefit: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                      <CheckCircle2 className="w-6 h-6 text-red-500 shrink-0" />
                      <p className="font-bold text-lg text-zinc-200">{benefit}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* FREQUENTLY BOUGHT TOGETHER */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 mt-32 pt-24 border-t border-white/10">
            <div className="mb-12 text-center">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
                Complete The Stack
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight">
                Frequently Bought Together
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map(p => (
                <PremiumProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}