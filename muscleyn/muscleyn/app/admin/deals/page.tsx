"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import { Sparkles, Save, Search, CheckSquare, Square, Package } from "lucide-react";

export default function AdminDealsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // LOAD ALL PRODUCTS (large batch for selection) & CMS DEALS CONFIG
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch products (fetch first page with larger size 100 to show list)
        const productsRes = await api.get("/admin/products?size=100");
        setProducts(productsRes.data.data.content || []);

        // Fetch current deals of the day
        try {
          const cmsRes = await api.get("/cms/deals-of-the-day");
          if (cmsRes.data.data && cmsRes.data.data.cmsValue) {
            const parsed = JSON.parse(cmsRes.data.data.cmsValue);
            if (Array.isArray(parsed)) {
              setSelectedIds(parsed.map(Number));
            }
          }
        } catch (cmsErr: any) {
          console.log("No existing deals found, starting fresh:", cmsErr.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load catalog or deals configuration");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // TOGGLE SELECTION
  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // SAVE DEALS
  const handleSave = async () => {
    try {
      setSaving(true);
      await api.post("/cms", {
        cmsKey: "deals-of-the-day",
        cmsValue: JSON.stringify(selectedIds),
      });
      toast.success("Deals of the Day saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save Deals of the Day");
    } finally {
      setSaving(false);
    }
  };

  // FILTER PRODUCTS FOR SELECTION
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase()) ||
    product.brandName?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading catalog...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-red-500" />
            Deals of the Day
          </h1>
          <p className="text-zinc-400 mt-2 font-medium">
            Toggle which products from your catalog are featured in the homepage Deals of the Day carousel.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-red-600 hover:bg-white hover:text-black text-white px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving Changes..." : "Save Deals Selection"}
        </button>
      </div>

      {/* SEARCH AND COUNTER */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-zinc-900/40 p-6 rounded-2xl border border-white/5">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products to feature..."
            className="w-full bg-black border border-white/10 focus:border-red-500 rounded-full pl-12 pr-6 py-3 outline-none text-white transition-colors text-sm"
          />
        </div>
        <div className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
          Featured Count: <span className="text-red-500 text-lg font-black">{selectedIds.length}</span> / {products.length} products
        </div>
      </div>

      {/* PRODUCTS CHECKLIST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full bg-zinc-900/50 rounded-3xl p-16 text-center border border-white/10">
            <Package className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No matching products found</h3>
            <p className="text-zinc-500 text-sm">Create products or modify your search filter.</p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const isSelected = selectedIds.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => handleToggleSelect(product.id)}
                className={`group cursor-pointer rounded-3xl p-5 border transition-all duration-300 relative flex flex-col justify-between min-h-[140px] select-none ${
                  isSelected
                    ? "bg-red-500/10 border-red-500/30 shadow-[0_0_25px_rgba(220,38,38,0.05)]"
                    : "bg-zinc-900/40 border-white/5 hover:border-white/10 hover:bg-zinc-900/60"
                }`}
              >
                {/* SELECT STATUS INDICATOR */}
                <div className="absolute top-4 right-4 z-10">
                  {isSelected ? (
                    <CheckSquare className="w-5 h-5 text-red-500 fill-red-500/10" />
                  ) : (
                    <Square className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400" />
                  )}
                </div>

                <div className="flex gap-4">
                  {/* PRODUCT IMAGE */}
                  <div className="relative w-16 h-16 rounded-2xl bg-black border border-white/10 overflow-hidden flex-shrink-0">
                    <img
                      src={product.imageUrl || "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2670&auto=format&fit=crop"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="pr-6">
                    <h3 className="font-black text-white text-base leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1.5">
                      {product.brandName || "Unknown Brand"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500">
                    Category: <span className="text-zinc-300 font-semibold">{product.categoryName || "Uncategorized"}</span>
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-red-500/20 text-red-400" : "bg-white/5 text-zinc-400"
                  }`}>
                    {isSelected ? "Featured" : "Catalog"}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
