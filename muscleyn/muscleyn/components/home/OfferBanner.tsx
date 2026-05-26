export default function OfferBanner() {
  return (
    <section
      className="
        relative
        h-[500px]
        bg-cover
        bg-center
        flex
        items-center
        justify-center
        overflow-hidden
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop')",
      }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="
        relative
        z-10
        text-center
        text-white
        px-4
        max-w-4xl
      ">

        <p className="text-red-500 font-semibold text-lg mb-4">
          LIMITED TIME OFFER
        </p>

        <h2 className="
          text-4xl
          md:text-6xl
          font-extrabold
          leading-tight
        ">
          GET UP TO 40% OFF
          <br />
          ON PREMIUM SUPPLEMENTS
        </h2>

        <p className="
          mt-6
          text-lg
          text-gray-300
          max-w-2xl
          mx-auto
        ">
          Boost your fitness journey with high-quality supplements
          trusted by athletes and fitness enthusiasts.
        </p>

        {/* Button */}
        <button className="
          mt-10
          bg-red-500
          hover:bg-red-600
          text-white
          px-10
          py-4
          rounded-full
          font-semibold
          text-lg
          transition-all
          duration-300
          hover:scale-105
        ">
          Shop Now
        </button>

      </div>

    </section>
  );
}