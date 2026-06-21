"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CommerceProduct, mapBackendProductToCommerce, getBackendImageUrl } from "@/lib/commerce";
import api from "@/services/api";

export default function CertificateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<CommerceProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        if (response.data && response.data.status && response.data.data) {
          const mapped = mapBackendProductToCommerce(response.data.data);
          setProduct(mapped);
        }
      } catch (err) {
        console.error("Could not load product certificate from backend:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4 text-white">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Certificate Details...</div>
      </div>
    );
  }

  if (!product || !product.productReportUrl) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mb-8">
            <FileText className="h-8 w-8 text-zinc-600" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase mb-4">
            Report Not Found
          </h2>
          <p className="text-zinc-400 max-w-md mb-8 font-medium">
            This product does not have a lab certificate report submitted yet, or the ID is invalid.
          </p>
          <Link
            href="/protein-lab-certificate"
            className="px-6 py-3 rounded-full bg-red-600 hover:bg-white hover:text-black font-black uppercase text-xs tracking-widest transition"
          >
            Back to Certificates
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  let dynamicBadges: { label: string; result: string }[] = [];
  if (product?.reportTestDetails) {
    try {
      const parsed = JSON.parse(product.reportTestDetails);
      if (Array.isArray(parsed) && parsed.length > 0) {
        dynamicBadges = parsed;
      }
    } catch (e) {
      console.error("Failed to parse dynamic test details", e);
    }
  }

  if (dynamicBadges.length === 0) {
    dynamicBadges = [
      { label: "Protein Percentage", result: product?.reportProteinPercentage || "Pass" },
      { label: "Heavy Metal", result: product?.reportHeavyMetal || "Pass" },
      { label: "Amino Acid Profile", result: product?.reportAminoAcidProfile || "Pass" },
      { label: "Microbial Safety", result: product?.reportMicrobialSafety || "Pass" }
    ];
  }

  const isFailed = dynamicBadges.some(b => b.result === "Fail");

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950 text-white font-sans pb-24">
        <div className="max-w-5xl mx-auto px-4 pt-12">
          {/* HEADER BACK NAVIGATION */}
          <Link
            href="/protein-lab-certificate"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition font-black uppercase tracking-wider text-xs mb-8"
          >
            <ArrowLeft className="w-4 h-4 text-red-500" /> Back to Certificates
          </Link>

          {/* PRODUCT INFO PANEL */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-red-500 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" /> Authenticity Verification
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
                {product.name}
              </h1>
              <p className="text-zinc-400 font-bold uppercase text-xs tracking-widest mt-2">
                Brand: {product.brand} | Category: {product.category}
              </p>
            </div>

            <a
              href={getBackendImageUrl(product.productReportUrl)}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-xl bg-red-650 hover:bg-white hover:text-zinc-950 font-black uppercase tracking-[0.12em] text-xs transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)]"
            >
              <Download className="w-4 h-4" /> Download PDF
            </a>
          </div>

          {/* LAB SUMMARY RESULTS TABLE */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-10 backdrop-blur-xl">
            <div className="p-6 border-b border-white/10 bg-black/40 flex items-center justify-between">
              <h2 className="text-lg font-black uppercase tracking-wider">
                Laboratory Assessment Summary
              </h2>
              {isFailed ? (
                <span className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> Assessment Failed
                </span>
              ) : (
                <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Verified Pass
                </span>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/25 text-xs font-black uppercase tracking-widest text-zinc-500 border-b border-white/10">
                    <th className="p-6">Type of Test</th>
                    <th className="p-6 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-bold">
                  {dynamicBadges.map((badge, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-6 text-zinc-300">{badge.label}</td>
                      <td className={`p-6 text-right uppercase tracking-widest ${badge.result === "Fail" ? "text-red-500" :
                          badge.result === "N/A" ? "text-zinc-500" : "text-green-500"
                        }`}>
                        {badge.result}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>



          {/* PDF EMBED CONTAINER */}
          <div className="w-full bg-black rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative">
            {/* Visual Header bar for pdf container */}
            <div className="bg-zinc-900 px-6 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-400">
                <FileText className="w-4 h-4 text-red-500" /> Official Test Report.pdf
              </div>
              <a
                href={getBackendImageUrl(product.productReportUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-zinc-400 hover:text-white transition underline"
              >
                Open in new window
              </a>
            </div>

            {/* Embedded iframe */}
            <iframe
              src={`${getBackendImageUrl(product.productReportUrl)}#toolbar=0&navpanes=0`}
              className="w-full h-[850px] border-0"
              title={`${product.name} Lab Assessment Report`}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
