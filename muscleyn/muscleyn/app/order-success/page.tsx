"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const orderNumber = searchParams.get("orderNumber");

  return (
    <div className="relative z-10 bg-zinc-900 border border-white/10 rounded-[2.5rem] p-10 md:p-16 shadow-2xl max-w-2xl w-full text-center">
      {/* ICON */}
      <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-10 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </div>

      {/* TITLE */}
      <p className="text-green-500 text-xs font-black uppercase tracking-[0.2em] mb-4">
        Order Confirmed
      </p>

      <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
        Thank You For <br className="hidden sm:block" /> Your Purchase
      </h1>

      {/* DESCRIPTION */}
      <p className="text-zinc-400 text-lg leading-relaxed mb-10 font-medium max-w-md mx-auto">
        Your premium supplements order has been successfully placed. We are preparing it for immediate shipping.
      </p>

      {/* ORDER ID */}
      <div className="bg-black border border-white/5 rounded-2xl px-8 py-6 inline-flex flex-col items-center mb-12 shadow-inner min-w-[200px]">
        <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">
          Order ID
        </span>
        <span className="text-2xl font-black text-white tracking-wide">
          {orderNumber ? orderNumber : (orderId ? `#${orderId}` : "N/A")}
        </span>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        
        <Link
          href={orderId ? `/my-orders/${orderId}` : "/my-orders"}
          className="bg-red-600 hover:bg-white hover:text-black text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
        >
          <ShoppingBag className="w-4 h-4" />
          View Order
        </Link>

        <Link
          href="/shop"
          className="border border-white/10 bg-white/5 hover:bg-white hover:text-black text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3"
        >
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <OrderSuccessContent />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}