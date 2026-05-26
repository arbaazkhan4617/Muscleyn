"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart, Star } from "lucide-react";
import toast from "react-hot-toast";

import { CommerceProduct, formatPrice } from "@/lib/commerce";
import { useCartStore } from "@/store/cartStore";

type PremiumProductCardProps = {
  product: CommerceProduct;
  onQuickView?: (product: CommerceProduct) => void;
};

export default function PremiumProductCard({
  product,
  onQuickView,
}: PremiumProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: formatPrice(product.price),
      stock: product.stock,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <article className="group relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-zinc-900 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-red-500/50 hover:shadow-[0_30px_80px_rgba(220,38,38,0.15)]">
      <Link
        href={`/product/${product.id}`}
        className="absolute inset-0 z-10"
        aria-label={`Open ${product.name}`}
      />

      <div className="relative h-80 overflow-hidden bg-zinc-950">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover opacity-90 transition duration-700 group-hover:scale-110 group-hover:opacity-0"
        />
        {product.gallery?.[1] && (
          <Image
            src={product.gallery[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />

        <span className="absolute left-5 top-5 rounded-full bg-red-600 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white shadow-lg shadow-red-950/30">
          {product.discount}
        </span>

        <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white backdrop-blur-md">
          {product.goal}
        </span>

        <button
          type="button"
          onClick={handleQuickView}
          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white shadow-lg backdrop-blur transition hover:bg-red-600 hover:scale-110"
          aria-label={`Quick preview ${product.name}`}
        >
          <Eye className="h-5 w-5" />
        </button>
      </div>

      <div className="relative p-7">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-red-500">
            {product.category}
          </p>
          <div className="flex items-center gap-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 text-sm font-black text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            {product.rating}
          </div>
        </div>

        <h3 className="text-2xl font-black tracking-tight text-white transition group-hover:text-red-500">
          {product.name}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">
          {product.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-zinc-300">
            {product.brand}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-zinc-300">
            {product.nutrition.protein} protein
          </span>
        </div>

        <div className="mt-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-3xl font-black text-red-500">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm font-semibold text-zinc-500 line-through">
              {formatPrice(product.oldPrice)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className="relative z-20 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-900/50 transition hover:scale-110 hover:bg-white hover:text-zinc-950"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="absolute inset-x-8 bottom-0 h-1 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
    </article>
  );
}
