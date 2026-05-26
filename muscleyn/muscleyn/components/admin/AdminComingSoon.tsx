import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";

type AdminComingSoonProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
};

export default function AdminComingSoon({
  eyebrow,
  title,
  description,
  icon: Icon,
  highlights,
}: AdminComingSoonProps) {
  return (
    <div>
      <div className="mb-10">
        <p className="text-xs font-black uppercase tracking-[0.32em] text-red-600">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-500">
          {description}
        </p>
      </div>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="bg-white rounded-3xl p-10 text-black">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-950 text-white shadow-2xl shadow-zinc-950/25">
            <Icon className="h-10 w-10" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-red-600">
            <Sparkles className="h-4 w-4" />
            Coming Soon
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-zinc-950">
            Pitch-ready module shell
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-zinc-500">
            This keeps the admin navigation complete while the backend workflows
            are connected. The screen is intentionally polished so every sidebar
            item still feels designed during demos.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 text-black">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-black tracking-tight text-zinc-950">
              Planned Experience
            </h3>
            <ArrowUpRight className="h-6 w-6 text-red-600" />
          </div>

          <div className="space-y-4">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-white/70 p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
                <p className="font-semibold text-zinc-700">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
