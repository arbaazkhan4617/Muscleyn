"use client";

import { FormEvent, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Eye,
  EyeOff,
  Lock,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { login, register, googleLogin } from "@/services/authService";
import { GoogleLogin } from "@react-oauth/google";

type AuthMode = "login" | "register";

const initialForm = {
  name: "",
  mobileNumber: "",
  password: "",
};

const accessBenefits: Array<{
  icon: LucideIcon;
  label: string;
}> = [
  {
    icon: ShieldCheck,
    label: "JWT secured",
  },
  {
    icon: BadgeCheck,
    label: "Order tracking",
  },
  {
    icon: Lock,
    label: "Private checkout",
  },
];

function LoginContent() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";

  const isLogin = mode === "login";

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.mobileNumber || !form.password || (!isLogin && !form.name)) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        await login({
          mobileNumber: form.mobileNumber,
          password: form.password,
        });
        toast.success("Welcome back to Muscleyn");
      } else {
        await register({
          name: form.name,
          mobileNumber: form.mobileNumber,
          password: form.password,
        });
        toast.success("Your Muscleyn account is ready");
      }

      window.location.assign(returnUrl);
    } catch (error) {
      console.error(error);
      toast.error(
        isLogin
          ? "Login failed. Please check your mobile number and password."
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 text-white">
        <section className="relative isolate overflow-hidden px-4 py-16 md:py-24">
          <Image
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1800&auto=format&fit=crop"
            alt="Athlete training for Muscleyn login"
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover opacity-35"
          />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.38),transparent_32%),linear-gradient(90deg,#09090b_0%,rgba(9,9,11,0.9)_48%,rgba(9,9,11,0.55)_100%)]" />

          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-black uppercase tracking-[0.22em] text-red-200 backdrop-blur">
                <Sparkles className="h-4 w-4 text-red-500" />
                Member Access
              </div>
              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-none tracking-[-0.06em] md:text-7xl">
                Unlock your performance account
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-zinc-200">
                Sign in to save carts, manage addresses, track orders, and
                access member-only supplement drops.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {accessBenefits.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur"
                  >
                    <Icon className="h-7 w-7 text-red-500" />
                    <p className="mt-4 font-black">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-[2.5rem] border border-white/10 bg-white p-5 text-zinc-950 shadow-2xl shadow-black/40 md:p-8"
            >
              <div className="rounded-[2rem] bg-zinc-950 p-2">
                <div className="grid grid-cols-2 gap-2">
                  {(["login", "register"] as AuthMode[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setMode(item)}
                      className={`rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.16em] transition ${
                        mode === item
                          ? "bg-red-600 text-white"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-1 py-8 md:px-4">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-red-600">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
                  {isLogin ? "Login to continue" : "Join Muscleyn"}
                </h2>
                <p className="mt-3 leading-7 text-zinc-500">
                  {isLogin
                    ? "Use your registered mobile number and password."
                    : "Create your account to start a premium shopping journey."}
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  {!isLogin && (
                    <AuthField
                      icon={User}
                      label="Full name"
                      value={form.name}
                      onChange={(value) => updateField("name", value)}
                      placeholder="Your name"
                    />
                  )}

                  <AuthField
                    icon={Phone}
                    label="Mobile number"
                    value={form.mobileNumber}
                    onChange={(value) => updateField("mobileNumber", value)}
                    placeholder="9876543210"
                  />

                  <label className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                      Password
                    </span>
                    <div className="flex h-15 items-center rounded-full border border-zinc-200 bg-zinc-50 px-5 transition focus-within:border-red-500">
                      <Lock className="mr-3 h-5 w-5 text-zinc-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(event) =>
                          updateField("password", event.target.value)
                        }
                        placeholder="Enter password"
                        className="w-full bg-transparent font-semibold outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="text-zinc-400 transition hover:text-zinc-950"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-15 w-full items-center justify-center gap-3 rounded-full bg-zinc-950 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Please wait..."
                      : isLogin
                        ? "Login"
                        : "Create Account"}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </button>
                </form>

                <div className="mt-6 flex flex-col gap-3">
                  {/* GOOGLE LOGIN */}
                  <div className="flex justify-center">
                    <GoogleLogin
                      onSuccess={async (credentialResponse) => {
                        try {
                          if (!credentialResponse.credential) {
                            toast.error("Google login failed — no credential");
                            return;
                          }
                          await googleLogin(credentialResponse.credential);
                          toast.success("Signed in with Google!");
                          window.location.assign(returnUrl);
                        } catch (err) {
                          console.error(err);
                          toast.error("Google login failed. Please try again.");
                        }
                      }}
                      onError={() => toast.error("Google login was cancelled or failed")}
                      useOneTap
                      theme="filled_black"
                      shape="pill"
                      size="large"
                      text="continue_with"
                      width="360"
                    />
                  </div>
                </div>

                <p className="mt-8 text-center text-sm font-semibold text-zinc-500">
                  Need supplements first?{" "}
                  <Link href="/shop" className="text-red-600 hover:underline">
                    Explore products
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center"><div className="w-10 h-10 border-4 border-white/10 border-t-red-500 rounded-full animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}

function AuthField({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </span>
      <div className="flex h-15 items-center rounded-full border border-zinc-200 bg-zinc-50 px-5 transition focus-within:border-red-500">
        <Icon className="mr-3 h-5 w-5 text-zinc-400" />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent font-semibold outline-none"
        />
      </div>
    </label>
  );
}
