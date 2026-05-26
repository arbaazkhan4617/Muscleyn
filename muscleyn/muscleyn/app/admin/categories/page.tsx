"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/services/api";
import { Plus, Pencil, Trash2, Package, Layers, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // LOAD
  const loadCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // IMAGE
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // EDIT
  const handleEdit = (category: any) => {
    setEditingId(category.id);
    setName(category.name || "");
    setActive(category.isActive);
    setPreview(category.imageUrl || "");
  };

  // DELETE
  const handleDelete = async (categoryId: number) => {
    if (!confirm("Delete category?")) return;
    try {
      await api.delete(`/categories/${categoryId}`);
      toast.success("Category deleted");
      loadCategories();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  // TOGGLE
  const handleToggleStatus = async (categoryId: number) => {
    try {
      await api.patch(`/categories/toggle-status/${categoryId}`);
      toast.success("Status updated");
      loadCategories();
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Name required");
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("active", String(active));
      if (image) {
        formData.append("image", image);
      }

      if (editingId) {
        await api.put(`/categories/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/categories", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      toast.success(editingId ? "Category updated" : "Category created");

      // RESET
      setName("");
      setActive(true);
      setImage(null);
      setPreview("");
      setEditingId(null);
      loadCategories();
    } catch (error) {
      console.log(error);
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Categories...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* TOP */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Categories</h1>
          <p className="text-zinc-400 mt-2 font-medium">Manage top-level product categories and imagery.</p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl space-y-6">
        <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-red-500" /> 
            {editingId ? "Edit Category" : "Add Category"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* NAME & ACTIVE */}
            <div className="space-y-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Category Name</label>
                    <input
                        type="text"
                        placeholder="E.g., Proteins"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-5 py-3 outline-none text-white transition-colors"
                    />
                </div>
                
                <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-12 h-6 rounded-full transition-colors relative ${active ? 'bg-green-500/20 border-green-500/30' : 'bg-white/10 border-white/10'} border`}>
                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${active ? 'translate-x-6 bg-green-500' : 'bg-zinc-500'}`}></div>
                        </div>
                        <input type="checkbox" className="hidden" checked={active} onChange={(e) => setActive(e.target.checked)} />
                        <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">Visible in Store</span>
                    </label>
                </div>
            </div>

            {/* IMAGE UPLOAD */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Category Image</label>
                <div className="relative w-full h-32 bg-black border-2 border-dashed border-white/10 hover:border-red-500/50 rounded-2xl flex flex-col items-center justify-center transition-colors overflow-hidden group cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    {preview ? (
                        <>
                            <img src={preview.startsWith('blob:') ? preview : `http://localhost:8080/muscleyn-backend${preview}`} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <p className="text-white font-bold text-sm">Change Image</p>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center text-zinc-500 group-hover:text-red-400 transition-colors">
                            <ImageIcon className="w-8 h-8 mb-2" />
                            <span className="text-xs font-bold uppercase tracking-widest">Upload Image</span>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
            {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setName(""); setImage(null); setPreview(""); setActive(true); }} className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors">
                    Cancel
                </button>
            )}
            <button type="submit" disabled={saving} className="bg-red-600 hover:bg-white hover:text-black text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-50">
                {saving ? "Saving..." : editingId ? "Update Category" : <><Plus className="w-4 h-4" /> Add Category</>}
            </button>
        </div>
      </form>

      {/* TABLE */}
      <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/50 text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-white/10">
                <th className="p-6 font-bold w-24">Image</th>
                <th className="p-6 font-bold">Category Name</th>
                <th className="p-6 font-bold">Status</th>
                <th className="p-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                 <tr>
                    <td colSpan={4} className="p-12 text-center text-zinc-500 font-medium">
                        No categories found. Add one above.
                    </td>
                 </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-6">
                      <div className="relative w-16 h-16 rounded-xl bg-black border border-white/10 overflow-hidden">
                        {category.imageUrl ? (
                            <img src={`http://localhost:8080/muscleyn-backend${category.imageUrl}`} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <h3 className="font-bold text-white text-base group-hover:text-red-400 transition-colors">{category.name}</h3>
                    </td>
                    <td className="p-6">
                      <button
                        onClick={() => handleToggleStatus(category.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex inline-flex items-center gap-1.5 transition-colors ${
                          category.isActive
                            ? "bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20"
                            : "bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${category.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {category.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="w-10 h-10 rounded-xl bg-black hover:bg-blue-500/20 text-zinc-400 hover:text-blue-500 flex items-center justify-center border border-white/10 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="w-10 h-10 rounded-xl bg-black hover:bg-red-500/20 text-zinc-400 hover:text-red-500 flex items-center justify-center border border-white/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
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