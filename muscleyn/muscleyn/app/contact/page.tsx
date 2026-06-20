"use client";

import { FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { submitContactEnquiry } from "@/services/contactService";
import api from "@/services/api";

const faqs = [
  {
    question: "How fast do you ship orders?",
    answer:
      "Most orders are prepared within 24 hours. Final delivery depends on the destination and courier coverage.",
  },
  {
    question: "Can I get help choosing a supplement stack?",
    answer:
      "Yes. Share your training goal, diet preference, and budget through the contact form and support can guide you.",
  },
  {
    question: "Do you support cash on delivery?",
    answer:
      "COD can be enabled based on delivery location and order value. The checkout flow is structured for this support.",
  },
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const contactCards: Array<{
  icon: LucideIcon;
  title: string;
  value: string;
}> = [
    {
      icon: Phone,
      title: "Phone",
      value: "+91 98765 43210",
    },
    {
      icon: Mail,
      title: "Email",
      value: "support@muscleyn.com",
    },
    {
      icon: MapPin,
      title: "Business",
      value: "Fitness District, Indore, India",
    },
    {
      icon: Clock,
      title: "Support Hours",
      value: "Mon-Sat, 10:00 AM - 7:00 PM",
    },
  ];

const supportCards: Array<{
  icon: LucideIcon;
  title: string;
  copy: string;
}> = [
    {
      icon: Headphones,
      title: "Order Support",
      copy: "Delivery, payment, returns",
    },
    {
      icon: MessageCircle,
      title: "Stack Guidance",
      copy: "Goal-based supplement advice",
    },
    {
      icon: Send,
      title: "Social",
      copy: "Follow drops and athlete stories",
    },
  ];

const stores = [
  {
    id: "indore",
    name: "Muscleyn Indore HQ",
    address: "Vijay Nagar, Indore, Madhya Pradesh 452010",
    timings: "Mon-Sat, 10 AM - 7 PM",
    mapUrl: "https://www.google.com/maps?q=22.7533,75.8937&z=16&output=embed",
    directionsUrl: "https://www.google.com/maps?q=22.7533,75.8937",
  },
  {
    id: "mumbai",
    name: "Muscleyn Mumbai Experience Center",
    address: "Bandra West, Link Road, Mumbai, Maharashtra 400050",
    timings: "Mon-Sun, 11 AM - 8 PM",
    mapUrl: "https://www.google.com/maps?q=19.0600,72.8311&z=16&output=embed",
    directionsUrl: "https://www.google.com/maps?q=19.0600,72.8311",
  },
  {
    id: "delhi",
    name: "Muscleyn Delhi Experience Center",
    address: "Connaught Place, Radial Road 1, New Delhi 110001",
    timings: "Mon-Sun, 10 AM - 9 PM",
    mapUrl: "https://www.google.com/maps?q=28.6304,77.2177&z=16&output=embed",
    directionsUrl: "https://www.google.com/maps?q=28.6304,77.2177",
  },
  {
    id: "bengaluru",
    name: "Muscleyn Bengaluru Experience Center",
    address: "Indiranagar, 100 Feet Rd, Bengaluru, Karnataka 560038",
    timings: "Mon-Sat, 10 AM - 8 PM",
    mapUrl: "https://www.google.com/maps?q=12.9719,77.6412&z=16&output=embed",
    directionsUrl: "https://www.google.com/maps?q=12.9719,77.6412",
  },
];

const getIconByName = (name: string): LucideIcon => {
  const map: Record<string, LucideIcon> = {
    Phone: Phone,
    Mail: Mail,
    MapPin: MapPin,
    Clock: Clock,
    Headphones: Headphones,
    MessageCircle: MessageCircle,
    Send: Send
  };
  return map[name] || MapPin;
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [activeStoreIdx, setActiveStoreIdx] = useState(0);
  const [loading, setLoading] = useState(false);

  // Dynamic CMS States with static fallbacks
  const [header, setHeader] = useState({
    eyebrow: "Contact Us",
    title: "Need help with products, orders, or your stack?",
    description: "Reach the Muscleyn support team for product guidance, order questions, partnerships, or business enquiries.",
    bgImage: "https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1800&auto=format&fit=crop"
  });

  const [contactCardsState, setContactCardsState] = useState<any[]>(contactCards);
  const [supportCardsState, setSupportCardsState] = useState<any[]>(supportCards);
  const [storesState, setStoresState] = useState<any[]>(stores);
  const [faqsState, setFaqsState] = useState<any[]>(faqs);

  const activeStore = storesState[activeStoreIdx] || storesState[0] || stores[0];

  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const [headerRes, infoRes, supportRes, storesRes, faqsRes] = await Promise.allSettled([
          api.get("/cms/contact-header"),
          api.get("/cms/contact-info-cards"),
          api.get("/cms/contact-support-cards"),
          api.get("/cms/contact-stores"),
          api.get("/cms/contact-faqs")
        ]);

        if (headerRes.status === "fulfilled" && headerRes.value.data.data && headerRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(headerRes.value.data.data.cmsValue);
            setHeader({
              eyebrow: parsed.eyebrow || "Contact Us",
              title: parsed.title || "Need help with products, orders, or your stack?",
              description: parsed.description || "Reach the Muscleyn support team for product guidance, order questions, partnerships, or business enquiries.",
              bgImage: parsed.bgImage || "https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1800&auto=format&fit=crop"
            });
          } catch (e) {}
        }

        if (infoRes.status === "fulfilled" && infoRes.value.data.data && infoRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(infoRes.value.data.data.cmsValue);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setContactCardsState(parsed);
            }
          } catch (e) {}
        }

        if (supportRes.status === "fulfilled" && supportRes.value.data.data && supportRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(supportRes.value.data.data.cmsValue);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setSupportCardsState(parsed);
            }
          } catch (e) {}
        }

        if (storesRes.status === "fulfilled" && storesRes.value.data.data && storesRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(storesRes.value.data.data.cmsValue);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setStoresState(parsed);
            }
          } catch (e) {}
        }

        if (faqsRes.status === "fulfilled" && faqsRes.value.data.data && faqsRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(faqsRes.value.data.data.cmsValue);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setFaqsState(parsed);
            }
          } catch (e) {}
        }
      } catch (err) {
        console.error("Failed to load contact page CMS config", err);
      }
    };

    fetchCmsData();
  }, []);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.fullName || !form.email || !form.subject || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await submitContactEnquiry(form);
      toast.success("Enquiry submitted successfully");
      setForm(initialForm);
    } catch (error) {
      toast.error("Unable to submit enquiry right now");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-zinc-950 text-white">
        <section className="relative isolate overflow-hidden py-24 md:py-32">
          {header.bgImage && (
            <Image
              src={header.bgImage}
              alt="Fitness support"
              fill
              priority
              sizes="100vw"
              className="-z-10 object-cover opacity-35"
            />
          )}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-red-950/40" />
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-red-400">
              {header.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-none tracking-[-0.06em] md:text-7xl">
              {header.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
              {header.description}
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            {contactCardsState.map((card) => {
              const Icon = getIconByName(card.icon);
              return (
                <div
                  key={card.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7"
                >
                  <Icon className="h-8 w-8 text-red-500" />
                  <h3 className="mt-5 text-2xl font-black">{card.title}</h3>
                  <p className="mt-2 text-zinc-300">{card.value}</p>
                </div>
              );
            })}
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2.5rem] border border-white/10 bg-white p-6 text-zinc-950 shadow-2xl md:p-10"
          >
            <h2 className="text-4xl font-black tracking-[-0.04em]">
              Send an enquiry
            </h2>
            <p className="mt-3 leading-7 text-zinc-500">
              The backend saves this enquiry in MySQL and is structured for
              email notification support.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Field
                label="Full name"
                value={form.fullName}
                onChange={(value) => updateField("fullName", value)}
                required
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) => updateField("email", value)}
                required
              />
              <Field
                label="Phone"
                value={form.phone}
                onChange={(value) => updateField("phone", value)}
              />
              <Field
                label="Subject"
                value={form.subject}
                onChange={(value) => updateField("subject", value)}
                required
              />
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-black uppercase tracking-[0.16em] text-zinc-500">
                Message
              </span>
              <textarea
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                required
                rows={6}
                className="w-full resize-none rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 font-semibold outline-none transition focus:border-red-500"
                placeholder="Tell us how we can help"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-zinc-950 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Enquiry"}
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>

        <section className="bg-white py-20 text-zinc-950">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3">
            {supportCardsState.map((card) => {
              const Icon = getIconByName(card.icon);
              return (
                <div
                  key={card.title}
                  className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-8"
                >
                  <Icon className="h-10 w-10 text-red-600" />
                  <h3 className="mt-6 text-2xl font-black">{card.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-600">{card.copy}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Store Locations Slider */}
        <section className="max-w-7xl mx-auto px-4 pt-16 pb-4">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-red-500 mb-3">Our Stores</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-8">
            Experience Centers <span className="text-red-500">& Labs</span>
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
            {storesState.map((store, idx) => (
              <button
                key={store.id}
                type="button"
                onClick={() => setActiveStoreIdx(idx)}
                className={`snap-start shrink-0 w-72 p-6 rounded-[2rem] border transition-all duration-300 text-left ${activeStoreIdx === idx
                    ? "border-red-600 bg-red-600/10 text-white shadow-lg shadow-red-950/20"
                    : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-[0.15em] text-red-500">
                    Location 0{idx + 1}
                  </span>
                  <MapPin className={`w-5 h-5 ${activeStoreIdx === idx ? "text-red-500" : "text-zinc-500"}`} />
                </div>
                <h3 className="text-xl font-black mb-1 line-clamp-1">{store.name}</h3>
                <p className="text-xs font-semibold text-zinc-400 line-clamp-2 leading-relaxed">{store.address}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2">
          {activeStore && (
            <div className="relative min-h-[620px] overflow-hidden rounded-[2.25rem] border border-white/15 bg-zinc-900 shadow-2xl shadow-black/30">
              <iframe
                key={activeStore.id}
                title={`${activeStore.name} location`}
                src={activeStore.mapUrl}
                className="absolute inset-0 h-full w-full border-0 grayscale-[15%] contrast-110"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="pointer-events-none absolute left-1/2 top-[42%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-red-600 text-white shadow-2xl shadow-red-950/50">
                  <MapPin className="h-8 w-8 fill-white" />
                </div>
                <div className="mt-3 rounded-full bg-black/75 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur">
                  {activeStore.name}
                </div>
              </div>
              <div className="absolute inset-x-5 bottom-5 rounded-[1.75rem] border border-white/15 bg-black/80 p-6 text-white shadow-2xl backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-red-400">
                  Visit our support desk
                </p>
                <h3 className="mt-3 text-2xl font-black">
                  {activeStore.name}
                </h3>
                <p className="mt-3 leading-7 text-zinc-300">
                  {activeStore.address}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
                      Pickup
                    </p>
                    <p className="mt-1 font-bold">{activeStore.timings}</p>
                  </div>
                  {activeStore.directionsUrl && (
                    <Link
                      href={activeStore.directionsUrl}
                      target="_blank"
                      className="flex items-center justify-center rounded-2xl bg-red-600 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] transition hover:bg-white hover:text-zinc-950"
                    >
                      Get Directions
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-red-400">
              FAQ
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] md:text-5xl">
              Quick answers before you contact us
            </h2>
            <div className="mt-8 space-y-4">
              {faqsState.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-6"
                >
                  <h3 className="text-xl font-black">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-zinc-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="h-14 w-full rounded-full border border-zinc-200 bg-zinc-50 px-5 font-semibold outline-none transition focus:border-red-500"
      />
    </label>
  );
}
