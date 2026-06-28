"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/services/api";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, Users, ShoppingCart, IndianRupee, Calendar as CalendarIcon } from "lucide-react";

export default function AdminReportsPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersRes, usersRes] = await Promise.all([
        api.get("/admin/orders"),
        api.get("/admin/customers")
      ]);
      setOrders(ordersRes.data.data || []);
      setCustomers(usersRes.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load report data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute Metrics
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Monthly Revenue Data (Simulated or Aggregated)
  const monthlyRevenue = [
    { name: 'Jan', revenue: 4000, orders: 24 },
    { name: 'Feb', revenue: 3000, orders: 13 },
    { name: 'Mar', revenue: 2000, orders: 98 },
    { name: 'Apr', revenue: 2780, orders: 39 },
    { name: 'May', revenue: 1890, orders: 48 },
    { name: 'Jun', revenue: 2390, orders: 38 },
    { name: 'Jul', revenue: 3490, orders: 43 },
  ];

  // Status Distribution
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.keys(statusCounts).map(key => ({ name: key, value: statusCounts[key] }));
  const COLORS = ['#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Generating Reports...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* TOP */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Analytics & Reports</h1>
          <p className="text-zinc-400 mt-2 font-medium">Comprehensive business intelligence and exportable data.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold text-sm transition-colors border border-white/10">
            <CalendarIcon className="w-4 h-4" /> This Month
          </button>
          <button className="bg-red-600 hover:bg-white hover:text-black text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: IndianRupee, trend: "+12.5%" },
          { label: "Total Orders", value: totalOrders.toLocaleString(), icon: ShoppingCart, trend: "+8.2%" },
          { label: "Total Customers", value: totalCustomers.toLocaleString(), icon: Users, trend: "+24.1%" },
          { label: "Avg. Order Value", value: `₹${avgOrderValue.toFixed(2)}`, icon: TrendingUp, trend: "+3.4%" },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-red-500" />
              </div>
              <span className="px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-md text-[10px] font-black uppercase tracking-widest">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-1">{stat.label}</h3>
            <p className="text-3xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* REVENUE CHART */}
        <div className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
          <h3 className="font-bold text-white mb-6">Revenue Overview (YTD)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem', color: '#fff', fontWeight: 'bold' }}
                  itemStyle={{ color: '#dc2626' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* STATUS PIE CHART */}
        <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
          <h3 className="font-bold text-white mb-6">Order Status Distribution</h3>
          <div className="h-[200px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem', color: '#fff', fontWeight: 'bold' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {statusData.map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-sm font-bold text-zinc-300">{entry.name}</span>
                </div>
                <span className="text-sm font-black text-white">{entry.value}</span>
              </div>
            ))}
            {statusData.length === 0 && (
              <p className="text-center text-sm text-zinc-500 font-medium">No order data available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
