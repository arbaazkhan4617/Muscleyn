"use client";

import { useState, useEffect } from "react";
import { Newspaper, ArrowRight, Award, TrendingUp, Star, Globe } from "lucide-react";
import api from "@/services/api";
import Link from "next/link";

const iconMap: Record<string, any> = {
  Award: Award,
  TrendingUp: TrendingUp,
  Newspaper: Newspaper,
  Star: Star,
  Globe: Globe,
};

export default function NewsSection() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/cms/news-list?t=${Date.now()}`);
        if (res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Take the 3 latest news articles
            setNewsList(parsed.slice(0, 3));
            return;
          }
        }
      } catch (err) {
        console.log("No dynamic news configured in CMS", err);
      } finally {
        setLoading(false);
      }
      setNewsList([]);
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-zinc-950 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 bg-zinc-800 w-32 rounded mb-4" />
            <div className="h-8 bg-zinc-800 w-64 rounded mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-64 bg-zinc-900 border border-white/5 rounded-[2.5rem]" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (newsList.length === 0) {
    return null; // Don't show news section if no news articles exist
  }

  return (
    <section className="py-24 bg-zinc-950 border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.03),transparent_40%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col justify-between items-center md:items-end md:flex-row mb-16 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-red-500 mb-3">
              <Newspaper className="w-4 h-4 text-red-500" />
              Media & Coverage
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              News & Press Releases
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 text-xs font-black uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            View All Press
            <ArrowRight className="w-4 h-4 text-red-500" />
          </Link>
        </div>

        {/* Dynamic News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.map((article) => {
            const Icon = iconMap[article.icon] || Newspaper;
            return (
              <article
                key={article.id}
                className="group bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Card Meta */}
                  <div className="flex justify-between items-center gap-4 mb-5 pb-4 border-b border-white/5">
                    <span className="text-[9px] font-black text-red-500 uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-xl flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      {article.publisher}
                    </span>
                    <span className="text-xs text-zinc-500 font-bold tracking-wider">
                      {article.date}
                    </span>
                  </div>

                  {/* Headline & Summary */}
                  <Link href={`/news/${article.id}`}>
                    <h3 className="text-xl font-black text-white group-hover:text-red-500 transition-colors leading-snug mb-3">
                      {article.headline}
                    </h3>
                  </Link>
                  <p className="text-zinc-400 text-xs leading-relaxed font-semibold line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-white/5">
                  <Link
                    href={`/news/${article.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-500 hover:text-white transition-colors cursor-pointer group/btn"
                  >
                    Read Press Release
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
