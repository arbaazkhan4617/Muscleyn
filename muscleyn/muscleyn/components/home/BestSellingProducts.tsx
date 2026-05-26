import { Star } from "lucide-react";

const products = [
  {
    name: "Whey Protein",
    image:
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1200&auto=format&fit=crop",
    price: "₹2,499",
    oldPrice: "₹3,499",
    rating: 5,
    discount: "30% OFF",
  },
  {
    name: "Mass Gainer",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    price: "₹3,299",
    oldPrice: "₹4,299",
    rating: 4,
    discount: "20% OFF",
  },
  {
    name: "Creatine",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    price: "₹1,499",
    oldPrice: "₹1,999",
    rating: 5,
    discount: "25% OFF",
  },
  {
    name: "Pre Workout",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",
    price: "₹1,999",
    oldPrice: "₹2,699",
    rating: 4,
    discount: "15% OFF",
  },
];

export default function BestSellingProducts() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">

          <p className="text-red-500 font-semibold">
            TOP PRODUCTS
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Best Selling Products
          </h2>

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-sm
                hover:shadow-2xl
                transition-all
                duration-300
                group
              "
            >

              {/* Image */}
              <div className="relative overflow-hidden">

                {/* Discount */}
                <div className="
                  absolute
                  top-4
                  left-4
                  bg-red-500
                  text-white
                  text-sm
                  font-semibold
                  px-4
                  py-2
                  rounded-full
                  z-10
                ">
                  {product.discount}
                </div>

                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    w-full
                    h-[320px]
                    object-cover
                    group-hover:scale-110
                    transition
                    duration-500
                  "
                />

              </div>

              {/* Content */}
              <div className="p-6">

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">

                  {[...Array(product.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}

                </div>

                {/* Name */}
                <h3 className="text-2xl font-bold mb-3">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">

                  <span className="text-2xl font-bold text-red-500">
                    {product.price}
                  </span>

                  <span className="text-gray-400 line-through">
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
                  Add To Cart
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}