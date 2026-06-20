"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import { Star, Trash2, Calendar, AlertCircle, ShoppingBag, Mail, User, ShieldCheck, Plus, X, Pencil, Upload } from "lucide-react";
import { getBackendImageUrl } from "@/lib/commerce";

interface Review {
  id: number;
  userId?: number;
  userName?: string;
  userEmail?: string;
  productId: number;
  productName?: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  mediaUrls?: string;
  isVerifiedBuyer: boolean;
  appearInDashboard: boolean;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Form State
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [productId, setProductId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [rating, setRating] = useState("5");
  const [reviewText, setReviewText] = useState("");
  const [isVerifiedBuyer, setIsVerifiedBuyer] = useState(true);
  const [appearInDashboard, setAppearInDashboard] = useState(false);
  const [tempMediaUrls, setTempMediaUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/reviews");
      setReviews(response.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load customer reviews");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      const items = res.data.data?.content || res.data.data || [];
      setProducts(items);
    } catch (err) {
      console.error("Failed to load products for reviews select:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to permanently delete this review?")) {
      return;
    }

    try {
      setDeletingId(id);
      await api.delete(`/admin/reviews/${id}`);
      toast.success("Review deleted successfully");
      setReviews((prev) => prev.filter((review) => review.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete review");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStartAdd = () => {
    setEditingReview(null);
    setProductId(products[0]?.id ? String(products[0].id) : "");
    setUserName("");
    setUserEmail("");
    setRating("5");
    setReviewText("");
    setIsVerifiedBuyer(true);
    setAppearInDashboard(false);
    setTempMediaUrls([]);
    setShowModal(true);
  };

  const handleStartEdit = (review: Review) => {
    setEditingReview(review);
    setProductId(String(review.productId));
    setUserName(review.userName || "");
    setUserEmail(review.userEmail || "");
    setRating(String(review.rating));
    setReviewText(review.reviewText || "");
    setIsVerifiedBuyer(review.isVerifiedBuyer);
    setAppearInDashboard(review.appearInDashboard);
    setTempMediaUrls(review.mediaUrls ? review.mediaUrls.split(",").filter(Boolean) : []);
    setShowModal(true);
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await api.post("/files/upload-product-image", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data && res.data.status && res.data.data?.imageUrl) {
          urls.push(res.data.data.imageUrl);
        }
      }
      setTempMediaUrls((prev) => [...prev, ...urls]);
      toast.success("Media files uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload media files");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveMedia = (urlToRemove: string) => {
    setTempMediaUrls((prev) => prev.filter((u) => u !== urlToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !userName || !userEmail || !reviewText) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = {
      productId: Number(productId),
      userName,
      userEmail,
      rating: Number(rating),
      reviewText,
      mediaUrls: tempMediaUrls.join(","),
      isVerifiedBuyer,
      appearInDashboard
    };

    try {
      if (editingReview) {
        await api.put(`/admin/reviews/${editingReview.id}`, payload);
        toast.success("Review updated successfully");
      } else {
        await api.post("/admin/reviews", payload);
        toast.success("Review added successfully");
      }
      setShowModal(false);
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save review");
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Star className="w-8 h-8 text-red-500 fill-red-500/20" />
            Product Reviews
          </h1>
          <p className="text-zinc-400 mt-2 font-medium">
            Manage customer feedback, ratings, and homepage dashboard visibility.
          </p>
        </div>
        <button
          onClick={handleStartAdd}
          className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Review
        </button>
      </div>

      {loading ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
          <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Reviews...</div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/40 border border-white/5 rounded-3xl text-zinc-500">
          <AlertCircle className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="font-bold text-lg text-white">No Reviews Found</p>
          <p className="text-sm mt-1">Add manual reviews or wait for users to leave reviews.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {reviews.map((review) => {
            const mediaList = review.mediaUrls ? review.mediaUrls.split(",").filter(Boolean) : [];
            return (
              <div
                key={review.id}
                className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col justify-between gap-6 hover:border-white/20 transition-all group"
              >
                {/* TOP ROW */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/5 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-lg font-black text-white flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-red-500" />
                        {review.productName || `Product #${review.productId}`}
                      </h2>
                      {review.isVerifiedBuyer && (
                        <span className="inline-flex items-center gap-1 bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-black text-green-500 uppercase tracking-widest">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Verified Purchase
                        </span>
                      )}
                      {review.appearInDashboard && (
                        <span className="inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-black text-blue-500 uppercase tracking-widest">
                          On Dashboard
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 flex-wrap pt-1">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-zinc-500" />
                        {review.userName || `User #${review.userId}`}
                      </span>
                      {review.userEmail && (
                        <span className="flex items-center gap-1 text-zinc-500">
                          <Mail className="w-3.5 h-3.5" />
                          {review.userEmail}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2 sm:self-start">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-zinc-700"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-zinc-500 text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1.5 justify-end">
                      <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                      {new Date(review.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* REVIEW TEXT */}
                <div className="bg-black/30 border border-white/5 rounded-2xl p-4 sm:p-5">
                  <p className="text-zinc-300 text-sm font-medium leading-relaxed">
                    {review.reviewText || <span className="italic text-zinc-500">No review commentary provided.</span>}
                  </p>
                </div>

                {/* ATTACHED MEDIA */}
                {mediaList.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Attached Media Files:</p>
                    <div className="flex flex-wrap gap-4">
                      {mediaList.map((url, index) => {
                        const isVideo = url.endsWith(".mp4") || url.endsWith(".mov") || url.includes("video");
                        return (
                          <div
                            key={index}
                            className="w-24 h-24 sm:w-28 sm:h-28 bg-black border border-white/10 rounded-2xl overflow-hidden relative group"
                          >
                            {isVideo ? (
                              <video
                                src={getBackendImageUrl(url)}
                                controls
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <a href={getBackendImageUrl(url)} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                <img
                                  src={getBackendImageUrl(url)}
                                  alt="attachment"
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ACTIONS */}
                <div className="border-t border-white/5 pt-4 flex justify-end gap-3">
                  <button
                    onClick={() => handleStartEdit(review)}
                    className="bg-zinc-800 hover:bg-zinc-700 border border-white/10 hover:border-white/20 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit Review
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    disabled={deletingId === review.id}
                    className="bg-red-950/20 hover:bg-red-650 border border-red-500/10 hover:border-red-500 text-red-400 hover:text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest disabled:opacity-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    {deletingId === review.id ? "Deleting..." : "Delete Review"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CRUD DIALOG MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-white/10 rounded-[2rem] w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-6 top-6 w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-black text-white border-b border-white/5 pb-3">
              {editingReview ? "Edit Review Details" : "Add Customer Review"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Select Product *</label>
                <select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-xs transition-colors"
                  required
                >
                  <option value="">Select a product...</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id} className="bg-zinc-900 text-white">{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Reviewer Name *</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="E.g., Aarav Mehta"
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-xs transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Reviewer Email *</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="E.g., aarav@mehta.com"
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-xs transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Rating (1-5 stars) *</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-xs transition-colors"
                    required
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r} className="bg-zinc-900 text-white">{r} Stars</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col justify-end gap-3 pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isVerifiedBuyer}
                      onChange={(e) => setIsVerifiedBuyer(e.target.checked)}
                      className="rounded border-white/10 text-red-600 focus:ring-red-500 bg-black w-4 h-4"
                    />
                    <span className="text-xs font-bold text-zinc-400">Verified Buyer</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appearInDashboard}
                      onChange={(e) => setAppearInDashboard(e.target.checked)}
                      className="rounded border-white/10 text-red-600 focus:ring-red-500 bg-black w-4 h-4"
                    />
                    <span className="text-xs font-bold text-zinc-400">Appear in Dashboard</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Review Commentary *</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Type feedback commentary..."
                  className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-xs transition-colors"
                  rows={4}
                  required
                />
              </div>

              {/* MEDIA UPLOADER */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Attach Media Files</label>
                <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white hover:text-black text-white rounded-xl font-bold cursor-pointer transition-all text-xs">
                  <Upload className="w-4 h-4" />
                  <span>Choose Media Files</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                {uploading && <span className="text-xs text-zinc-500 ml-3 animate-pulse">Uploading files...</span>}

                {tempMediaUrls.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {tempMediaUrls.map((url, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-xl border border-white/10 overflow-hidden bg-black group">
                        <img src={getBackendImageUrl(url)} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveMedia(url)}
                          className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl font-bold transition-all text-xs uppercase tracking-wider cursor-pointer"
                >
                  {editingReview ? "Save Changes" : "Create Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
