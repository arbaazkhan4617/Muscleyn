"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/services/api";
import { useParams } from "next/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const response = await api.get(`/customer-orders/${orderId}`);
        setOrder(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load order");
      } finally {
        setLoading(false);
      }
    };
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-white">
          Loading order...
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-bold text-white">Order Not Found</h1>
          <Link href="/my-orders" className="px-6 py-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors">
            Back To Orders
          </Link>
        </div>
        <Footer />
      </>
    );
  }

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

      <main className="min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* TOP */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Link href="/my-orders">
                <button className="w-12 h-12 rounded-full bg-zinc-800 border border-white/10 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors">
                  <ArrowLeft />
                </button>
              </Link>
              <div>
                <h1 className="text-4xl font-extrabold text-white">
                  {order.orderNumber || `Order #${order.id}`}
                </h1>
                <p className="text-zinc-400 mt-2">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <div className={`px-5 py-3 rounded-full font-bold uppercase text-xs tracking-widest flex items-center gap-2 border ${getStatusColor(order.orderStatus)}`}>
                <span className="opacity-50">Order:</span> {order.orderStatus}
              </div>
              <div className={`px-5 py-3 rounded-full font-bold uppercase text-xs tracking-widest flex items-center gap-2 border ${getStatusColor(order.paymentStatus)}`}>
                <span className="opacity-50">Payment:</span> {order.paymentStatus}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
                  <div className="flex gap-5 flex-col md:flex-row items-center md:items-start">
                    
                    {/* IMAGE */}
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* INFO */}
                    <div className="flex-1 w-full text-center md:text-left">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {item.productName}
                      </h2>
                      <p className="text-zinc-400 mb-6">
                        {item.variantName}
                      </p>

                      <div className="flex flex-wrap gap-8 justify-center md:justify-start text-center">
                        <div>
                          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Quantity</p>
                          <p className="font-bold text-lg text-white">{item.quantity}</p>
                        </div>
                        <div>
                          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Price</p>
                          <p className="font-bold text-lg text-white">₹{item.price}</p>
                        </div>
                        <div>
                          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Total</p>
                          <p className="font-bold text-lg text-white">₹{item.totalAmount}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div>
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl sticky top-28">
                <div className="flex items-center gap-3 mb-8">
                  <ShoppingBag className="w-8 h-8 text-red-500" />
                  <h2 className="text-3xl font-bold text-white">Summary</h2>
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between">
                    <span className="text-zinc-400 font-medium">Payment Method</span>
                    <span className="font-bold text-white">{order.paymentMethod}</span>
                  </div>
                  
                  {(order.upfrontAmount > 0 || order.pendingAmount > 0) && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-zinc-400 font-medium">Paid Upfront</span>
                        <span className="font-bold text-white">₹{order.upfrontAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400 font-medium">Pending Amount</span>
                        <span className="font-bold text-white">₹{order.pendingAmount}</span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between">
                    <span className="text-zinc-400 font-medium">Delivery Charge</span>
                    <span className="font-bold text-white">₹{order.deliveryCharge}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-400 font-medium">Discount</span>
                    <span className="font-bold text-white">₹{order.discountAmount}</span>
                  </div>

                  <div className="border-t border-white/10 pt-6 flex justify-between items-center text-xl font-extrabold text-white">
                    <span>Final Amount</span>
                    <span className="text-3xl text-red-500">₹{order.finalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}