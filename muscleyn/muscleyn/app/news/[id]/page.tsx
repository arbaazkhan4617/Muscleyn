"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Newspaper, Award, TrendingUp, Star, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import api from "@/services/api";

const defaultNewsArticles = [
  {
    id: 1,
    publisher: "ET Industry Changemakers (North 2026)",
    date: "June 15, 2026",
    headline: "Prabha Pharma Honored with the Northern Region Industry Changemaker Award 2026",
    summary: "Recognized for disruptive clean formulations and supply chain integrity in the sports nutrition sector.",
    detail: "Prabha Pharma has been awarded the prestigious 'ET Industry Changemakers Award 2026' for the Northern Region. The award committee cited our commitment to absolute ingredient transparency, third-party batch testing, and removing proprietary blends from fitness supplements as key factors. By creating clean, high-efficacy options under the Muscleyn line, Prabha Pharma is raising the bar for the entire Indian supplements industry.",
    icon: "Award",
  },
  {
    id: 2,
    publisher: "ET Brand Equity",
    date: "May 22, 2026",
    headline: "Marketing Authenticity: How Prabha Pharma Replaced Gym-Bro Noise with Clinical Standards",
    summary: "A deep dive into how transparency and batch certificates became our primary marketing campaign.",
    detail: "In an industry historically driven by aggressive and misleading claims, Prabha Pharma's 'Authenticity First' approach is carving a new path. Brand Equity analyzes how launching public-access lab certificates and Labdoor certifications built a strong foundation of trust among gen-z and millennial athletes, leading to a 40% year-on-year growth.",
    icon: "TrendingUp",
  },
  {
    id: 3,
    publisher: "afaqs!",
    date: "April 18, 2026",
    headline: "Prabha Pharma Launches #GenuinePerformers Campaign for Muscleyn Series",
    summary: "The marketing push includes QR code verifications and partnerships with elite IFBB coaches.",
    detail: "Afaqs reports on Prabha Pharma's new marketing roadmap for the Muscleyn product stack. The campaign highlights double-blind lab testing and unique QR scanning on each bottle to verify authentic packaging and content. With fitness influencers like Aarush Bhola on board, the campaign is setting records for direct-to-consumer engagement.",
    icon: "Newspaper",
  },
  {
    id: 4,
    publisher: "THE WEEK",
    date: "March 10, 2026",
    headline: "Supplements Audit: How Sourcing Dictates Fitness Progress",
    summary: "The Week investigates how Prabha Pharma isolates components to maintain pharmaceutical grade quality.",
    detail: "Sourcing ingredients of raw whey, creatine, and amino acids is notorious for quality fluctuation. The Week's investigative team audits Prabha Pharma's sourcing nodes in Germany and Ireland, confirming that their pharmaceutical standards avoid bulk fillers and heavy metals, resulting in a cleaner product stack.",
    icon: "Newspaper",
  },
  {
    id: 5,
    publisher: "GQ",
    date: "February 24, 2026",
    headline: "The Elite Fitness Stack: Why Athletes are Swapping to Prabha Pharma's Formulas",
    summary: "GQ editors test the premium isolates and pre-workout stacks designed for high performance.",
    detail: "Our GQ editors tested the Muscleyn Elite Whey Isolate and Pre-Workout stack for 6 weeks. The results are clear: the clean mixability and caffeine-tea-extract ratio deliver high performance outputs without the digestive discomfort or energy crashes typical of competitor formulas.",
    icon: "Star",
  },
];

const iconMap: Record<string, any> = {
  Award: Award,
  TrendingUp: TrendingUp,
  Newspaper: Newspaper,
  Star: Star
};

export default function NewsDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: newsIdStr } = use(params);
  const [article, setArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        setLoading(true);
        const res = await api.get("/cms/news-list");
        let allNews = defaultNewsArticles;
        if (res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          if (Array.isArray(parsed) && parsed.length > 0) {
            allNews = parsed;
          }
        }

        const targetId = Number(newsIdStr);
        const matchedArticle = allNews.find((n) => n.id === targetId);
        if (matchedArticle) {
          setArticle(matchedArticle);
          const others = allNews.filter((n) => n.id !== targetId).slice(0, 2);
          setRelatedNews(others);
        }
      } catch (err) {
        console.error("Failed to load news details:", err);
        const targetId = Number(newsIdStr);
        const matchedArticle = defaultNewsArticles.find((n) => n.id === targetId);
        if (matchedArticle) {
          setArticle(matchedArticle);
          const others = defaultNewsArticles.filter((n) => n.id !== targetId).slice(0, 2);
          setRelatedNews(others);
        }
      } finally {
        setLoading(false);
      }
    };

    if (newsIdStr) {
      fetchNewsDetails();
    }
  }, [newsIdStr]);

  if (loading) {
    return (
      <main className="bg-zinc-950 text-white min-h-screen">
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
          <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading News...</div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!article) {
    return (
      <main className="bg-zinc-950 text-white min-h-screen">
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-black text-white">Press Release Not Found</h2>
          <Link href="/news" className="text-red-500 font-bold hover:underline">Back to News</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const Icon = iconMap[article.icon] || Newspaper;

  return (
    <main className="bg-zinc-950 text-white min-h-screen selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <section className="relative py-24 border-b border-white/5 bg-zinc-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.06),transparent_50%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-500 hover:text-white transition flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" /> Back to News
            </Link>
            <span className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-black text-red-500 tracking-wider uppercase inline-flex items-center gap-2 flex-shrink-0">
              <Icon className="w-4 h-4" />
              {article.publisher}
            </span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-white mb-4">
            {article.headline}
          </h1>

          <div className="text-sm text-zinc-500 font-bold tracking-wider">
            PUBLISHED ON: <span className="text-white ml-2">{article.date}</span>
          </div>
        </div>
      </section>

      {/* News Body Content */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        {/* Gallery Image Slider */}
        {article.images && article.images.length > 0 && (
          <div className="relative h-[250px] md:h-[480px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 mb-12 bg-zinc-900 shadow-2xl group/slider">
            {article.images.length > 1 ? (
              <>
                {/* Slider Track */}
                <div className="w-full h-full relative">
                  {article.images.map((slideUrl: string, idx: number) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                    >
                      <Image
                        src={slideUrl}
                        alt={`${article.headline} slide ${idx + 1}`}
                        fill
                        sizes="100vw"
                        className="object-cover opacity-90"
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Controls */}
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? article.images.length - 1 : prev - 1))}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-red-600/90 text-white flex items-center justify-center border border-white/10 backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition duration-300 cursor-pointer shadow-lg"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev === article.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-red-600/90 text-white flex items-center justify-center border border-white/10 backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition duration-300 cursor-pointer shadow-lg"
                  title="Next Slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 bg-black/30 border border-white/5 px-4 py-2 rounded-full backdrop-blur-md">
                  {article.images.map((_: string, idx: number) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition duration-300 cursor-pointer ${
                        idx === currentSlide ? "bg-red-500 scale-110" : "bg-white/30 hover:bg-white/60"
                      }`}
                      title={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <Image
                src={article.images[0]}
                alt={article.headline}
                fill
                sizes="100vw"
                className="object-cover opacity-90"
                priority
              />
            )}
          </div>
        )}

        {/* Summary Card */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 mb-12 shadow-inner">
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-bold">
            {article.summary}
          </p>
        </div>

        {/* Detailed Press Release */}
        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 md:p-12 text-zinc-300 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium mb-20 shadow-2xl">
          <h3 className="text-white font-black text-lg uppercase tracking-wider mb-6 flex items-center gap-2 pb-3 border-b border-white/5">
            <Newspaper className="w-5 h-5 text-red-500" />
            Press Release details
          </h3>
          {article.detail}
        </div>

        {/* Related News Section */}
        {relatedNews.length > 0 && (
          <div className="border-t border-white/10 pt-16 mt-16">
            <h3 className="text-2xl font-black text-white flex items-center gap-2 mb-10">
              <Globe className="w-6 h-6 text-red-500" />
              Other Coverage & Press
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedNews.map((n) => {
                const ItemIcon = iconMap[n.icon] || Newspaper;
                return (
                  <Link
                    key={n.id}
                    href={`/news/${n.id}`}
                    className="group bg-zinc-900 border border-white/10 rounded-[2rem] p-6 shadow-xl flex flex-col justify-between hover:border-red-500/30 transition-all duration-300"
                  >
                    <div>
                      <div className="flex justify-between items-center gap-4 mb-4 border-b border-white/5 pb-3">
                        <span className="text-[9px] font-black text-red-500 uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <ItemIcon className="w-3 h-3" />
                          {n.publisher}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-bold tracking-wider">{n.date}</span>
                      </div>
                      <h4 className="text-base font-black text-white leading-snug group-hover:text-red-500 transition-colors line-clamp-2">{n.headline}</h4>
                      <p className="text-xs text-zinc-400 mt-2 font-medium line-clamp-2">{n.summary}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
