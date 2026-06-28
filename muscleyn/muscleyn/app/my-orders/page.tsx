"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";

import { ShoppingBag, ArrowRight, Package, Calendar, CreditCard, Clock } from "lucide-react";

export default function MyOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // LOAD ORDERS
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await api.get(`/customer-orders/my-orders/${user?.id}`);
        setOrders(response.data.data || []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      loadOrders();
    } else {
       // Demo data fallback if not logged in or no real backend
       setTimeout(() => {
           setOrders([
               {
                   id: "ORD-982374",
                   paymentMethod: "ONLINE",
                   createdAt: new Date().toISOString(),
                   orderStatus: "PROCESSING",
                   paymentStatus: "SUCCESS",
                   finalAmount: 12998
               },
               {
                   id: "ORD-912231",
                   paymentMethod: "COD",
                   createdAt: new Date(Date.now() - 864000000).toISOString(),
                   orderStatus: "DELIVERED",
                   paymentStatus: "PENDING",
                   finalAmount: 6499
               }
           ]);
           setLoading(false);
       }, 800);
    }
  }, [user]);

  const getStatusColor = (status: string) => {
      switch(status?.toUpperCase()) {
          case 'DELIVERED':
          case 'PAID':
          case 'SUCCESS':
              return 'bg-green-500/10 text-green-500 border-green-500/20';
          case 'PROCESSING':
          case 'SHIPPED':
              return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
          case 'CANCELLED':
          case 'REFUNDED':
          case 'FAILED':
              return 'bg-red-500/10 text-red-500 border-red-500/20';
          case 'PENDING':
          case 'PLACED':
              return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
          default: return 'bg-zinc-800 text-zinc-300 border-zinc-700';
      }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950 py-12 text-white">
        <div className="max-w-5xl mx-auto px-4">
          
          {/* HEADER */}
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
            <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20">
              <ShoppingBag className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white">My Orders</h1>
              <p className="text-zinc-400 font-medium mt-1">Track and manage your past purchases.</p>
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-32 space-y-4">
              <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto"></div>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Orders...</p>
            </div>
          )}

          {/* EMPTY */}
          {!loading && orders.length === 0 && (
            <div className="bg-zinc-900/50 backdrop-blur-md rounded-[2rem] p-16 text-center border border-white/10 shadow-xl">
              <div className="w-24 h-24 bg-zinc-950 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                 <Package className="w-10 h-10 text-zinc-600" />
              </div>
              <h2 className="text-2xl font-black mb-3">No Orders Found</h2>
              <p className="text-zinc-500 max-w-md mx-auto mb-8 font-medium">You haven't placed any orders yet. Discover our premium supplements and start your fitness journey today.</p>
              <Link href="/shop" className="inline-block px-8 py-4 rounded-full bg-red-600 hover:bg-white hover:text-black text-white font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                 Start Shopping
              </Link>
            </div>
          )}

          {/* ORDERS */}
          <div className="space-y-6">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/my-orders/${order.id}`}
                className="block bg-zinc-900/50 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-2">
                    <ArrowRight className="w-6 h-6 text-red-500" />
                </div>
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  {/* LEFT */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Order ID</p>
                      <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-red-400 transition-colors">
                        {order.orderNumber || `#${order.id}`}
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-4 sm:gap-6">
                      <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
                        <CreditCard className="w-4 h-4" />
                        {order.paymentMethod}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  {/* CENTER */}
                  <div className="flex gap-3 flex-wrap">
                    <div className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${getStatusColor(order.orderStatus)}`}>
                      <Clock className="w-3 h-3" />
                      {order.orderStatus}
                    </div>
                    <div className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${getStatusColor(order.paymentStatus)}`}>
                      <CreditCard className="w-3 h-3" />
                      {order.paymentStatus}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="lg:text-right pt-4 border-t border-white/10 lg:border-t-0 lg:pt-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Order Total</p>
                    <h2 className="text-3xl font-black text-white">
                      ₹{order.finalAmount}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}