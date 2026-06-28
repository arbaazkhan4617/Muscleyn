"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { ArrowLeft, User, Package, Calendar, CreditCard, Clock, Truck, PackageCheck, XCircle } from "lucide-react";
import api from "@/services/api";
import { div } from "framer-motion/client";

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id;

  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadOrderDetails = async () => {
    try {
      setLoading(true);

      // 1. Fetch all orders and find ours (since admin/orders returns all)
      const ordersRes = await api.get("/admin/orders");
      const foundOrder = ordersRes.data.data.find((o: any) => o.id === Number(orderId));

      if (!foundOrder) {
        toast.error("Order not found!");
        router.push("/admin/orders");
        return;
      }
      setOrder(foundOrder);

      // 2. Fetch Customer Details
      try {
        const userRes = await api.get(`/admin/customers/${foundOrder.userId}`);
        setCustomer(userRes.data.data);
      } catch (e) {
        console.log("Error fetching customer details", e);
      }

      // 3. Fetch Order Items dynamically using customer-orders which returns fully populated DTOs
      try {
        const customerOrderRes = await api.get(`/customer-orders/${orderId}`);
        setItems(customerOrderRes.data.data.items || []);
      } catch (e) {
        // Fallback to basic items if needed
        const itemsRes = await api.get(`/orders/items/${orderId}`);
        setItems(itemsRes.data.data || []);
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to load dynamic order details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      loadOrderDetails();
    }
  }, [orderId]);

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await api.patch(`/admin/orders/status/${orderId}?orderStatus=${newStatus}`);
      toast.success(`Order marked as ${newStatus}`);
      loadOrderDetails();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  const handlePaymentStatusUpdate = async (newStatus: string) => {
    try {
      await api.patch(`/admin/orders/payment-status/${orderId}?paymentStatus=${newStatus}`);
      toast.success(`Payment status marked as ${newStatus}`);
      loadOrderDetails();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update payment status");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PLACED':
      case 'PENDING':
        return <span className="px-4 py-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2"><Clock className="w-4 h-4" /> Pending</span>;
      case 'SHIPPED':
        return <span className="px-4 py-2 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2"><Truck className="w-4 h-4" /> Shipped</span>;
      case 'DELIVERED':
        return <span className="px-4 py-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2"><PackageCheck className="w-4 h-4" /> Delivered</span>;
      case 'CANCELLED':
        return <span className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2"><XCircle className="w-4 h-4" /> Cancelled</span>;
      default:
        return <span className="px-4 py-2 bg-zinc-500/10 text-zinc-500 border border-zinc-500/20 rounded-xl text-xs font-black uppercase tracking-widest">{status}</span>;
    }
  };

  if (loading || !order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Dynamic Details...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* TOP HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-1">Order Details</p>
            <h1 className="text-3xl font-black text-white">{order.orderNumber || `Order #${order.id}`}</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {getStatusBadge(order.orderStatus)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN: Items */}
        <div className="lg:col-span-2">
          <div className="space-y-8 sticky top-24">
            <div className="bg-zinc-900/50 backdrop-blur-md rounded-[2rem] border border-white/10 overflow-hidden shadow-xl">
              <div className="px-8 py-6 border-b border-white/10 flex items-center gap-3">
                <Package className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-black text-white">Product Purchases</h2>
              </div>
              <div className="p-2">
                {items.length === 0 ? (
                  <p className="p-8 text-center text-zinc-500 font-medium">No items found for this order.</p>
                ) : (
                  items.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-center gap-6 p-6 hover:bg-white/5 rounded-3xl transition-colors border-b border-white/5 last:border-0">
                      <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative flex-shrink-0">
                        {item.productImage || item.variant?.imageUrl ? (
                          <Image src={item.productImage || item.variant?.imageUrl} alt={item.variantName || item.productName || "Product"} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-700 font-bold text-xs uppercase">No Img</div>
                        )}
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg font-black text-white mb-1">{item.productName || item.variant?.product?.name || "Unknown Product"}</h3>
                        <p className="text-sm text-zinc-400 font-medium">{item.variantName || item.variant?.variantName || "SKU: N/A"}</p>
                      </div>
                      <div className="flex gap-8 text-center">
                        <div>
                          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">QTY</p>
                          <p className="text-xl font-black text-white">{item.quantity}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Price</p>
                          <p className="text-xl font-black text-white">₹{item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Customer & Summary */}
        <div>
          <div className="space-y-8 sticky top-24">

            {/* CUSTOMER INFO */}
            <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-xl">
              <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
                <User className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-black text-white">Customer Info</h2>
              </div>
              <div className="p-6 space-y-4">
                {customer ? (
                  <>
                    <div>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Full Name</p>
                      <p className="text-white font-medium">{customer.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Email</p>
                      <p className="text-white font-medium">{customer.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Mobile</p>
                      <p className="text-white font-medium">{customer.mobileNumber || "N/A"}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-zinc-500 font-medium text-sm">Guest or Unknown User (ID: {order.userId})</p>
                )}
              </div>
            </div>

            {/* SUMMARY */}
            <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-xl">
              <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-green-500" />
                <h2 className="text-lg font-black text-white">Order Summary</h2>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-medium">Method</span>
                  <span className="text-white font-bold">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-medium">Gateway</span>
                  <span className="text-white font-bold">{order.paymentGateway || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-medium">Payment Status</span>
                  <span className="text-white font-bold">{order.paymentStatus}</span>
                </div>
                {(order.upfrontAmount > 0 || order.pendingAmount > 0) && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-medium">Paid Upfront</span>
                      <span className="text-white font-bold">₹{order.upfrontAmount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-medium">Pending Amount</span>
                      <span className="text-white font-bold">₹{order.pendingAmount}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-medium">Date</span>
                  <span className="text-white font-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-zinc-300 font-bold">Total Amount</span>
                  <span className="text-3xl font-black text-white">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-xl p-6">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Manage Status</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleStatusUpdate("SHIPPED")} disabled={order.orderStatus === "DELIVERED" || order.orderStatus === "CANCELLED"} className="py-3 bg-blue-500/10 hover:bg-blue-500 hover:text-white text-blue-500 rounded-xl font-bold transition-colors border border-blue-500/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed">Ship</button>
                <button onClick={() => handleStatusUpdate("DELIVERED")} disabled={order.orderStatus === "DELIVERED" || order.orderStatus === "CANCELLED"} className="py-3 bg-green-500/10 hover:bg-green-500 hover:text-white text-green-500 rounded-xl font-bold transition-colors border border-green-500/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed">Deliver</button>
                <button onClick={() => handleStatusUpdate("CANCELLED")} disabled={order.orderStatus === "DELIVERED" || order.orderStatus === "CANCELLED"} className="col-span-2 py-3 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-xl font-bold transition-colors border border-red-500/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed">Cancel Order</button>
              </div>

              {order.orderStatus !== "DELIVERED" && order.orderStatus !== "CANCELLED" && (
                <>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 mt-8">Manage Payment Status</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handlePaymentStatusUpdate("PAID")} disabled={order.paymentStatus === "PAID" || order.paymentStatus === "SUCCESS"} className="py-3 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-500 rounded-xl font-bold transition-colors border border-emerald-500/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed">Mark Paid</button>
                    <button onClick={() => handlePaymentStatusUpdate("PENDING")} disabled={order.paymentStatus === "PAID" || order.paymentStatus === "SUCCESS"} className="py-3 bg-yellow-500/10 hover:bg-yellow-500 hover:text-white text-yellow-500 rounded-xl font-bold transition-colors border border-yellow-500/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed">Mark Pending</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
