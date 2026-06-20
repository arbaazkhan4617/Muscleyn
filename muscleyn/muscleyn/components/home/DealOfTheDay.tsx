"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingCart, Star, Gift, Flame } from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, mapBackendProductToCommerce } from "@/lib/commerce";
import api from "@/services/api";

const getGiftForProduct = (productName: string, category: string) => {
  const nameLower = productName.toLowerCase();
  const catLower = category.toLowerCase();
  if (
    catLower.includes("protein") ||
    nameLower.includes("protein") ||
    catLower.includes("gainer")
  ) {
    return {
      giftName: "Premium Gym Shaker",
      giftImage: "/images/products/1.jpeg",
      giftTag: "FREE SHAKER",
    };
  }
  return {
    giftName: "Creatine Monohydrate 100g",
    giftImage: "/images/products/3.jpeg",
    giftTag: "FREE CREATINE",
  };
};

export default function DealOfTheDay() {
  const addToCart = useCartStore((state) => state.addToCart);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [deals, setDeals] = useState<any[]>([]);
  const [timeLefts, setTimeLefts] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // LOAD DYNAMIC DEALS FROM CMS & PRODUCTS CATALOG
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        // Get configured deals
        const cmsRes = await api.get("/cms/deals-of-the-day");
        let selectedIds: number[] = [];
        if (cmsRes.data.data && cmsRes.data.data.cmsValue) {
          const parsed = JSON.parse(cmsRes.data.data.cmsValue);
          if (Array.isArray(parsed)) {
            selectedIds = parsed.map(Number);
          }
        }

        // Get active products
        const productsRes = await api.get("/products");
        if (productsRes.data && productsRes.data.status) {
          const allItems = productsRes.data.data.content || productsRes.data.data || [];
          let filteredItems = allItems;

          // If admin has configured specific deals, filter down to them
          if (selectedIds.length > 0) {
            filteredItems = allItems.filter((p: any) => selectedIds.includes(p.id));
          }

          // Map items and assign dynamic gifts/timers
          const mapped = filteredItems.map((item: any, idx: number) => {
            const commerce = mapBackendProductToCommerce(item);
            const gift = getGiftForProduct(commerce.name, commerce.category);
            return {
              ...commerce,
              ...gift,
              discount: commerce.discount || "20% OFF",
              endTime: 3600 * (12 + ((idx * 7) % 24)), // Deterministic unique duration per deal
            };
          });

          setDeals(mapped);
          setTimeLefts(mapped.map((m: any) => m.endTime));
        }
      } catch (err) {
        console.error("Failed to fetch dynamic Deals of the Day:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  useEffect(() => {
    if (timeLefts.length === 0) return;
    const interval = setInterval(() => {
      setTimeLefts((prev) =>
        prev.map((time) => (time > 0 ? time - 1 : 0))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLefts.length]);

  const formatTimer = (seconds: number) => {
    if (!seconds) return "00:00:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      variantId: product.variantId || product.id,
      name: product.name,
      image: product.image,
      price: formatPrice(product.price),
      stock: product.stock,
    });
    toast.success(`${product.name} with ${product.giftName} added to cart!`);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="py-24 bg-zinc-950 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
          Loading Daily Deals...
        </div>
      </div>
    );
  }

  if (deals.length === 0) {
    return null; // Suppress section if no deals are present
  }

  return (
    <section className="py-24 bg-zinc-950 border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-red-500 mb-3">
              <Flame className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              Limited-Time Offers
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Deals Of The Day
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition flex items-center justify-center cursor-pointer"
              aria-label="Previous Deal"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition flex items-center justify-center cursor-pointer"
              aria-label="Next Deal"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {deals.map((product, idx) => {
            const timeRemaining = timeLefts[idx] || 0;
            return (
              <div
                key={product.id}
                className="w-full sm:w-[380px] shrink-0 snap-start bg-zinc-900 border border-white/10 rounded-[2.5rem] p-6 hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-2xl"
              >
                {/* Glowing border highlight */}
                <div className="absolute inset-x-8 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Free badge */}
                <div className="absolute left-6 top-6 z-10 flex flex-col gap-2">
                  <span className="bg-red-600 text-white text-[10px] font-black tracking-wider px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
                    <Gift className="w-3.5 h-3.5 fill-white/10" />
                    {product.giftTag}
                  </span>
                  <span className="bg-zinc-950/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider">
                    {product.discount}
                  </span>
                </div>

                {/* Deal Timer */}
                <div className="absolute right-6 top-6 z-10 bg-red-500/10 border border-red-500/20 px-3.5 py-1.5 rounded-full text-xs font-black text-red-500 tracking-wider backdrop-blur-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  {formatTimer(timeRemaining)}
                </div>

                {/* Images layout - Main Product & Gift Product side-by-side */}
                <div className="relative h-56 w-full flex items-center justify-center gap-4 bg-zinc-950/40 rounded-2xl p-4 mt-8 mb-6 border border-white/5">
                  <div className="relative h-44 w-1/2 transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-contain"
                    />
                  </div>
                  {/* Plus Icon between items */}
                  <div className="text-zinc-500 font-black text-2xl z-10">+</div>

                  {/* Gift Product Preview */}
                  <div className="relative h-32 w-1/3 opacity-70 group-hover:opacity-90 transition-all duration-500 flex flex-col items-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={product.giftImage}
                        alt={product.giftName}
                        fill
                        sizes="(max-width: 768px) 30vw, 15vw"
                        className="object-contain"
                      />
                    </div>
                    {/* Tiny badge indicating the Gift itself */}
                    <span className="absolute -bottom-2 text-[8px] font-extrabold bg-zinc-950 text-red-400 px-2 py-0.5 border border-white/10 rounded-full tracking-wide text-center truncate max-w-full">
                      FREE Gift
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center gap-4 mb-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-red-500">
                        {product.category}
                      </p>
                      <div className="flex items-center gap-1 text-yellow-500 text-xs font-black">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {product.rating}
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-white leading-snug group-hover:text-red-500 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-xs text-zinc-400 font-medium">
                      Includes a free <span className="text-red-400 font-bold">{product.giftName}</span> at no extra cost.
                    </p>
                  </div>

                  {/* Purchase Area */}
                  <div className="mt-6 pt-5 border-t border-white/5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-2xl font-black text-red-500">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-xs font-semibold text-zinc-500 line-through">
                        {formatPrice(product.oldPrice)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="h-12 w-12 rounded-full bg-red-600 hover:bg-white text-white hover:text-zinc-950 transition-all flex items-center justify-center cursor-pointer shadow-lg shadow-red-950/30 hover:scale-105"
                      aria-label={`Buy deal for ${product.name}`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
