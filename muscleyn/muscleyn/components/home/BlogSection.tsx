import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import api from "@/services/api";

const defaultBlogs = [
  {
    id: 1,
    tag: "TOP 10 FOODS",
    tagSub: "For High-Protein Meals",
    date: "NOVEMBER 28, 2024",
    title: "Top Foods for High-Protein Meals",
    summary: "Protein is described as the building block of a diet which makes it an essential element in a well-balanced diet. Discover the ultimate protein sources to fuel muscle hypertrophy.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop",
    link: "/blogs",
  },
  {
    id: 2,
    tag: "WHEY PROTEIN ISOLATE",
    tagSub: "Benefits, Usage & Myths Debunked",
    date: "NOVEMBER 27, 2024",
    title: "Whey Protein Isolate: Benefits, Usage, and Myths Debunked",
    summary: "Whey Protein Isolate (WPI) has a higher protein concentration, usually over 90%. Learn the production science and how to maximize muscle protein synthesis.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop",
    link: "/blogs",
  },
  {
    id: 3,
    tag: "7 COMMON WHEY PROTEIN",
    tagSub: "Myths Vs Realities",
    date: "NOVEMBER 19, 2024",
    title: "7 Common Whey Protein Myths Vs Realities",
    summary: "Protein is one of the essential macronutrients needed for overall health and well-being. We break down the top 7 myths surrounding whey consumption.",
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop",
    link: "/blogs",
  },
];

export default function BlogSection() {
  const [blogsList, setBlogsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/cms/blogs-list");
        if (res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBlogsList(parsed);
            return;
          }
        }
      } catch (err) {
        console.log("No dynamic blogs configured in CMS", err);
      }
      setBlogsList(defaultBlogs);
    };
    fetchBlogs();
  }, []);
  return (
    <section className="py-24 bg-zinc-950 border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(220,38,38,0.04),transparent_40%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-red-500 mb-3">
              <BookOpen className="w-4 h-4 text-red-500" />
              Latest Insights
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Blogs
            </h2>
          </div>
        </div>

        {/* Blogs Row/Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {blogsList.map((blog) => (
            <article
              key={blog.id}
              className="group bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col justify-between hover:border-red-500/30 transition-all duration-300 shadow-2xl h-full"
            >
              {/* Blog Top Card Layout - Left info, right image split */}
              <div className="flex border-b border-white/5 min-h-[160px] relative">
                {/* Left Side Tag Details */}
                <div className="w-7/12 p-6 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-zinc-400 mb-2 block tracking-wider uppercase">
                    {blog.date}
                  </span>
                  
                  {/* Decorative Banner/Tag */}
                  <div className="bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-xl inline-block max-w-fit">
                    <span className="block text-[10px] font-black text-red-500 tracking-wide">
                      {blog.tag}
                    </span>
                    <span className="block text-[8px] font-bold text-zinc-400 tracking-wider">
                      {blog.tagSub}
                    </span>
                  </div>
                </div>

                {/* Right Side Image */}
                <div className="w-5/12 relative overflow-hidden bg-zinc-950">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 30vw, 15vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  {/* Diagonal Gradient Separator overlay */}
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-zinc-900 to-transparent" />
                </div>
              </div>

              {/* Bottom content area */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-white leading-snug group-hover:text-red-500 transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="mt-3 text-xs text-zinc-400 font-medium leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                  <Link
                    href={blog.link}
                    className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-red-500 hover:text-white transition-colors cursor-pointer group/btn"
                  >
                    Read More
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
