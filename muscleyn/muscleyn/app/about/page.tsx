import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  FlaskConical,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const stats = [
  ["50K+", "Athletes served"],
  ["120+", "Quality checks"],
  ["4.8/5", "Average rating"],
  ["24hr", "Dispatch goal"],
];

const valueCards: Array<{
  icon: LucideIcon;
  title: string;
  copy: string;
}> = [
  {
    icon: ShieldCheck,
    title: "Mission",
    copy: "Help athletes choose effective nutrition with clarity, confidence, and premium service.",
  },
  {
    icon: Trophy,
    title: "Vision",
    copy: "Become a scalable Indian fitness commerce brand known for trust, speed, and design.",
  },
  {
    icon: FlaskConical,
    title: "Quality",
    copy: "Build transparent product journeys around ingredients, nutrition data, and reviews.",
  },
];

const trustCards: Array<{
  icon: LucideIcon;
  title: string;
}> = [
  {
    icon: BadgeCheck,
    title: "Authenticity-first catalog",
  },
  {
    icon: Award,
    title: "Certification-ready product data",
  },
  {
    icon: Users,
    title: "Customer-first support flows",
  },
  {
    icon: ShieldCheck,
    title: "Secure JWT commerce architecture",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-zinc-950 text-white">
        <section className="relative isolate overflow-hidden py-24 md:py-32">
          <Image
            src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1800&auto=format&fit=crop"
            alt="Athlete training in gym"
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover opacity-40"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-red-950/30" />
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-red-400">
              About Muscleyn
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-none tracking-[-0.06em] md:text-7xl">
              Premium nutrition for people who train with intent
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
              Muscleyn is built as a modern fitness supplement brand: bold in
              design, transparent in quality, and focused on helping athletes
              make consistent progress.
            </p>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.04] py-8">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-3xl bg-white/[0.06] p-6">
                <p className="text-4xl font-black text-red-500">{value}</p>
                <p className="mt-2 font-semibold text-zinc-300">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-24 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-red-400">
              Brand Story
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Supplements should feel as premium as the discipline behind them
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-zinc-300">
            <p>
              We design the Muscleyn experience around serious gym culture,
              clean buying journeys, and clear product information. Every page
              is structured for scale: products, banners, categories, orders,
              coupons, and customer trust blocks can grow into a full admin-led
              commerce platform.
            </p>
            <p>
              The goal is simple: make high-quality supplementation easier to
              understand, easier to buy, and easier to trust.
            </p>
          </div>
        </section>

        <section className="bg-white py-24 text-zinc-950">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 md:grid-cols-3">
              {valueCards.map(({ icon: Icon, title, copy }) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-8"
                >
                  <Icon className="h-10 w-10 text-red-600" />
                  <h3 className="mt-6 text-3xl font-black">{title}</h3>
                  <p className="mt-4 leading-7 text-zinc-600">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-24">
          <div className="mb-14 text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-red-400">
              Why Customers Trust Us
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Built like a premium fitness brand
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trustCards.map(({ icon: Icon, title }) => (
              <div
                key={title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7"
              >
                <Icon className="h-9 w-9 text-red-500" />
                <h3 className="mt-6 text-2xl font-black">{title}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-zinc-900 py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-3">
            {["Founder", "Nutrition Lead", "Performance Coach"].map((role) => (
              <div
                key={role}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06]"
              >
                <div className="relative h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop"
                    alt={role}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-7">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-red-400">
                    Leadership
                  </p>
                  <h3 className="mt-3 text-2xl font-black">{role}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-24">
          <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-red-600 p-10 text-center md:p-16">
            <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Ready to build your stack?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-red-50">
              Explore supplements by goal, compare nutrition, and move from
              browsing to checkout with a premium shopping flow.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white"
            >
              Shop Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
