"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/services/api";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const response = await api.get("/cms/privacy-policy");
        if (response.data.data && response.data.data.cmsValue) {
          setContent(response.data.data.cmsValue);
        } else {
          setContent("Default Privacy Policy: Prabha Pharma values your privacy. We secure all personal and financial data transmission using end-to-end encrypted tunnels. We never sell customer email or tracking data.");
        }
      } catch (error) {
        console.error("Failed to load privacy policy:", error);
        setContent("Default Privacy Policy: Prabha Pharma values your privacy. We secure all personal and financial data transmission using end-to-end encrypted tunnels. We never sell customer email or tracking data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPrivacy();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 text-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-6 mb-8">
            <ShieldCheck className="w-10 h-10 text-red-500" />
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">Privacy Policy</h1>
              <p className="text-zinc-500 mt-1 font-semibold">PRABHA PHARMA (HEALTHCARE & NUTRITION)</p>
            </div>
          </div>

          {loading ? (
            <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Loading Privacy Policy...</p>
            </div>
          ) : (
            <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-md">
              <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed font-medium space-y-6 whitespace-pre-line text-base">
                {content}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
