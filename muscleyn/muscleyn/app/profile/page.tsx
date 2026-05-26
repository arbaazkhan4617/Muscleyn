"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { User, Mail, Phone, MapPin, Package, Settings, LogOut, ShieldCheck, Edit3 } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { getUserAddresses } from "@/services/addressService";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoggedIn, logoutUser } = useAuth();
  const [defaultAddress, setDefaultAddress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If auth state is loaded and not logged in, redirect
    if (user === null && !isLoggedIn) {
       // Allow a moment for context to initialize
       const timer = setTimeout(() => {
          if (!isLoggedIn) {
            router.push("/login");
          }
       }, 1000);
       return () => clearTimeout(timer);
    }
    
    if (user?.id) {
        loadAddress();
    }
  }, [user, isLoggedIn, router]);

  const loadAddress = async () => {
      try {
          const response = await getUserAddresses(user?.id);
          const addressData = response?.data || [];
          const defaultAdd = addressData.find((item: any) => item.isDefault) || addressData[0];
          setDefaultAddress(defaultAdd);
      } catch(error) {
          console.error("Failed to load address", error);
      } finally {
          setLoading(false);
      }
  };

  const handleLogout = () => {
      logoutUser();
      toast.success("Logged out successfully");
      router.push("/");
  };

  // Safe fallback for demo
  const displayUser = user || {
      name: "Demo User",
      email: "demo@muscleyn.com",
      mobileNumber: "+91 9876543210",
      role: "CUSTOMER"
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950 py-12 text-white relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-zinc-900 border-2 border-red-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                <span className="text-3xl font-black text-white">
                  {displayUser.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight text-white mb-1">
                  Welcome, {displayUser.name}
                </h1>
                <div className="flex items-center gap-2 text-zinc-400 font-medium">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  Premium Member
                </div>
              </div>
            </div>
            <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-zinc-300 border border-white/10 hover:border-red-500/30 transition-all font-bold text-sm"
            >
                <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
            
            {/* LEFT SIDEBAR - QUICK LINKS */}
            <div className="space-y-4">
                <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 shadow-xl sticky top-28">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 px-2">Dashboard</h3>
                    <nav className="space-y-2">
                        <Link href="/profile" className="flex items-center justify-between p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold transition-all group">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5" /> Profile Overview
                            </div>
                        </Link>
                        <Link href="/my-orders" className="flex items-center justify-between p-4 rounded-2xl bg-black border border-transparent hover:border-white/10 text-zinc-400 hover:text-white font-bold transition-all group">
                            <div className="flex items-center gap-3">
                                <Package className="w-5 h-5 group-hover:text-red-500 transition-colors" /> My Orders
                            </div>
                        </Link>
                        <Link href="/address" className="flex items-center justify-between p-4 rounded-2xl bg-black border border-transparent hover:border-white/10 text-zinc-400 hover:text-white font-bold transition-all group">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 group-hover:text-red-500 transition-colors" /> Saved Addresses
                            </div>
                        </Link>
                        <Link href="#" className="flex items-center justify-between p-4 rounded-2xl bg-black border border-transparent hover:border-white/10 text-zinc-400 hover:text-white font-bold transition-all group">
                            <div className="flex items-center gap-3">
                                <Settings className="w-5 h-5 group-hover:text-red-500 transition-colors" /> Account Settings
                            </div>
                        </Link>
                    </nav>
                </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="space-y-8">
                
                {/* PROFILE DETAILS */}
                <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-red-500/10 transition-colors"></div>
                    
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <h2 className="text-2xl font-black flex items-center gap-3">
                            <User className="w-6 h-6 text-red-500" /> Personal Information
                        </h2>
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 transition-colors">
                            <Edit3 className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <div className="p-5 bg-black rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3 text-zinc-500 mb-2">
                                <User className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-widest">Full Name</span>
                            </div>
                            <p className="text-lg font-bold text-white">{displayUser.name}</p>
                        </div>
                        <div className="p-5 bg-black rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3 text-zinc-500 mb-2">
                                <Mail className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-widest">Email Address</span>
                            </div>
                            <p className="text-lg font-bold text-white">{displayUser.email}</p>
                        </div>
                        <div className="p-5 bg-black rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3 text-zinc-500 mb-2">
                                <Phone className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-widest">Phone Number</span>
                            </div>
                            <p className="text-lg font-bold text-white">{displayUser.mobileNumber}</p>
                        </div>
                        <div className="p-5 bg-black rounded-2xl border border-white/5 flex flex-col justify-center items-start">
                            <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck className="w-3 h-3" /> Account Verified
                            </div>
                        </div>
                    </div>
                </div>

                {/* RECENT ACTIVITY & ADDRESS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* DEFAULT ADDRESS */}
                    <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 shadow-xl flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-red-500" /> Default Address
                            </h2>
                            <Link href="/address" className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-white transition-colors">Manage</Link>
                        </div>
                        
                        <div className="flex-1 bg-black rounded-2xl border border-white/5 p-6 flex flex-col justify-center">
                            {loading ? (
                                <div className="animate-pulse space-y-3">
                                    <div className="h-4 bg-white/10 rounded w-1/3"></div>
                                    <div className="h-4 bg-white/10 rounded w-full"></div>
                                    <div className="h-4 bg-white/10 rounded w-2/3"></div>
                                </div>
                            ) : defaultAddress ? (
                                <div>
                                    <h3 className="font-bold text-lg mb-2">{defaultAddress.fullName}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                                        {defaultAddress.addressLine1}, {defaultAddress.city},<br/>
                                        {defaultAddress.state} - {defaultAddress.pincode}
                                    </p>
                                    <p className="text-zinc-300 font-medium text-sm">{defaultAddress.mobileNumber}</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="text-zinc-500 text-sm mb-4">No default address set.</p>
                                    <Link href="/address" className="inline-block px-5 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors text-sm font-bold">Add Address</Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* QUICK STATS */}
                    <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 shadow-xl flex flex-col">
                        <h2 className="text-xl font-black flex items-center gap-3 mb-8">
                            <Package className="w-5 h-5 text-red-500" /> Account Stats
                        </h2>
                        
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <div className="bg-black rounded-2xl border border-white/5 p-6 flex flex-col items-center justify-center text-center">
                                <div className="text-4xl font-black text-white mb-2">12</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Total Orders</div>
                            </div>
                            <div className="bg-black rounded-2xl border border-white/5 p-6 flex flex-col items-center justify-center text-center">
                                <div className="text-4xl font-black text-red-500 mb-2">3</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Active Rewards</div>
                            </div>
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
