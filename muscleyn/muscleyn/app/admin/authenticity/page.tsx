"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import { ShieldCheck, Plus, Trash2, Save, Upload, Link as LinkIcon, FileText } from "lucide-react";

interface AuthenticityLink {
  title: string;
  url: string;
}

export default function AdminAuthenticityPage() {
  const [links, setLinks] = useState<AuthenticityLink[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // LOAD EXISTING CONFIG
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await api.get("/cms/authenticity-links");
        if (response.data.data && response.data.data.cmsValue) {
          const parsed = JSON.parse(response.data.data.cmsValue);
          if (Array.isArray(parsed)) {
            setLinks(parsed);
          }
        }
      } catch (error: any) {
        console.log("No existing authenticity config found:", error.message);
      } finally {
        setLoading(false);
      }
    };
    loadConfig();
  }, []);

  // UPLOAD FILE
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await api.post("/files/upload-product-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status && response.data.data.imageUrl) {
        setNewUrl(response.data.data.imageUrl);
        toast.success("Certificate uploaded successfully!");
      } else {
        toast.error("Failed to get file URL");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload certificate");
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  // ADD LINK TO LIST
  const handleAddLink = () => {
    if (!newTitle) {
      toast.error("Please enter a title / label");
      return;
    }
    if (!newUrl) {
      toast.error("Please upload a certificate or enter a URL");
      return;
    }

    setLinks((prev) => [...prev, { title: newTitle, url: newUrl }]);
    setNewTitle("");
    setNewUrl("");
    toast.success("Authenticity item added to current session list!");
  };

  // REMOVE LINK
  const handleRemoveLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
    toast.success("Item removed");
  };

  // SAVE TO CMS
  const handleSaveConfig = async () => {
    try {
      setSaving(true);
      await api.post("/cms", {
        cmsKey: "authenticity-links",
        cmsValue: JSON.stringify(links),
      });
      toast.success("Authenticity settings saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save authenticity settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading config...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-red-500" />
            Authenticity Links
          </h1>
          <p className="text-zinc-400 mt-2 font-medium">
            Configure dynamic reports, certificates, and lab tests available in the header "Authenticity" dropdown.
          </p>
        </div>
        <button
          onClick={handleSaveConfig}
          disabled={saving}
          className="bg-red-600 hover:bg-white hover:text-black text-white px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving Changes..." : "Save Configuration"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ADD FORM */}
        <div className="lg:col-span-1 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl space-y-5 h-fit">
          <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <Plus className="w-5 h-5 text-red-500" />
            Add Authenticity Doc
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                Document Title / Label
              </label>
              <input
                type="text"
                placeholder="E.g., Labdoor Report #402"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                Upload PDF / Image Certificate
              </label>
              <label className="relative w-full h-24 bg-black border border-dashed border-white/10 hover:border-red-500/50 rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer group">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleUploadFile}
                  className="hidden"
                />
                {uploading ? (
                  <div className="w-6 h-6 border-2 border-zinc-500 border-t-red-500 rounded-full animate-spin"></div>
                ) : (
                  <div className="flex flex-col items-center text-zinc-500 group-hover:text-red-400 transition-colors">
                    <Upload className="w-6 h-6 mb-1.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Upload Document
                    </span>
                  </div>
                )}
              </label>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Or Paste Document URL
                </label>
                <LinkIcon className="w-3.5 h-3.5 text-zinc-500" />
              </div>
              <input
                type="text"
                placeholder="E.g., https://example.com/report.pdf"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
              />
            </div>

            <button
              type="button"
              onClick={handleAddLink}
              className="w-full bg-zinc-800 hover:bg-white hover:text-black text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-sm uppercase tracking-widest border border-white/5"
            >
              Add To List
            </button>
          </div>
        </div>

        {/* ACTIVE LIST */}
        <div className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
          <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <FileText className="w-5 h-5 text-red-500" />
            Configured Authenticity Dropdowns
          </h2>

          {links.length === 0 ? (
            <div className="text-center py-12 text-zinc-500">
              <ShieldCheck className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="font-medium">No authenticity documents configured yet.</p>
              <p className="text-sm text-zinc-600 mt-1">Add items using the panel on the left.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {links.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl group hover:border-red-500/20 transition-all"
                >
                  <div className="min-w-0">
                    <h3 className="font-black text-white text-sm group-hover:text-red-400 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-xs text-zinc-500 truncate mt-1 max-w-lg font-medium">
                      {link.url}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-bold text-zinc-300"
                    >
                      View Link
                    </a>
                    <button
                      onClick={() => handleRemoveLink(index)}
                      className="p-2 rounded-lg bg-red-950/20 text-red-400 border border-red-500/10 hover:bg-red-500 hover:text-white transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
