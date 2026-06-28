"use client";

import { use, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingCart,
  Zap,
  ArrowRight,
  ShieldCheck,
  Package,
  Activity,
  CheckCircle2,
  Upload,
  Trash2,
  Film,
  Award,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PremiumProductCard from "@/components/product/PremiumProductCard";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, CommerceProduct, mapBackendProductToCommerce, getBackendImageUrl } from "@/lib/commerce";
import api from "@/services/api";

const getVariantSize = (variant: any): string => {
  if (variant?.size) return variant.size;
  if (variant?.weight) return variant.weight;
  if (variant?.variantName && variant.variantName !== "Default") return variant.variantName;
  return "Standard Size";
};

const getVariantFlavor = (variant: any): string => {
  if (variant?.flavor) return variant.flavor;
  return "Standard Flavor";
};

const isVariantActive = (variant: any): boolean =>
  variant?.isActive !== false;

const variantHasOptions = (variant: any): boolean => true;

const findMatchingVariant = (
  variants: any[],
  size: string,
  flavor: string
) =>
  variants.find((variant) => {
    const variantSize = getVariantSize(variant);
    const variantFlavor = getVariantFlavor(variant);
    const sizeMatch = !size || variantSize === size;
    const flavorMatch = !flavor || variantFlavor === flavor;
    return sizeMatch && flavorMatch;
  });

const resolveCurrentVariant = (
  variants: any[] | undefined,
  size: string,
  flavor: string
) => {
  if (!variants?.length) return undefined;

  const active = variants.filter(isVariantActive);
  if (!active.length) return variants[0];

  const configured = active.filter(variantHasOptions);
  const pool = configured.length ? configured : active;

  if (size || flavor) {
    const exact = findMatchingVariant(pool, size, flavor);
    if (exact) return exact;

    if (size) {
      const sizeMatch = pool.find((v) => getVariantSize(v) === size);
      if (sizeMatch) return sizeMatch;
    }
    if (flavor) {
      const flavorMatch = pool.find((v) => getVariantFlavor(v) === flavor);
      if (flavorMatch) return flavorMatch;
    }
  }

  return pool[0] || active[0];
};

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const { isLoggedIn, user } = useAuth();

  const { id } = use(params);

  const [product, setProduct] = useState<CommerceProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<CommerceProduct[]>([]);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  
  const imageRef = useRef<HTMLDivElement>(null);
  const hasInitializedQuantity = useRef(false);

  // VARIANT STATES
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  
  // STICKY BAR STATES
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isStickyClosed, setIsStickyClosed] = useState(false);
  
  // DETAIL TABS STATES
  const [leftActiveTab, setLeftActiveTab] = useState<"product_content" | "manufacturer">("product_content");
  const [isDescExpanded, setIsDescExpanded] = useState(true);

  // COMPUTED VARIABLES FOR VARIANTS
  const activeVariants = product?.variants?.filter(isVariantActive) || [];
  const filterVariants = activeVariants.filter(variantHasOptions).length
    ? activeVariants.filter(variantHasOptions)
    : activeVariants;
  const uniqueSizes = Array.from(
    new Set(filterVariants.map(getVariantSize).filter(Boolean))
  ) as string[];
  const uniqueFlavors = Array.from(
    new Set(filterVariants.map(getVariantFlavor).filter(Boolean))
  ) as string[];

  const currentVariant = resolveCurrentVariant(
    product?.variants,
    selectedSize,
    selectedFlavor
  );

  const maxStock = currentVariant ? Number(currentVariant.stock) : (product?.stock || 0);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    const hasFlavor = activeVariants.some(
      (v: any) => getVariantSize(v) === size && getVariantFlavor(v) === selectedFlavor
    );
    if (!hasFlavor) {
      const match = activeVariants.find((v: any) => getVariantSize(v) === size);
      if (match) {
        setSelectedFlavor(getVariantFlavor(match));
      }
    }
  };

  const handleFlavorSelect = (flavor: string) => {
    setSelectedFlavor(flavor);
    const hasSize = activeVariants.some(
      (v: any) => getVariantFlavor(v) === flavor && getVariantSize(v) === selectedSize
    );
    if (!hasSize) {
      const match = activeVariants.find((v: any) => getVariantFlavor(v) === flavor);
      if (match) {
        setSelectedSize(getVariantSize(match));
      }
    }
  };

  // Clamp quantity when variant changes
  useEffect(() => {
    if (product) {
      const currentMax = currentVariant ? Number(currentVariant.stock) : product.stock;
      if (quantity > currentMax) {
        setQuantity(Math.max(1, currentMax));
      }
    }
  }, [currentVariant, product, quantity]);

  // INITIALIZE VARIANT SELECTORS FROM A REAL VARIANT COMBINATION
  useEffect(() => {
    if (!product?.variants?.length) return;

    const active = product.variants.filter(isVariantActive);
    const configured = active.filter(variantHasOptions);
    const initial = configured[0] || active[0];
    if (!initial) return;

    setSelectedSize(getVariantSize(initial));
    setSelectedFlavor(getVariantFlavor(initial));
  }, [product]);

  // UPDATE ACTIVE IMAGE ON VARIANT CHANGE
  useEffect(() => {
    if (currentVariant?.imageUrl) {
      setActiveImage(getBackendImageUrl(currentVariant.imageUrl));
    }
  }, [currentVariant]);

  // STICKY BAR SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      const mainAddToCart = document.getElementById("main-add-to-cart-box");
      if (mainAddToCart) {
        const rect = mainAddToCart.getBoundingClientRect();
        // Show sticky bar if the main pricing box is out of view
        setShowStickyBar(rect.bottom < 0 && !isStickyClosed);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isStickyClosed]);

  // REVIEWS STATE
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState<number>(4.8);
  const [reviewsCount, setReviewsCount] = useState<number>(0);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // FORM REVIEWS STATE
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [formMediaUrls, setFormMediaUrls] = useState<string[]>([]);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);
      const res = await api.get(`/reviews/${id}`);
      if (res.data && res.data.status) {
        setReviewsList(res.data.data || []);
        setReviewsCount(res.data.data?.length || 0);
      }
      
      const avgRes = await api.get(`/reviews/average/${id}`);
      if (avgRes.data && avgRes.data.status && avgRes.data.data !== null && avgRes.data.data > 0) {
        setAverageRating(Number(avgRes.data.data.toFixed(1)) || 4.8);
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        if (response.data && response.data.status && response.data.data) {
          const mapped = mapBackendProductToCommerce(response.data.data);
          setProduct(mapped);
          setActiveImage(mapped.image);
        } else {
          throw new Error("Invalid product data");
        }
      } catch (err) {
        console.error("Could not load product from backend:", err);
      }
    };
    
    if (id) {
      fetchProduct();
      fetchReviews();
    }
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!product) return;
      try {
        const response = await api.get("/products");
        if (response.data && response.data.status) {
          const items = response.data.data.content || response.data.data || [];
          const mapped = items.map(mapBackendProductToCommerce);
          const filtered = mapped.filter((p: any) => p.category === product.category && p.id !== product.id).slice(0, 3);
          setRelatedProducts(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch related products:", err);
      }
    };
    fetchRelated();
  }, [product]);

  useEffect(() => {
    if (product && !hasInitializedQuantity.current && cartItems.length >= 0) {
      const existingItem = cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        setQuantity(existingItem.quantity);
      }
      hasInitializedQuantity.current = true;
    }
  }, [product, cartItems]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const variantId = currentVariant?.id || (product as any).variantId;
    const priceVal = currentVariant?.price ? Number(currentVariant.price) : product.price;
    const stockVal = currentVariant?.stock ? Number(currentVariant.stock) : product.stock;
    const nameVal = currentVariant && currentVariant.variantName && currentVariant.variantName !== "Default"
      ? `${product.name} - ${currentVariant.variantName}`
      : product.name;
    const imgVal = currentVariant?.imageUrl ? getBackendImageUrl(currentVariant.imageUrl) : product.image;

    const finalQuantity = Math.min(quantity, stockVal);

    if (finalQuantity <= 0) {
      toast.error("This option is currently out of stock.");
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id && item.variantId === variantId);

    if (existingItem) {
      updateQuantity(product.id, finalQuantity);
      toast.success(`${nameVal} quantity in cart updated to ${finalQuantity}`);
    } else {
      addToCart({
        id: product.id,
        variantId,
        name: nameVal,
        image: imgVal,
        price: formatPrice(priceVal),
        stock: stockVal,
      }, finalQuantity);
      toast.success(`${finalQuantity} ${nameVal} added to cart`);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  // UPLOAD MEDIA ATTACHMENT
  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploadingMedia(true);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await api.post("/files/upload-product-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.status && res.data.data.imageUrl) {
          setFormMediaUrls((prev) => [...prev, res.data.data.imageUrl]);
        }
      }
      toast.success("Media attached successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload review media");
    } finally {
      setUploadingMedia(false);
    }
  };

  // SUBMIT REVIEW
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      toast.error("Please add a comment");
      return;
    }

    try {
      setSubmittingReview(true);
      const payload = {
        userId: user?.id,
        productId: product?.id,
        rating: formRating,
        reviewText: reviewText.trim(),
        mediaUrls: formMediaUrls.join(","),
      };

      await api.post("/reviews", payload);
      toast.success("Review posted successfully!");
      setReviewText("");
      setFormRating(5);
      setFormMediaUrls([]);
      fetchReviews();
    } catch (err: any) {
      console.error(err);
      const errMsg = err.response?.data?.message || "Failed to submit review. You must have purchased this product first.";
      toast.error(errMsg);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-3xl font-bold text-white">
        Loading Premium Details...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-zinc-950 min-h-screen text-white pb-32">
        {/* BREADCRUMB */}
        <div className="border-b border-white/10 bg-zinc-900/50 backdrop-blur-md sticky top-[72px] z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition">Shop</Link>
            <span>/</span>
            <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-white transition">{product.category}</Link>
            <span>/</span>
            <span className="text-red-500">{product.name}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24">
            
            {/* LEFT: GALLERY */}
            <div className="flex flex-col gap-6">
              <div 
                ref={imageRef}
                className="relative aspect-square w-full rounded-[2.5rem] bg-black overflow-hidden border border-white/10 cursor-zoom-in group shadow-2xl"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
                  priority
                />
                
                {/* Zoomed Image */}
                <div 
                  className={`absolute inset-0 z-10 transition-opacity duration-300 ${isZoomed ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    backgroundImage: `url("${activeImage}")`,
                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                    backgroundSize: '200%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />

                <span className="absolute left-6 top-6 z-20 rounded-full bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white shadow-lg">
                  {product.discount}
                </span>
                
                <button className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 border border-white/20 backdrop-blur-md text-white transition hover:bg-red-600">
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              {/* THUMBNAILS */}
              <div className="grid grid-cols-4 gap-4">
                {(product.gallery && product.gallery.length > 0 ? product.gallery : [product.image]).slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.3)] scale-95' : 'border-transparent bg-white/5 hover:border-white/20'}`}
                  >
                    <Image src={img} alt={`View ${i+1}`} fill className="object-cover opacity-80 hover:opacity-100 transition" />
                  </button>
                ))}
              </div>

              {/* LEFT ACCORDIONS & DETAILS */}
              <div className="mt-12 border-t border-white/10 pt-8">
                <div className="flex items-center gap-8 border-b border-white/10 pb-4 mb-8">
                  <button
                    type="button"
                    onClick={() => setLeftActiveTab("product_content")}
                    className={`text-sm font-black uppercase tracking-widest pb-4 relative transition-colors ${
                      leftActiveTab === "product_content" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Product Content
                    {leftActiveTab === "product_content" && (
                      <motion.div layoutId="left-tab-indicator" className="absolute bottom-[-17px] left-0 right-0 h-1 bg-red-500 rounded-full" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeftActiveTab("manufacturer")}
                    className={`text-sm font-black uppercase tracking-widest pb-4 relative transition-colors ${
                      leftActiveTab === "manufacturer" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Manufacturer
                    {leftActiveTab === "manufacturer" && (
                      <motion.div layoutId="left-tab-indicator" className="absolute bottom-[-17px] left-0 right-0 h-1 bg-red-500 rounded-full" />
                    )}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {leftActiveTab === "product_content" ? (
                    <motion.div
                      key="product_content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* Description Accordion Header */}
                      <div
                        onClick={() => setIsDescExpanded(!isDescExpanded)}
                        className="bg-[#c80a0a] text-white px-6 py-4 rounded-xl font-black uppercase text-xs flex justify-between items-center cursor-pointer select-none shadow-lg tracking-wider"
                      >
                        <span>Description</span>
                        {isDescExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>

                      {isDescExpanded && (
                        <div className="border border-white/10 p-8 bg-zinc-900/10 rounded-2xl space-y-10 animate-fade-in">
                          {/* Main Header / Title */}
                          <div>
                            <h3 className="text-3xl font-black text-white">{product.name}</h3>
                            {product.richDetails?.subTitle && (
                              <p className="text-zinc-400 font-bold text-xs uppercase tracking-widest mt-1.5">
                                {product.richDetails.subTitle}
                              </p>
                            )}
                            <p className="text-zinc-300 text-sm leading-relaxed mt-6">
                              {product.description}
                            </p>
                          </div>

                          {/* The Impact Advantage */}
                          {(product.richDetails?.advantage || product.richDetails?.isRichDetails) && (
                            <div className="border-t border-white/5 pt-8 space-y-4">
                              <h4 className="text-xl font-black text-white">The {product.name.split(" ")[0] || "Product"} Advantage</h4>
                              {product.richDetails?.advantage?.subheading && (
                                <p className="text-zinc-400 text-sm italic font-medium leading-relaxed mb-4">
                                  {product.richDetails.advantage.subheading}
                                </p>
                              )}
                              {product.richDetails?.advantage?.points && product.richDetails.advantage.points.length > 0 && (
                                <ul className="space-y-3 text-sm text-zinc-300">
                                  {product.richDetails.advantage.points.map((pt: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2.5">
                                      <span className="text-red-500 mt-2 shrink-0 block w-1.5 h-1.5 rounded-full bg-red-500" />
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {product.richDetails?.advantage?.tagline && (
                                <p className="text-red-500 font-black text-sm uppercase tracking-wide pt-4">
                                  {product.richDetails.advantage.tagline}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Why Choose */}
                          {product.richDetails?.whyChoose && product.richDetails.whyChoose.length > 0 && (
                            <div className="border-t border-white/5 pt-8 space-y-6">
                              <h4 className="text-xl font-black text-white">Why Choose {product.name}?</h4>
                              <div className="space-y-6">
                                {product.richDetails.whyChoose.map((item: any, idx: number) => (
                                  <div key={idx} className="space-y-2">
                                    <h5 className="font-bold text-white text-base flex items-center gap-2.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                      {item.title}
                                    </h5>
                                    <p className="text-zinc-400 text-sm leading-relaxed pl-4">
                                      {item.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Benefits */}
                          {product.richDetails?.benefits && product.richDetails.benefits.length > 0 && (
                            <div className="border-t border-white/5 pt-8 space-y-6">
                              <h4 className="text-xl font-black text-white">{product.name} Benefits</h4>
                              <div className="space-y-6">
                                {product.richDetails.benefits.map((item: any, idx: number) => (
                                  <div key={idx} className="space-y-2">
                                    <h5 className="font-bold text-white text-base flex items-center gap-2.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                      {item.title}
                                    </h5>
                                    {item.description && (
                                      <p className="text-zinc-400 text-sm leading-relaxed pl-4">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Fallback Legacy Benefits */}
                          {(!product.richDetails || !product.richDetails.isRichDetails) && product.customBenefits && product.customBenefits.length > 0 && (
                            <div className="border-t border-white/5 pt-8 space-y-4">
                              <h4 className="text-xl font-black text-white">Benefits</h4>
                              <ul className="space-y-3 text-sm text-zinc-300">
                                {product.customBenefits.map((b: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="text-red-500 mt-2 shrink-0 block w-1.5 h-1.5 rounded-full bg-red-500" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* The Formula */}
                          {product.richDetails?.formula && product.richDetails.formula.points && product.richDetails.formula.points.length > 0 && (
                            <div className="border-t border-white/5 pt-8 space-y-4">
                              <h4 className="text-xl font-black text-white">The Formula</h4>
                              {product.richDetails.formula.serving && (
                                <p className="text-zinc-400 text-xs font-black uppercase tracking-wider mb-2">
                                  {product.richDetails.formula.serving}
                                </p>
                              )}
                              <ul className="space-y-3 text-sm text-zinc-300">
                                {product.richDetails.formula.points.map((pt: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="text-red-500 mt-2 shrink-0 block w-1.5 h-1.5 rounded-full bg-red-500" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Made For */}
                          {product.richDetails?.madeFor && product.richDetails.madeFor.points && product.richDetails.madeFor.points.length > 0 && (
                            <div className="border-t border-white/5 pt-8 space-y-4">
                              <h4 className="text-xl font-black text-white">Made For</h4>
                              <ul className="space-y-3 text-sm text-zinc-300">
                                {product.richDetails.madeFor.points.map((pt: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="text-red-500 mt-2 shrink-0 block w-1.5 h-1.5 rounded-full bg-red-500" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                              {product.richDetails.madeFor.footer && (
                                <p className="text-zinc-400 text-xs italic font-medium pt-3 border-t border-white/5">
                                  {product.richDetails.madeFor.footer}
                                </p>
                              )}
                            </div>
                          )}

                          {/* How To Use */}
                          {product.richDetails?.howToUse && product.richDetails.howToUse.points && product.richDetails.howToUse.points.length > 0 && (
                            <div className="border-t border-white/5 pt-8 space-y-4">
                              <h4 className="text-xl font-black text-white">How To Use</h4>
                              <ul className="space-y-3 text-sm text-zinc-300">
                                {product.richDetails.howToUse.points.map((pt: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="text-red-500 mt-2 shrink-0 block w-1.5 h-1.5 rounded-full bg-red-500" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                              {product.richDetails.howToUse.footer && (
                                <p className="text-zinc-400 text-xs italic font-medium pt-3 border-t border-white/5">
                                  {product.richDetails.howToUse.footer}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Ingredients */}
                          {product.richDetails?.ingredientsText && (
                            <div className="border-t border-white/5 pt-8 space-y-3">
                              <h4 className="text-xl font-black text-white">Made With Clean Ingredients</h4>
                              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Ingredients:</p>
                              <p className="text-zinc-300 text-sm leading-relaxed font-medium">
                                {product.richDetails.ingredientsText}
                              </p>
                            </div>
                          )}

                          {/* Free From */}
                          {product.richDetails?.freeFrom && product.richDetails.freeFrom.length > 0 && (
                            <div className="border-t border-white/5 pt-8 space-y-4">
                              <h4 className="text-xl font-black text-white">Free From</h4>
                              <ul className="space-y-3 text-sm text-zinc-300">
                                {product.richDetails.freeFrom.map((pt: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="text-red-500 mt-2 shrink-0 block w-1.5 h-1.5 rounded-full bg-red-500" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="manufacturer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="border border-white/10 p-8 bg-zinc-900/10 rounded-2xl space-y-4 animate-fade-in"
                    >
                      <h4 className="text-xl font-black text-white">Manufacturer Information</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm mt-6">
                        <div>
                          <span className="text-zinc-500 font-bold block text-xs uppercase tracking-wider mb-1.5">Company Name</span>
                          <span className="text-white font-black text-base">{product.richDetails?.manufacturer?.name || "Muscleyn Nutrition Pvt. Ltd."}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 font-bold block text-xs uppercase tracking-wider mb-1.5">Support Contact</span>
                          <span className="text-white font-black text-base">{product.richDetails?.manufacturer?.contact || "support@muscleyn.com"}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-zinc-500 font-bold block text-xs uppercase tracking-wider mb-1.5">Factory Address</span>
                          <span className="text-zinc-300 font-medium leading-relaxed">{product.richDetails?.manufacturer?.address || "12, Fitness Park Area, New Delhi - 110025"}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 font-bold block text-xs uppercase tracking-wider mb-1.5">FSSAI License No.</span>
                          <span className="text-red-500 font-black tracking-widest text-base">{product.richDetails?.manufacturer?.fssai || "10021011000455"}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT: INFO */}
            <div className="flex flex-col lg:sticky lg:top-[120px] lg:h-fit">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-red-500">
                    {product.brand}
                  </span>
                  <div className="h-3 w-px bg-white/20" />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                    {product.category}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 text-yellow-500 text-xs font-bold">
                    <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                    {averageRating}
                  </div>
                  <span 
                    onClick={() => {
                      const reviewsEl = document.getElementById("reviews-section");
                      if (reviewsEl) {
                        reviewsEl.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-xs text-zinc-400 font-medium underline decoration-zinc-700 underline-offset-4 cursor-pointer hover:text-white"
                  >
                    Read {reviewsCount} Reviews
                  </span>
                </div>
              </div>

              <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-6 font-medium">
                {product.richDetails?.subTitle || product.shortDescription}
              </p>

              {/* KEY NUTRITION (Mini) */}
              <div className={`grid gap-3 mb-6 ${
                (product as any).customFacts && (product as any).customFacts.length > 0
                  ? `grid-cols-2 sm:grid-cols-${Math.min(4, (product as any).customFacts.length)}`
                  : 'grid-cols-3'
              }`}>
                {(product as any).customFacts && (product as any).customFacts.length > 0 ? (
                  (product as any).customFacts.map((fact: any, index: number) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-white">{fact.value}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-0.5">{fact.label}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-white">{product.nutrition.protein}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-0.5">Protein</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-white">{product.nutrition.carbs}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-0.5">Carbs</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-white">{product.nutrition.calories}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-0.5">Calories</span>
                    </div>
                  </>
                )}
              </div>

              {/* SELECT SIZE */}
              {uniqueSizes.length > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
                      Select Size
                    </span>
                    <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider text-xs">
                      {selectedSize}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {uniqueSizes.map((size) => {
                      const isAvailable = activeVariants.some(
                        (v: any) => getVariantSize(v) === size && isVariantActive(v)
                      );
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeSelect(size)}
                          disabled={!isAvailable}
                          className={`px-4 py-2 rounded-lg border text-xs font-black transition-all ${
                            isSelected
                              ? "bg-red-600 border-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                              : "bg-zinc-900 border-white/10 text-zinc-300 hover:border-white/20 hover:text-white"
                          } ${!isAvailable ? "opacity-30 cursor-not-allowed line-through" : ""}`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SELECT FLAVOR */}
              {uniqueFlavors.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
                      Select Flavor
                    </span>
                    <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider text-xs">
                      {selectedFlavor}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {uniqueFlavors.map((flavor) => {
                      const isAvailable = activeVariants.some(
                        (v: any) => getVariantFlavor(v) === flavor && isVariantActive(v)
                      );
                      const isAvailableForSelectedSize = activeVariants.some(
                        (v: any) =>
                          getVariantFlavor(v) === flavor &&
                          getVariantSize(v) === selectedSize &&
                          isVariantActive(v)
                      );
                      const isSelected = selectedFlavor === flavor;
                      return (
                        <button
                          key={flavor}
                          type="button"
                          onClick={() => handleFlavorSelect(flavor)}
                          disabled={!isAvailable}
                          className={`px-4 py-2 rounded-lg border text-xs font-black transition-all ${
                            isSelected
                              ? "bg-red-600 border-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                              : isAvailableForSelectedSize
                              ? "bg-zinc-900 border-white/10 text-zinc-300 hover:border-white/20 hover:text-white"
                              : "bg-zinc-900/50 border-white/5 text-zinc-500 hover:border-white/10"
                          } ${!isAvailable ? "opacity-30 cursor-not-allowed line-through" : ""}`}
                        >
                          {flavor}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PRICE & ADD TO CART */}
              <div id="main-add-to-cart-box" className="p-6 rounded-2xl bg-zinc-900 border border-white/10 shadow-xl mb-6">
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-end gap-3.5">
                    <span className="text-3xl font-black text-red-500">
                      {formatPrice(currentVariant ? currentVariant.price : product.price)}
                    </span>
                    {((currentVariant ? currentVariant.oldPrice : product.oldPrice) > (currentVariant ? currentVariant.price : product.price)) && (
                      <span className="text-base font-bold text-zinc-500 line-through mb-0.5">
                        {formatPrice(currentVariant ? currentVariant.oldPrice : product.oldPrice)}
                      </span>
                    )}
                    {((currentVariant ? currentVariant.oldPrice : product.oldPrice) > (currentVariant ? currentVariant.price : product.price)) && (
                      <span className="text-[10px] font-black uppercase text-green-500 bg-green-500/10 px-2 py-0.5 rounded">
                        {(() => {
                          const p = currentVariant ? currentVariant.price : product.price;
                          const op = currentVariant ? currentVariant.oldPrice : product.oldPrice;
                          return `${Math.round(((op - p) / op) * 100)}% OFF`;
                        })()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center justify-between bg-black border border-white/10 rounded-full px-3.5 sm:w-1/3 min-h-[50px]">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full flex items-center justify-center text-base font-black hover:bg-white/10 transition">-</button>
                    <span className="text-base font-black">{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(maxStock, q + 1))} className="w-8 h-8 rounded-full flex items-center justify-center text-base font-black hover:bg-white/10 transition">+</button>
                  </div>
                  {maxStock <= 0 ? (
                    <button disabled className="flex-1 min-h-[50px] bg-zinc-800 text-zinc-500 cursor-not-allowed rounded-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all">
                      Out Of Stock
                    </button>
                  ) : (
                    <button onClick={handleAddToCart} className="flex-1 min-h-[50px] bg-red-600 hover:bg-white hover:text-black rounded-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                      <ShoppingCart className="w-4 h-4" /> Add To Cart
                    </button>
                  )}
                </div>
                {maxStock > 0 && (
                  <button onClick={handleBuyNow} className="w-full mt-3 min-h-[50px] bg-white text-black hover:bg-zinc-300 rounded-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all">
                    <Zap className="w-4 h-4" /> Buy Now
                  </button>
                )}
                
                {/* EXTERNAL LINKS */}
                {(product as any).amazonUrl || (product as any).flipkartUrl ? (
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    {(product as any).amazonUrl && (
                      <a href={(product as any).amazonUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-h-[50px] bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                        Amazon
                      </a>
                    )}
                    {(product as any).flipkartUrl && (
                      <a href={(product as any).flipkartUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-h-[50px] bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                        Flipkart
                      </a>
                    )}
                  </div>
                ) : null}
                
                <div className="mt-4 flex items-center justify-center gap-5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Secure Checkout</div>
                  <div className="flex items-center gap-1.5"><Package className="w-3.5 h-3.5 text-blue-500" /> Free Shipping</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* CUSTOMER REVIEWS SECTION */}
        <div id="reviews-section" className="max-w-4xl mx-auto px-4 mt-32 pt-24 border-t border-white/10">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-black tracking-tight">Customer Reviews</h2>
          </div>
          
          <div className="space-y-12">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* RATING SUMMARY */}
              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 text-center">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Average Rating</h4>
                <span className="text-6xl font-black text-white">{averageRating}</span>
                <div className="flex justify-center gap-1 my-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(averageRating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-zinc-700"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-zinc-500 font-medium text-xs uppercase tracking-widest">Based on {reviewsCount} reviews</p>
              </div>

              {/* REVIEW FORM */}
              <div className="md:col-span-2 bg-zinc-900 border border-white/10 rounded-3xl p-6">
                <h3 className="text-xl font-black mb-4">Share Your Review</h3>
                {isLoggedIn ? (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Rating</label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="text-zinc-500 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-7 h-7 ${
                                star <= (hoverRating || formRating)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-zinc-700"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Your Comments</label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Review the taste, mixability, performance benefits..."
                        rows={4}
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-2xl p-4 outline-none text-white transition-colors text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Add Images / Video</label>
                      <div className="flex flex-wrap gap-3 items-center">
                        <label className="flex items-center justify-center w-16 h-16 bg-black hover:bg-zinc-800 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer group transition-colors">
                          <input
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleMediaUpload}
                            className="hidden"
                          />
                          <Upload className="w-5 h-5 text-zinc-500 group-hover:text-red-500 transition-colors" />
                        </label>

                        {formMediaUrls.map((url: string, idx: number) => {
                          const isVideo = url.endsWith(".mp4") || url.endsWith(".mov") || url.includes("video");
                          return (
                            <div key={idx} className="relative w-16 h-16 bg-black border border-white/10 rounded-2xl overflow-hidden group">
                              {isVideo ? (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-red-500">
                                  <Film className="w-6 h-6" />
                                </div>
                              ) : (
                                <img src={url} alt="preview" className="w-full h-full object-cover" />
                              )}
                              <button
                                type="button"
                                onClick={() => setFormMediaUrls(prev => prev.filter((_, i) => i !== idx))}
                                className="absolute inset-0 bg-red-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      {uploadingMedia && (
                        <p className="text-xs text-red-500 mt-2 animate-pulse">Uploading attachment...</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submittingReview || uploadingMedia}
                      className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all disabled:opacity-50"
                    >
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-zinc-500 text-sm font-semibold mb-4">Please log in to submit a review.</p>
                    <Link
                      href="/login"
                      className="inline-block bg-zinc-800 hover:bg-white hover:text-black text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest border border-white/5 transition-all"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* REVIEWS LIST */}
            <div className="space-y-6 pt-6 border-t border-white/5">
              <h3 className="text-2xl font-black mb-6">Customer Feedbacks ({reviewsCount})</h3>
              {loadingReviews ? (
                <div className="text-center py-8 text-zinc-500">Loading reviews...</div>
              ) : reviewsList.length === 0 ? (
                <div className="text-center py-12 bg-zinc-900/20 border border-white/5 rounded-3xl text-zinc-500">
                  No reviews yet. Be the first to share your purchase feedback!
                </div>
              ) : (
                <div className="space-y-6">
                  {reviewsList.map((review) => {
                    const reviewMedia = review.mediaUrls ? review.mediaUrls.split(",").filter(Boolean) : [];
                    return (
                      <div key={review.id} className="p-6 bg-zinc-900/30 border border-white/5 rounded-3xl space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="font-black text-white text-base">{review.userName || `User #${review.userId}`}</span>
                            {review.isVerifiedBuyer && (
                              <span className="inline-flex items-center gap-1 bg-green-500/15 border border-green-500/25 px-2.5 py-0.5 rounded-full text-[10px] font-black text-green-500 uppercase tracking-widest">
                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-zinc-500 text-xs font-semibold">
                            {new Date(review.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-zinc-700"
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-zinc-300 leading-relaxed font-medium text-sm">
                          {review.reviewText}
                        </p>

                        {reviewMedia.length > 0 && (
                          <div className="flex flex-wrap gap-3 pt-2">
                            {reviewMedia.map((url: string, idx: number) => {
                              const isVideo = url.endsWith(".mp4") || url.endsWith(".mov") || url.includes("video");
                              return (
                                <div key={idx} className="relative w-24 h-24 bg-black border border-white/10 rounded-2xl overflow-hidden group">
                                  {isVideo ? (
                                    <video
                                      src={url}
                                      controls
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <a href={url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                      <img src={url} alt="attachment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                    </a>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FREQUENTLY BOUGHT TOGETHER */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 mt-32 pt-24 border-t border-white/10">
            <div className="mb-12 text-center">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
                Complete The Stack
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight">
                Frequently Bought Together
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map(p => (
                <PremiumProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* STICKY BOTTOM CHECKOUT BAR */}
        <AnimatePresence>
          {showStickyBar && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 md:py-5 shadow-[0_-15px_30px_rgba(0,0,0,0.5)] flex items-center justify-center"
            >
              <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Product Info */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                    <Image
                      src={currentVariant?.imageUrl ? getBackendImageUrl(currentVariant.imageUrl) : product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white line-clamp-1">{product.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-0.5">{product.brand}</p>
                  </div>
                </div>

                {/* Variant Dropdowns & Selectors */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  {uniqueSizes.length > 0 && (
                    <select
                      value={selectedSize}
                      onChange={(e) => handleSizeSelect(e.target.value)}
                      className="bg-black border border-white/10 text-white rounded-xl px-4 py-2.5 text-xs font-black uppercase outline-none focus:border-red-500 cursor-pointer"
                    >
                      {uniqueSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  )}

                  {uniqueFlavors.length > 0 && (
                    <select
                      value={selectedFlavor}
                      onChange={(e) => handleFlavorSelect(e.target.value)}
                      className="bg-black border border-white/10 text-white rounded-xl px-4 py-2.5 text-xs font-black uppercase outline-none focus:border-red-500 cursor-pointer"
                    >
                      {uniqueFlavors.map((flavor) => (
                        <option key={flavor} value={flavor}>
                          {flavor}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* Price Display */}
                  <div className="flex items-baseline gap-2.5 px-2">
                    <span className="text-xl font-black text-red-500">
                      {formatPrice(currentVariant ? currentVariant.price : product.price)}
                    </span>
                    {((currentVariant ? currentVariant.oldPrice : product.oldPrice) > (currentVariant ? currentVariant.price : product.price)) && (
                      <span className="text-xs font-bold text-zinc-500 line-through">
                        {formatPrice(currentVariant ? currentVariant.oldPrice : product.oldPrice)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Actions */}
                  <div className="flex items-center gap-2">
                    {maxStock <= 0 ? (
                      <button
                        disabled
                        className="bg-zinc-800 text-zinc-500 text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full cursor-not-allowed"
                      >
                        Out of Stock
                      </button>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        className="bg-red-600 hover:bg-white hover:text-black text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] flex items-center gap-2"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Add
                      </button>
                    )}
                    
                    {/* Close button */}
                    <button
                      onClick={() => setIsStickyClosed(true)}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/15 text-zinc-400 hover:text-white hover:bg-white/10 transition"
                      title="Dismiss"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FLOATING WHATSAPP BUTTON */}
        <a
          href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi, I'm interested in purchasing ${product.name}. Could you please help me?`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed right-6 z-40 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all duration-300 hover:scale-110 flex items-center justify-center ${
            showStickyBar ? "bottom-28 md:bottom-32" : "bottom-6"
          }`}
          title="Chat on WhatsApp"
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.01 14.069.99 11.45.99 6.012.99 1.587 5.36 1.584 10.787c-.001 1.742.469 3.444 1.361 4.965l-.995 3.63 3.72-.977zm11.367-5.463c-.305-.153-1.802-.889-2.083-.99-.281-.102-.485-.153-.687.153-.202.306-.783.99-.96 1.194-.177.204-.353.23-.658.077-.305-.153-1.287-.475-2.45-1.512-.905-.808-1.517-1.806-1.695-2.112-.178-.306-.019-.471.133-.623.137-.137.305-.357.458-.536.153-.179.204-.306.305-.51.102-.204.051-.383-.025-.536-.076-.153-.687-1.654-.941-2.266-.247-.594-.5-.515-.687-.525-.178-.009-.382-.01-.586-.01-.204 0-.537.077-.817.383-.28.306-1.071 1.047-1.071 2.553 0 1.506 1.096 2.96 1.248 3.164.153.204 2.157 3.3 5.228 4.624.73.315 1.3.504 1.743.644.733.233 1.4.2 1.928.12.588-.088 1.802-.736 2.057-1.448.255-.713.255-1.325.178-1.448-.076-.123-.28-.204-.586-.357z" />
          </svg>
        </a>

      </main>
      <Footer />
    </>
  );
}