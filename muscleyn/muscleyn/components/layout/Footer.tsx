import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(220,38,38,0.05),transparent_50%)] pointer-events-none" />

      {/* Newsletter */}
      <section className="border-t border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm mb-4">
            Newsletter
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Subscribe For Drops
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-10 text-lg">
            Get the latest supplement offers, fitness tips, and exclusive early access discounts directly in your inbox.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border border-white/10 bg-white/5 text-white placeholder-zinc-500 outline-none focus:border-red-500 focus:bg-white/10 transition-all"
              required
            />
            <button type="submit" className="bg-red-600 hover:bg-white hover:text-zinc-950 px-8 py-4 rounded-full font-black uppercase tracking-[0.1em] text-sm transition-all duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer Main */}
      <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand - Span 4 */}
          <div className="lg:col-span-4">
            <h3 className="text-3xl font-black mb-6 tracking-tight">
              MUSCLEYN
            </h3>
            <p className="text-zinc-400 leading-relaxed mb-8 max-w-sm">
              Premium quality supplements designed to help you achieve your fitness goals faster and smarter. No compromise on ingredients or taste.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Quick Links - Span 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-400">
              {["Home", "Shop", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="hover:text-red-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories - Span 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold mb-6">Categories</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-400">
              {["Whey Protein", "Mass Gainer", "Creatine", "Pre Workout"].map((item) => (
                <li key={item}>
                  <Link href="/shop" className="hover:text-red-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Span 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-zinc-400 leading-relaxed">
              <li>support@muscleyn.com</li>
              <li>+91 9876543210</li>
              <li>Mumbai, India</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section className="border-t border-white/10 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} MUSCLEYN. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          </div>
        </div>
      </section>
    </footer>
  );
}