"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Mail, Gift, ShieldCheck, Truck, Sparkles } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "@/services/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [websiteName, setWebsiteName] = useState("PRABHA PHARMA");
  const [stats, setStats] = useState<any[]>([
    { value: "16 YEARS", label: "Leading Sports Nutrition Brand", style: "default" },
    { value: "10M+", label: "Happy Customers", style: "red" },
    { value: "100+", label: "Genuine Products", style: "default" },
    { value: "100%", label: "Genuine Products", style: "default" },
    { value: "FREE", label: "Fast Shipping", style: "grey" }
  ]);
  const [newsletter, setNewsletter] = useState({
    title: "Newsletter",
    description: "Subscribe to get early access to exclusive drops, new formulations, and members-only deals."
  });
  const [socials, setSocials] = useState({
    fb: "#",
    ig: "#",
    tw: "#",
    yt: "#"
  });

  useEffect(() => {
    const fetchFooterConfig = async () => {
      try {
        const res = await api.get(`/cms/footer-config?t=${Date.now()}`);
        if (res.data && res.data.status && res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          if (parsed.whyChoose) setStats(parsed.whyChoose);
          if (parsed.newsletter) {
            setNewsletter({
              title: parsed.newsletter.title || "Newsletter",
              description: parsed.newsletter.description || ""
            });
          }
          if (parsed.socials) {
            setSocials({
              fb: parsed.socials.fb || "#",
              ig: parsed.socials.ig || "#",
              tw: parsed.socials.tw || "#",
              yt: parsed.socials.yt || "#"
            });
          }
        }
      } catch (err) {
        console.error("Failed to load footer config:", err);
      }
    };
    const fetchLogo = async () => {
      try {
        const res = await api.get(`/cms/website-logo?t=${Date.now()}`);
        if (res.data && res.data.status && res.data.data && res.data.data.cmsValue) {
          const val = res.data.data.cmsValue;
          try {
            const parsed = JSON.parse(val);
            setWebsiteName(parsed.websiteName || "PRABHA PHARMA");
          } catch (e) {
            setWebsiteName("PRABHA PHARMA");
          }
        }
      } catch (err) {
        console.log("No custom logo/name found for footer");
      }
    };
    fetchFooterConfig();
    fetchLogo();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Thank you for subscribing to our drops!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-zinc-950 text-white relative overflow-hidden border-t border-white/10">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(220,38,38,0.04),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">

          {/* Left Side: Why Choose Us & Newsletter (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">

            {/* Why Choose Us Stats Block */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                <h3 className="text-xl font-black uppercase tracking-widest text-white leading-none">
                  Why Choose Us
                </h3>
              </div>

              {/* Stat Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {stats.map((stat, idx) => {
                  if (stat.style === "red") {
                    return (
                      <div
                        key={idx}
                        className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-4 flex flex-col justify-center text-center shadow-[0_0_20px_rgba(220,38,38,0.3)] border border-red-500/20"
                      >
                        <span className="text-xl font-black text-white uppercase">{stat.value}</span>
                        <span className="text-[8px] font-extrabold uppercase text-white/90 tracking-wider mt-1 leading-tight">
                          {stat.label}
                        </span>
                      </div>
                    );
                  } else if (stat.style === "grey") {
                    return (
                      <div
                        key={idx}
                        className="border border-white/20 bg-zinc-800/80 rounded-2xl p-4 flex flex-col justify-center text-center shadow-lg"
                      >
                        <span className="text-xl font-black text-red-500 uppercase">{stat.value}</span>
                        <span className="text-[8px] font-extrabold uppercase text-zinc-300 tracking-wider mt-1 leading-tight">
                          {stat.label}
                        </span>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={idx}
                        className="border border-white/10 bg-white/[0.01] rounded-2xl p-4 flex flex-col justify-center text-center"
                      >
                        <span className="text-xl font-black text-white uppercase">{stat.value}</span>
                        <span className="text-[8px] font-extrabold uppercase text-zinc-500 tracking-wider mt-1 leading-tight">
                          {stat.label}
                        </span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            {/* Newsletter Block */}
            <div className="max-w-md">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-red-500 mb-3">
                {newsletter.title}
              </h4>
              <p className="text-xs text-zinc-400 font-medium mb-4 leading-relaxed">
                {newsletter.description}
              </p>

              <form onSubmit={handleSubscribe} className="relative flex items-center h-12">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full bg-white/5 border border-white/10 rounded-xl px-4 pr-12 text-xs outline-none text-white focus:border-red-500 focus:bg-white/10 transition-all font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-1 w-10 h-10 rounded-lg bg-red-600 hover:bg-white text-white hover:text-zinc-950 transition flex items-center justify-center cursor-pointer shadow"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Socials Row */}
            <div className="flex gap-3">
              {[
                { Icon: FaFacebookF, href: socials.fb },
                { Icon: FaInstagram, href: socials.ig },
                { Icon: FaTwitter, href: socials.tw },
                { Icon: FaYoutube, href: socials.yt },
              ].map(({ Icon, href }, idx) => {
                if (!href || href === "#" || href.trim() === "") return null;
                return (
                  <a
                    key={idx}
                    href={href}
                    className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:scale-105 transition-all group"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Side: Columns (Span 7) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Column 1: Quick Links */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-red-500 border-b border-white/5 pb-3 mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3.5 text-xs font-bold text-zinc-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-white transition-colors">
                    Best Seller
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-white transition-colors">
                    Offers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Our Stores
                  </Link>
                </li>
                <li>
                  <Link href="/recommend" className="hover:text-white transition-colors">
                    Authenticity
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About & Contact
                  </Link>
                </li>
                <li>
                  <Link href="/business-enquiry" className="hover:text-white transition-colors">
                    Business Inquiry
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: All Products */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-red-500 border-b border-white/5 pb-3 mb-5">
                All Products
              </h4>
              <ul className="space-y-3.5 text-xs font-bold text-zinc-400">
                <li>
                  <Link href="/shop?brand=Muscleyn%20Bulk" className="hover:text-white transition-colors">
                    Muscleyn - Massive Muscle
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Mass%20Gainer" className="hover:text-white transition-colors">
                    Health Gainer
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Fat%20Burner" className="hover:text-white transition-colors">
                    Resizer - Fat Burner
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-white transition-colors">
                    Aloefit
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-white transition-colors">
                    What's New
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Support or Information */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-red-500 border-b border-white/5 pb-3 mb-5">
                Support & Info
              </h4>
              <ul className="space-y-3.5 text-xs font-bold text-zinc-400">
                <li>
                  <Link href="/business-enquiry" className="hover:text-white transition-colors">
                    Business Inquiry
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    About & Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/recommend" className="hover:text-white transition-colors">
                    Authenticity & Lab reports
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms & Condition
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Shipping & Delivery Policy
                  </Link>
                </li>
                <li>
                  <Link href="/return-policy" className="hover:text-white transition-colors">
                    Return and Refund
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright Bar at the bottom */}
      <section className="border-t border-white/5 bg-zinc-950/60 py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} {websiteName.toUpperCase()}. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            {/* <Link href="/terms" className="hover:text-white transition">Terms</Link> 
              <Link href="/privacy" className="hover:text-white transition">Privacy</Link> */}
          </div>
        </div>
      </section>
    </footer>
  );
}