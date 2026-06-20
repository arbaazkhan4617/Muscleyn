"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Menu,
  Search,
  ShieldCheck,
  ShoppingCart,
  UserRound,
  X,
  ChevronDown,
  Activity,
  Award,
  FileText,
  MapPin,
  MessageCircle,
  Briefcase,
  Flame,
  Tag,
  Sparkles,
} from "lucide-react";

import CartDrawer from "@/components/cart/CartDrawer";
import { useAuth } from "@/context/AuthContext";
import { useCartStore } from "@/store/cartStore";
import api from "@/services/api";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dropdown states
  const [productsHovered, setProductsHovered] = useState(false);
  const [authenticityHovered, setAuthenticityHovered] = useState(false);
  const [authLinks, setAuthLinks] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [brandsList, setBrandsList] = useState<any[]>([]);
  const [subCategoriesList, setSubCategoriesList] = useState<any[]>([]);

  useEffect(() => {
    const fetchAuthLinks = async () => {
      try {
        const res = await api.get("/cms/authenticity-links");
        if (res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          if (Array.isArray(parsed)) {
            setAuthLinks(parsed);
          }
        }
      } catch (err) {
        console.log("No authenticity links configured in CMS", err);
      }
    };

    const fetchDropdownData = async () => {
      try {
        const [catsRes, brandsRes, subsRes] = await Promise.all([
          api.get("/categories"),
          api.get("/brands"),
          api.get("/sub-categories")
        ]);
        if (catsRes.data && catsRes.data.status) {
          setCategoriesList(catsRes.data.data || []);
        }
        if (brandsRes.data && brandsRes.data.status) {
          setBrandsList(brandsRes.data.data || []);
        }
        if (subsRes.data && subsRes.data.status) {
          setSubCategoriesList(subsRes.data.data || []);
        }
      } catch (err) {
        console.log("Failed to load metadata for mega-dropdown:", err);
      }
    };

    fetchAuthLinks();
    fetchDropdownData();
  }, []);

  const cartItems = useCartStore((state) => state.cartItems);
  const { isLoggedIn, user } = useAuth();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const disableCartDrawer = pathname === "/cart" || pathname === "/checkout";

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openCart = () => {
    if (!disableCartDrawer) setCartOpen(true);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-zinc-950/90 shadow-2xl backdrop-blur-xl"
            : "bg-zinc-950 border-b border-white/5"
        }`}
      >
        {/* Top Header Bar - Expanded width to stretch to corners, height reduced to h-16 */}
        <div className="mx-auto max-w-full px-8 md:px-12">
          <div className="flex h-16 items-center justify-between gap-5">
            {/* Logo: Prabha Pharma */}
            <div className="flex items-center gap-8">
              <Link href="/" className="group flex items-center gap-2.5">
                <span className="grid h-8.5 w-8.5 place-items-center rounded-lg bg-gradient-to-br from-red-600 to-red-700 text-sm font-black text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] transition group-hover:scale-105 group-hover:from-white group-hover:to-white group-hover:text-red-600">
                  P
                </span>
                <span>
                  <span className="block text-lg font-black tracking-tight text-white group-hover:text-red-500 transition-colors leading-none mb-0.5">
                    PRABHA PHARMA
                  </span>
                  <span className="block text-[8px] font-extrabold uppercase tracking-[0.18em] text-zinc-500">
                    Healthcare & Nutrition
                  </span>
                </span>
              </Link>

              {/* Main Nav Items (Text size reduced to xs/sm) */}
              <nav className="hidden items-center gap-1 lg:flex ml-4">
                {navItems.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === item.href
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                        active
                          ? "text-white"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {item.label}
                      {active && (
                        <motion.div
                          layoutId="navbar-active"
                          className="absolute inset-0 -z-10 rounded-lg bg-white/10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Utility Buttons - Sizes reduced to h-9/w-9 and smaller fonts */}
            <div className="flex items-center gap-2">
              <AnimatePresence>
                {searchOpen ? (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearchSubmit}
                    className="relative hidden items-center h-9 md:flex"
                  >
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search supplements..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-full bg-white/5 border border-white/10 rounded-lg px-3 pr-8 text-[11px] outline-none text-white focus:border-red-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-2.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="hidden h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white md:flex cursor-pointer"
                    aria-label="Search products"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={openCart}
                className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                aria-label="Open cart"
              >
                <ShoppingCart className="h-4 w-4" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full border-2 border-zinc-950 bg-red-600 px-0.5 text-[9px] font-black text-white"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {isLoggedIn ? (
                <div className="hidden items-center gap-2 md:flex">
                  <Link
                    href="/my-orders"
                    className="flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 text-xs font-bold text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    <UserRound className="h-3.5 w-3.5" />
                    {user?.name || "Account"}
                  </Link>
                  <Link
                    href="/logout"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                    aria-label="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 text-xs font-bold text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white md:flex"
                >
                  <UserRound className="h-3.5 w-3.5" />
                  Login
                </Link>
              )}

              <Link
                href="/admin/login"
                className="hidden h-9 items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 text-xs font-black text-red-500 transition hover:bg-red-600 hover:text-white md:flex"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin
              </Link>

              <Link
                href="/shop"
                className="hidden h-9 items-center rounded-lg bg-red-600 px-4 text-xs font-black text-white shadow-[0_0_12px_rgba(220,38,38,0.3)] transition hover:bg-white hover:text-zinc-950 md:flex"
              >
                Shop Now
              </Link>

              {/* Mobile menu toggle (reduced size) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Navbar Header Bar - Width expanded, text size to text-[11px], height reduced to h-11 */}
        <div className="border-t border-white/5 bg-zinc-950/60 backdrop-blur-md hidden lg:block">
          <div className="mx-auto max-w-full px-8 md:px-12 flex items-center justify-between h-11 text-[11px] font-black">
            
            {/* Left Side Navigation (Main Categories & Lists) */}
            <div className="flex items-center gap-5">
              
              {/* All Products mega dropdown */}
              <div 
                className="relative py-2.5 cursor-pointer"
                onMouseEnter={() => setProductsHovered(true)}
                onMouseLeave={() => setProductsHovered(false)}
              >
                <div className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors uppercase tracking-wider">
                  All Products
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${productsHovered ? "rotate-180 text-red-500" : ""}`} />
                </div>

                <AnimatePresence>
                  {productsHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full w-[480px] bg-zinc-900 border border-white/10 rounded-2xl p-5 shadow-2xl grid grid-cols-3 gap-5 z-50 backdrop-blur-xl"
                    >
                      {/* Column 1: Sub Categories */}
                      <div>
                        <h4 className="text-[9px] font-black text-red-500 uppercase tracking-widest border-b border-white/5 pb-1.5 mb-2.5">
                          Sub Categories
                        </h4>
                        <ul className="space-y-1.5 text-[11px] text-zinc-400 font-bold font-medium">
                          {subCategoriesList.length > 0 ? (
                            subCategoriesList.slice(0, 6).map((sub: any) => (
                              <li key={sub.id}>
                                <Link href={`/shop?subCategory=${encodeURIComponent(sub.name)}`} className="hover:text-white transition-colors">
                                  {sub.name}
                                </Link>
                              </li>
                            ))
                          ) : (
                            <>
                              <li>
                                <Link href="/shop" className="hover:text-white transition-colors">
                                  Meal Replacements
                                </Link>
                              </li>
                              <li>
                                <Link href="/shop" className="hover:text-white transition-colors">
                                  Fat Burners
                                </Link>
                              </li>
                              <li>
                                <Link href="/shop" className="hover:text-white transition-colors">
                                  Appetite Control
                                </Link>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>

                      {/* Column 2: Categories */}
                      <div>
                        <h4 className="text-[9px] font-black text-red-500 uppercase tracking-widest border-b border-white/5 pb-1.5 mb-2.5">
                          Categories
                        </h4>
                        <ul className="space-y-1.5 text-[11px] text-zinc-400 font-bold font-medium">
                          {categoriesList.length > 0 ? (
                            categoriesList.slice(0, 6).map((cat: any) => (
                              <li key={cat.id}>
                                <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} className="hover:text-white transition-colors">
                                  {cat.name}
                                </Link>
                              </li>
                            ))
                          ) : (
                            <>
                              <li>
                                <Link href="/shop?category=Whey%20Protein" className="hover:text-white transition-colors">
                                  Whey Protein
                                </Link>
                              </li>
                              <li>
                                <Link href="/shop?category=Mass%20Gainer" className="hover:text-white transition-colors">
                                  Mass Gainers
                                </Link>
                              </li>
                              <li>
                                <Link href="/shop?category=Creatine" className="hover:text-white transition-colors">
                                  Creatine
                                </Link>
                              </li>
                              <li>
                                <Link href="/shop?category=Pre%20Workout" className="hover:text-white transition-colors">
                                  Pre Workouts
                                </Link>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>

                      {/* Column 3: Featured Brands */}
                      <div>
                        <h4 className="text-[9px] font-black text-red-500 uppercase tracking-widest border-b border-white/5 pb-1.5 mb-2.5">
                          Featured Brands
                        </h4>
                        <ul className="space-y-1.5 text-[11px] text-zinc-400 font-bold font-medium">
                          {brandsList.length > 0 ? (
                            brandsList.slice(0, 6).map((brand: any) => (
                              <li key={brand.id}>
                                <Link href={`/shop?brand=${encodeURIComponent(brand.name)}`} className="hover:text-white transition-colors">
                                  {brand.name}
                                </Link>
                              </li>
                            ))
                          ) : (
                            <>
                              <li>
                                <Link href="/shop?brand=Muscleyn%20Elite" className="hover:text-white transition-colors">
                                  Muscleyn Elite
                                </Link>
                              </li>
                              <li>
                                <Link href="/shop?brand=Muscleyn%20Lab" className="hover:text-white transition-colors">
                                  Muscleyn Lab
                                </Link>
                              </li>
                              <li>
                                <Link href="/shop?brand=Muscleyn%20Ignite" className="hover:text-white transition-colors">
                                  Muscleyn Ignite
                                </Link>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Best Seller */}
              <Link href="/shop?filter=best-seller" className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors uppercase tracking-wider">
                <Flame className="w-3 h-3 text-red-500 fill-red-500/20" />
                Best Seller
              </Link>

              {/* Offers */}
              <Link href="/shop?filter=offers" className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors uppercase tracking-wider">
                <Tag className="w-3 h-3 text-red-500" />
                Offers
              </Link>

              {/* What's New */}
              <Link href="/shop?sort=latest" className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-yellow-500" />
                What's New
              </Link>

              {/* Blogs page link in subheader */}
              <Link href="/blogs" className="text-zinc-300 hover:text-white transition-colors uppercase tracking-wider">
                Blogs
              </Link>

              {/* News page link in subheader */}
              <Link href="/news" className="text-zinc-300 hover:text-white transition-colors uppercase tracking-wider">
                News
              </Link>
            </div>

            {/* Right Side Navigation (Small, shifted to corner, helper links) */}
            <div className="flex items-center gap-5 text-zinc-400 font-bold tracking-wider">
              {/* Our Stores */}
              <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-red-500" />
                Our Stores
              </Link>

              {/* Authenticity Dropdown */}
              <div 
                className="relative py-2.5 cursor-pointer"
                onMouseEnter={() => setAuthenticityHovered(true)}
                onMouseLeave={() => setAuthenticityHovered(false)}
              >
                <div className="flex items-center gap-1 hover:text-white transition-colors uppercase">
                  Authenticity
                  <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-300 ${authenticityHovered ? "rotate-180 text-red-500" : ""}`} />
                </div>

                <AnimatePresence>
                  {authenticityHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full w-48 bg-zinc-900 border border-white/10 rounded-xl p-3.5 shadow-2xl z-50 backdrop-blur-xl"
                    >
                      <ul className="space-y-2.5 text-[11px] font-bold text-zinc-400">
                        {authLinks.length > 0 ? (
                          authLinks.map((link, idx) => (
                            <li key={idx}>
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 hover:text-white transition-colors"
                              >
                                <Award className="w-3.5 h-3.5 text-yellow-500" />
                                {link.title}
                              </a>
                            </li>
                          ))
                        ) : (
                          <>
                            <li>
                              <Link href="/recommend" className="flex items-center gap-1.5 hover:text-white transition-colors">
                                <Activity className="w-3.5 h-3.5 text-yellow-500" />
                                Check Authenticity
                              </Link>
                            </li>
                            <li>
                              <Link href="/recommend" className="flex items-center gap-1.5 hover:text-white transition-colors">
                                <FileText className="w-3.5 h-3.5 text-yellow-500" />
                                Protein Lab Certificate
                              </Link>
                            </li>
                            <li>
                              <Link href="/recommend" className="flex items-center gap-1.5 hover:text-white transition-colors">
                                <Award className="w-3.5 h-3.5 text-yellow-500" />
                                Labdoor
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Business Enquiry */}
              <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-0.5">
                <Briefcase className="w-3 h-3 text-zinc-500" />
                Business Enquiry
              </Link>

              {/* Chat Support */}
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-white transition-colors flex items-center gap-0.5 text-green-500"
              >
                <MessageCircle className="w-3 h-3 fill-green-500/10" />
                Chat Support
              </a>
            </div>

          </div>
        </div>

        {/* Mobile Slide-Out Panel Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10 bg-zinc-900/95 backdrop-blur-xl lg:hidden overflow-hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 max-h-[85vh] overflow-y-auto">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center h-12 mb-3">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-full bg-white/5 border border-white/10 rounded-lg px-4 pr-10 text-sm outline-none text-white focus:border-red-500 transition-colors"
                  />
                  <button type="submit" className="absolute right-3 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                    <Search className="w-5 h-5" />
                  </button>
                </form>

                {/* Main pages */}
                <div className="border-b border-white/5 pb-2 mb-2 flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Sub-navbar Items for Mobile */}
                <div className="flex flex-col gap-1 border-b border-white/5 pb-2 mb-2">
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest px-4 mb-1">
                    Supplements
                  </span>
                  <Link
                    href="/shop?filter=best-seller"
                    className="rounded-lg px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Flame className="w-4 h-4 text-red-500" />
                    Best Sellers
                  </Link>
                  <Link
                    href="/shop?filter=offers"
                    className="rounded-lg px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Tag className="w-4 h-4 text-red-500" />
                    Offers
                  </Link>
                  <Link
                    href="/blogs"
                    className="rounded-lg px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    Blogs
                  </Link>
                  <Link
                    href="/news"
                    className="rounded-lg px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    News
                  </Link>
                  <Link
                    href="/shop?category=Whey%20Protein"
                    className="rounded-lg px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-white pl-8"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Whey Protein
                  </Link>
                  <Link
                    href="/shop?category=Creatine"
                    className="rounded-lg px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-white pl-8"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Creatine
                  </Link>
                  <Link
                    href="/shop?category=Mass%20Gainer"
                    className="rounded-lg px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-white pl-8"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mass Gainers
                  </Link>
                  <Link
                    href="/shop?category=Pre%20Workout"
                    className="rounded-lg px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-white pl-8"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pre Workouts
                  </Link>
                </div>

                {/* Helper Links for Mobile */}
                <div className="flex flex-col gap-1 border-b border-white/5 pb-2 mb-2">
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest px-4 mb-1">
                    Authenticity & Support
                  </span>
                  {authLinks.length > 0 ? (
                    authLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Award className="w-4 h-4 text-yellow-500" />
                        {link.title}
                      </a>
                    ))
                  ) : (
                    <Link
                      href="/recommend"
                      className="rounded-lg px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Activity className="w-4 h-4 text-yellow-500" />
                      Check Authenticity
                    </Link>
                  )}
                  <Link
                    href="/contact"
                    className="rounded-lg px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MapPin className="w-4 h-4 text-red-500" />
                    Our Stores
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-lg px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Briefcase className="w-4 h-4 text-zinc-400" />
                    Business Enquiry
                  </Link>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg px-4 py-2 text-sm font-bold text-green-500 hover:bg-white/5 flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MessageCircle className="w-4 h-4 fill-green-500/10" />
                    WhatsApp Support
                  </a>
                </div>

                {isLoggedIn ? (
                  <>
                    <Link
                      href="/my-orders"
                      className="rounded-lg px-4 py-3 font-bold text-zinc-300 hover:bg-white/10 hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/logout"
                      className="rounded-lg px-4 py-3 font-bold text-red-500 hover:bg-red-500/10"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-lg px-4 py-3 font-bold text-zinc-300 hover:bg-white/10 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Link
                    href="/admin/login"
                    className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-center font-black text-red-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                  <Link
                    href="/shop"
                    className="rounded-lg bg-red-600 px-4 py-3 text-center font-black text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
