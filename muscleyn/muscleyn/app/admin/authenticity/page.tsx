"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import api from "@/services/api";
import toast from "react-hot-toast";
import {
  Eye,
  FileText,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  Search,
  Check,
  ChevronDown,
} from "lucide-react";
import { getBackendImageUrl } from "@/lib/commerce";

export default function AdminAuthenticityPage() {
  const [certifiedProducts, setCertifiedProducts] = useState<any[]>([]);
  const [dropdownProducts, setDropdownProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [reportFile, setReportFile] = useState<File | null>(null);
  
  // Dynamic report parameters/badges
  const [badges, setBadges] = useState<{ label: string; result: string }[]>([
    { label: "Protein Percentage", result: "Pass" },
    { label: "Heavy Metal", result: "Pass" },
    { label: "Amino Acid Profile", result: "Pass" },
    { label: "Microbial Safety", result: "Pass" }
  ]);

  const handleAddBadge = () => {
    setBadges([...badges, { label: "", result: "Pass" }]);
  };

  const handleUpdateBadge = (index: number, field: "label" | "result", value: string) => {
    const updated = [...badges];
    updated[index] = { ...updated[index], [field]: value };
    setBadges(updated);
  };

  const handleRemoveBadge = (index: number) => {
    setBadges(badges.filter((_, i) => i !== index));
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  // LOAD CERTIFIED PRODUCTS (those with active reports)
  const loadCertifiedProducts = async () => {
    try {
      const response = await api.get(`/admin/products?page=0&size=100`);
      if (response.data && response.data.status) {
        const list = response.data.data.content || [];
        setCertifiedProducts(list.filter((p: any) => p.productReportUrl && p.productReportUrl.trim() !== ""));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load certified products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertifiedProducts();
  }, []);

  // QUERY BACKEND PRODUCTS DYNAMICALLY ON SEARCH TERM CHANGE (DEBUNCED)
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await api.get(
          `/admin/products?search=${encodeURIComponent(searchTerm)}&page=0&size=20`
        );
        if (response.data && response.data.status) {
          setDropdownProducts(response.data.data.content || []);
        }
      } catch (error) {
        console.error("Dropdown search error:", error);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Handle clicking outside searchable dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // UPLOAD AND SUBMIT LAB REPORT
  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProductId) {
      toast.error("Please select a product");
      return;
    }
    if (!reportFile) {
      toast.error("Please select a PDF report file to upload");
      return;
    }

    // Validate that all badges have labels
    if (badges.some((b) => !b.label.trim())) {
      toast.error("Please ensure all test parameters have a label");
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("productReport", reportFile);
      
      // Legacy column mapping for compatibility
      const proteinBadge = badges.find(b => b.label.toLowerCase() === "protein percentage" || b.label.toLowerCase() === "protein %" || b.label.toLowerCase() === "protein");
      const heavyMetalBadge = badges.find(b => b.label.toLowerCase() === "heavy metal" || b.label.toLowerCase() === "heavy metals");
      const aminoAcidBadge = badges.find(b => b.label.toLowerCase() === "amino acid profile" || b.label.toLowerCase() === "amino acid");
      const microbialBadge = badges.find(b => b.label.toLowerCase() === "microbial safety" || b.label.toLowerCase() === "microbial");
      
      formData.append("reportProteinPercentage", proteinBadge?.result || "Pass");
      formData.append("reportHeavyMetal", heavyMetalBadge?.result || "Pass");
      formData.append("reportAminoAcidProfile", aminoAcidBadge?.result || "Pass");
      formData.append("reportMicrobialSafety", microbialBadge?.result || "Pass");
      
      // Dynamic json string
      formData.append("reportTestDetails", JSON.stringify(badges));

      const res = await api.put(`/products/${selectedProductId}/report`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data && res.data.status) {
        toast.success("Lab report uploaded successfully!");
        setReportFile(null);
        setSelectedProductId(null);
        setSelectedProduct(null);
        setSearchTerm("");
        setBadges([
          { label: "Protein Percentage", result: "Pass" },
          { label: "Heavy Metal", result: "Pass" },
          { label: "Amino Acid Profile", result: "Pass" },
          { label: "Microbial Safety", result: "Pass" }
        ]);
        loadCertifiedProducts(); // reload the certified products list
      } else {
        toast.error("Failed to save the report");
      }
    } catch (error: any) {
      console.error(error);
      const serverMsg = error.response?.data?.message || "Upload failed";
      toast.error(serverMsg);
    } finally {
      setSaving(false);
    }
  };

  // REMOVE REPORT FROM A PRODUCT
  const handleRemoveReport = async (productId: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to remove the lab report from this product?"
    );
    if (!confirmDelete) return;

    try {
      const res = await api.delete(`/products/${productId}/report`);
      if (res.data && res.data.status) {
        toast.success("Lab report removed successfully");
        loadCertifiedProducts();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove report");
    }
  };

  // Certified products with reports are loaded into the certifiedProducts state on mount

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-red-500" />
        <div className="text-sm font-bold uppercase tracking-widest text-zinc-500">
          Loading catalog...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* TOP HEADER */}
      <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black text-white">
            <ShieldCheck className="h-8 w-8 text-red-500" />
            Protein Lab Certificates
          </h1>
          <p className="mt-2 max-w-2xl font-medium text-zinc-400">
            Submit and manage PDF testing reports directly mapped to your product catalog.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[450px_1fr]">
        {/* SUBMISSION FORM */}
        <section className="h-fit space-y-6 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-md">
          <h2 className="flex items-center gap-2 border-b border-white/5 pb-3 text-lg font-black text-white">
            <Plus className="h-5 w-5 text-red-500" />
            Add Product Report
          </h2>

          <form onSubmit={handleSubmitReport} className="space-y-5">
            {/* SEARCHABLE DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-500">
                Select Product
              </span>
              
              <div 
                className="relative flex items-center cursor-pointer"
                onClick={() => setIsOpenDropdown(true)}
              >
                <input
                  type="text"
                  placeholder="Type to search product..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (selectedProduct && e.target.value !== selectedProduct.name) {
                      setSelectedProductId(null);
                      setSelectedProduct(null);
                    }
                    setIsOpenDropdown(true);
                  }}
                  className="w-full rounded-xl border border-white/10 bg-black pl-4 pr-10 py-3.5 text-sm text-white outline-none transition focus:border-red-500"
                />
                <ChevronDown className="absolute right-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>

              {isOpenDropdown && (
                <div className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-xl border border-white/10 bg-zinc-950 p-2 shadow-2xl z-50">
                  {dropdownProducts.length === 0 ? (
                    <div className="p-3 text-xs text-zinc-500 font-bold uppercase tracking-wider text-center">
                      No products match search
                    </div>
                  ) : (
                    dropdownProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setSelectedProductId(product.id);
                          setSelectedProduct(product);
                          setSearchTerm(product.name);
                          setIsOpenDropdown(false);
                          
                          // Load dynamic badges if present, else fallback
                          let initialBadges = [];
                          if (product.reportTestDetails) {
                            try {
                              initialBadges = JSON.parse(product.reportTestDetails);
                            } catch (e) {
                              console.error(e);
                            }
                          }
                          if (!Array.isArray(initialBadges) || initialBadges.length === 0) {
                            initialBadges = [
                              { label: "Protein Percentage", result: product.reportProteinPercentage || "Pass" },
                              { label: "Heavy Metal", result: product.reportHeavyMetal || "Pass" },
                              { label: "Amino Acid Profile", result: product.reportAminoAcidProfile || "Pass" },
                              { label: "Microbial Safety", result: product.reportMicrobialSafety || "Pass" }
                            ];
                          }
                          setBadges(initialBadges);
                        }}
                        className={`flex items-center justify-between p-2.5 rounded-lg text-sm transition-colors cursor-pointer hover:bg-white/5 ${
                          selectedProductId === product.id ? "bg-white/10 text-white" : "text-zinc-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={getBackendImageUrl(
                              product.productImages?.map((img: any) => img.imageUrl)?.[0] || product.imageUrl
                            )}
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover bg-black"
                          />
                          <span className="font-semibold truncate max-w-[280px]">
                            {product.name}
                          </span>
                        </div>
                        {selectedProductId === product.id && (
                          <Check className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* PREVIEW SELECTED PRODUCT DETAILS */}
            {selectedProduct && (
              <div className="p-4 rounded-2xl bg-black border border-white/10 flex items-center gap-4">
                <img
                  src={getBackendImageUrl(
                    selectedProduct.productImages?.map((img: any) => img.imageUrl)?.[0] || selectedProduct.imageUrl
                  )}
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover bg-zinc-950 shrink-0 border border-white/5"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-white text-sm truncate">{selectedProduct.name}</h4>
                  <span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">
                    {selectedProduct.brandName}
                  </span>
                  {selectedProduct.productReportUrl ? (
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-green-500 font-black">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Has Active Report
                    </div>
                  ) : (
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                      No Report Uploaded
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* LAB REPORT ASSESSMENTS RESULTS */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Test Parameters & Results</span>
                <button
                  type="button"
                  onClick={handleAddBadge}
                  className="text-[10px] font-black text-red-500 hover:text-white uppercase flex items-center gap-1 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-lg transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Parameter
                </button>
              </div>

              {badges.map((badge, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={badge.label}
                      onChange={(e) => handleUpdateBadge(idx, "label", e.target.value)}
                      placeholder="E.g., Banned Substances"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-3 py-2.5 outline-none text-white text-xs transition-colors"
                    />
                  </div>
                  <div className="w-28">
                    <select
                      value={badge.result}
                      onChange={(e) => handleUpdateBadge(idx, "result", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-xs text-white outline-none transition focus:border-red-500"
                    >
                      <option value="Pass">Pass</option>
                      <option value="Fail">Fail</option>
                      <option value="N/A">N/A</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveBadge(idx)}
                    className="p-2.5 rounded-xl bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-500 flex items-center justify-center border border-white/5 transition-colors cursor-pointer"
                    title="Remove Parameter"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* FILE UPLOAD FIELD */}
            <div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-500">
                PDF Report File
              </span>
              <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-black text-zinc-500 transition hover:border-red-500/50 hover:text-red-450 group shadow-inner">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setReportFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <Upload className="mb-2 h-7 w-7 text-zinc-400 group-hover:text-red-500 transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest text-center px-4">
                  {reportFile ? reportFile.name : "Choose Lab PDF file"}
                </span>
              </label>
              {reportFile && (
                <p className="mt-2 text-xs font-black text-green-500 uppercase tracking-widest">
                  Selected: {reportFile.name}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-650 hover:bg-white hover:text-black py-4 text-xs font-black uppercase tracking-widest text-white transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)] disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {saving ? "Uploading Report..." : "Submit Lab Report"}
            </button>
          </form>
        </section>

        {/* PUBLISHED LIST */}
        <section className="space-y-4 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col gap-3 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-lg font-black text-white">
              <FileText className="h-5 w-5 text-red-500" />
              Published Certificate List
            </h2>
            <Link
              href="/protein-lab-certificate"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-zinc-300 transition hover:bg-white hover:text-black"
            >
              <Eye className="h-4 w-4" />
              Preview Page
            </Link>
          </div>

          {certifiedProducts.length === 0 ? (
            <div className="py-24 text-center text-zinc-500">
              <ShieldCheck className="mx-auto mb-4 h-14 w-14 text-zinc-700" />
              <p className="font-bold uppercase tracking-wider text-xs">No active reports configured.</p>
              <p className="text-sm font-medium mt-1">Select a product on the left and upload its testing PDF to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {certifiedProducts.map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition hover:border-red-500/30 flex flex-col justify-between"
                >
                  <div className="flex gap-4 p-4 items-start">
                    <img
                      src={getBackendImageUrl(
                        product.productImages?.map((img: any) => img.imageUrl)?.[0] || product.imageUrl
                      )}
                      alt={product.name}
                      className="h-20 w-20 rounded-xl object-cover bg-black border border-white/5 shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-base font-black text-white truncate">
                        {product.name}
                      </h3>
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">
                        {product.brandName}
                      </p>
                      <p className="text-[11px] font-semibold text-zinc-400 mt-2 truncate flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-zinc-500" />
                        {product.productReportUrl.split("/").pop()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-black/20 border-t border-white/5 px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/protein-lab-certificate/${product.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-800 hover:bg-white hover:text-black px-3 py-1.5 text-xs font-bold text-zinc-300 transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Link>
                      <a
                        href={getBackendImageUrl(product.productReportUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-800 hover:bg-white hover:text-black px-3 py-1.5 text-xs font-bold text-zinc-300 transition-colors"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        PDF
                      </a>
                    </div>

                    <button
                      onClick={() => handleRemoveReport(product.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/10 bg-red-950/20 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-650 hover:text-white transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
