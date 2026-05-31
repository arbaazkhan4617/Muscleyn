"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Star,
  Home,
  Building2,
  X,
  CheckCircle2,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import {
  getUserAddresses,
  saveAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  SaveAddressRequest,
} from "@/services/addressService";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli",
  "Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];

const emptyForm: Omit<SaveAddressRequest, "userId"> = {
  fullName: "",
  mobileNumber: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
  addressType: "HOME",
  isDefault: false,
};

export default function AddressPage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();

  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  // REDIRECT IF NOT LOGGED IN
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login?returnUrl=/address");
    }
  }, [isLoggedIn, router]);

  // LOAD ADDRESSES
  const loadAddresses = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const res = await getUserAddresses(user.id);
      setAddresses(res?.data || []);
    } catch {
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && user?.id) loadAddresses();
  }, [isLoggedIn, user]);

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (address: any) => {
    setForm({
      fullName: address.fullName || "",
      mobileNumber: address.mobileNumber || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      landmark: address.landmark || "",
      city: address.city || "",
      state: address.state || "",
      country: address.country || "India",
      pincode: address.pincode || "",
      addressType: address.addressType || "HOME",
      isDefault: address.isDefault || false,
    });
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.fullName || !form.mobileNumber || !form.addressLine1 || !form.city || !form.state || !form.pincode) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      setSaving(true);
      const payload: SaveAddressRequest = { ...form, userId: user?.id };
      if (editingId) {
        await updateAddress(editingId, payload);
        toast.success("Address updated");
      } else {
        await saveAddress(payload);
        toast.success("Address added");
      }
      setShowForm(false);
      loadAddresses();
    } catch {
      toast.error("Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this address?")) return;
    try {
      await deleteAddress(id, user?.id);
      toast.success("Address deleted");
      loadAddresses();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await setDefaultAddress(id, user?.id);
      toast.success("Default address updated");
      loadAddresses();
    } catch {
      toast.error("Failed to set default");
    }
  };

  const updateField = (field: keyof typeof form, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950 py-16 text-white">
        <div className="max-w-3xl mx-auto px-4">

          {/* HEADER */}
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
            <button
              onClick={() => router.back()}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </button>
            <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20">
              <MapPin className="w-7 h-7 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white">My Addresses</h1>
              <p className="text-zinc-400 font-medium mt-0.5">Manage your delivery addresses</p>
            </div>
            <button
              onClick={openAddForm}
              className="ml-auto flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)]"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-10 h-10 border-4 border-white/10 border-t-red-500 rounded-full animate-spin" />
              <p className="text-zinc-500 font-semibold">Loading addresses...</p>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && addresses.length === 0 && !showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <MapPin className="w-9 h-9 text-zinc-600" />
              </div>
              <div>
                <p className="text-xl font-black text-white">No addresses yet</p>
                <p className="text-zinc-500 mt-2">Add a delivery address to place orders easily.</p>
              </div>
              <button
                onClick={openAddForm}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-2xl font-bold transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Your First Address
              </button>
            </motion.div>
          )}

          {/* ADDRESS CARDS */}
          <div className="space-y-4 mb-8">
            <AnimatePresence>
              {addresses.map((address) => (
                <motion.div
                  key={address.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`relative rounded-2xl border p-6 transition-all ${
                    address.isDefault
                      ? "border-red-500/50 bg-red-500/5"
                      : "border-white/10 bg-zinc-900/50"
                  }`}
                >
                  {/* DEFAULT BADGE */}
                  {address.isDefault && (
                    <span className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-[10px] font-black uppercase tracking-widest">
                      <CheckCircle2 className="w-3 h-3" />
                      Default
                    </span>
                  )}

                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                      address.addressType === "WORK"
                        ? "bg-blue-500/10 border border-blue-500/20"
                        : "bg-white/5 border border-white/10"
                    }`}>
                      {address.addressType === "WORK"
                        ? <Building2 className="w-5 h-5 text-blue-400" />
                        : <Home className="w-5 h-5 text-zinc-400" />
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-black text-white text-lg">{address.fullName}</h3>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-full">
                          {address.addressType}
                        </span>
                      </div>
                      <p className="text-zinc-400 leading-relaxed">
                        {address.addressLine1}
                        {address.addressLine2 && `, ${address.addressLine2}`}
                        {address.landmark && ` (${address.landmark})`}
                      </p>
                      <p className="text-zinc-400">
                        {address.city}, {address.state} — {address.pincode}
                      </p>
                      <p className="text-zinc-300 font-semibold mt-2">{address.mobileNumber}</p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/5">
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-yellow-400 transition-colors px-3 py-2 rounded-lg hover:bg-yellow-400/10"
                      >
                        <Star className="w-3.5 h-3.5" />
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => openEditForm(address)}
                      className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-400/10 ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ADD / EDIT FORM */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-zinc-900/80 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-2xl"
              >
                {/* FORM HEADER */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-white">
                    {editingId ? "Edit Address" : "Add New Address"}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>

                <div className="space-y-5">
                  {/* ROW 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3.5 outline-none text-white transition-colors placeholder:text-zinc-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Mobile Number *</label>
                      <input
                        type="text"
                        value={form.mobileNumber}
                        onChange={(e) => updateField("mobileNumber", e.target.value)}
                        placeholder="9876543210"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3.5 outline-none text-white transition-colors placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  {/* ADDRESS LINE 1 */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Address Line 1 *</label>
                    <input
                      type="text"
                      value={form.addressLine1}
                      onChange={(e) => updateField("addressLine1", e.target.value)}
                      placeholder="House/Flat no., Street name"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3.5 outline-none text-white transition-colors placeholder:text-zinc-600"
                    />
                  </div>

                  {/* ADDRESS LINE 2 + LANDMARK */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Address Line 2</label>
                      <input
                        type="text"
                        value={form.addressLine2}
                        onChange={(e) => updateField("addressLine2", e.target.value)}
                        placeholder="Apartment, Society, Area"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3.5 outline-none text-white transition-colors placeholder:text-zinc-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Landmark</label>
                      <input
                        type="text"
                        value={form.landmark}
                        onChange={(e) => updateField("landmark", e.target.value)}
                        placeholder="Near mall, hospital, etc."
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3.5 outline-none text-white transition-colors placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  {/* CITY + PINCODE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">City *</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        placeholder="Mumbai"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3.5 outline-none text-white transition-colors placeholder:text-zinc-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Pincode *</label>
                      <input
                        type="text"
                        value={form.pincode}
                        onChange={(e) => updateField("pincode", e.target.value)}
                        placeholder="400001"
                        maxLength={6}
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3.5 outline-none text-white transition-colors placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  {/* STATE + TYPE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">State *</label>
                      <select
                        value={form.state}
                        onChange={(e) => updateField("state", e.target.value)}
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3.5 outline-none text-white transition-colors appearance-none"
                      >
                        <option value="" className="text-zinc-500">Select State</option>
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Address Type</label>
                      <div className="flex gap-3">
                        {["HOME", "WORK", "OTHER"].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => updateField("addressType", type)}
                            className={`flex-1 py-3.5 rounded-xl border text-xs font-black uppercase tracking-widest transition-all ${
                              form.addressType === type
                                ? "bg-red-600 border-red-500 text-white"
                                : "bg-black border-white/10 text-zinc-400 hover:border-white/20"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SET AS DEFAULT */}
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => updateField("isDefault", !form.isDefault)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        form.isDefault
                          ? "bg-red-600 border-red-500"
                          : "bg-black border-white/20 group-hover:border-white/40"
                      }`}
                    >
                      {form.isDefault && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="text-sm font-semibold text-zinc-300">Set as default address</span>
                  </label>

                  {/* SAVE BUTTON */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setShowForm(false)}
                      className="flex-1 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 font-bold transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex-1 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                    >
                      {saving ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>{editingId ? "Update Address" : "Save Address"}</>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </>
  );
}