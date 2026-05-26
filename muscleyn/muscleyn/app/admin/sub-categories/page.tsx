"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/services/api";
import { Plus, Pencil, Trash2, Layers, Search, CheckCircle2, XCircle } from "lucide-react";

export default function SubCategoriesPage() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // LOAD
  const loadData = async () => {
    try {
      const [categoryRes, subRes] = await Promise.all([
        api.get("/categories"),
        api.get("/sub-categories"),
      ]);
      setCategories(categoryRes.data.data || []);
      setSubCategories(subRes.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // EDIT
  const handleEdit = (subCategory: any) => {
    setEditingId(subCategory.id);
    setName(subCategory.name);
    setCategoryId(String(subCategory.category?.id));
    setActive(subCategory.isActive);
  };

  // DELETE
  const handleDelete = async (id: number) => {
    if (!confirm("Delete sub category?")) return;
    try {
      await api.delete(`/sub-categories/${id}`);
      toast.success("Deleted");
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  // TOGGLE
  const handleToggleStatus = async (id: number) => {
    try {
      await api.patch(`/sub-categories/toggle-status/${id}`);
      toast.success("Status Updated");
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !categoryId) {
      toast.error("All fields required");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("active", String(active));
      formData.append("categoryId", categoryId);

      if (editingId) {
        await api.put(`/sub-categories/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/sub-categories", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      toast.success(editingId ? "Updated Successfully" : "Created Successfully");

      // RESET
      setEditingId(null);
      setName("");
      setCategoryId("");
      setActive(true);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* TOP */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Sub Categories</h1>
          <p className="text-zinc-400 mt-2 font-medium">Manage product sub-categories and organization.</p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl space-y-6">
        <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-red-500" /> 
            {editingId ? "Edit Sub Category" : "Add Sub Category"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NAME */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Name</label>
                <input
                type="text"
                placeholder="E.g., Whey Isolate"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-5 py-3 outline-none text-white transition-colors"
                />
            </div>

            {/* CATEGORY */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Parent Category</label>
                <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-5 py-3 outline-none text-white transition-colors appearance-none"
                >
                <option value="" disabled>Select Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                    {category.name}
                    </option>
                ))}
                </select>
            </div>
        </div>

        {/* ACTIVE & BUTTON */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/10">
            <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-12 h-6 rounded-full transition-colors relative ${active ? 'bg-green-500/20 border-green-500/30' : 'bg-white/10 border-white/10'} border`}>
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${active ? 'translate-x-6 bg-green-500' : 'bg-zinc-500'}`}></div>
                </div>
                <input type="checkbox" className="hidden" checked={active} onChange={(e) => setActive(e.target.checked)} />
                <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">Visible in Store</span>
            </label>

            <div className="flex gap-3">
                {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); setName(""); setCategoryId(""); setActive(true); }} className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors">
                        Cancel
                    </button>
                )}
                <button type="submit" className="bg-red-600 hover:bg-white hover:text-black text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                    {editingId ? "Update Category" : <><Plus className="w-4 h-4" /> Add Category</>}
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
                <th className="p-6 font-bold">Name</th>
                <th className="p-6 font-bold">Category</th>
                <th className="p-6 font-bold">Status</th>
                <th className="p-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subCategories.length === 0 ? (
                 <tr>
                    <td colSpan={4} className="p-12 text-center text-zinc-500 font-medium">
                        No sub-categories found. Add one above.
                    </td>
                 </tr>
              ) : (
                subCategories.map((subCategory) => (
                  <tr key={subCategory.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-6">
                      <h3 className="font-bold text-white text-base">{subCategory.name}</h3>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-white/5 rounded-md text-zinc-300 text-sm font-medium border border-white/10">
                         {subCategory.category?.name || "None"}
                      </span>
                    </td>
                    <td className="p-6">
                      <button
                        onClick={() => handleToggleStatus(subCategory.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex inline-flex items-center gap-1.5 transition-colors ${
                          subCategory.isActive
                            ? "bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20"
                            : "bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${subCategory.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {subCategory.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(subCategory)}
                          className="w-10 h-10 rounded-xl bg-black hover:bg-blue-500/20 text-zinc-400 hover:text-blue-500 flex items-center justify-center border border-white/10 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(subCategory.id)}
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