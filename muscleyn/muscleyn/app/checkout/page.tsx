"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useCartStore } from "@/store/cartStore";
import { placeOrder } from "@/services/orderService";
import { createPayment, verifyPayment } from "@/services/paymentService";
import { getUserAddresses } from "@/services/addressService";

import {
  ShoppingBag,
  CreditCard,
  Truck,
  ShieldCheck,
  Lock,
  RefreshCw,
  Zap,
} from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();

  // CART
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);

  // ADDRESS
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  // LOADING
  const [loading, setLoading] = useState(false);

  // PAYMENT
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD");
  const [paymentGateway, setPaymentGateway] = useState<"RAZORPAY" | "PHONEPE">("RAZORPAY");

  // LOAD DATA
  useEffect(() => {
    // ADDRESS
    const loadAddresses = async () => {
      try {
        const response = await getUserAddresses(user?.id);
        const addressData = response?.data || [];
        setAddresses(addressData);

        // DEFAULT ADDRESS
        const defaultAddress = addressData.find((item: any) => item.isDefault);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isLoggedIn && user?.id) {
      loadAddresses();
    }
  }, [isLoggedIn, user]);

  // TOTAL
  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + Number(String(item.price || "0").replace(/[^0-9.-]+/g, "")) * item.quantity,
      0
    );
  }, [cartItems]);

  // PLACE ORDER
  const handlePlaceOrder = async () => {
    // EMPTY CART
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    // REQUIRE LOGIN — redirect guest users to login page
    if (!isLoggedIn) {
      toast.error("Please login to place your order");
      router.push("/login?returnUrl=/checkout");
      return;
    }

    // LOGIN USER ADDRESS
    if (isLoggedIn && !selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    try {
      setLoading(true);

      const finalUserId = user?.id;

      // PLACE ORDER
      const orderResponse = await placeOrder({
        userId: finalUserId,
        addressId: selectedAddress?.id,
        paymentMethod,
        paymentGateway,
        items: cartItems.map((item) => ({
          productId: item.id,
          variantId: item.variantId || item.id,
          quantity: Number(item.quantity),
        })),
      });

      const orderId = orderResponse?.data?.id || "DEMO_ORDER";

      // ONLINE PAYMENT
      if (paymentMethod === "ONLINE") {
        try {
          const paymentResponse = await createPayment({
            orderId,
            amount: cartTotal,
            paymentGateway,
          });

          const paymentData = paymentResponse.data;

          // RAZORPAY
          if (paymentGateway === "RAZORPAY") {
            const options = {
              key: paymentData?.key || "DEMO_KEY",
              amount: paymentData?.amount || cartTotal * 100,
              currency: paymentData?.currency || "INR",
              name: "Muscleyn",
              description: "Order Payment",
              order_id: paymentData?.orderId,
              modal: {
                ondismiss: () => {
                  toast.error("Payment cancelled");
                  router.push(`/my-orders/${orderId}`);
                },
              },
              handler: async (response: any) => {
                try {
                  await verifyPayment({
                    orderId,
                    paymentGateway: "RAZORPAY",
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                  });

                  clearCart();
                  toast.success("Payment successful");
                  router.push(`/order-success?orderId=${orderId}`);
                } catch (error) {
                  console.log(error);
                  toast.error("Payment verification failed");
                }
              },
              prefill: {
                name: user?.name || guestName,
                contact: user?.mobileNumber || guestMobile,
              },
              theme: {
                color: "#dc2626", // Red-600
              },
            };

            if ((window as any).Razorpay) {
              const razorpay = new (window as any).Razorpay(options);
              razorpay.on("payment.failed", function (response: any) {
                console.log(response);
                toast.error("Payment failed");
                router.push(`/my-orders/${orderId}`);
              });
              razorpay.open();
              return;
            } else {
              toast.error("Razorpay SDK not loaded in demo");
            }
          }

          // PHONEPE
          if (paymentGateway === "PHONEPE") {
            if (paymentData?.redirectUrl) {
              window.location.href = paymentData.redirectUrl;
              return;
            } else {
              toast.error("PhonePe redirect failed in demo");
            }
          }
        } catch (e) {
            console.error(e);
            toast.error("Payment creation failed in demo mode");
        }
      }

      // COD SUCCESS or Fallback
      clearCart();
      toast.success("Order placed successfully");
      router.push(`/order-success?orderId=${orderId}`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* TITLE */}
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
            <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20">
              <ShoppingBag className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white">Secure Checkout</h1>
              <p className="text-zinc-400 font-medium mt-1">Almost there! Complete your order below.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12">
            {/* LEFT */}
            <div className="space-y-8">
              {/* LOGIN PROMPT FOR GUESTS */}
              {!isLoggedIn && (
                <div className="bg-zinc-900/50 backdrop-blur-md rounded-[2rem] p-8 border border-amber-500/30 shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                      <Lock className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-white">Login Required</h2>
                      <p className="text-zinc-400 text-sm mt-0.5">You need to be logged in to place an order</p>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push("/login?returnUrl=/checkout")}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all"
                  >
                    Login / Register to Continue
                  </button>
                </div>
              )}

              {/* ADDRESS */}
              {isLoggedIn && (
                <div className="bg-zinc-900/50 backdrop-blur-md rounded-[2rem] p-8 border border-white/10 shadow-xl">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white font-bold text-sm">1</span>
                      <h2 className="text-2xl font-black">Shipping Address</h2>
                    </div>
                    <button
                      onClick={() => router.push("/address")}
                      className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black text-sm font-bold transition-colors"
                    >
                      Add New Address
                    </button>
                  </div>

                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <button
                        key={address.id}
                        onClick={() => setSelectedAddress(address)}
                        className={`w-full text-left border-2 rounded-[1.5rem] p-6 transition-all relative overflow-hidden group ${
                          selectedAddress?.id === address.id
                            ? "border-red-500 bg-red-500/5"
                            : "border-white/10 bg-black hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors">
                            {address.fullName}
                          </h3>
                          {address.isDefault && (
                            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-zinc-400 leading-relaxed font-medium">
                          {address.addressLine1}, {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="mt-3 font-semibold text-zinc-300">
                          {address.mobileNumber}
                        </p>
                        {selectedAddress?.id === address.id && (
                          <div className="absolute top-0 right-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-red-500">
                            <ShieldCheck className="absolute top-[-30px] right-[-30px] w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                    
                    {addresses.length === 0 && (
                      <div className="text-center p-8 bg-black rounded-2xl border border-white/10 border-dashed">
                        <p className="text-zinc-500 mb-4">No addresses found.</p>
                        <button
                          onClick={() => router.push("/address")}
                          className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold transition-colors"
                        >
                          Add Your First Address
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PAYMENT */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-[2rem] p-8 border border-white/10 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white font-bold text-sm">2</span>
                  <h2 className="text-2xl font-black">Payment Method</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* ONLINE */}
                  <button
                    onClick={() => setPaymentMethod("ONLINE")}
                    className={`w-full border-2 rounded-[1.5rem] p-6 flex flex-col items-start gap-4 transition-all relative overflow-hidden ${
                      paymentMethod === "ONLINE"
                        ? "border-red-500 bg-red-500/5 shadow-[0_0_15px_rgba(220,38,38,0.1)]"
                        : "border-white/10 bg-black hover:border-white/20"
                    }`}
                  >
                    <div className={`p-3 rounded-full ${paymentMethod === 'ONLINE' ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-zinc-400'}`}>
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-white text-lg">Online Payment</p>
                      <p className="text-sm text-zinc-500 mt-1">UPI, Cards, NetBanking</p>
                    </div>
                    {paymentMethod === "ONLINE" && (
                      <div className="absolute top-4 right-4 text-red-500">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                    )}
                  </button>

                  {/* COD */}
                  <button
                    onClick={() => setPaymentMethod("COD")}
                    className={`w-full border-2 rounded-[1.5rem] p-6 flex flex-col items-start gap-4 transition-all relative overflow-hidden ${
                      paymentMethod === "COD"
                        ? "border-red-500 bg-red-500/5 shadow-[0_0_15px_rgba(220,38,38,0.1)]"
                        : "border-white/10 bg-black hover:border-white/20"
                    }`}
                  >
                    <div className={`p-3 rounded-full ${paymentMethod === 'COD' ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-zinc-400'}`}>
                      <Truck className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-white text-lg">Cash on Delivery</p>
                      <p className="text-sm text-zinc-500 mt-1">Pay when product arrives</p>
                    </div>
                    {paymentMethod === "COD" && (
                      <div className="absolute top-4 right-4 text-red-500">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                    )}
                  </button>
                </div>

                {/* GATEWAY */}
                {paymentMethod === "ONLINE" && (
                  <div className="mt-8 p-6 bg-black rounded-2xl border border-white/10">
                    <p className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Select Gateway</p>
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => setPaymentGateway("RAZORPAY")}
                        className={`px-8 py-4 rounded-xl border text-sm font-bold transition-all flex items-center gap-2 ${
                          paymentGateway === "RAZORPAY"
                            ? "border-red-500 bg-red-600 text-white"
                            : "border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Zap className="w-4 h-4" /> Razorpay
                      </button>
                      <button
                        onClick={() => setPaymentGateway("PHONEPE")}
                        className={`px-8 py-4 rounded-xl border text-sm font-bold transition-all flex items-center gap-2 ${
                          paymentGateway === "PHONEPE"
                            ? "border-purple-500 bg-purple-600 text-white"
                            : "border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        PhonePe
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div className="bg-zinc-900 border border-white/10 rounded-[2rem] p-8 shadow-2xl sticky top-28">
                <h2 className="text-2xl font-black mb-8">Order Summary</h2>

                {/* ITEMS */}
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-2xl bg-black border border-white/5 group hover:border-white/10 transition-colors">
                      <div className="relative w-20 h-20 rounded-xl bg-zinc-950 overflow-hidden flex-shrink-0 border border-white/10">
                        <Image
                          src={item.image || "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2670&auto=format&fit=crop"}
                          alt={item.name || "Product"}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="font-bold text-white truncate text-sm">
                          {item.name}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1 font-medium">
                          {item.price}
                        </p>
                        <p className="text-sm font-bold text-zinc-300 mt-2">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="font-black text-red-500 flex items-center justify-end">
                        ₹{Number(String(item.price || "0").replace(/[^0-9.-]+/g, "")) * item.quantity}
                      </div>
                    </div>
                  ))}
                  
                  {cartItems.length === 0 && (
                     <div className="text-center p-6 text-zinc-500 font-medium">
                       Your cart is empty.
                     </div>
                  )}
                </div>

                {/* TOTAL */}
                <div className="border-t border-white/10 mt-8 pt-8 space-y-4">
                  <div className="flex justify-between text-zinc-400 font-medium text-sm">
                    <span>Subtotal</span>
                    <span className="text-white">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 font-medium text-sm">
                    <span>Delivery</span>
                    <span className="text-green-500">FREE</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black pt-4 border-t border-white/10 mt-4">
                    <span>Total</span>
                    <span className="text-red-500">₹{cartTotal}</span>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || cartItems.length === 0}
                  className="w-full bg-red-600 hover:bg-white hover:text-black text-white py-5 rounded-full font-black uppercase tracking-widest text-sm mt-8 transition-all disabled:opacity-50 disabled:hover:bg-red-600 disabled:hover:text-white shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : paymentMethod === "ONLINE" ? (
                    <><CreditCard className="w-5 h-5" /> Pay Securely</>
                  ) : (
                    <><ShoppingBag className="w-5 h-5" /> Place Order</>
                  )}
                </button>

                {/* TRUST BADGES */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-3 justify-center text-zinc-500">
                    <Lock className="w-5 h-5 text-zinc-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">256-Bit<br/>Encryption</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center text-zinc-500 border-l border-white/10">
                    <ShieldCheck className="w-5 h-5 text-zinc-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Safe &<br/>Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}