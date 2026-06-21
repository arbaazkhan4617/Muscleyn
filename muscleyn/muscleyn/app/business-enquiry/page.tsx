"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Building, 
  Send, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Percent,
  Truck,
  ShieldAlert
} from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { submitContactEnquiry } from "@/services/contactService";
import api from "@/services/api";

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
].sort();

const BUSINESS_TYPES = [
  { id: "Trainer", label: "Trainer" },
  { id: "Gym Owner", label: "Gym Owner" },
  { id: "Retail Shop Owner", label: "Retail Shop Owner" },
  { id: "Other", label: "Other" }
];

const iconMap: Record<string, any> = {
  ShieldAlert: ShieldAlert,
  Percent: Percent,
  Truck: Truck,
  TrendingUp: TrendingUp
};

export default function BusinessEnquiryPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    businessType: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<any>({
    hero: {
      eyebrow: "B2B Partnerships",
      title: "Sell Muscleyn",
      description: "Expand your business by partnering with India's premium, NABL-certified, and third-party tested fitness supplement brand. Become a distributor today."
    },
    benefits: [
      { iconName: "ShieldAlert", title: "100% Genuine Catalog", desc: "Every supplement is third-party tested with QR code authenticity tags and lab report lookups." },
      { iconName: "Percent", title: "Competitive Margins", desc: "Access bulk wholesale pricing tiers that leave you with industry-leading profit margins." },
      { iconName: "Truck", title: "Priority Fulfillment", desc: "B2B orders are processed and shipped via express courier nodes directly to your business address." },
      { iconName: "TrendingUp", title: "Marketing Assets", desc: "Receive premium in-store branding, shaker bottles, gym posters, and official merchandise." }
    ],
    contact: {
      email: "partners@muscleyn.com",
      phone: "+91 98765 43210"
    }
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await api.get(`/cms/business-enquiry-config?t=${Date.now()}`);
        if (res.data && res.data.status && res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          setConfig((prev: any) => ({
            hero: { ...prev.hero, ...parsed.hero },
            benefits: parsed.benefits || prev.benefits,
            contact: { ...prev.contact, ...parsed.contact }
          }));
        }
      } catch (err) {
        console.error("Failed to load business enquiry config:", err);
      }
    };
    fetchConfig();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.phone || !form.state || !form.city || !form.businessType || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        subject: `Business Enquiry: ${form.businessType} from ${form.city}, ${form.state}`,
        message: `Type of Business: ${form.businessType}\nState: ${form.state}\nCity: ${form.city}\n\nComment/Enquiry:\n${form.message}`
      };
      await submitContactEnquiry(payload);
      toast.success("Partnership enquiry submitted successfully!");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        state: "",
        city: "",
        businessType: "",
        message: ""
      });
    } catch (error) {
      toast.error("Unable to submit enquiry right now. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 text-white relative overflow-hidden flex flex-col pt-20">
        
        {/* Glowing Background Orbs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[15%] left-[5%] w-[45vw] h-[45vw] bg-red-600/5 rounded-full blur-[140px] mix-blend-screen animate-pulse duration-4000"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] bg-red-950/20 rounded-full blur-[120px] mix-blend-screen"></div>
        </div>

        <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-16 relative z-10">
          
          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-black uppercase tracking-widest text-[10px] mb-6"
            >
              <Briefcase className="w-3.5 h-3.5" /> {config.hero.eyebrow}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight mb-6"
            >
              {config.hero.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-red-500">{config.hero.title.split(" ").slice(-1)[0]}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed"
            >
              {config.hero.description}
            </motion.p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Benefits & Copy */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Why Partner With Us?</h2>
                <p className="text-zinc-400 font-medium">We support our business partners with quality assurance and priority service to help you scale your business.</p>
              </div>

              <div className="space-y-6">
                {config.benefits.map((benefit: any, idx: number) => {
                  const Icon = iconMap[benefit.iconName] || ShieldAlert;
                  return (
                    <div key={idx} className="flex gap-4 p-5 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-colors">
                      <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white mb-1">{benefit.title}</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed font-semibold">{benefit.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-white/10 pt-8 space-y-4">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Contact Wholesale Support</p>
                <div className="space-y-2.5 text-sm font-bold text-zinc-400">
                  {config.contact.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-red-500" />
                      <span>{config.contact.email}</span>
                    </div>
                  )}
                  {config.contact.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-red-500" />
                      <span>{config.contact.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Native Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-7"
            >
              <form 
                onSubmit={handleSubmit}
                className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden"
              >
                {/* Accent top line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

                <h2 className="text-3xl font-black mb-2 text-white">Business Enquiry</h2>
                <p className="text-zinc-400 font-semibold mb-8 text-sm">Please submit your company details and our wholesale team will get back to you within 24 hours.</p>

                <div className="space-y-6">
                  
                  {/* Name & Email Group */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-[0.16em] text-zinc-500 mb-2.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          type="text"
                          required
                          value={form.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="e.g. John Doe"
                          className="w-full h-13 pl-11 pr-5 rounded-2xl border border-white/10 bg-black/30 text-white placeholder-zinc-600 outline-none focus:border-red-500 focus:bg-black/50 transition-all font-semibold text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-[0.16em] text-zinc-500 mb-2.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="e.g. john@gym.com"
                          className="w-full h-13 pl-11 pr-5 rounded-2xl border border-white/10 bg-black/30 text-white placeholder-zinc-600 outline-none focus:border-red-500 focus:bg-black/50 transition-all font-semibold text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & City Group */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-[0.16em] text-zinc-500 mb-2.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="e.g. 9876543210"
                          className="w-full h-13 pl-11 pr-5 rounded-2xl border border-white/10 bg-black/30 text-white placeholder-zinc-600 outline-none focus:border-red-500 focus:bg-black/50 transition-all font-semibold text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-[0.16em] text-zinc-500 mb-2.5">
                        City <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          type="text"
                          required
                          value={form.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="e.g. Indore"
                          className="w-full h-13 pl-11 pr-5 rounded-2xl border border-white/10 bg-black/30 text-white placeholder-zinc-600 outline-none focus:border-red-500 focus:bg-black/50 transition-all font-semibold text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* State Select Dropdown */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-zinc-500 mb-2.5">
                      State <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={form.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="w-full h-13 px-5 rounded-2xl border border-white/10 bg-black/30 text-white outline-none focus:border-red-500 focus:bg-black/50 transition-all font-semibold text-sm appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-zinc-950 text-zinc-600">Select State</option>
                        {STATES.map((state) => (
                          <option key={state} value={state} className="bg-zinc-900 text-white">{state}</option>
                        ))}
                      </select>
                      {/* Dropdown Indicator arrow */}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Business Type selection */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-zinc-500 mb-3">
                      Type of Business <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {BUSINESS_TYPES.map((type) => {
                        const isSelected = form.businessType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => handleInputChange("businessType", type.id)}
                            className={`px-3 py-3 rounded-2xl border text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                              isSelected
                                ? "border-red-500 bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] scale-[0.98]"
                                : "border-white/10 bg-black/30 text-zinc-400 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            {type.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message/Comments */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.16em] text-zinc-500 mb-2.5">
                      Your Comment / Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={5}
                      placeholder="Tell us about your business, estimated monthly volume, or any specific requirements..."
                      className="w-full p-5 rounded-3xl border border-white/10 bg-black/30 text-white placeholder-zinc-600 outline-none focus:border-red-500 focus:bg-black/50 transition-all font-semibold text-sm resize-none"
                    />
                  </div>

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-8 w-full h-14 bg-red-600 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? "Submitting Request..." : "Submit Enquiry"}
                  <Send className="w-4 h-4" />
                </button>

              </form>
            </motion.div>

          </div>

        </div>

      </main>
      <Footer />
    </>
  );
}
