"use client";

import { useState } from "react";

const tabs = [
  "Description",
  "Benefits",
  "Ingredients",
  "Reviews",
];

export default function ProductTabs() {
  const [activeTab, setActiveTab] =
    useState("Description");

  return (
    <section className="mt-24">

      {/* Tabs */}
      <div className="
        flex
        flex-wrap
        gap-4
        border-b
        pb-4
      ">

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-6
              py-3
              rounded-full
              font-semibold
              transition-all
              duration-300

              ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }
            `}
          >
            {tab}
          </button>
        ))}

      </div>

      {/* Content */}
      <div className="
        mt-10
        text-gray-600
        leading-relaxed
        text-lg
      ">

        {activeTab === "Description" && (
          <div>

            <p>
              Premium whey protein formulated for muscle growth,
              recovery, and strength improvement.
            </p>

          </div>
        )}

        {activeTab === "Benefits" && (
          <ul className="space-y-4">

            <li>✔ Supports Lean Muscle Growth</li>

            <li>✔ Faster Recovery</li>

            <li>✔ Improves Strength & Endurance</li>

          </ul>
        )}

        {activeTab === "Ingredients" && (
          <div>

            <p>
              Whey Protein Isolate, Digestive Enzymes,
              Cocoa Powder, Natural Flavours.
            </p>

          </div>
        )}

        {activeTab === "Reviews" && (
          <div>

            <p>
              ⭐⭐⭐⭐⭐ Excellent product quality and results.
            </p>

          </div>
        )}

      </div>

    </section>
  );
}