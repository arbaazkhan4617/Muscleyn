"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // CHECK LOGIN
  useEffect(() => {
    // LOGIN PAGE
    if (pathname === "/admin/login") {
      queueMicrotask(() => setLoading(false));
      return;
    }

    const token = localStorage.getItem("adminToken");

    // NOT LOGGED IN
    if (!token) {
      router.push("/admin/login");
      return;
    }

    queueMicrotask(() => setLoading(false));
  }, [pathname, router]);

  // LOADING
  if (loading) {
    return (
      <div className="admin-loading min-h-screen flex flex-col items-center justify-center gap-5 text-white bg-zinc-950">
        <div className="h-16 w-16 rounded-full border-4 border-white/10 border-t-red-500 animate-spin" />
        <div className="text-xl font-bold uppercase tracking-widest text-zinc-500">
          Initializing Command Center...
        </div>
      </div>
    );
  }

  // LOGIN PAGE
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="admin-shell flex min-h-screen text-white bg-zinc-950">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <div className="flex-1 min-w-0 flex flex-col lg:pl-[280px]">
        <header className="mx-4 mt-4 lg:mx-8 lg:mt-8 rounded-[2rem] border border-white/10 bg-zinc-900/50 px-6 py-5 shadow-2xl backdrop-blur-xl z-10 sticky top-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-red-500">
                Muscleyn HQ
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-white">
                Admin Command Center
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-red-500 border border-red-500/20 shadow-[0_0_15px_rgba(220,38,38,0.2)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Elite Supplements
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-black border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                Next Gen Store
              </span>
            </div>
          </div>
        </header>

        <main className="admin-main p-4 lg:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}