"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/services/api";
import { Search, UserCircle, Shield, Ban, CheckCircle2, Mail, Phone, Calendar } from "lucide-react";
import Image from "next/image";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // LOAD DATA
  const loadData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/customers");
      setCustomers(response.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // TOGGLE STATUS
  const handleToggleStatus = async (customerId: number) => {
      try {
          await api.patch(`/admin/customers/toggle-status/${customerId}`);
          toast.success("Customer status updated");
          loadData();
      } catch (error) {
          console.log(error);
          toast.error("Failed to update status");
      }
  };

  // FILTERING
  const filteredCustomers = customers.filter(customer => {
      const search = searchTerm.toLowerCase();
      return (
          (customer.name || "").toLowerCase().includes(search) || 
          (customer.email || "").toLowerCase().includes(search) ||
          (customer.mobileNumber || "").toLowerCase().includes(search) ||
          customer.id.toString().includes(search)
      );
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Customer CRM...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* TOP */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Customer CRM</h1>
          <p className="text-zinc-400 mt-2 font-medium">Manage user accounts, view contact details, and handle access restrictions.</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input 
                  type="text" 
                  placeholder="Search by Name, Email, Phone, or ID..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl pl-12 pr-4 py-3 outline-none text-white transition-colors"
              />
          </div>
      </div>

      {/* TABLE */}
      <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/50 text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-white/10">
                <th className="p-6 font-bold w-20 text-center">ID</th>
                <th className="p-6 font-bold">Profile</th>
                <th className="p-6 font-bold">Contact Info</th>
                <th className="p-6 font-bold">Joined Date</th>
                <th className="p-6 font-bold">Status</th>
                <th className="p-6 font-bold text-right">Access</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                 <tr>
                    <td colSpan={6} className="p-12 text-center text-zinc-500 font-medium">
                        No customers found matching your search.
                    </td>
                 </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-6 text-center">
                      <span className="font-bold text-zinc-500">#{customer.id}</span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                              <UserCircle className="w-8 h-8 text-zinc-600" />
                          </div>
                          <div>
                              <p className="font-bold text-white group-hover:text-red-400 transition-colors">{customer.name}</p>
                              <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-1 inline-block">
                                  {customer.role?.replace('ROLE_', '') || 'USER'}
                              </span>
                          </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-1">
                          <p className="text-sm text-zinc-300 flex items-center gap-2">
                              <Mail className="w-3 h-3 text-zinc-500" /> {customer.email || 'No Email'}
                          </p>
                          <p className="text-sm text-zinc-300 flex items-center gap-2">
                              <Phone className="w-3 h-3 text-zinc-500" /> {customer.mobileNumber || 'No Phone'}
                          </p>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-sm text-white font-medium flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-zinc-500" />
                          {new Date(customer.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border ${
                          customer.isActive !== false 
                            ? "bg-green-500/10 text-green-500 border-green-500/20" 
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                      }`}>
                          {customer.isActive !== false ? <CheckCircle2 className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                          {customer.isActive !== false ? 'Active' : 'Banned'}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleToggleStatus(customer.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${
                              customer.isActive !== false
                                ? "bg-black text-red-500 border-red-500/20 hover:bg-red-500/10"
                                : "bg-black text-green-500 border-green-500/20 hover:bg-green-500/10"
                          }`}
                        >
                          {customer.isActive !== false ? "Suspend" : "Restore"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
