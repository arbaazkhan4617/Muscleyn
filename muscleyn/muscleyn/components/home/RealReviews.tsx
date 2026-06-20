"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import api from "@/services/api";
import { getBackendImageUrl } from "@/lib/commerce";

const defaultReviews = [
  {
    id: 1,
    name: "Aarush Bhola",
    role: "Fitness Influencer",
    title: "My Go-To Protein Supplement",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=600&auto=format&fit=crop",
    quote: "Prabha Pharma's Muscleyn Whey is easily the most mixable and clean protein I've used. Sourced premium, zero bloat, and the performance gains are real.",
  },
  {
    id: 2,
    name: "GIJO JOHN",
    role: "IFBB PRO",
    title: "The Pre-Workout Trust",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    quote: "When you are prepping for a pro show, you cannot risk proprietary blends. Muscleyn pre-workout gives me clean focus and explosive pumps every session.",
  },
  {
    id: 3,
    name: "Mannu Chaudhary",
    role: "Power Lifter",
    title: "My Source for Unmatched Energy",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop",
    quote: "Heavy squats demand maximum creatine efficiency. Muscleyn Lab series creatine has been my staple for strength progression and cell volume.",
  },
  {
    id: 4,
    name: "Sunny Sharma",
    role: "IFBB PRO",
    title: "Power-Packed Protein for Peak Performance",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
    quote: "Recovery is everything in bodybuilding. Muscleyn Isolate provides the rapid-acting amino acids I need immediately after intense hypertrophy sessions.",
  },
];

export default function RealReviews() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [reviewsList, setReviewsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardReviews = async () => {
      try {
        const response = await api.get("/reviews/dashboard");
        if (response.data && response.data.status && response.data.data?.length > 0) {
          const mapped = response.data.data.map((r: any) => {
            const mediaList = r.mediaUrls ? r.mediaUrls.split(",").filter(Boolean) : [];
            const rImage = mediaList.length > 0 ? getBackendImageUrl(mediaList[0]) : "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=600&auto=format&fit=crop";
            return {
              id: r.id,
              name: r.userName || "Verified Buyer",
              role: r.productName || "Athlete",
              title: `${r.rating} Stars Review`,
              image: rImage,
              quote: r.reviewText || "Amazing product, highly recommended!"
            };
          });
          setReviewsList(mapped);
          return;
        }
      } catch (error) {
        console.error("No custom dashboard reviews found", error);
      }
      setReviewsList(defaultReviews);
    };
    fetchDashboardReviews();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-zinc-950 border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.05),transparent_40%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Title Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500 mb-3">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white flex items-center gap-2">
              Real People. Real Reviews <span className="text-red-500">❤️</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition flex items-center justify-center cursor-pointer"
              aria-label="Previous Review"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition flex items-center justify-center cursor-pointer"
              aria-label="Next Review"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Row */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {reviewsList.map((review) => (
            <div
              key={review.id}
              className="w-full sm:w-[300px] h-[480px] shrink-0 snap-start rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 group relative shadow-2xl flex flex-col justify-between"
            >
              {/* Full background athlete photo */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={review.image}
                  alt={review.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Double layer gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-transparent opacity-60" />
              </div>

              {/* Top Quote Title Overlay */}
              <div className="relative z-10 p-6">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-4 shadow-lg border border-red-500/20 group-hover:border-red-500/40 transition-colors">
                  <h3 className="text-sm font-black uppercase tracking-wider text-center line-clamp-2">
                    "{review.title}"
                  </h3>
                </div>
              </div>

              {/* Hover quote detail or standard display info */}
              <div className="relative z-10 p-6 flex flex-col justify-end w-full">
                {/* Expandable quote section on hover */}
                <p className="text-xs text-zinc-300 leading-relaxed font-medium mb-4 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-500 line-clamp-3">
                  {review.quote}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <h4 className="text-base font-black text-white group-hover:text-red-500 transition-colors">
                      {review.name}
                    </h4>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">
                      {review.role}
                    </p>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-white text-zinc-950 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all shadow-md">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
