"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
  ArrowRight
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();

  // TOTAL
  const totalPrice = cartItems.reduce((total, item) => {
    const price = Number(String(item.price || "0").replace(/[^0-9.-]+/g, ""));
    return total + price * item.quantity;
  }, 0);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all duration-500 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-zinc-950 border-l border-white/10 z-50 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-zinc-900/50">
          <div>
            <p className="text-red-500 text-xs font-black uppercase tracking-widest mb-1">
              YOUR CART
            </p>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Shopping Cart
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black hover:border-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Empty */}
        {cartItems.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
              <ShoppingBag className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3 tracking-tight">
              Cart is Empty
            </h3>
            <p className="text-zinc-400 font-medium max-w-[250px] mx-auto leading-relaxed">
              Looks like you haven&apos;t added any premium supplements yet.
            </p>
            <button
              onClick={onClose}
              className="mt-8 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-red-500 hover:text-white transition-colors"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Items */}
        {cartItems.length > 0 && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-2xl bg-black border border-white/5 hover:border-white/10 transition-colors group"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                    <Image
                      src={item.image || "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2670&auto=format&fit=crop"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-white text-sm leading-snug line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-red-500 font-black mt-1">
                          {item.price}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-red-500 transition-colors shrink-0 p-1 bg-white/5 rounded-full hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-1 py-1">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors text-zinc-300"
                        >
                          <Minus className="w-3 h-3 font-black" />
                        </button>
                        <span className="font-black text-sm text-white w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors text-zinc-300"
                        >
                          <Plus className="w-3 h-3 font-black" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 bg-zinc-900/50 p-6">
              {/* Total */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                  Subtotal
                </span>
                <span className="text-3xl font-black text-white">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="w-full flex items-center justify-center border border-white/10 bg-white/5 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all"
                >
                  View Cart
                </Link>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full flex items-center justify-center bg-red-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                >
                  Checkout
                </Link>
              </div>
              <p className="text-center text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-4">
                Taxes & shipping calculated at checkout
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}