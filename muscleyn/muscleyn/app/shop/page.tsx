"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Filter,
  Search,
  SlidersHorizontal,
  Star,
  X,
  PackageOpen,
} from "lucide-react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PremiumProductCard from "@/components/product/PremiumProductCard";
import {
  brands,
  categories,
  CommerceProduct,
  formatPrice,
  goals,
  mapBackendProductToCommerce,
} from "@/lib/commerce";
import { useCartStore } from "@/store/cartStore";
import api from "@/services/api";
import { searchProducts } from "@/services/productService";

const pageSize = 6;

const filterButtonClass =
  "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500 hover:text-white hover:bg-white/10";

function ShopPageContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<CommerceProduct[]>([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dynamicGoals, setDynamicGoals] = useState<string[]>(goals);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [dbBrands, setDbBrands] = useState<any[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "latest");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category")!] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get("brand") ? [searchParams.get("brand")!] : []
  );
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    searchParams.get("goal") ? [searchParams.get("goal")!] : []
  );
  const [filterBestSeller, setFilterBestSeller] = useState(searchParams.get("filter") === "best-seller");
  const [filterOffers, setFilterOffers] = useState(searchParams.get("filter") === "offers");
  const [page, setPage] = useState(1);
  const [quickView, setQuickView] = useState<CommerceProduct | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, brandRes, cmsRes] = await Promise.all([
          api.get("/categories"),
          api.get("/brands"),
          api.get("/cms/goals-list"),
        ]);
        if (catRes.data && catRes.data.status) {
          setDbCategories(catRes.data.data || []);
        }
        if (brandRes.data && brandRes.data.status) {
          setDbBrands(brandRes.data.data || []);
        }
        if (cmsRes.data && cmsRes.data.status && cmsRes.data.data) {
          try {
            const parsed = JSON.parse(cmsRes.data.data.cmsValue || "[]");
            const goalTitles = parsed.map((g: any) => g.title);
            if (goalTitles.length > 0) {
              setDynamicGoals(goalTitles);
            }
          } catch (e) {
            console.error("Error parsing dynamic goals:", e);
          }
        }
      } catch (err) {
        console.error("Failed to load filter metadata:", err);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const q = searchParams.get("search");
    if (q !== null) {
      setSearch(q);
    }
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategories([cat]);
    }
    const brnd = searchParams.get("brand");
    if (brnd) {
      setSelectedBrands([brnd]);
    }
    const gl = searchParams.get("goal");
    if (gl) {
      setSelectedGoals([gl]);
    }
    const f = searchParams.get("filter");
    if (f === "best-seller") {
      setFilterBestSeller(true);
      setFilterOffers(false);
    } else if (f === "offers") {
      setFilterOffers(true);
      setFilterBestSeller(false);
    }
    const s = searchParams.get("sort");
    if (s) {
      setSortBy(s);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadFilteredProducts = async () => {
      try {
        setLoading(true);
        let mappedSortBy = "id";
        let direction = "desc";
        if (sortBy === "latest") {
          mappedSortBy = "latest";
          direction = "desc";
        } else if (sortBy === "popular") {
          mappedSortBy = "popularity";
          direction = "desc";
        } else if (sortBy === "low") {
          mappedSortBy = "price";
          direction = "asc";
        } else if (sortBy === "high") {
          mappedSortBy = "price";
          direction = "desc";
        }

        const data = await searchProducts(
          search || undefined,
          selectedCategories.length > 0 ? selectedCategories : undefined,
          selectedBrands.length > 0 ? selectedBrands : undefined,
          selectedGoals.length > 0 ? selectedGoals : undefined,
          filterBestSeller || undefined,
          filterOffers || undefined,
          undefined,
          maxPrice,
          page - 1,
          pageSize,
          mappedSortBy,
          direction
        );

        if (data && data.status) {
          const items = data.data.content || [];
          const mapped = items.map(mapBackendProductToCommerce);
          
          setProducts(mapped);
          setTotalPages(data.data.totalPages || 1);
          setTotalProductsCount(data.data.totalElements || mapped.length);
        }
      } catch (err) {
        console.error("Failed to load products dynamically:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFilteredProducts();
  }, [
    search,
    selectedCategories,
    selectedBrands,
    selectedGoals,
    filterBestSeller,
    filterOffers,
    maxPrice,
    page,
    sortBy,
  ]);

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: (value: string[]) => void
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
    setPage(1);
  };

  const paginatedProducts = products;

  const clearFilters = () => {
    setSearch("");
    setMaxPrice(10000);
    setSortBy("latest");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedGoals([]);
    setFilterBestSeller(false);
    setFilterOffers(false);
    setPage(1);
  };

  const addQuickViewToCart = (product: CommerceProduct) => {
    addToCart({
      id: product.id,
      variantId: (product as any).variantId,
      name: product.name,
      image: product.image,
      price: formatPrice(product.price),
      stock: product.stock,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950 text-white">
        <section className="relative isolate overflow-hidden py-24 md:py-32">
          <Image
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1800&auto=format&fit=crop"
            alt="Premium supplement shop"
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover opacity-25"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/90 to-red-950/20" />
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-red-500">
              PREMIUM FITNESS STORE
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-none tracking-tight md:text-7xl">
              Shop Supplements
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400 font-medium">
              Discover premium protein, strength, recovery, and performance
              supplements crafted for serious training goals.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between border-b border-white/10 pb-10">
            <div>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                All Products
              </h2>
              <p className="mt-3 text-zinc-400 font-medium">
                Showing {products.length > 0 ? `${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, totalProductsCount)}` : "0"} of {totalProductsCount}{" "}
                products
              </p>
            </div>

            <div className="flex w-full flex-col gap-4 md:flex-row xl:w-auto">
              <label className="flex min-h-14 min-w-full items-center rounded-full border border-white/10 bg-white/5 px-5 text-white shadow-sm md:min-w-[360px] focus-within:border-red-500 transition-colors">
                <Search className="mr-3 h-5 w-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search supplements..."
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  className="w-full bg-transparent font-semibold outline-none placeholder:text-zinc-600"
                />
              </label>

              <label className="flex min-h-14 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 text-white shadow-sm focus-within:border-red-500 transition-colors">
                <SlidersHorizontal className="h-5 w-5 text-zinc-400" />
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="bg-transparent font-bold outline-none cursor-pointer appearance-none pr-8"
                  style={{
                    background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E") no-repeat right center/16px`,
                  }}
                >
                  <option value="latest" className="bg-zinc-900 text-white">Latest</option>
                  <option value="popular" className="bg-zinc-900 text-white">Popularity</option>
                  <option value="low" className="bg-zinc-900 text-white">Price Low To High</option>
                  <option value="high" className="bg-zinc-900 text-white">Price High To Low</option>
                </select>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
            <aside className="lg:col-span-1">
              <div className="sticky top-28 rounded-[2rem] border border-white/10 bg-zinc-900 p-7 text-white shadow-2xl">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="flex items-center gap-3 text-2xl font-black">
                    <Filter className="h-6 w-6 text-red-500" />
                    Filters
                  </h3>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm font-black text-red-500 hover:text-white transition"
                  >
                    Clear All
                  </button>
                </div>

                <FilterGroup title="Category">
                  {dbCategories.map((category) => (
                    <FilterPill
                      key={category.name}
                      label={category.name}
                      active={selectedCategories.includes(category.name)}
                      onClick={() =>
                        toggleFilter(
                          category.name,
                          selectedCategories,
                          setSelectedCategories
                        )
                      }
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title="Brand">
                  {dbBrands.map((brand) => (
                    <FilterPill
                      key={brand.name}
                      label={brand.name}
                      active={selectedBrands.includes(brand.name)}
                      onClick={() =>
                        toggleFilter(brand.name, selectedBrands, setSelectedBrands)
                      }
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title="Goal">
                  {dynamicGoals.map((goal) => (
                    <FilterPill
                      key={goal}
                      label={goal}
                      active={selectedGoals.includes(goal)}
                      onClick={() =>
                        toggleFilter(goal, selectedGoals, setSelectedGoals)
                      }
                    />
                  ))}
                </FilterGroup>

                <div className="border-t border-white/10 pt-8">
                  <h3 className="mb-5 text-xl font-black">Price Range</h3>
                  <input
                    type="range"
                    min={500}
                    max={10000}
                    step={500}
                    value={maxPrice}
                    onChange={(event) => {
                      setMaxPrice(Number(event.target.value));
                      setPage(1);
                    }}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                  <div className="mt-3 flex justify-between text-sm font-bold text-zinc-400">
                    <span>₹500</span>
                    <span>{formatPrice(maxPrice)}</span>
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-3">
              {paginatedProducts.length === 0 ? (
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-16 text-center backdrop-blur-sm">
                  <div className="mx-auto h-24 w-24 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-8">
                    <PackageOpen className="h-10 w-10 text-red-500" />
                  </div>
                  <h3 className="mt-8 text-3xl font-black text-white">
                    No products found
                  </h3>
                  <p className="mt-3 text-zinc-400 text-lg">
                    Try changing the filters or search term to discover what you need.
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-8 rounded-full bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedProducts.map((product) => (
                    <PremiumProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setQuickView}
                    />
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="rounded-full border border-white/10 px-6 py-3 font-bold transition hover:bg-white hover:text-zinc-950 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white"
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;

                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => setPage(pageNumber)}
                        className={`h-12 w-12 rounded-full font-black transition ${page === pageNumber
                          ? "bg-red-600 text-white border-transparent shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                          : "border border-white/10 text-zinc-400 hover:bg-white hover:text-zinc-950"
                          }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="rounded-full border border-white/10 px-6 py-3 font-bold transition hover:bg-white hover:text-zinc-950 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <AnimatePresence>
          {quickView && (
            <motion.div
              className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.96 }}
                className="grid max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-zinc-900 border border-white/10 text-white shadow-2xl md:grid-cols-2"
              >
                <div className="relative min-h-[420px] bg-black">
                  <Image
                    src={quickView.image}
                    alt={quickView.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                <div className="p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-red-900/50">
                      {quickView.discount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuickView(null)}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 border border-white/20 transition hover:bg-red-600 hover:border-red-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
                    {quickView.brand}
                  </p>
                  <h3 className="mt-3 text-4xl font-black tracking-tight text-white">
                    {quickView.name}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-sm font-bold">
                    <div className="flex items-center gap-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      {quickView.rating}
                    </div>
                    <span className="text-zinc-500">({quickView.reviews} reviews)</span>
                  </div>
                  <p className="mt-5 leading-8 text-zinc-400">
                    {quickView.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {Object.entries(quickView.nutrition)
                      .filter(([key]) => key !== "keyIngredients")
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="rounded-2xl border border-white/10 bg-white/5 p-4"
                        >
                          <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                            {key.replace(/([A-Z])/g, " $1")}
                          </p>
                          <p className="mt-2 text-xl font-black text-white">{value}</p>
                        </div>
                      ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-3xl font-black text-red-500">
                        {formatPrice(quickView.price)}
                      </p>
                      <p className="font-semibold text-zinc-500 line-through">
                        {formatPrice(quickView.oldPrice)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        addQuickViewToCart(quickView);
                        setQuickView(null);
                      }}
                      className="rounded-full bg-red-600 px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transition hover:scale-105 hover:bg-white hover:text-black"
                    >
                      Add to Cart
                    </button>
                  </div>

                  <Link
                    href={`/product/${quickView.id}`}
                    onClick={() => setQuickView(null)}
                    className="mt-6 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.16em] text-zinc-400 transition hover:text-white"
                  >
                    View full details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4 text-white">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Shop Catalog...</div>
      </div>
    }>
      <ShopPageContent />
    </Suspense>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 border-t border-white/10 pt-8 first:border-t-0 first:pt-0">
      <h3 className="mb-4 text-xl font-black text-white">{title}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${filterButtonClass} ${active ? "!border-red-600 !bg-red-600 !text-white" : ""
        }`}
    >
      <span className="inline-flex items-center gap-2">
        {active && <Check className="h-4 w-4" />}
        {label}
      </span>
    </button>
  );
}
