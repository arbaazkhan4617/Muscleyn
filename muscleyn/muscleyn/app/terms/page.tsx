"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/services/api";
import { FileText, ShieldAlert } from "lucide-react";

export default function TermsPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await api.get("/cms/terms-and-conditions");
        if (response.data.data && response.data.data.cmsValue) {
          setContent(response.data.data.cmsValue);
        } else {
          setContent("Default Terms and Conditions: Prabha Pharma is committed to offering 100% authentic dietary supplements. Use of our services indicates compliance with our store guidelines.");
        }
      } catch (error) {
        console.error("Failed to load terms:", error);
        setContent("Default Terms and Conditions: Prabha Pharma is committed to offering 100% authentic dietary supplements. Use of our services indicates compliance with our store guidelines.");
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 text-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-6 mb-8">
            <FileText className="w-10 h-10 text-red-500" />
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">Terms & Conditions</h1>
              <p className="text-zinc-500 mt-1 font-semibold">PRABHA PHARMA (HEALTHCARE & NUTRITION)</p>
            </div>
          </div>

          {loading ? (
            <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Loading Terms...</p>
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
