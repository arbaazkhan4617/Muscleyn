"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, LogOut, ShieldCheck, ShoppingBag } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";

export default function LogoutPage() {
  const router = useRouter();
  const { logoutUser, isLoggedIn } = useAuth();
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setLoggedOut(true);
  };

  useEffect(() => {
    if (!loggedOut) {
      return;
    }

    const timer = window.setTimeout(() => {
      router.push("/");
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [loggedOut, router]);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-20 text-white">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1800&auto=format&fit=crop"
          alt="Muscleyn logout background"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.32),transparent_34%),linear-gradient(180deg,rgba(9,9,11,0.9),#09090b)]" />

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl rounded-[2.5rem] border border-white/10 bg-white/[0.08] p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl md:p-14"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-600 shadow-2xl shadow-red-950/40">
            {loggedOut || !isLoggedIn ? (
              <CheckCircle2 className="h-10 w-10" />
            ) : (
              <LogOut className="h-10 w-10" />
            )}
          </div>

          <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-red-300">
            Secure Session
          </p>
          <h1 className="mt-4 text-5xl font-black leading-none tracking-[-0.06em] md:text-7xl">
            {loggedOut || !isLoggedIn ? "You are logged out" : "Ready to logout?"}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300">
            {loggedOut || !isLoggedIn
              ? "Your Muscleyn session has ended. Redirecting you to the storefront."
              : "Logout safely from your customer account while keeping the store ready for your next order."}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {loggedOut || !isLoggedIn ? (
              <>
                <Link
                  href="/"
                  className="rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-zinc-950 transition hover:bg-red-600 hover:text-white"
                >
                  Go Home
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-white/15 bg-white/10 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-zinc-950"
                >
                  Login Again
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-zinc-950"
                >
                  Logout Now
                </button>
                <Link
                  href="/shop"
                  className="rounded-full border border-white/15 bg-white/10 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-zinc-950"
                >
                  Keep Shopping
                </Link>
              </>
            )}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
              <ShieldCheck className="mx-auto h-7 w-7 text-red-400" />
              <p className="mt-3 font-bold text-zinc-200">
                Token removed from this device
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
              <ShoppingBag className="mx-auto h-7 w-7 text-red-400" />
              <p className="mt-3 font-bold text-zinc-200">
                You can still browse products
              </p>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
