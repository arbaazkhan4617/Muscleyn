"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ScanLine,
  FlaskConical,
  Award,
  CheckCircle2,
  ArrowRight,
  QrCode,
  Microscope,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/services/api";

const iconMap: Record<string, any> = {
  ShieldCheck: ShieldCheck,
  ScanLine: ScanLine,
  FlaskConical: FlaskConical,
  Award: Award,
  CheckCircle2: CheckCircle2,
};

export default function AuthenticityPage() {
  const [config, setConfig] = useState<any>({
    hero: {
      eyebrow: "Authenticity Guaranteed",
      title: "Quality Meets Authenticity",
      description: "Our guarantee stands strong. Every product sold on Prabha Pharma carries a Trust Seal — scan it to verify authenticity and access NABL-certified lab reports instantly.",
      bgImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1800&auto=format&fit=crop"
    },
    explainer: {
      eyebrow: "What is a Trust Seal?",
      title: "Trust Seal for Protein Authenticity & Report",
      description: "The Trust Seal is used to authenticate and verify your product. Additionally, you can check the lab reports tested by NABL-accredited labs which showcase the protein content, heavy metal profile, amino acid profiles, and more.",
      scratchCode: "BM-AAX5010",
      scanText: "Scan for labs & use the scratch code for authentication",
      points: [
        "NABL-accredited third-party lab testing",
        "Protein content verification",
        "Heavy metal profiling",
        "Amino acid profile analysis",
        "Holographic scratch-code anti-counterfeit"
      ]
    },
    process: {
      eyebrow: "Simple Process",
      title: "Product Authentication Tips",
      description: "Three easy steps to verify that what you're consuming is genuine, tested, and safe.",
      steps: [
        {
          step: "01",
          title: "Scan the Trust Seal",
          description: "Find the holographic Trust Seal sticker on your product packaging and scan the QR code using any smartphone camera.",
          iconName: "ScanLine"
        },
        {
          step: "02",
          title: "You're on Our Website",
          description: "The QR code lands you directly on our official Prabha Pharma verification portal — no third-party redirects.",
          iconName: "ShieldCheck"
        },
        {
          step: "03",
          title: "View Lab Test Report",
          description: "Access the full NABL-accredited third-party lab report showing protein content, heavy metal profile, and amino acid analysis.",
          iconName: "FlaskConical"
        }
      ]
    },
    certification: {
      eyebrow: "Third-Party Certified",
      title: "Every Batch. Every Test.",
      description: "Our products are independently tested by NABL-accredited laboratories. The results are published and accessible to every customer through the Trust Seal QR code on the product.",
      sampleReportTitle: "Lab Report — Sample Result",
      sampleReportFooter: "Tested by SGS India Pvt. Ltd. | NABL Accredited | Certificate No. TC-7721",
      sampleResults: [
        { label: "Protein Percentage", result: "Pass" },
        { label: "Heavy Metal", result: "Pass" },
        { label: "Amino Acid Profile", result: "Pass" },
        { label: "Microbial Safety", result: "Pass" }
      ],
      badges: [
        { label: "NABL Accredited", sub: "Third-party lab tested", iconName: "Award" },
        { label: "100% Authentic", sub: "Verified with Trust Seal", iconName: "ShieldCheck" },
        { label: "Protein Verified", sub: "Clinically validated dosage", iconName: "FlaskConical" },
        { label: "Heavy Metal Safe", sub: "Within permissible limits", iconName: "CheckCircle2" }
      ]
    },
    cta: {
      title: "Shop with Complete Confidence",
      description: "Every product on Prabha Pharma is backed by third-party lab testing and the Trust Seal guarantee. Your health deserves nothing less.",
      btnPrimaryText: "Shop Now",
      btnPrimaryLink: "/shop",
      btnSecondaryText: "Contact Support",
      btnSecondaryLink: "/contact"
    }
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await api.get(`/cms/authenticity-page-config?t=${Date.now()}`);
        if (res.data && res.data.status && res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          setConfig((prev: any) => ({
            hero: { ...prev.hero, ...parsed.hero },
            explainer: { ...prev.explainer, ...parsed.explainer },
            process: { ...prev.process, ...parsed.process },
            certification: { ...prev.certification, ...parsed.certification },
            cta: { ...prev.cta, ...parsed.cta }
          }));
        }
      } catch (err) {
        console.error("Failed to load dynamic authenticity config:", err);
      }
    };
    fetchConfig();
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-zinc-950 text-white min-h-screen">

        {/* ── Hero ── */}
        <section className="relative isolate overflow-hidden min-h-[70vh] flex items-center">
          {/* Background image */}
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${config.hero.bgImage || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1800&auto=format&fit=crop"}')`,
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/30" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.15),transparent_55%)]" />

          <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-500">
                <ShieldCheck className="h-3.5 w-3.5" />
                {config.hero.eyebrow}
              </div>
              <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                {config.hero.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-red-500">{config.hero.title.split(" ").slice(-1)[0]}</span>
              </h1>
              <p className="mt-6 text-xl font-medium text-zinc-300 leading-relaxed">
                {config.hero.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Trust Seal Explainer ── */}
        <section className="border-y border-white/5 bg-zinc-900/60 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              {/* Trust Seal Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex justify-center"
              >
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 -m-6 rounded-full bg-red-600/10 blur-2xl" />
                  <div className="relative flex h-64 w-64 flex-col items-center justify-center rounded-full border-4 border-red-600 bg-zinc-900 p-6 shadow-[0_0_60px_rgba(220,38,38,0.2)]">
                    <div className="mb-3 flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
                      <span className="h-px w-6 bg-red-500" /> TRUST SEAL <span className="h-px w-6 bg-red-500" />
                    </div>
                    <QrCode className="h-24 w-24 text-white/80" />
                    <p className="mt-3 text-center text-[9px] font-black uppercase tracking-widest text-zinc-400 leading-tight">
                      {config.explainer.scanText}
                    </p>
                    <div className="mt-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-[9px] font-black text-red-400 tracking-widest">
                      {config.explainer.scratchCode}
                    </div>
                  </div>
                  {/* Decorative stars */}
                  {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <div
                      key={deg}
                      className="absolute h-2.5 w-2.5 rounded-full bg-red-500"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${deg}deg) translateY(-135px) translate(-50%, -50%)`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Copy */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-red-500">
                  {config.explainer.eyebrow}
                </p>
                <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">
                  {config.explainer.title.split(" ").slice(0, -2).join(" ")}{" "}
                  <span className="text-red-500">{config.explainer.title.split(" ").slice(-2, -1)[0]}</span>{" "}
                  {config.explainer.title.split(" ").slice(-1)[0]}
                </h2>
                <p className="mt-5 text-base font-medium leading-relaxed text-zinc-400">
                  {config.explainer.description}
                </p>
                <ul className="mt-8 space-y-3">
                  {(config.explainer.points || []).map((point: string) => (
                    <li key={point} className="flex items-start gap-3 text-sm font-medium text-zinc-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section id="how-it-works" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-red-500">
                {config.process.eyebrow}
              </p>
              <h2 className="text-3xl font-black text-white md:text-5xl">
                {config.process.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base font-medium text-zinc-500">
                {config.process.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {(config.process.steps || []).map((s: any, idx: number) => {
                const Icon = iconMap[s.iconName] || ShieldCheck;
                return (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="group relative rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-md transition hover:border-red-500/30 hover:bg-zinc-900"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-6xl font-black text-white/5 group-hover:text-red-600/10 transition-colors">
                        {s.step}
                      </span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/10 border border-red-500/20 text-red-500">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="mb-3 text-lg font-black text-white">{s.title}</h3>
                    <p className="text-sm font-medium leading-relaxed text-zinc-500">{s.description}</p>
                    {idx < config.process.steps.length - 1 && (
                      <ArrowRight className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-red-500/40 md:block" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Lab Results Preview ── */}
        <section className="border-y border-white/5 bg-zinc-900/40 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-red-500">
                  {config.certification.eyebrow}
                </p>
                <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">
                  {config.certification.title.split(" ").slice(0, -2).join(" ")}{" "}
                  <span className="text-red-500">{config.certification.title.split(" ").slice(-2).join(" ")}</span>
                </h2>
                <p className="mt-5 text-base font-medium leading-relaxed text-zinc-400">
                  {config.certification.description}
                </p>

                {/* Mock Lab Report Card */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-950 p-5">
                  <div className="mb-4 flex items-center gap-3 border-b border-white/5 pb-4">
                    <Microscope className="h-5 w-5 text-red-500" />
                    <span className="text-sm font-black text-white">{config.certification.sampleReportTitle}</span>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left">
                        <th className="pb-2 text-xs font-black uppercase tracking-widest text-zinc-600">
                          Type of Test
                        </th>
                        <th className="pb-2 text-right text-xs font-black uppercase tracking-widest text-zinc-600">
                          Result
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {(config.certification.sampleResults || []).map((row: any) => (
                        <tr key={row.label}>
                          <td className="py-2.5 font-medium text-zinc-300">{row.label}</td>
                          <td className="py-2.5 text-right">
                            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-black text-green-400 border border-green-500/20">
                              {row.result}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-4 text-[11px] font-medium text-zinc-600">
                    {config.certification.sampleReportFooter}
                  </p>
                </div>
              </motion.div>

              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-2 gap-4"
              >
                {(config.certification.badges || []).map((badge: any) => {
                  const BadgeIcon = iconMap[badge.iconName] || ShieldCheck;
                  return (
                    <div
                      key={badge.label}
                      className="rounded-2xl border border-white/10 bg-zinc-900 p-6 text-center hover:border-red-500/20 transition-colors"
                    >
                      <BadgeIcon className="mx-auto mb-3 h-8 w-8 text-red-500" />
                      <p className="text-sm font-black text-white">{badge.label}</p>
                      <p className="mt-1 text-xs font-medium text-zinc-500">{badge.sub}</p>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="border-t border-white/5 bg-gradient-to-r from-red-950/30 via-zinc-950 to-zinc-950 py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ShieldCheck className="mx-auto mb-5 h-12 w-12 text-red-500" />
              <h2 className="text-3xl font-black text-white md:text-4xl">
                {config.cta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base font-medium text-zinc-400">
                {config.cta.description}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href={config.cta.btnPrimaryLink || "/shop"}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_0_25px_rgba(220,38,38,0.3)] transition hover:bg-white hover:text-zinc-950"
                >
                  {config.cta.btnPrimaryText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={config.cta.btnSecondaryLink || "/contact"}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-widest text-white backdrop-blur-md transition hover:border-white hover:bg-white/10"
                >
                  {config.cta.btnSecondaryText}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
