"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

import CartDrawer from "@/components/cart/CartDrawer";
import { useAuth } from "@/context/AuthContext";
import { useCartStore } from "@/store/cartStore";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);
  const { isLoggedIn, user } = useAuth();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const disableCartDrawer = pathname === "/cart" || pathname === "/checkout";

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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-xl"
          : "bg-transparent py-2"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-18 items-center justify-between gap-5">
          <div className="flex items-center gap-10">
            <Link href="/" className="group flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-red-600 text-sm font-black text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transition group-hover:scale-105 group-hover:bg-white group-hover:text-red-600">
                M
              </span>
              <span>
                <span className="block text-xl font-black tracking-tight text-white">
                  MUSCLEYN
                </span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-red-500">
                  Performance Nutrition
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative rounded-lg px-4 py-2 text-sm font-bold transition ${
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

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white md:flex"
              aria-label="Search products"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={openCart}
              className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full border-2 border-zinc-950 bg-red-600 px-1 text-[11px] font-black text-white"
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
                  className="flex h-11 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 text-sm font-bold text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <UserRound className="h-4 w-4" />
                  {user?.name || "Account"}
                </Link>
                <Link
                  href="/logout"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </Link>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden h-11 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 text-sm font-bold text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white md:flex"
              >
                <UserRound className="h-4 w-4" />
                Login
              </Link>
            )}

            <Link
              href="/admin/login"
              className="hidden h-11 items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 text-sm font-black text-red-500 transition hover:bg-red-600 hover:text-white md:flex"
            >
              <ShieldCheck className="h-4 w-4" />
              Admin
            </Link>

            <Link
              href="/shop"
              className="hidden h-11 items-center rounded-lg bg-red-600 px-6 text-sm font-black text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] transition hover:bg-white hover:text-zinc-950 md:flex"
            >
              Shop Now
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-zinc-900/95 backdrop-blur-xl lg:hidden overflow-hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-4 py-3 font-bold text-zinc-300 hover:bg-white/10 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

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

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
