"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/services/api";
import { PackageSearch, Search, ChevronDown, Eye, CheckCircle2, XCircle, Truck, PackageCheck, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // LOAD DATA
  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersRes, usersRes] = await Promise.all([
        api.get("/admin/orders"),
        api.get("/admin/customers")
      ]);
      
      const ordersData = ordersRes.data.data || [];
      const usersData = usersRes.data.data || [];
      
      // Map users for quick lookup (use string keys for type safety)
      const userMap: Record<string, any> = {};
      usersData.forEach((user: any) => {
          userMap[String(user.id)] = user;
      });
      
      setUsers(userMap);
      setOrders(ordersData);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // STATUS UPDATE
  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
      try {
          await api.patch(`/admin/orders/status/${orderId}?orderStatus=${newStatus}`);
          toast.success("Order status updated");
          loadData();
      } catch (error) {
          console.log(error);
          toast.error("Failed to update status");
      }
  };

  // DELETE
  const handleDelete = async (orderId: number) => {
      if(!confirm("Are you sure you want to permanently delete this order?")) return;
      try {
          await api.delete(`/admin/orders/${orderId}`);
          toast.success("Order deleted");
          loadData();
      } catch (error) {
          console.log(error);
          toast.error("Failed to delete order");
      }
  };

  // FILTERING
  const filteredOrders = orders.filter(order => {
      const matchesSearch = 
          order.id.toString().includes(searchTerm) || 
          (users[String(order.userId)]?.name || "").toLowerCase().includes(searchTerm.toLowerCase());
          
      const matchesStatus = statusFilter === "ALL" || order.orderStatus === statusFilter;
      
      return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'PLACED':
          case 'PENDING':
              return <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit"><Clock className="w-3 h-3" /> Pending</span>;
          case 'SHIPPED':
              return <span className="px-3 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit"><Truck className="w-3 h-3" /> Shipped</span>;
          case 'DELIVERED':
              return <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit"><PackageCheck className="w-3 h-3" /> Delivered</span>;
          case 'CANCELLED':
              return <span className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit"><XCircle className="w-3 h-3" /> Cancelled</span>;
          default:
              return <span className="px-3 py-1 bg-zinc-500/10 text-zinc-500 border border-zinc-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">{status}</span>;
      }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* TOP */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Order Management</h1>
          <p className="text-zinc-400 mt-2 font-medium">Track fulfillment, update statuses, and monitor revenue.</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input 
                  type="text" 
                  placeholder="Search by Order ID or Customer Name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl pl-12 pr-4 py-3 outline-none text-white transition-colors"
              />
          </div>
          <select 
             value={statusFilter}
             onChange={(e) => setStatusFilter(e.target.value)}
             className="bg-black border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 min-w-[200px]"
          >
              <option value="ALL">All Statuses</option>
              <option value="PLACED">Placed / Pending</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
          </select>
      </div>

      {/* TABLE */}
      <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/50 text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-white/10">
                <th className="p-6 font-bold w-24">Order ID</th>
                <th className="p-6 font-bold">Customer</th>
                <th className="p-6 font-bold">Date</th>
                <th className="p-6 font-bold">Amount</th>
                <th className="p-6 font-bold">Status</th>
                <th className="p-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                 <tr>
                    <td colSpan={6} className="p-12 text-center text-zinc-500 font-medium">
                        No orders found matching your criteria.
                    </td>
                 </tr>
              ) : (
                filteredOrders.map((order) => {
                  const customer = users[String(order.userId)];
                  return (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-6">
                      <span className="font-black text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                          #{order.id}
                      </span>
                    </td>
                    <td className="p-6">
                      <div>
                          <p className="font-bold text-white group-hover:text-red-400 transition-colors">
                              {customer?.name || (order.userId ? `User #${order.userId}` : 'Guest')}
                          </p>
                          <p className="text-sm text-zinc-500 font-medium">{customer?.email || customer?.mobileNumber || 'No contact info'}</p>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-zinc-400 font-medium text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className="text-white font-black">
                          ${order.totalAmount?.toFixed(2)}
                      </span>
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">
                          {order.paymentMethod} • <span className={order.paymentStatus === 'PAID' ? 'text-green-500' : 'text-yellow-500'}>{order.paymentStatus}</span>
                      </p>
                    </td>
                    <td className="p-6">
                      {getStatusBadge(order.orderStatus)}
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-end gap-2">
                        {/* Status Quick Actions */}
                        <select 
                            onChange={(e) => {
                                if(e.target.value) handleStatusUpdate(order.id, e.target.value);
                                e.target.value = ""; // reset
                            }}
                            className="bg-black text-xs font-bold uppercase tracking-widest text-white border border-white/10 rounded-xl px-3 py-2 outline-none hover:border-red-500 transition-colors cursor-pointer appearance-none text-center"
                        >
                            <option value="">Update...</option>
                            <option value="SHIPPED">Ship</option>
                            <option value="DELIVERED">Deliver</option>
                            <option value="CANCELLED">Cancel</option>
                        </select>
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="w-9 h-9 rounded-xl bg-black hover:bg-white hover:text-black text-zinc-400 flex items-center justify-center border border-white/10 transition-colors"
                          title="View Order Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="w-9 h-9 rounded-xl bg-black hover:bg-red-500/20 text-zinc-400 hover:text-red-500 flex items-center justify-center border border-white/10 transition-colors"
                          title="Delete Order"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )})
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
