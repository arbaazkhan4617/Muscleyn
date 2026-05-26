"use client";

import { useEffect, useState } from "react";
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import api from "@/services/api";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type AdminDashboard = {
  totalRevenue?: number;
  totalOrders?: number;
  totalProducts?: number;
  totalCustomers?: number;
};

// Mock data for charts
const salesData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 6890 },
  { name: 'Sat', sales: 8390 },
  { name: 'Sun', sales: 9490 },
];

const categoryData = [
  { name: 'Whey Protein', value: 400 },
  { name: 'Pre-Workout', value: 300 },
  { name: 'Creatine', value: 300 },
  { name: 'Vitamins', value: 200 },
];
const COLORS = ['#ef4444', '#f87171', '#fca5a5', '#fee2e2'];

const recentOrdersData = [
    { id: "ORD-982", user: "John Doe", amount: 4500, status: "Delivered" },
    { id: "ORD-983", user: "Sarah Smith", amount: 1290, status: "Processing" },
    { id: "ORD-984", user: "Mike Johnson", amount: 8900, status: "Shipped" },
    { id: "ORD-985", user: "Emily Davis", amount: 3200, status: "Pending" },
];

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await api.get("/admin/dashboard");
        setDashboard(response.data.data);
      } catch (error) {
        console.log(error);
        // Fallback demo data
        setDashboard({
            totalRevenue: 128450,
            totalOrders: 342,
            totalProducts: 48,
            totalCustomers: 1250
        });
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${dashboard?.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      trend: "+12.5%",
      isPositive: true
    },
    {
      title: "Total Orders",
      value: dashboard?.totalOrders?.toLocaleString() || 0,
      icon: ShoppingCart,
      trend: "+8.2%",
      isPositive: true
    },
    {
      title: "Total Customers",
      value: dashboard?.totalCustomers?.toLocaleString() || 0,
      icon: Users,
      trend: "+5.1%",
      isPositive: true
    },
    {
      title: "Active Products",
      value: dashboard?.totalProducts?.toLocaleString() || 0,
      icon: Package,
      trend: "-2.4%",
      isPositive: false
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-end justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Dashboard Overview</h1>
          <p className="text-zinc-400 mt-2 font-medium">Live performance snapshot for the Muscleyn commerce engine.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-sm font-bold">
            <Activity className="w-4 h-4" /> System Healthy
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon className="w-16 h-16 text-white" />
              </div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${stat.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.trend}
                </div>
              </div>
              <h2 className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-1 relative z-10">
                {stat.title}
              </h2>
              <p className="text-3xl font-black text-white relative z-10">
                {loading ? "..." : stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* REVENUE CHART */}
        <div className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-black text-white">Revenue Analytics</h3>
                    <p className="text-zinc-500 text-sm font-medium">Daily sales performance over the last 7 days</p>
                </div>
                <div className="p-2 bg-white/5 rounded-lg text-zinc-400">
                    <TrendingUp className="w-5 h-5" />
                </div>
            </div>
            
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="sales" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* CATEGORY DISTRIBUTION */}
        <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/5 flex flex-col">
            <h3 className="text-lg font-black text-white mb-2">Sales by Category</h3>
            <p className="text-zinc-500 text-sm font-medium mb-4">Distribution of revenue across product types</p>
            
            <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="rgba(0,0,0,0.5)"
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
                {categoryData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        {entry.name}
                    </div>
                ))}
            </div>
        </div>

      </div>

      {/* RECENT ORDERS ROW */}
      <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/5">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-white">Recent Orders</h3>
            <button className="text-sm font-bold text-red-500 hover:text-red-400 transition-colors">View All</button>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-widest text-zinc-500">
                        <th className="pb-4 px-4 font-bold">Order ID</th>
                        <th className="pb-4 px-4 font-bold">Customer</th>
                        <th className="pb-4 px-4 font-bold">Amount</th>
                        <th className="pb-4 px-4 font-bold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {recentOrdersData.map((order, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 font-bold text-white">{order.id}</td>
                            <td className="py-4 px-4 font-medium text-zinc-300">{order.user}</td>
                            <td className="py-4 px-4 font-black text-white">₹{order.amount}</td>
                            <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                                    order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' :
                                    order.status === 'Shipped' ? 'bg-yellow-500/10 text-yellow-500' :
                                    'bg-zinc-500/10 text-zinc-400'
                                }`}>
                                    {order.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}