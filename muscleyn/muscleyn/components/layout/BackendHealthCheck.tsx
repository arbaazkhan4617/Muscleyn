"use client";

import { useEffect, useState, useCallback } from "react";
import { ServerCrash, RefreshCw, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/services/api";

interface BackendHealthCheckProps {
  children: React.ReactNode;
}

type HealthStatus = "checking" | "online" | "offline";

export default function BackendHealthCheck({ children }: BackendHealthCheckProps) {
  const [status, setStatus] = useState<HealthStatus>("checking");
  const [isRetrying, setIsRetrying] = useState(false);

  const checkHealth = useCallback(async () => {
    try {
      // Use /products endpoint with a short timeout to check if the server responds
      const response = await api.get("/products", {
        timeout: 3000,
        headers: {
          // Avoid browser caching for the health check
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      // If we get any response, the backend is up and running
      if (response.status === 200 || (response.data && response.data.status !== undefined)) {
        setStatus("online");
        return true;
      }

      setStatus("offline");
      return false;
    } catch (error) {
      console.warn("Backend connectivity check failed:", error);
      setStatus("offline");
      return false;
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  const handleRetry = async () => {
    setIsRetrying(true);
    // Add a small artificial delay so the user feels the check happening
    await new Promise((resolve) => setTimeout(resolve, 800));
    const isOnline = await checkHealth();
    setIsRetrying(false);
  };

  if (status === "checking") {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4 text-white">
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-red-500/10 animate-ping" />
          <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin" />
        </div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">
          Verifying System Status
        </div>
      </div>
    );
  }

  if (status === "offline") {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.12),transparent_60%)]" />
        <div className="pointer-events-none absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-zinc-900/30 rounded-full blur-[120px]" />

        <div className="relative z-10 w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-[2.5rem] border border-white/10 bg-zinc-900/60 p-8 md:p-12 text-center backdrop-blur-xl shadow-2xl"
          >
            {/* Glowing animated icon container */}
            <div className="mx-auto w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-8 relative group">
              <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl animate-pulse" />
              <ServerCrash className="h-10 w-10 text-red-500 relative z-10" />
            </div>

            <p className="text-xs font-black uppercase tracking-[0.24em] text-red-500">
              Connection Lost
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl text-white">
              System Offline
            </h1>

            <p className="mt-6 text-zinc-400 font-medium leading-relaxed text-base">
              The Muscleyn performance supplements store requires an active connection to our core database services to fetch inventory, display prices, and process checkouts securely.
            </p>

            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 text-left max-w-md mx-auto">
              <Activity className="h-5 w-5 text-red-400 shrink-0" />
              <p className="text-xs text-zinc-500 font-semibold leading-normal">
                Check that your backend service is running or verify the configurations.
              </p>
            </div>

            <div className="mt-10">
              <button
                type="button"
                disabled={isRetrying}
                onClick={handleRetry}
                className="group relative inline-flex h-14 items-center justify-center gap-3 rounded-full bg-red-600 px-8 text-sm font-black uppercase tracking-[0.15em] text-white transition-all hover:bg-white hover:text-zinc-950 hover:scale-105 disabled:opacity-50 disabled:hover:bg-red-600 disabled:hover:text-white shadow-[0_0_30px_rgba(220,38,38,0.3)]"
              >
                <RefreshCw className={`h-4 w-4 ${isRetrying ? "animate-spin" : "group-hover:rotate-45 transition-transform duration-350"}`} />
                {isRetrying ? "Retrying Connection..." : "Retry Connection"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
