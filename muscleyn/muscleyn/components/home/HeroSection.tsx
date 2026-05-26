"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section
      className="
        relative
        h-[90vh]
        bg-cover
        bg-center
        flex
        items-center
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop')",
      }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-red-500 font-semibold mb-3"
        >
          INDIA'S TRUSTED FITNESS BRAND
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            text-5xl
            md:text-7xl
            font-extrabold
            leading-tight
            max-w-3xl
          "
        >
          BUILD YOUR PERFECT BODY
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mt-6 text-lg text-gray-200 max-w-xl"
        >
          Premium quality supplements for strength, muscle growth,
          endurance and performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="mt-8 flex gap-4 flex-wrap"
        >
          <Button>Shop Now</Button>

          <Button variant="secondary">
            Explore Products
          </Button>
        </motion.div>

      </div>

    </section>
  );
}