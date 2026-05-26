"use client";

import {

  useEffect,

  useMemo,

  useState,

} from "react";

import {

  useRouter,

} from "next/navigation";

import toast from "react-hot-toast";

import Navbar from "@/components/layout/Navbar";

import Footer from "@/components/layout/Footer";

import {

  useAuth,

} from "@/context/AuthContext";

import {

  getGuestCart,

  clearGuestCart,

} from "@/utils/cartStorage";

import {

  placeOrder,

} from "@/services/orderService";

import {

  createPayment,

} from "@/services/paymentService";
import type {
  CreatePaymentRequest,
} from "@/services/paymentService";

import {

  getUserAddresses,

} from "@/services/addressService";

import {

  ShoppingBag,

  CreditCard,

  Truck,

} from "lucide-react";

export default function CheckoutPage() {

  const router =
    useRouter();

  const {

    isLoggedIn,

    user,

  } = useAuth();

  // CART
  const [cartItems, setCartItems] =
    useState<any[]>([]);

  // ADDRESS
  const [

    addresses,

    setAddresses

  ] = useState<any[]>([]);

  const [

    selectedAddress,

    setSelectedAddress

  ] = useState<any>(null);

  // LOADING
  const [loading, setLoading] =
    useState(false);

  // PAYMENT
  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [paymentGateway, setPaymentGateway] =
    useState<CreatePaymentRequest["paymentGateway"]>(
      "RAZORPAY"
    );

  // GUEST USER
  const [

    guestMobile,

    setGuestMobile

  ] = useState("");

  const [

    guestName,

    setGuestName

  ] = useState("");

  // LOAD DATA
  useEffect(() => {

    // GUEST CART
    const guestCart =
      getGuestCart();

    setCartItems(
      guestCart
    );

    // USER ADDRESSES
    const loadAddresses =
      async () => {

        try {

          const response =

            await getUserAddresses(
              user?.id
            );

          const addressData =

            response?.data || [];

          setAddresses(
            addressData
          );

          // DEFAULT ADDRESS
          const defaultAddress =

            addressData.find(
              (item: any) =>
                item.isDefault
            );

          if (defaultAddress) {

            setSelectedAddress(
              defaultAddress
            );
          }

        } catch (error) {

          console.log(error);
        }
      };

    if (
      isLoggedIn &&
      user?.id
    ) {

      loadAddresses();
    }

  }, [isLoggedIn, user]);

  // TOTAL
  const cartTotal =
    useMemo(() => {

      return cartItems.reduce(

        (

          total,

          item

        ) =>

          total +

          (
            (
              item.variant?.price || 0
            )

            *

            item.quantity
          ),

        0
      );

    }, [cartItems]);

  // PLACE ORDER
  const handlePlaceOrder =
    async () => {

      // CART VALIDATION
      if (
        cartItems.length === 0
      ) {

        toast.error(
          "Cart is empty"
        );

        return;
      }

      // ADDRESS VALIDATION
      if (
        isLoggedIn &&
        !selectedAddress
      ) {

        toast.error(
          "Please select address"
        );

        return;
      }

      // GUEST VALIDATION
      if (
        !isLoggedIn
      ) {

        if (
          !guestName ||
          !guestMobile
        ) {

          toast.error(
            "Please enter guest details"
          );

          return;
        }
      }

      try {

        setLoading(true);

        let finalUserId =
          user?.id;

        // GUEST USER
        if (
          !isLoggedIn
        ) {

          // FUTURE:
          // MOBILE OTP LOGIN
          finalUserId = 1;
        }

        const items =
          cartItems.map((item) => ({
            productId:
              item.product?.id ||
              item.variant?.product?.id ||
              item.productId ||
              0,
            variantId:
              item.variantId ||
              item.variant?.id,
            quantity:
              item.quantity,
          }));

        // ORDER API
        const orderResponse =

          await placeOrder({

            userId:
              finalUserId,

            addressId:
              selectedAddress?.id,

            paymentMethod,

            paymentGateway,

            items,
          });

        const orderId =

          orderResponse?.data?.id;

        // ONLINE PAYMENT
        if (
          paymentMethod ===
          "ONLINE"
        ) {

          await createPayment({

            orderId,

            amount:
              cartTotal,

            paymentGateway,
          });

          toast.success(
            "Redirecting payment..."
          );

          // FUTURE:
          // Razorpay / PhonePe SDK

          router.push(
            "/payment-success"
          );

          return;
        }

        // COD SUCCESS
        clearGuestCart();

        toast.success(
          "Order placed successfully"
        );

        router.push(
          "/order-success"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to place order"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <>
      <Navbar />

      <main className="
        min-h-screen
        bg-gray-50
        py-12
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-4
        ">

          {/* TITLE */}
          <div className="
            flex
            items-center
            gap-4
            mb-10
          ">

            <ShoppingBag
              className="
                w-10
                h-10
                text-red-500
              "
            />

            <h1 className="
              text-4xl
              font-extrabold
            ">
              Checkout
            </h1>

          </div>

          <div className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-10
          ">

            {/* LEFT */}
            <div className="
              lg:col-span-2
              space-y-8
            ">

              {/* GUEST DETAILS */}
              {!isLoggedIn && (

                <div className="
                  bg-white
                  rounded-3xl
                  p-8
                  shadow-sm
                ">

                  <h2 className="
                    text-2xl
                    font-bold
                    mb-6
                  ">
                    Guest Details
                  </h2>

                  <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-6
                  ">

                    <input
                      type="text"
                      placeholder="Full Name"
                      value={guestName}
                      onChange={(e) =>
                        setGuestName(
                          e.target.value
                        )
                      }
                      className="
                        border
                        rounded-2xl
                        p-4
                        outline-none
                      "
                    />

                    <input
                      type="text"
                      placeholder="Mobile Number"
                      value={guestMobile}
                      onChange={(e) =>
                        setGuestMobile(
                          e.target.value
                        )
                      }
                      className="
                        border
                        rounded-2xl
                        p-4
                        outline-none
                      "
                    />

                  </div>

                </div>

              )}

              {/* ADDRESS */}
              {isLoggedIn && (

                <div className="
                  bg-white
                  rounded-3xl
                  p-8
                  shadow-sm
                ">

                  <div className="
                    flex
                    justify-between
                    items-center
                    mb-8
                  ">

                    <h2 className="
                      text-2xl
                      font-bold
                    ">
                      Select Address
                    </h2>

                    <button

                      onClick={() =>
                        router.push(
                          "/address"
                        )
                      }

                      className="
                        px-5
                        py-3
                        rounded-full
                        bg-black
                        text-white
                      "
                    >

                      Add Address

                    </button>

                  </div>

                  <div className="
                    space-y-5
                  ">

                    {addresses.map(
                      (address) => (

                        <button

                          key={address.id}

                          onClick={() =>
                            setSelectedAddress(
                              address
                            )
                          }

                          className={`
                            w-full
                            text-left
                            border-2
                            rounded-3xl
                            p-6
                            transition-all

                            ${
                              selectedAddress?.id ===
                              address.id

                                ? "border-black"

                                : "border-gray-200"
                            }
                          `}
                        >

                          <div className="
                            flex
                            items-center
                            gap-3
                            mb-4
                          ">

                            <h3 className="
                              font-bold
                              text-lg
                            ">
                              {
                                address.fullName
                              }
                            </h3>

                            {address.isDefault && (

                              <span className="
                                px-3
                                py-1
                                rounded-full
                                bg-green-100
                                text-green-700
                                text-xs
                                font-bold
                              ">
                                DEFAULT
                              </span>

                            )}

                          </div>

                          <p className="
                            text-gray-600
                            leading-relaxed
                          ">

                            {
                              address.addressLine1
                            }

                            {" "}

                            {
                              address.city
                            }

                            {" "}

                            {
                              address.state
                            }

                            {" - "}

                            {
                              address.pincode
                            }

                          </p>

                          <p className="
                            mt-3
                            font-semibold
                          ">
                            {
                              address.mobileNumber
                            }
                          </p>

                        </button>
                      )
                    )}

                  </div>

                </div>

              )}

              {/* PAYMENT */}
              <div className="
                bg-white
                rounded-3xl
                p-8
                shadow-sm
              ">

                <h2 className="
                  text-2xl
                  font-bold
                  mb-6
                ">
                  Payment Method
                </h2>

                <div className="
                  space-y-5
                ">

                  {/* COD */}
                  <button

                    onClick={() =>
                      setPaymentMethod(
                        "COD"
                      )
                    }

                    className={`
                      w-full
                      border-2
                      rounded-2xl
                      p-5
                      flex
                      items-center
                      gap-4
                      transition-all

                      ${
                        paymentMethod ===
                        "COD"

                          ? "border-black"

                          : "border-gray-200"
                      }
                    `}
                  >

                    <Truck
                      className="
                        w-6
                        h-6
                      "
                    />

                    <div className="
                      text-left
                    ">

                      <p className="
                        font-bold
                      ">
                        Cash On Delivery
                      </p>

                      <p className="
                        text-sm
                        text-gray-500
                      ">
                        Pay when product arrives
                      </p>

                    </div>

                  </button>

                  {/* ONLINE */}
                  <button

                    onClick={() =>
                      setPaymentMethod(
                        "ONLINE"
                      )
                    }

                    className={`
                      w-full
                      border-2
                      rounded-2xl
                      p-5
                      flex
                      items-center
                      gap-4
                      transition-all

                      ${
                        paymentMethod ===
                        "ONLINE"

                          ? "border-black"

                          : "border-gray-200"
                      }
                    `}
                  >

                    <CreditCard
                      className="
                        w-6
                        h-6
                      "
                    />

                    <div className="
                      text-left
                    ">

                      <p className="
                        font-bold
                      ">
                        Online Payment
                      </p>

                      <p className="
                        text-sm
                        text-gray-500
                      ">
                        Razorpay / PhonePe
                      </p>

                    </div>

                  </button>

                </div>

                {/* PAYMENT GATEWAY */}
                {paymentMethod ===
                  "ONLINE" && (

                  <div className="
                    mt-6
                    flex
                    gap-4
                  ">

                    <button

                      onClick={() =>
                        setPaymentGateway(
                          "RAZORPAY"
                        )
                      }

                      className={`
                        px-6
                        py-3
                        rounded-full
                        border

                        ${
                          paymentGateway ===
                          "RAZORPAY"

                            ? "bg-black text-white"

                            : ""
                        }
                      `}
                    >

                      Razorpay

                    </button>

                    <button

                      onClick={() =>
                        setPaymentGateway(
                          "PHONEPE"
                        )
                      }

                      className={`
                        px-6
                        py-3
                        rounded-full
                        border

                        ${
                          paymentGateway ===
                          "PHONEPE"

                            ? "bg-black text-white"

                            : ""
                        }
                      `}
                    >

                      PhonePe

                    </button>

                  </div>

                )}

              </div>

            </div>

            {/* RIGHT */}
            <div>

              <div className="
                bg-white
                rounded-3xl
                p-8
                shadow-sm
                sticky
                top-28
              ">

                <h2 className="
                  text-2xl
                  font-bold
                  mb-8
                ">
                  Order Summary
                </h2>

                {/* ITEMS */}
                <div className="
                  space-y-5
                  max-h-[400px]
                  overflow-y-auto
                ">

                  {cartItems.map(
                    (item, index) => (

                      <div

                        key={index}

                        className="
                          flex
                          gap-4
                        "
                      >

                        <img
                          src={
                            item.variant?.image
                            || item.product?.image
                          }
                          alt={
                            item.product?.name
                          }
                          className="
                            w-20
                            h-20
                            rounded-2xl
                            object-cover
                          "
                        />

                        <div className="
                          flex-1
                        ">

                          <h3 className="
                            font-bold
                          ">
                            {
                              item.product?.name
                            }
                          </h3>

                          <p className="
                            text-sm
                            text-gray-500
                          ">
                            {
                              item.variant?.flavor
                            }
                            {" "}
                            {
                              item.variant?.weight
                            }
                          </p>

                          <p className="
                            text-sm
                            mt-2
                          ">
                            Qty:
                            {" "}
                            {item.quantity}
                          </p>

                        </div>

                        <div className="
                          font-bold
                        ">

                          ₹
                          {
                            (
                              item.variant?.price || 0
                            )

                            *

                            item.quantity
                          }

                        </div>

                      </div>
                    )
                  )}

                </div>

                {/* TOTAL */}
                <div className="
                  border-t
                  mt-8
                  pt-8
                  space-y-4
                ">

                  <div className="
                    flex
                    justify-between
                  ">

                    <span>
                      Subtotal
                    </span>

                    <span>
                      ₹{cartTotal}
                    </span>

                  </div>

                  <div className="
                    flex
                    justify-between
                  ">

                    <span>
                      Delivery
                    </span>

                    <span>
                      FREE
                    </span>

                  </div>

                  <div className="
                    flex
                    justify-between
                    text-2xl
                    font-bold
                    pt-4
                  ">

                    <span>
                      Total
                    </span>

                    <span>
                      ₹{cartTotal}
                    </span>

                  </div>

                </div>

                {/* PLACE ORDER */}
                <button

                  onClick={handlePlaceOrder}

                  disabled={loading}

                  className="
                    w-full
                    bg-black
                    hover:bg-red-500
                    text-white
                    py-5
                    rounded-2xl
                    font-bold
                    text-lg
                    mt-8
                    transition-all
                  "
                >

                  {
                    loading

                      ? "Processing..."

                      : paymentMethod ===
                        "ONLINE"

                        ? "Continue Payment"

                        : "Place Order"
                  }

                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}