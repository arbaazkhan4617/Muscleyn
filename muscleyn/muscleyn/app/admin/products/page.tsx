"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import {
  Plus,
  Pencil,
  Trash2,
  Package,
  Search,
  Filter,
  MoreVertical,
  Layers,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import { getBackendImageUrl } from "@/lib/commerce";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 10;
  const [loading, setLoading] = useState(true);

  // LOAD PRODUCTS
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get(`/admin/products?search=${search}&page=${page}&size=${size}`);
        setProducts(response.data.data.content || []);
        setTotalPages(response.data.data.totalPages || 0);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [page, search]);

  // DELETE PRODUCT
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((item) => item.id !== id));
      toast.success("Product deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  // TOGGLE BEST SELLER
  const handleToggleBestSeller = async (id: number, currentStatus: boolean) => {
    try {
      await api.put(`/products/${id}/toggle-best-seller`);
      setProducts(products.map(p => p.id === id ? { ...p, isBestSeller: !currentStatus } : p));
      toast.success("Best seller status updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to toggle best seller status");
    }
  };

  // TOGGLE OFFER
  const handleToggleOffer = async (id: number, currentStatus: boolean) => {
    try {
      await api.put(`/products/${id}/toggle-offer`);
      setProducts(products.map(p => p.id === id ? { ...p, isOffer: !currentStatus } : p));
      toast.success("Offer status updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to toggle offer status");
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Products...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* TOP */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Product Catalog</h1>
          <p className="text-zinc-400 mt-2 font-medium">Manage your inventory, variants, and pricing.</p>
        </div>
        <Link
          href="/admin/products/add"
          className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* EMPTY */}
      {products.length === 0 && !search && (
        <div className="bg-zinc-900/50 backdrop-blur-md rounded-[2rem] p-16 text-center border border-white/10 shadow-xl">
          <div className="w-24 h-24 bg-zinc-950 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
              <Package className="w-10 h-10 text-zinc-600" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">No Products Found</h2>
          <p className="text-zinc-500 max-w-md mx-auto mb-8 font-medium">Your catalog is currently empty. Add your first product to get started.</p>
          <Link
            href="/admin/products/add"
            className="inline-block px-8 py-4 rounded-full bg-red-600 hover:bg-white hover:text-black text-white font-bold transition-all"
          >
            Create Product
          </Link>
        </div>
      )}

      {/* TABLE */}
      {(products.length > 0 || search) && (
        <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-xl">
          
          {/* SEARCH BAR */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10">
            <div className="relative w-full sm:w-[400px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setPage(0);
                  setSearch(e.target.value);
                }}
                placeholder="Search products by name, SKU..."
                className="w-full bg-black border border-white/10 focus:border-red-500 rounded-full pl-12 pr-6 py-3 outline-none text-white transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors border border-white/10">
                <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

          {/* DATA TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-white/10">
                  <th className="p-6 font-bold w-24">Image</th>
                  <th className="p-6 font-bold">Product Details</th>
                  <th className="p-6 font-bold">Category</th>
                  <th className="p-6 font-bold">Status</th>
                  <th className="p-6 font-bold">Best Seller</th>
                  <th className="p-6 font-bold">Offers</th>
                  <th className="p-6 font-bold">Inventory</th>
                  <th className="p-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 && search && (
                    <tr>
                        <td colSpan={6} className="p-12 text-center text-zinc-500 font-medium">
                            No products match your search.
                        </td>
                    </tr>
                )}
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  >
                    {/* IMAGE */}
                    <td className="p-6">
                      <div className="relative w-16 h-16 rounded-xl bg-black border border-white/10 overflow-hidden">
                        <img
                          src={
                            (() => {
                              const galleryImages = product.productImages?.map((img: any) => img.imageUrl) || [];
                              const rawUrl = galleryImages.length > 0 ? galleryImages[0] : product.imageUrl;
                              return getBackendImageUrl(rawUrl);
                            })()
                          }
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </td>

                    {/* DETAILS */}
                    <td className="p-6">
                      <h3 className="font-bold text-white text-base group-hover:text-red-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-zinc-500 text-sm mt-1 font-medium flex items-center gap-2">
                        {product.brandName || "Unknown Brand"}
                      </p>
                    </td>

                    {/* CATEGORY */}
                    <td className="p-6">
                      <span className="px-3 py-1 bg-white/5 rounded-md text-zinc-300 text-sm font-medium border border-white/10">
                        {product.categoryName || "Uncategorized"}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex inline-flex items-center gap-1.5 ${
                        product.active
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${product.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {product.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* BEST SELLER */}
                    <td className="p-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={product.isBestSeller || false}
                          onChange={() => handleToggleBestSeller(product.id, product.isBestSeller)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-zinc-750 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-650"></div>
                      </label>
                    </td>

                    {/* OFFERS */}
                    <td className="p-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={product.isOffer || false}
                          onChange={() => handleToggleOffer(product.id, product.isOffer)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-zinc-750 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-650"></div>
                      </label>
                    </td>

                    {/* INVENTORY / VARIANTS */}
                    <td className="p-6">
                      <Link
                        href={`/admin/products/variants/${product.id}`}
                        className="inline-flex items-center gap-2 bg-black hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all border border-white/10"
                      >
                        <Layers className="w-4 h-4 text-zinc-400" />
                        Manage Variants
                      </Link>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="w-10 h-10 rounded-xl bg-black hover:bg-blue-500/20 text-zinc-400 hover:text-blue-500 flex items-center justify-center border border-white/10 transition-colors"
                          title="Edit Product"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="w-10 h-10 rounded-xl bg-black hover:bg-red-500/20 text-zinc-400 hover:text-red-500 flex items-center justify-center border border-white/10 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-6 border-t border-white/10 bg-black/50">
              <p className="text-zinc-500 text-sm font-medium">
                Showing Page <span className="text-white font-bold">{page + 1}</span> of <span className="text-white font-bold">{totalPages}</span>
              </p>
              <div className="flex items-center gap-3">
                <button
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                  className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 text-white font-bold text-sm transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  Previous
                </button>
                <button
                  disabled={page + 1 >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 text-white font-bold text-sm transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}