"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/services/api";
import { TicketPercent, Plus, Pencil, Trash2, Calendar, CheckCircle2, Ban } from "lucide-react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [couponCode, setCouponCode] = useState("");
  const [discountType, setDiscountType] = useState("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState("");
  const [minimumAmount, setMinimumAmount] = useState("");
  const [maximumDiscount, setMaximumDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isActive, setIsActive] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/coupons");
      setCoupons(response.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setCouponCode("");
    setDiscountType("PERCENTAGE");
    setDiscountValue("");
    setMinimumAmount("");
    setMaximumDiscount("");
    setExpiryDate("");
    setIsActive(true);
  };

  const handleEdit = (coupon: any) => {
    setEditingId(coupon.id);
    setCouponCode(coupon.couponCode);
    setDiscountType(coupon.discountType || "PERCENTAGE");
    setDiscountValue(coupon.discountValue);
    setMinimumAmount(coupon.minimumAmount);
    setMaximumDiscount(coupon.maximumDiscount);
    setExpiryDate(coupon.expiryDate ? coupon.expiryDate.substring(0, 16) : ""); // Format for datetime-local
    setIsActive(coupon.isActive);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await api.delete(`/coupons/${id}`);
      toast.success("Coupon deleted");
      loadData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete coupon");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode || !discountValue) {
      toast.error("Code and discount value are required");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        couponCode: couponCode.toUpperCase(),
        discountType,
        discountValue: Number(discountValue),
        minimumAmount: Number(minimumAmount || 0),
        maximumDiscount: Number(maximumDiscount || 0),
        expiryDate: expiryDate ? new Date(expiryDate).toISOString() : null,
        isActive
      };

      if (editingId) {
        await api.put(`/coupons/${editingId}`, payload);
        toast.success("Coupon updated");
      } else {
        await api.post("/coupons", payload);
        toast.success("Coupon created");
      }

      resetForm();
      loadData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to save coupon");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Offers...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* TOP */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Coupons & Offers</h1>
          <p className="text-zinc-400 mt-2 font-medium">Create promotional codes and drive sales conversions.</p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl space-y-6">
        <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
            <TicketPercent className="w-5 h-5 text-red-500" /> 
            {editingId ? "Edit Promotion" : "Create New Promotion"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Coupon Code</label>
                <input
                    type="text"
                    placeholder="e.g. SUMMER20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-5 py-3 outline-none text-white transition-colors"
                />
            </div>
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Discount Type</label>
                <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-5 py-3 outline-none text-white transition-colors appearance-none"
                >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FLAT">Flat Amount ($)</option>
                </select>
            </div>
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Discount Value</label>
                <input
                    type="number"
                    placeholder="e.g. 20"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-5 py-3 outline-none text-white transition-colors"
                />
            </div>
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Min. Order Amount ($)</label>
                <input
                    type="number"
                    placeholder="e.g. 50"
                    value={minimumAmount}
                    onChange={(e) => setMinimumAmount(e.target.value)}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-5 py-3 outline-none text-white transition-colors"
                />
            </div>
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Max. Discount Cap ($)</label>
                <input
                    type="number"
                    placeholder="e.g. 100"
                    value={maximumDiscount}
                    onChange={(e) => setMaximumDiscount(e.target.value)}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-5 py-3 outline-none text-white transition-colors"
                />
            </div>
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Expiry Date</label>
                <input
                    type="datetime-local"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-5 py-3 outline-none text-white transition-colors"
                />
            </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/10">
            <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-12 h-6 rounded-full transition-colors relative ${isActive ? 'bg-green-500/20 border-green-500/30' : 'bg-white/10 border-white/10'} border`}>
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${isActive ? 'translate-x-6 bg-green-500' : 'bg-zinc-500'}`}></div>
                </div>
                <input type="checkbox" className="hidden" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">Active Coupon</span>
            </label>

            <div className="flex gap-3">
                {editingId && (
                    <button type="button" onClick={resetForm} className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors">
                        Cancel
                    </button>
                )}
                <button type="submit" disabled={saving} className="bg-red-600 hover:bg-white hover:text-black text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-50">
                    {saving ? "Saving..." : editingId ? "Update Coupon" : <><Plus className="w-4 h-4" /> Create Coupon</>}
                </button>
            </div>
        </div>
      </form>

      {/* TABLE */}
      <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/50 text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-white/10">
                <th className="p-6 font-bold">Code</th>
                <th className="p-6 font-bold">Discount</th>
                <th className="p-6 font-bold">Limits</th>
                <th className="p-6 font-bold">Expiry</th>
                <th className="p-6 font-bold">Status</th>
                <th className="p-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length === 0 ? (
                 <tr>
                    <td colSpan={6} className="p-12 text-center text-zinc-500 font-medium">
                        No coupons created yet. Create your first offer above.
                    </td>
                 </tr>
              ) : (
                coupons.map((coupon) => {
                  const isExpired = coupon.expiryDate && new Date(coupon.expiryDate) < new Date();
                  return (
                  <tr key={coupon.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-6">
                      <span className="font-black text-white bg-white/10 px-4 py-2 rounded-xl border border-white/10 tracking-widest">
                          {coupon.couponCode}
                      </span>
                    </td>
                    <td className="p-6">
                      <p className="font-black text-red-400 text-lg">
                          {coupon.discountType === 'PERCENTAGE' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
                      </p>
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">Off Total</p>
                    </td>
                    <td className="p-6">
                      <p className="text-sm text-zinc-300">Min Spend: <span className="text-white font-bold">${coupon.minimumAmount || 0}</span></p>
                      <p className="text-sm text-zinc-300">Max Disc: <span className="text-white font-bold">${coupon.maximumDiscount || 'No Limit'}</span></p>
                    </td>
                    <td className="p-6">
                      {coupon.expiryDate ? (
                          <div className={`text-sm font-medium flex items-center gap-2 ${isExpired ? 'text-red-500' : 'text-zinc-300'}`}>
                              <Calendar className="w-4 h-4" />
                              {new Date(coupon.expiryDate).toLocaleDateString()}
                          </div>
                      ) : (
                          <span className="text-zinc-500 text-sm">Never</span>
                      )}
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border ${
                          coupon.isActive && !isExpired
                            ? "bg-green-500/10 text-green-500 border-green-500/20" 
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                      }`}>
                          {coupon.isActive && !isExpired ? <CheckCircle2 className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                          {isExpired ? 'Expired' : (coupon.isActive ? 'Active' : 'Disabled')}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(coupon)}
                          className="w-10 h-10 rounded-xl bg-black hover:bg-blue-500/20 text-zinc-400 hover:text-blue-500 flex items-center justify-center border border-white/10 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(coupon.id)}
                          className="w-10 h-10 rounded-xl bg-black hover:bg-red-500/20 text-zinc-400 hover:text-red-500 flex items-center justify-center border border-white/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
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
