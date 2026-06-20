"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Dumbbell,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Zap,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PremiumProductCard from "@/components/product/PremiumProductCard";
import Skeleton from "@/components/ui/Skeleton";
import DealOfTheDay from "@/components/home/DealOfTheDay";
import RealReviews from "@/components/home/RealReviews";
import BlogSection from "@/components/home/BlogSection";
import NewsSection from "@/components/home/NewsSection";
import {
  categories,
  formatPrice,
  testimonials,
  CommerceProduct,
  mapBackendProductToCommerce,
  getBackendImageUrl,
} from "@/lib/commerce";
import api from "@/services/api";

const heroSlides = [
  {
    eyebrow: "Premium Sports Nutrition",
    title: "Fuel The Physique You Are Building",
    copy: "Science-backed supplements, bold taste, and a high-performance shopping experience for serious athletes.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1800&auto=format&fit=crop",
  },
  {
    eyebrow: "Summer Shred Stack",
    title: "Lean Muscle. Clean Energy. Zero Excuses.",
    copy: "Curated stacks for muscle gain, fat loss, endurance, and daily recovery.",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1800&auto=format&fit=crop",
  },
  {
    eyebrow: "Strength Essentials",
    title: "Power Every Rep With Clean Formulas",
    copy: "Creatine, whey, and pre-workout stacks designed for strength progression and faster recovery.",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1800&auto=format&fit=crop",
  },
];

const trustCards: Array<{
  icon: LucideIcon;
  title: string;
  copy: string;
}> = [
  {
    icon: ShieldCheck,
    title: "Batch Tested",
    copy: "Every batch is quality checked for consistency and purity by independent labs.",
  },
  {
    icon: Truck,
    title: "Fast Fulfilment",
    copy: "Optimized delivery flow and clear order updates. Next-day delivery on elite stacks.",
  },
  {
    icon: BadgeCheck,
    title: "Authentic Formulas",
    copy: "Transparent nutrition and premium sourcing. No proprietary blends or hidden fillers.",
  },
  {
    icon: Dumbbell,
    title: "Athlete Focused",
    copy: "Built around real training goals and routines, trusted by IFBB pros.",
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<CommerceProduct[]>([]);
  const [bestSellers, setBestSellers] = useState<CommerceProduct[]>([]);
  const [socialProducts, setSocialProducts] = useState<CommerceProduct[]>([]);
  const [banners, setBanners] = useState<any[]>(heroSlides);

  const [goalsList, setGoalsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const response = await api.get("/products");
        if (response.data && response.data.status) {
          const items = response.data.data.content || response.data.data || [];
          const mapped = items.map(mapBackendProductToCommerce);
          setFeaturedProducts(mapped.slice(0, 3));
          
          const bestSellersList = mapped.filter((p: any) => p.isBestSeller);
          if (bestSellersList.length > 0) {
            setBestSellers(bestSellersList.slice(0, 4));
          } else {
            setBestSellers([...mapped].sort((a, b) => b.popularity - a.popularity).slice(0, 4));
          }
          setSocialProducts(mapped.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to load products for homepage:", err);
      }
    };

    const fetchBanners = async () => {
      try {
        const response = await api.get("/banners/active");
        if (response.data && response.data.status && response.data.data?.length > 0) {
          const mappedBanners = response.data.data.map((b: any) => ({
            eyebrow: "EXCLUSIVE ANNOUNCEMENT",
            title: b.title || "Premium Supplement Drop",
            copy: "Formulated for performance, clinically tested, and athlete approved.",
            image: b.imageUrl ? getBackendImageUrl(b.imageUrl) : "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1800&auto=format&fit=crop",
            redirectUrl: b.redirectUrl || "/shop"
          }));
          setBanners(mappedBanners);
        }
      } catch (err) {
        console.error("Failed to load active banners:", err);
      }
    };

    const fetchGoals = async () => {
      try {
        const res = await api.get("/cms/goals-list");
        if (res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setGoalsList(parsed);
            return;
          }
        }
      } catch (err) {
        console.log("No dynamic goals configured", err);
      }
      setGoalsList([
        { title: "Muscle Gain", copy: "Heavy calorie stacks for lean bulking", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop" },
        { title: "Fat Loss", copy: "Clean energy and cutting support", img: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=800&auto=format&fit=crop" },
        { title: "Recovery", copy: "Protein and sleep-friendly nutrition", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop" }
      ]);
    };

    fetchHomeProducts();
    fetchBanners();
    fetchGoals();
  }, []);

  const currentSlide = banners[activeSlide] || heroSlides[0];
  const nextSlide = banners[(activeSlide + 1) % banners.length] || heroSlides[0];

  // Dynamic Flash Sale Offer Settings
  const [flashSale, setFlashSale] = useState({
    active: true,
    title: "Flash Sale Active",
    subtitle: "Up to 40% off on all whey proteins.",
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const fetchFlashSale = async () => {
      try {
        const res = await api.get("/cms/flash-sale-offer");
        if (res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          setFlashSale(prev => ({
            ...prev,
            ...parsed
          }));
        }
      } catch (err) {
        console.log("No dynamic flash sale configured", err);
      }
    };
    fetchFlashSale();
  }, []);

  // Flash Sale Timer
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 30 });

  useEffect(() => {
    setTimeLeft({
      h: flashSale.hours,
      m: flashSale.minutes,
      s: flashSale.seconds
    });
  }, [flashSale]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else {
          s = 59;
          if (m > 0) m--;
          else {
            m = 59;
            if (h > 0) h--;
          }
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [banners]);

  return (
    <main className="bg-zinc-950 text-white min-h-screen selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.2),transparent_45%),linear-gradient(90deg,#09090b_0%,rgba(9,9,11,0.8)_50%,rgba(9,9,11,0.3)_100%)]" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 -z-10"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              priority={activeSlide === 0}
              sizes="100vw"
              className="object-cover opacity-60"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mx-auto grid min-h-[90vh] max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.title}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-red-500 backdrop-blur-md">
                  <Sparkles className="h-4 w-4" />
                  {currentSlide.eyebrow}
                </div>
                <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-white drop-shadow-2xl sm:text-7xl lg:text-[5.5rem]">
                  {currentSlide.title}
                </h1>
                <p className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-zinc-300">
                  {currentSlide.copy}
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/shop"
                    className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-red-600 px-8 text-sm font-black uppercase tracking-[0.15em] text-white transition-all hover:bg-white hover:text-zinc-950 hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                  >
                    Shop Performance
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 text-sm font-black uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/10"
                  >
                    Our Standards
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-16 flex items-center gap-3">
              {banners.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeSlide === index
                      ? "w-16 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                      : "w-4 bg-white/20 hover:bg-white/50"
                  }`}
                  aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative rounded-[2.5rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl group"
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-zinc-950 aspect-[4/5]">
              <Image
                src={nextSlide.image}
                alt={nextSlide.title}
                fill
                className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-10">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-red-500 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Next Drop
                </p>
                <h2 className="text-3xl font-black text-white leading-tight">
                  {nextSlide.eyebrow}
                </h2>
                <p className="mt-3 text-zinc-400 font-medium">
                  Complete strength stack from {formatPrice(4999)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Ticker */}
      <section className="border-y border-white/10 bg-black py-5 overflow-hidden flex">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap px-8 text-sm font-black uppercase tracking-[0.2em] text-zinc-500"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              <span className={i % 2 === 0 ? "text-red-600" : ""}>
                {["50K+ Customers", "10K+ Orders Delivered", "500+ Products", "Trusted By Athletes"][i % 4]}
              </span>
              <Sparkles className="h-3 w-3 text-zinc-700" />
            </span>
          ))}
        </motion.div>
      </section>

      {/* Flash Sale Banner */}
      {flashSale.active && (
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-red-900 to-black opacity-40" />
          <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 md:flex-row">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                <Zap className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">{flashSale.title}</h3>
                <p className="text-zinc-400 font-medium">{flashSale.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2 text-center">
                {[
                  { label: "HRS", val: timeLeft.h },
                  { label: "MIN", val: timeLeft.m },
                  { label: "SEC", val: timeLeft.s }
                ].map(t => (
                  <div key={t.label} className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 w-16 h-16 backdrop-blur-md">
                    <span className="text-xl font-black text-white">{String(t.val).padStart(2, '0')}</span>
                    <span className="text-[10px] font-bold text-red-500 tracking-wider">{t.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/shop" className="hidden md:flex h-16 items-center justify-center rounded-xl bg-white px-8 text-sm font-black uppercase tracking-widest text-black hover:bg-zinc-200 transition">
                Shop Now
              </Link>
            </div>
          </div>
        </section>
      )}

      <DealOfTheDay />

      {/* Shop by Goal */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-14 text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
            Shop By Goal
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Choose Your Objective
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {goalsList.map((goal) => (
            <Link
              href={`/shop?goal=${encodeURIComponent(goal.title)}`}
              key={goal.title}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 aspect-[4/5]"
            >
              <Image src={goal.img} alt={goal.title} fill className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col items-start">
                <h3 className="text-3xl font-black text-white">{goal.title}</h3>
                <p className="mt-3 text-zinc-300 font-medium mb-6">{goal.copy}</p>
                <div className="mt-auto h-12 w-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 transition-all group-hover:bg-red-600 group-hover:border-red-600 group-hover:scale-110">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-zinc-900 border-y border-white/5 py-32 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
                Featured Stacks
              </p>
              <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
                Premium picks for your next training block
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex h-14 items-center gap-3 rounded-full border border-white/20 bg-black px-8 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:border-red-500 hover:bg-red-600"
            >
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <PremiumProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <RealReviews />

      {/* Why Choose Us */}
      <section className="bg-black py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1),transparent_70%)] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
                Why Choose Us
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl lg:text-6xl leading-[1.1]">
                Premium quality without the gym-bro noise
              </h2>
              <p className="mt-6 text-lg text-zinc-400 max-w-md">
                We believe in full transparency. No proprietary blends, no cheap fillers. Just clinically dosed, scientifically backed nutrition for real athletes.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {trustCards.map(({ icon: Icon, title, copy }) => (
                <div
                  key={title}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md transition hover:bg-white/[0.05] hover:border-white/20"
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 transition-transform group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-black text-white">{title}</h3>
                  <p className="mt-3 leading-relaxed text-sm text-zinc-400">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Film */}
      <section className="relative overflow-hidden py-32 bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.08),transparent_50%)] pointer-events-none" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 lg:grid-cols-2">
          <div className="order-2 lg:order-1 group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1400&auto=format&fit=crop"
              alt="Athlete lifting weights"
              width={900}
              height={600}
              className="h-[500px] w-full object-cover opacity-60 transition duration-1000 group-hover:scale-105 group-hover:opacity-40"
            />
            <div className="absolute inset-0 bg-black/20" />
            <button className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_0_40px_rgba(220,38,38,0.5)] transition hover:scale-110 hover:bg-white hover:text-black">
              <Play className="h-8 w-8 ml-1" />
            </button>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
              The Standard
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
              Built for lifters who respect the work
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              Watch our latest campaign featuring IFBB Pro athletes pushing their limits. We formulate products for those who demand more from themselves and their nutrition.
            </p>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-32 bg-zinc-900 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
                Most Wanted
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Best Sellers
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red-500 hover:text-white transition"
            >
              Shop All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.02] p-5 transition hover:bg-white/[0.05] hover:-translate-y-2 hover:border-red-500/30"
              >
                <div className="relative mb-6 h-64 overflow-hidden rounded-[1.5rem] bg-black">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <h3 className="mt-3 text-xl font-black text-white">{product.name}</h3>
                <p className="mt-4 text-2xl font-black text-red-500">
                  {formatPrice(product.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BlogSection />

      <NewsSection />

      {/* Social Proof */}
      <section className="bg-black py-32 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
              Community
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
              #PoweredByMuscleyn
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {socialProducts.map((product) => (
              <div
                key={product.id}
                className="group relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900"
              >
                <Image
                  src={product.image}
                  alt={`${product.name} social post`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover opacity-60 transition duration-700 group-hover:scale-110 group-hover:opacity-40"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100 bg-black/40 backdrop-blur-sm">
                  <div className="text-center">
                    <span className="block text-2xl font-black text-white">@athlete</span>
                    <span className="text-red-500 text-sm font-bold">View Post</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}