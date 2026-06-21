"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/services/api";
import { Image as ImageIcon, Plus, Pencil, Trash2, CheckCircle2, Ban, Link as LinkIcon, SortAsc, Upload } from "lucide-react";
import Image from "next/image";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isActive, setIsActive] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/banners");
      // Sort by sortOrder
      const sorted = (response.data.data || []).sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0));
      setBanners(sorted);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setImageUrl("");
    setRedirectUrl("");
    setSortOrder("");
    setIsActive(true);
  };

  const handleEdit = (banner: any) => {
    setEditingId(banner.id);
    setTitle(banner.title || "");
    setImageUrl(banner.imageUrl || "");
    setRedirectUrl(banner.redirectUrl || "");
    setSortOrder(banner.sortOrder?.toString() || "0");
    setIsActive(banner.isActive);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    try {
      await api.delete(`/banners/${id}`);
      toast.success("Banner deleted");
      loadData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete banner");
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const response = await api.post("/files/upload-product-image", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (response.data && response.data.status && response.data.data.imageUrl) {
        setImageUrl(response.data.data.imageUrl);
        toast.success("Image uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      toast.error("Title and Image are required");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        title,
        imageUrl,
        redirectUrl,
        sortOrder: Number(sortOrder || 0),
        isActive
      };

      if (editingId) {
        await api.put(`/banners/${editingId}`, payload);
        toast.success("Banner updated");
      } else {
        await api.post("/banners", payload);
        toast.success("Banner created");
      }

      resetForm();
      loadData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to save banner");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Banners...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* TOP */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Promotional Banners</h1>
          <p className="text-zinc-400 mt-2 font-medium">Manage hero carousels and promotional graphics.</p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl space-y-6">
        <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-red-500" /> 
            {editingId ? "Edit Banner" : "Add New Banner"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Banner Title</label>
                <input
                    type="text"
                    placeholder="e.g. Summer Sale 2026"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-5 py-3 outline-none text-white transition-colors"
                />
            </div>
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Banner Image</label>
                <div className="flex gap-3 items-center">
                    <label className="flex items-center gap-2 cursor-pointer bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                        {uploading ? (
                          <span className="animate-pulse">Uploading...</span>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Choose Image
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleUploadImage}
                          disabled={uploading}
                        />
                    </label>
                    {imageUrl && (
                      <span className="text-zinc-400 text-xs truncate max-w-xs">{imageUrl}</span>
                    )}
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-2"><LinkIcon className="w-3 h-3" /> Redirect Link</label>
                <input
                    type="text"
                    placeholder="e.g. /shop?category=proteins"
                    value={redirectUrl}
                    onChange={(e) => setRedirectUrl(e.target.value)}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-5 py-3 outline-none text-white transition-colors"
                />
            </div>
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-2"><SortAsc className="w-3 h-3" /> Sort Order</label>
                <input
                    type="number"
                    placeholder="e.g. 1 (lower is first)"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-5 py-3 outline-none text-white transition-colors"
                />
            </div>
        </div>

        {/* IMAGE PREVIEW */}
        {imageUrl && (
            <div className="mt-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Preview</label>
                <div className="w-full h-40 md:h-64 rounded-2xl overflow-hidden border border-white/10 relative bg-black">
                    <img 
                        src={imageUrl.startsWith('http') ? imageUrl : imageUrl} 
                        alt="Banner Preview" 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/1200x400?text=Invalid+Image+URL";
                        }}
                    />
                </div>
            </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/10">
            <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-12 h-6 rounded-full transition-colors relative ${isActive ? 'bg-green-500/20 border-green-500/30' : 'bg-white/10 border-white/10'} border`}>
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${isActive ? 'translate-x-6 bg-green-500' : 'bg-zinc-500'}`}></div>
                </div>
                <input type="checkbox" className="hidden" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">Visible on Homepage</span>
            </label>

            <div className="flex gap-3">
                {editingId && (
                    <button type="button" onClick={resetForm} className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors">
                        Cancel
                    </button>
                )}
                <button type="submit" disabled={saving} className="bg-red-600 hover:bg-white hover:text-black text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-50">
                    {saving ? "Saving..." : editingId ? "Update Banner" : <><Plus className="w-4 h-4" /> Publish Banner</>}
                </button>
            </div>
        </div>
      </form>

      {/* TABLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.length === 0 ? (
              <div className="col-span-full p-12 text-center text-zinc-500 font-medium bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/10">
                  No banners created yet. Publish your first banner above.
              </div>
          ) : (
              banners.map((banner) => (
                  <div key={banner.id} className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl overflow-hidden group">
                      <div className="w-full h-48 relative bg-black">
                          <img 
                              src={banner.imageUrl?.startsWith('http') ? banner.imageUrl : banner.imageUrl} 
                              alt={banner.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                              onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/1200x400?text=Invalid+Image+URL";
                              }}
                          />
                          <div className="absolute top-4 left-4 flex gap-2">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md border ${
                                  banner.isActive
                                    ? "bg-green-500/20 text-green-400 border-green-500/30" 
                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                              }`}>
                                  {banner.isActive ? <CheckCircle2 className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                                  {banner.isActive ? 'Active' : 'Hidden'}
                              </span>
                              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center gap-1">
                                  <SortAsc className="w-3 h-3" /> {banner.sortOrder}
                              </span>
                          </div>
                      </div>
                      <div className="p-6 flex items-start justify-between gap-4">
                          <div>
                              <h3 className="font-bold text-white text-lg">{banner.title}</h3>
                              {banner.redirectUrl && (
                                  <a href={banner.redirectUrl} target="_blank" rel="noreferrer" className="text-sm text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1 mt-1">
                                      <LinkIcon className="w-3 h-3" /> {banner.redirectUrl}
                                  </a>
                              )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => handleEdit(banner)}
                                className="w-10 h-10 rounded-xl bg-black hover:bg-blue-500/20 text-zinc-400 hover:text-blue-500 flex items-center justify-center border border-white/10 transition-colors"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(banner.id)}
                                className="w-10 h-10 rounded-xl bg-black hover:bg-red-500/20 text-zinc-400 hover:text-red-500 flex items-center justify-center border border-white/10 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                          </div>
                      </div>
                  </div>
              ))
          )}
      </div>
    </div>
  );
}
