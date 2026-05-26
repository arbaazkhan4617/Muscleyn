"use client";

import {
  ShieldCheck,
  Truck,
  CreditCard,
  Headphones,
} from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">

          <p className="text-red-500 font-semibold">
            WHY CHOOSE US
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Trusted By Fitness Enthusiasts
          </h2>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card 1 */}
          <div className="
            bg-white
            rounded-3xl
            p-8
            shadow-sm
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-300
          ">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-red-100
              flex
              items-center
              justify-center
              mb-6
            ">
              <ShieldCheck className="w-8 h-8 text-red-500" />
            </div>

            <h3 className="text-2xl font-bold mb-4">
              100% Authentic Products
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Only genuine supplements sourced from trusted manufacturers.
            </p>

          </div>

          {/* Card 2 */}
          <div className="
            bg-white
            rounded-3xl
            p-8
            shadow-sm
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-300
          ">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-red-100
              flex
              items-center
              justify-center
              mb-6
            ">
              <Truck className="w-8 h-8 text-red-500" />
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Fast Delivery
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Quick and secure shipping across India with live tracking.
            </p>

          </div>

          {/* Card 3 */}
          <div className="
            bg-white
            rounded-3xl
            p-8
            shadow-sm
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-300
          ">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-red-100
              flex
              items-center
              justify-center
              mb-6
            ">
              <CreditCard className="w-8 h-8 text-red-500" />
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Secure Payments
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Safe payment methods with encrypted transactions.
            </p>

          </div>

          {/* Card 4 */}
          <div className="
            bg-white
            rounded-3xl
            p-8
            shadow-sm
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-300
          ">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-red-100
              flex
              items-center
              justify-center
              mb-6
            ">
              <Headphones className="w-8 h-8 text-red-500" />
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Expert Support
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Dedicated support team to guide your fitness journey.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}