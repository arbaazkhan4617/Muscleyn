"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from "lucide-react";
import api from "@/services/api";

const blogPosts = [
  {
    id: 1,
    tag: "Nutrition & Foods",
    date: "November 28, 2024",
    author: "Dr. Manish Kumar, R.D.",
    readTime: "5 min read",
    title: "Top Foods for High-Protein Meals",
    summary: "Protein is described as the building block of a diet which makes it an essential element in a well-balanced diet. Discover the ultimate protein sources to fuel muscle hypertrophy and daily recovery.",
    content: "When it comes to building muscle, protein is the single most critical macronutrient. However, not all proteins are created equal. Biological value (BV) and amino acid profile dictate how effectively your body utilizes protein. To maximize hypertrophy, athletes should prioritize whole food sources rich in leucine and essential amino acids (EAAs).\n\nTop sources include chicken breast, egg whites, lean beef, wild-caught salmon, and Greek yogurt. Plant-based lifters can rely on organic tofu, tempeh, lentils, and premium pea-rice isolate blends. Incorporating these foods consistently into your meals provides a sustained release of amino acids, maintaining an anabolic state throughout the day.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    tag: "Whey Science",
    date: "November 27, 2024",
    author: "Prabha Research Lab",
    readTime: "7 min read",
    title: "Whey Protein Isolate: Benefits, Usage, and Myths Debunked",
    summary: "Whey Protein Isolate (WPI) has a higher protein concentration, usually over 90%. Learn the production science and how to maximize muscle protein synthesis.",
    content: "Whey Protein Isolate undergoes cross-flow microfiltration to strip out almost all fats, cholesterol, and lactose. What remains is a pure, rapidly absorbing protein source containing over 90% protein by weight. This makes WPI ideal for post-workout consumption, as it triggers a fast insulin response to kickstart recovery.\n\nA common myth is that isolate is only for cutting phases. In reality, isolate is beneficial for any phase because it digests easily and does not cause gastrointestinal distress, unlike low-grade concentrates. Consuming WPI within 30-45 minutes post-training guarantees optimal delivery of amino acids to damaged muscle fibers.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    tag: "Fitness Myths",
    date: "November 19, 2024",
    author: "Coach Kartik",
    readTime: "6 min read",
    title: "7 Common Whey Protein Myths Vs Realities",
    summary: "Protein is one of the essential macronutrients needed for overall health. We break down the top 7 myths surrounding whey consumption and clarify real scientific guidelines.",
    content: "Myth 1: Whey protein damages kidneys. Reality: In healthy individuals, high protein intake does not harm renal function.\nMyth 2: Whey makes women bulky. Reality: Bulking requires a significant caloric surplus and high testosterone levels. Whey simply supports recovery.\nMyth 3: Whey is loaded with steroids. Reality: Genuine supplements, like Prabha Pharma's Muscleyn, undergo rigid third-party testing and contain no illegal contaminants.\nMyth 4: You must consume whey immediately post-workout or lose gains. Reality: The anabolic window is wider than once thought, though post-workout protein is still optimal.\nMyth 5: Cooking whey destroys its protein quality. Reality: Heat denatures the shape of the proteins but does not affect the amino acid absorption.\nMyth 6: Whey causes severe acne. Reality: While dairy can impact skin in sensitive individuals, pure isolate has negligible lactose and fats.\nMyth 7: Supplements are only for bodybuilders. Reality: Anyone looking to meet daily protein goals can safely use clean whey supplements.",
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=800&auto=format&fit=crop",
  },
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/cms/blogs-list");
        if (res.data.data && res.data.data.cmsValue) {
          const parsed = JSON.parse(res.data.data.cmsValue);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBlogs(parsed);
            return;
          }
        }
      } catch (err) {
        console.log("No dynamic blogs configured in CMS", err);
      }
      setBlogs(blogPosts);
    };
    fetchBlogs();
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
            Our Blogs
          </h1>
          <p className="mt-4 text-zinc-400 text-sm md:text-base font-medium max-w-xl mx-auto">
            Science-backed articles, sports nutrition reports, and training insights curated by our medical and coaching panels.
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
              <h2 className="text-3xl md:text-4xl font-black text-white hover:text-red-500 transition-colors leading-tight mb-4">
                {post.title}
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-semibold">
                {post.summary}
              </p>

              {/* Full Content */}
              <div className="text-zinc-400 text-xs md:text-sm leading-relaxed whitespace-pre-line font-medium bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                {post.content}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
