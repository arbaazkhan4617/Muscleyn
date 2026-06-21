"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Clock, Calendar, User, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import api from "@/services/api";

export default function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: blogIdStr } = use(params);
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/cms/blogs-list?t=${Date.now()}`);
        let allBlogs = [];
        if (res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          if (Array.isArray(parsed) && parsed.length > 0) {
            allBlogs = parsed;
          }
        }

        const targetId = Number(blogIdStr);
        const matchedBlog = allBlogs.find((b) => b.id === targetId);
        if (matchedBlog) {
          setBlog(matchedBlog);
          const others = allBlogs.filter((b) => b.id !== targetId).slice(0, 2);
          setRelatedBlogs(others);
        }
      } catch (err) {
        console.error("Failed to load blog details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (blogIdStr) {
      fetchBlogDetails();
    }
  }, [blogIdStr]);

  if (loading) {
    return (
      <main className="bg-zinc-950 text-white min-h-screen">
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
          <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Article...</div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="bg-zinc-950 text-white min-h-screen">
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-black text-white">Article Not Found</h2>
          <Link href="/blogs" className="text-red-500 font-bold hover:underline">Back to Blogs</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-zinc-950 text-white min-h-screen selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* Article Header Banner */}
      <section className="relative py-24 border-b border-white/5 bg-zinc-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.06),transparent_50%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-500 hover:text-white transition flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blogs
            </Link>
            <span className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-black text-red-500 tracking-wider uppercase flex-shrink-0">
              {blog.tag}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-500" />
              {blog.date}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-zinc-500" />
              {blog.author}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-500" />
              {blog.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body Content */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        {/* Featured Image / Slider */}
        <div className="relative h-[250px] md:h-[480px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 mb-12 bg-zinc-900 shadow-2xl group/slider">
          {[blog.image, ...(blog.images || [])].filter(Boolean).length > 1 ? (
            <>
              {/* Slider Track */}
              <div className="w-full h-full relative">
                {[blog.image, ...(blog.images || [])].filter(Boolean).map((slideUrl: string, idx: number) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                  >
                    <Image
                      src={slideUrl}
                      alt={`${blog.title} slide ${idx + 1}`}
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
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? [blog.image, ...(blog.images || [])].filter(Boolean).length - 1 : prev - 1))}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-red-600/90 text-white flex items-center justify-center border border-white/10 backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition duration-300 cursor-pointer shadow-lg"
                title="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev === [blog.image, ...(blog.images || [])].filter(Boolean).length - 1 ? 0 : prev + 1))}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-red-600/90 text-white flex items-center justify-center border border-white/10 backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition duration-300 cursor-pointer shadow-lg"
                title="Next Slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 bg-black/30 border border-white/5 px-4 py-2 rounded-full backdrop-blur-md">
                {[blog.image, ...(blog.images || [])].filter(Boolean).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition duration-300 cursor-pointer ${idx === currentSlide ? "bg-red-500 scale-110" : "bg-white/30 hover:bg-white/60"
                      }`}
                    title={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              sizes="100vw"
              className="object-cover opacity-90"
              priority
            />
          )}
        </div>

        {/* Summary Card */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 mb-12 shadow-inner">
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-bold italic">
            &ldquo;{blog.summary}&rdquo;
          </p>
        </div>

        {/* Main Content Body */}
        <div className="text-zinc-300 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium mb-20">
          {blog.content}
        </div>

        {/* Gallery is rendered inline in the top slider instead of a grid */}

        {/* Related Articles Divider */}
        {relatedBlogs.length > 0 && (
          <div className="border-t border-white/10 pt-16 mt-16">
            <h3 className="text-2xl font-black text-white flex items-center gap-2 mb-10">
              <BookOpen className="w-6 h-6 text-red-500" />
              Other Articles
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedBlogs.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.id}`}
                  className="group bg-zinc-900 border border-white/10 rounded-[2rem] overflow-hidden hover:border-red-500/30 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div className="relative h-48 w-full bg-zinc-950 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-black tracking-widest text-red-500 uppercase">{post.tag}</span>
                    <h4 className="text-lg font-black text-white mt-2 leading-snug group-hover:text-red-500 transition-colors line-clamp-2">{post.title}</h4>
                    <p className="text-xs text-zinc-400 mt-2 font-medium line-clamp-2">{post.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
