"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Newspaper, Award, TrendingUp, Star, HelpCircle, ArrowRight } from "lucide-react";
import api from "@/services/api";

// Static fallbacks removed

// Helper mock icon for GQ
function StarIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const iconMap: Record<string, any> = {
  Award: Award,
  TrendingUp: TrendingUp,
  Newspaper: Newspaper,
  Star: Star
};

export default function NewsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [headerTitle, setHeaderTitle] = useState("Our News");
  const [headerSubtitle, setHeaderSubtitle] = useState("Media features, corporate announcements, and press coverage of our award-winning clean sports nutrition initiatives.");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get(`/cms/news-list?t=${Date.now()}`);
        if (res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setArticles(parsed);
            return;
          }
        }
        setArticles([]);
      } catch (err) {
        console.log("No dynamic news configured in CMS", err);
        setArticles([]);
      }
    };

    const fetchHeader = async () => {
      try {
        const res = await api.get(`/cms/news-page-header?t=${Date.now()}`);
        if (res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          if (parsed.title) setHeaderTitle(parsed.title);
          if (parsed.subtitle) setHeaderSubtitle(parsed.subtitle);
        }
      } catch (err) {
        console.log("No custom news header configured", err);
      }
    };

    fetchNews();
    fetchHeader();
  }, []);

  return (
    <main className="bg-zinc-950 text-white min-h-screen selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <section className="relative py-20 border-b border-white/5 bg-zinc-900/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.06),transparent_50%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-500 hover:text-white transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            {headerTitle}
          </h1>
          <p className="mt-4 text-zinc-400 text-sm md:text-base font-medium max-w-xl mx-auto">
            {headerSubtitle}
          </p>
        </div>
      </section>

      {/* Main Articles List */}
      <section className="py-24 max-w-4xl mx-auto px-4">
        <div className="flex flex-col gap-12">
          {articles.map((article) => {
            const Icon = (typeof article.icon === "string" ? iconMap[article.icon] : article.icon) || Newspaper;
            return (
              <div
                key={article.id}
                className="bg-zinc-900 border border-white/10 rounded-[2rem] p-8 shadow-2xl hover:border-red-500/30 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Meta details */}
                  <div className="flex justify-between items-center gap-4 mb-4 border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      {article.publisher}
                    </span>
                    <span className="text-xs text-zinc-500 font-bold tracking-wider">
                      {article.date}
                    </span>
                  </div>

                  {/* Headline & details */}
                  <Link href={`/news/${article.id}`}>
                    <h2 className="text-2xl font-black text-white group-hover:text-red-500 transition-colors leading-snug mb-3">
                      {article.headline}
                    </h2>
                  </Link>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-semibold">
                    {article.summary}
                  </p>
                </div>

                {/* Read Full Release Button */}
                <Link
                  href={`/news/${article.id}`}
                  className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-xs font-black uppercase tracking-wider text-white transition hover:bg-white hover:text-zinc-950 mt-4"
                >
                  Read Press Release
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
