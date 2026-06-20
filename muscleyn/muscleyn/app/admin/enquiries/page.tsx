"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import { MessageSquare, Calendar, Mail, Phone, User, CheckCircle, Eye, AlertCircle } from "lucide-react";

interface Enquiry {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await api.get("/contact/enquiries");
      setEnquiries(response.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load contact enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (id: number, currentStatus: string) => {
    try {
      setUpdatingId(id);
      let nextStatus = "READ";
      if (currentStatus === "NEW") {
        nextStatus = "READ";
      } else if (currentStatus === "READ") {
        nextStatus = "RESOLVED";
      } else {
        nextStatus = "NEW";
      }

      await api.put(`/contact/enquiries/${id}/status?status=${nextStatus}`);
      toast.success(`Enquiry status updated to ${nextStatus}`);
      
      // Update local state smoothly
      setEnquiries((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: nextStatus } : item
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case "RESOLVED":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "READ":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "NEW":
      default:
        return "bg-yellow-500/15 text-yellow-500 border-yellow-500/30 animate-pulse";
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-red-500" />
            Contact Enquiries
          </h1>
          <p className="text-zinc-400 mt-2 font-medium">
            View and manage user requests submitted via the frontend contact form.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
          <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Enquiries...</div>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/40 border border-white/5 rounded-3xl text-zinc-500">
          <AlertCircle className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="font-bold text-lg text-white">No Enquiries Found</p>
          <p className="text-sm mt-1">When users fill the contact form, their queries will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {enquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col justify-between gap-6 hover:border-white/20 transition-all group"
            >
              {/* TOP HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-zinc-500" />
                      {enquiry.fullName}
                    </h2>
                    <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(enquiry.status)}`}>
                      {enquiry.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 flex-wrap pt-1">
                    <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <Mail className="w-3.5 h-3.5 text-red-500" />
                      <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
                    </span>
                    {enquiry.phone && (
                      <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Phone className="w-3.5 h-3.5 text-red-500" />
                        <a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 sm:self-start">
                  <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                  {new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {/* MESSAGE CONTENT */}
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-widest text-red-500">
                  Subject: <span className="text-zinc-300 font-bold tracking-normal normal-case ml-1">{enquiry.subject}</span>
                </p>
                <div className="bg-black/40 border border-white/5 rounded-2xl p-4 sm:p-5">
                  <p className="text-zinc-300 text-sm font-medium leading-relaxed whitespace-pre-line">
                    {enquiry.message}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="border-t border-white/5 pt-4 flex justify-end">
                <button
                  onClick={() => handleUpdateStatus(enquiry.id, enquiry.status)}
                  disabled={updatingId === enquiry.id}
                  className="bg-zinc-800 hover:bg-white hover:text-black text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2.5 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                >
                  {enquiry.status === "NEW" ? (
                    <>
                      <Eye className="w-4 h-4" />
                      Mark as Read
                    </>
                  ) : enquiry.status === "READ" ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Mark Resolved
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      Re-open Enquiry
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
