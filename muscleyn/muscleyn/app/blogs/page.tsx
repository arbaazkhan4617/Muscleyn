"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from "lucide-react";
import api from "@/services/api";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [headerTitle, setHeaderTitle] = useState("Our Blogs");
  const [headerSubtitle, setHeaderSubtitle] = useState("Science-backed articles, sports nutrition reports, and training insights curated by our medical and coaching panels.");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get(`/cms/blogs-list?t=${Date.now()}`);
        if (res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBlogs(parsed);
            return;
          }
        }
        setBlogs([]);
      } catch (err) {
        console.log("No dynamic blogs configured in CMS", err);
        setBlogs([]);
      }
    };

    const fetchHeader = async () => {
      try {
        const res = await api.get(`/cms/blogs-page-header?t=${Date.now()}`);
        if (res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          if (parsed.title) setHeaderTitle(parsed.title);
          if (parsed.subtitle) setHeaderSubtitle(parsed.subtitle);
        }
      } catch (err) {
        console.log("No custom blogs header configured", err);
      }
    };

    fetchBlogs();
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
        <div className="flex flex-col gap-20">
          {blogs.map((post) => (
            <article
              key={post.id}
              className="border-b border-white/10 pb-16 last:border-0"
            >
              {/* Image banner */}
              <div className="relative h-[360px] w-full rounded-3xl overflow-hidden border border-white/10 mb-8 bg-zinc-900 shadow-2xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <span className="absolute left-6 bottom-6 bg-red-600 text-white text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full uppercase shadow-lg">
                  {post.tag}
                </span>
              </div>

              {/* Meta tags */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 font-bold uppercase tracking-wider mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {post.author}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              {/* Title & summary */}
              <Link href={`/blogs/${post.id}`}>
                <h2 className="text-3xl md:text-4xl font-black text-white hover:text-red-500 transition-colors leading-tight mb-4">
                  {post.title}
                </h2>
              </Link>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-semibold">
                {post.summary}
              </p>

              {/* Read Full Article Button */}
              <Link
                href={`/blogs/${post.id}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-xs font-black uppercase tracking-wider text-white transition hover:bg-white hover:text-zinc-950"
              >
                Read Full Article
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
