import { useState, useEffect } from "react";
import { Newspaper } from "lucide-react";
import api from "@/services/api";
import Link from "next/link";

const defaultPublications = [
  {
    id: 1,
    name: "ET INDUSTRY CHANGEMAKERS",
    sub: "North 2026",
    logoStyle: "font-black tracking-tighter text-sm md:text-base",
    badge: "ET",
    tagline: "Industry Leader Award",
  },
  {
    id: 2,
    name: "afaqs!",
    sub: "Marketing News",
    logoStyle: "font-black italic tracking-tight text-xl md:text-2xl text-blue-400",
    badge: "a!",
    tagline: "Featured In Media",
  },
  {
    id: 3,
    name: "ET BRAND EQUITY",
    sub: "The Economic Times",
    logoStyle: "font-bold tracking-tight text-sm uppercase text-red-500",
    badge: "BE",
    tagline: "Nutrition Tech Insights",
  },
  {
    id: 4,
    name: "THE WEEK",
    sub: "National Coverage",
    logoStyle: "font-black tracking-widest text-lg uppercase border-y border-white/20 py-0.5 px-2",
    badge: "TW",
    tagline: "Quality Standards Audit",
  },
  {
    id: 5,
    name: "GQ",
    sub: "Gentlemen's Quarterly",
    logoStyle: "font-black tracking-normal text-2xl md:text-3xl font-serif",
    badge: "GQ",
    tagline: "Elite Supplement Choice",
  },
];

export default function NewsSection() {
  const [newsList, setNewsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/cms/news-list");
        if (res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Map headline/publisher to the publication structure
            const mapped = parsed.map((item: any, index: number) => ({
              id: item.id || `custom-${index}`,
              name: item.publisher || item.name,
              sub: item.headline || item.sub,
              logoStyle: "font-black tracking-tighter text-sm",
              badge: (item.publisher || "News").substring(0, 3).toUpperCase(),
              tagline: item.summary || item.tagline || "Press Coverage",
            }));
            setNewsList(mapped);
            return;
          }
        }
      } catch (err) {
        console.log("No dynamic news configured in CMS", err);
      }
      setNewsList(defaultPublications);
    };
    fetchNews();
  }, []);
  return (
    <section className="py-24 bg-zinc-950 border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.03),transparent_40%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-red-500 mb-3 justify-center">
            <Newspaper className="w-4 h-4 text-red-500" />
            Media & Coverage
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            News
          </h2>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 justify-center items-center">
          {newsList.map((pub) => (
            <Link
              href={`/news/${pub.id}`}
              key={pub.id}
              className="h-32 rounded-[2rem] border border-white/5 bg-white/[0.02] p-5 flex flex-col items-center justify-center hover:bg-white/[0.05] hover:border-white/10 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer shadow-lg"
            >
              {/* Publisher Mock Logo */}
              <div className="flex flex-col items-center justify-center h-16 w-full text-center">
                {pub.id === 1 && (
                  <div className="flex flex-col items-center">
                    <span className="font-extrabold text-[10px] tracking-[0.2em] bg-red-600 px-2 py-0.5 rounded text-white mb-0.5">ET</span>
                    <span className="font-black text-xs text-white tracking-tight leading-tight">CHANGEMAKERS</span>
                    <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">North 2026</span>
                  </div>
                )}
                {pub.id === 2 && (
                  <div className="text-center font-extrabold italic text-2xl tracking-tighter text-blue-400 group-hover:text-blue-300 transition-colors">
                    afaqs<span className="text-red-500 font-black">!</span>
                  </div>
                )}
                {pub.id === 3 && (
                  <div className="flex flex-col items-center">
                    <span className="font-extrabold text-[9px] tracking-wide text-zinc-400">ET BRAND EQUITY</span>
                    <span className="text-[7px] text-zinc-500 uppercase tracking-widest mt-0.5">From The Economic Times</span>
                  </div>
                )}
                {pub.id === 4 && (
                  <div className="font-black tracking-widest text-lg md:text-xl border-y-2 border-white/20 py-0.5 px-3 text-white">
                    THEWEEK
                  </div>
                )}
                {pub.id === 5 && (
                  <div className="font-black tracking-tight text-2xl md:text-3xl font-serif text-white group-hover:text-red-500 transition-colors">
                    GQ
                  </div>
                )}
                {! [1, 2, 3, 4, 5].includes(pub.id) && (
                  <div className="flex flex-col items-center">
                    <span className="font-extrabold text-[10px] tracking-[0.2em] bg-red-600 px-2 py-0.5 rounded text-white mb-0.5">{pub.badge}</span>
                    <span className="font-black text-xs text-white tracking-tight leading-tight uppercase line-clamp-1">{pub.name}</span>
                    <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5 line-clamp-1">{pub.sub}</span>
                  </div>
                )}
              </div>
              
              {/* Little detail note */}
              <span className="text-[9px] text-zinc-500 group-hover:text-zinc-400 font-bold uppercase tracking-wider transition-colors">
                {pub.tagline}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
