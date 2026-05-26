import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Fitness Enthusiast",
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Excellent quality supplements. I noticed real strength and recovery improvements within weeks.",
  },
  {
    name: "Aman Verma",
    role: "Gym Trainer",
    image:
      "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "Premium products with authentic quality. Fast delivery and excellent customer support.",
  },
  {
    name: "Priya Singh",
    role: "Athlete",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "One of the best supplement brands I have used. Great taste and amazing results.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">

          <p className="text-red-500 font-semibold">
            CUSTOMER REVIEWS
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            What Our Customers Say
          </h2>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-sm
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >

              {/* Rating */}
              <div className="flex gap-1 mb-6">

                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              {/* Review */}
              <p className="
                text-gray-600
                leading-relaxed
                text-lg
                mb-8
              ">
                "{item.review}"
              </p>

              {/* User */}
              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-14
                    h-14
                    rounded-full
                    object-cover
                  "
                />

                <div>

                  <h4 className="font-bold text-lg">
                    {item.name}
                  </h4>

                  <p className="text-gray-500">
                    {item.role}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}