import Link from "next/link";

import { Star } from "lucide-react";

type RelatedProduct = {
  id: number;
  name: string;
  image: string;
  price?: string | number;
  oldPrice?: string | number;
  discount?: string;
};

const defaultProducts: RelatedProduct[] = [
  {
    id: 1,
    name: "Mass Gainer",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    price: "₹3,299",
    oldPrice: "₹4,299",
    discount: "20% OFF",
  },

  {
    id: 2,
    name: "Creatine",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    price: "₹1,499",
    oldPrice: "₹1,999",
    discount: "25% OFF",
  },

  {
    id: 3,
    name: "Pre Workout",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",
    price: "₹1,999",
    oldPrice: "₹2,699",
    discount: "15% OFF",
  },

  {
    id: 4,
    name: "BCAA",
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1200&auto=format&fit=crop",
    price: "₹1,299",
    oldPrice: "₹1,799",
    discount: "10% OFF",
  },
];

export default function RelatedProducts({
  products = defaultProducts,
}: {
  products?: RelatedProduct[];
}) {
  return (
    <section className="mt-28">

      {/* Heading */}
      <div className="
        flex
        items-center
        justify-between
        mb-14
      ">

        <div>

          <p className="
            text-red-500
            font-semibold
            mb-3
          ">
            RELATED PRODUCTS
          </p>

          <h2 className="
            text-4xl
            md:text-5xl
            font-extrabold
          ">
            You May Also Like
          </h2>

        </div>

      </div>

      {/* Grid */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-8
      ">

        {products.map((product) => (

          <Link
            key={product.id}
            href={`/product/${product.id}`}
          >

            <div className="
              bg-white
              rounded-[30px]
              overflow-hidden
              shadow-sm
              hover:shadow-2xl
              transition-all
              duration-500
              group
              hover:-translate-y-3
              border
              border-transparent
              hover:border-red-100
            ">

              {/* IMAGE */}
              <div className="
                relative
                overflow-hidden
              ">

                {/* Discount */}
                <div className="
                  absolute
                  top-5
                  left-5
                  bg-red-500
                  text-white
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  z-10
                ">
                  {product.discount}
                </div>

                {/* Overlay */}
                <div className="
                  absolute
                  inset-0
                  bg-black/0
                  group-hover:bg-black/10
                  transition-all
                  duration-500
                  z-10
                " />

                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    w-full
                    h-[340px]
                    object-cover
                    group-hover:scale-110
                    transition-all
                    duration-700
                  "
                />

              </div>

              {/* CONTENT */}
              <div className="p-7">

                {/* Rating */}
                <div className="
                  flex
                  gap-1
                  mb-4
                ">

                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="
                        w-4
                        h-4
                        fill-yellow-400
                        text-yellow-400
                      "
                    />
                  ))}

                </div>

                {/* Title */}
                <h3 className="
                  text-2xl
                  font-bold
                  leading-snug
                  mb-4
                  group-hover:text-red-500
                  transition-all
                ">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="
                  flex
                  items-center
                  gap-3
                  mb-7
                ">

                  <span className="
                    text-2xl
                    font-bold
                    text-red-500
                  ">
                    {product.price}
                  </span>

                  <span className="
                    text-gray-400
                    line-through
                  ">
                    {product.oldPrice}
                  </span>

                </div>

                {/* Button */}
                <button className="
                  w-full
                  bg-black
                  hover:bg-red-500
                  text-white
                  py-4
                  rounded-full
                  font-semibold
                  transition-all
                  duration-300
                ">
                  View Product
                </button>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}