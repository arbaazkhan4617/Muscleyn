"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Flame } from "lucide-react";
import PremiumProductCard from "@/components/product/PremiumProductCard";
import { mapBackendProductToCommerce } from "@/lib/commerce";
import api from "@/services/api";

export default function DealOfTheDay() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [deals, setDeals] = useState<any[]>([]);
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

          // Map items to commerce products
          const mapped = filteredItems.map(mapBackendProductToCommerce);
          setDeals(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic Deals of the Day:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

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
          {deals.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-[380px] shrink-0 snap-start flex flex-col h-full"
            >
              <PremiumProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
