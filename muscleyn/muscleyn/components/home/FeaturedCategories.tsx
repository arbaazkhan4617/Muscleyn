import { motion } from "framer-motion";
import { getBackendImageUrl } from "@/lib/commerce";

const categories = [
  {
    title: "Whey Protein",
    image: "",
  },
  {
    title: "Mass Gainer",
    image: "",
  },
  {
    title: "Creatine",
    image: "",
  },
  {
    title: "Pre Workout",
    image: "",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">

          <p className="text-red-500 font-semibold">
            SHOP BY CATEGORY
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Featured Categories
          </h2>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {categories.map((item, index) => (
            <div
              key={index}
              className="
                relative
                overflow-hidden
                rounded-3xl
                group
                cursor-pointer
                h-[400px]
              "
            >

              {/* Image */}
              <img
                src={getBackendImageUrl(item.image)}
                alt={item.title}
                className="
                  w-full
                  h-full
                  object-cover
                  transition
                  duration-500
                  group-hover:scale-110
                "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="absolute bottom-8 left-8 text-white">

                <h3 className="text-3xl font-bold">
                  {item.title}
                </h3>

                <button className="mt-4 underline text-lg">
                  Shop Now
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}