import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Outfit } from "next/font/google";

import "./globals.css";

import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Muscleyn | Premium Fitness Supplements",
    template: "%s | Muscleyn",
  },
  description:
    "Premium gym supplements, protein, creatine, pre workout, recovery stacks, and performance nutrition for serious athletes.",
  keywords: [
    "gym supplements",
    "whey protein",
    "creatine",
    "pre workout",
    "fitness nutrition",
    "Muscleyn",
  ],
  openGraph: {
    title: "Muscleyn | Premium Fitness Supplements",
    description:
      "A premium supplement store for muscle gain, fat loss, strength, and recovery.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-950 text-white font-sans selection:bg-red-600 selection:text-white">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
          <AuthProvider>{children}</AuthProvider>
        </GoogleOAuthProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "16px",
              padding: "16px",
              fontWeight: "600",
              background: "#18181b",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            },
          }}
        />
      </body>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </html>
  );
}