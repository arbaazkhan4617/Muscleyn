"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, FileText } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CommerceProduct, mapBackendProductToCommerce } from "@/lib/commerce";
import api from "@/services/api";

const colorMap: Record<string, {
  text: string;
  hoverBorder: string;
  iconBg: string;
  iconBorder: string;
  iconHoverBorder: string;
  iconShadow: string;
  hoverText: string;
}> = {
  yellow: {
    text: "text-yellow-500",
    hoverBorder: "hover:border-yellow-500/30",
    iconBg: "bg-yellow-500/10",
    iconBorder: "border-yellow-500/20",
    iconHoverBorder: "group-hover:border-yellow-500/60",
    iconShadow: "shadow-[0_0_15px_rgba(234,179,8,0.1)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]",
    hoverText: "group-hover:text-yellow-500"
  },
  blue: {
    text: "text-blue-500",
    hoverBorder: "hover:border-blue-500/30",
    iconBg: "bg-blue-500/10",
    iconBorder: "border-blue-500/20",
    iconHoverBorder: "group-hover:border-blue-500/60",
    iconShadow: "shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    hoverText: "group-hover:text-blue-500"
  },
  green: {
    text: "text-green-500",
    hoverBorder: "hover:border-green-500/30",
    iconBg: "bg-green-500/10",
    iconBorder: "border-green-500/20",
    iconHoverBorder: "group-hover:border-green-500/60",
    iconShadow: "shadow-[0_0_15px_rgba(34,197,94,0.1)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]",
    hoverText: "group-hover:text-green-500"
  },
  emerald: {
    text: "text-emerald-500",
    hoverBorder: "hover:border-emerald-500/30",
    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-500/20",
    iconHoverBorder: "group-hover:border-emerald-500/60",
    iconShadow: "shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    hoverText: "group-hover:text-emerald-500"
  },
  teal: {
    text: "text-teal-500",
    hoverBorder: "hover:border-teal-500/30",
    iconBg: "bg-teal-500/10",
    iconBorder: "border-teal-500/20",
    iconHoverBorder: "group-hover:border-teal-500/60",
    iconShadow: "shadow-[0_0_15px_rgba(20,184,166,0.1)] group-hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]",
    hoverText: "group-hover:text-teal-500"
  },
  red: {
    text: "text-red-500",
    hoverBorder: "hover:border-red-500/30",
    iconBg: "bg-red-500/10",
    iconBorder: "border-red-500/20",
    iconHoverBorder: "group-hover:border-red-500/60",
    iconShadow: "shadow-[0_0_15px_rgba(239,68,68,0.1)] group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    hoverText: "group-hover:text-red-500"
  },
  purple: {
    text: "text-purple-500",
    hoverBorder: "hover:border-purple-500/30",
    iconBg: "bg-purple-500/10",
    iconBorder: "border-purple-500/20",
    iconHoverBorder: "group-hover:border-purple-500/60",
    iconShadow: "shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    hoverText: "group-hover:text-purple-500"
  },
  orange: {
    text: "text-orange-500",
    hoverBorder: "hover:border-orange-500/30",
    iconBg: "bg-orange-500/10",
    iconBorder: "border-orange-500/20",
    iconHoverBorder: "group-hover:border-orange-500/60",
    iconShadow: "shadow-[0_0_15px_rgba(249,115,22,0.1)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]",
    hoverText: "group-hover:text-orange-500"
  }
};

export default function ProteinLabCertificatePage() {
  const [products, setProducts] = useState<CommerceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroConfig, setHeroConfig] = useState<any>({
    tagline: "Authenticity & Testing",
    subtitle: "Manufactured In",
    title: "WORLD CLASS FACILITY",
    bgImage: "",
    badges: [
      { code: "cGMP", title: "cGMP Certified", subtitle: "Current Practice", color: "yellow" },
      { code: "HACCP", title: "HACCP Safety", subtitle: "Food Safety Certified", color: "blue" },
      { code: "fssai", title: "fssai approved", subtitle: "Standard Compliance", color: "green" },
      { code: "KOSHER", title: "Kosher Food", subtitle: "Pure Ingredients", color: "emerald" },
      { code: "FSSC", title: "FSSC 22000", subtitle: "Sustained Quality", color: "teal" },
      { code: "100%", title: "Third Party", subtitle: "Independent Lab Tested", color: "red" }
    ]
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch up to 100 products from active catalog and authenticity config
        const [res, heroRes] = await Promise.allSettled([
          api.get("/products?page=0&size=100"),
          api.get(`/cms/authenticity-hero?t=${Date.now()}`)
        ]);

        if (res.status === "fulfilled" && res.value.data && res.value.data.status) {
          const rawItems = res.value.data.data.content || [];
          const mapped = rawItems.map(mapBackendProductToCommerce);
          // Filter to show only products that have a report uploaded
          const certifiedProducts = mapped.filter(
            (p: any) => p.productReportUrl && p.productReportUrl.trim() !== ""
          );
          setProducts(certifiedProducts);
        }

        if (heroRes.status === "fulfilled" && heroRes.value.data && heroRes.value.data.status && heroRes.value.data.data) {
          try {
            const parsed = JSON.parse(heroRes.value.data.data.cmsValue);
            const mappedBadges = (parsed.badges || []).map((b: any) => ({
              code: b.code || "",
              title: b.title || "",
              subtitle: b.subtitle || b.description || "",
              color: b.color || "yellow"
            }));
            setHeroConfig({
              tagline: parsed.tagline || "Authenticity & Testing",
              subtitle: parsed.subtitle || "Manufactured In",
              title: parsed.title || "WORLD CLASS FACILITY",
              bgImage: parsed.bgImage || "",
              badges: mappedBadges
            });
          } catch (e) {
            console.error("Failed to parse authenticity-hero JSON", e);
          }
        }
      } catch (err) {
        console.error("Failed to load products for certificates page:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950 text-white font-sans">
        {/* CERTIFICATION HERO BANNER */}
        <section
          className="relative isolate overflow-hidden bg-zinc-900/40 border-b border-white/5 py-20 px-4 md:py-24 shadow-2xl"
          style={
            heroConfig.bgImage
              ? {
                  backgroundImage: `linear-gradient(to bottom, rgba(9, 9, 11, 0.85), rgba(9, 9, 11, 0.95)), url(${heroConfig.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
        >
          {/* Decorative glowing gradient elements */}
          {!heroConfig.bgImage && (
            <>
              <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
            </>
          )}
          
          <div className="mx-auto max-w-7xl text-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-black uppercase tracking-[0.2em] text-red-500 mb-6 shadow-inner">
              <ShieldCheck className="w-3.5 h-3.5" /> {heroConfig.tagline}
            </span>
            <p className="text-zinc-500 text-sm font-black uppercase tracking-[0.24em] mb-4">
              {heroConfig.subtitle}
            </p>
            <h1 className="text-4xl md:text-6xl font-black leading-none tracking-tight text-white mb-16 uppercase">
              {heroConfig.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-md">
                {heroConfig.title.split(" ").slice(-1)[0]}
              </span>
            </h1>

            {/* Certifications Badge Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 max-w-6xl mx-auto">
              {heroConfig.badges.map((badge: any, index: number) => {
                const colorDetails = colorMap[badge.color] || colorMap.yellow;
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center p-5 rounded-2xl bg-zinc-950/60 border border-white/10 ${colorDetails.hoverBorder} transition-all duration-300 group shadow-lg`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full ${colorDetails.iconBg} border ${colorDetails.iconBorder} ${colorDetails.iconHoverBorder} flex items-center justify-center transition-all duration-300 mb-4 ${colorDetails.iconShadow}`}
                    >
                      <span className={`text-[10px] font-black tracking-wider ${badge.color === "green" || badge.code === "fssai" ? "lowercase" : "uppercase"} ${colorDetails.text}`}>
                        {badge.code}
                      </span>
                    </div>
                    <span className={`text-[11px] font-black text-zinc-300 uppercase tracking-widest text-center ${colorDetails.hoverText} transition-colors`}>
                      {badge.title}
                    </span>
                    <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider text-center mt-1">
                      {badge.subtitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PRODUCTS DIRECTORY */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-10 text-center md:text-left border-b border-white/10 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                Tested Products
              </h2>
              <p className="mt-2 text-zinc-400 font-bold uppercase text-xs tracking-widest">
                Check and verify clinical certificates for each product batch
              </p>
            </div>
            <div className="text-zinc-500 font-black text-xs uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl">
              Total Reports: {products.length}
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="py-24 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
              <div className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
                Retrieving Certified Products...
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && products.length === 0 && (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-16 text-center backdrop-blur-sm max-w-3xl mx-auto">
              <div className="mx-auto h-20 w-20 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mb-8">
                <FileText className="h-8 w-8 text-zinc-600" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase">
                No Certificates Available
              </h3>
              <p className="mt-3 text-zinc-400 font-medium">
                Our labs are currently compiling the latest product reports. Please check back shortly.
              </p>
            </div>
          )}

          {/* PRODUCTS GRID */}
          {!loading && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group rounded-3xl bg-zinc-900/50 border border-white/10 overflow-hidden hover:border-red-500/40 hover:bg-zinc-900 transition-all duration-300 flex flex-col h-full shadow-lg"
                >
                  {/* Image wrapper */}
                  <div className="relative aspect-square w-full bg-black overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60" />
                    
                    {/* Brand name overlay */}
                    <span className="absolute top-4 left-4 bg-zinc-950/80 border border-white/10 rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-zinc-300">
                      {product.brand}
                    </span>
                  </div>

                  {/* Body info */}
                  <div className="p-6 flex flex-col flex-grow justify-between gap-5">
                    <div>
                      <h3 className="text-lg font-black text-white group-hover:text-red-500 transition-colors leading-tight mb-2">
                        {product.name}
                      </h3>
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                        Category: {product.category}
                      </p>
                    </div>

                    <Link
                      href={`/protein-lab-certificate/${product.id}`}
                      className="w-full h-11 bg-red-600 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] text-white text-center flex items-center justify-center font-black uppercase tracking-[0.15em] text-xs rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all duration-300"
                    >
                      View Report
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
