"use client";

import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { useCartStore } from "@/store/cartStore";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
} from "lucide-react";

import ProtectedRoute
from "@/components/ProtectedRoute";
export default function CartPage() {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    removeFromCart,
  } = useCartStore();

  // TOTAL PRICE
  const totalPrice = cartItems.reduce(
    (total, item) => {

      const price = Number(
        String(item.price || "0").replace(/[^0-9.-]+/g, "")
      );

      return total + price * item.quantity;

    },
    0
  );

  return (
    // <ProtectedRoute>
    <>
      <Navbar />

      <main className="
        bg-[#f8f8f8]
        min-h-screen
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-4
          py-16
        ">

          {/* Heading */}
          <div className="mb-14">

            <p className="
              text-red-500
              font-semibold
              mb-3
            ">
              YOUR CART
            </p>

            <h1 className="
              text-5xl
              font-extrabold
            ">
              Shopping Cart
            </h1>

          </div>

          {/* Empty Cart */}
          {cartItems.length === 0 && (

            <div className="
              bg-white
              rounded-3xl
              p-16
              text-center
              shadow-sm
            ">

              <div className="
                w-24
                h-24
                rounded-full
                bg-gray-100
                flex
                items-center
                justify-center
                mx-auto
                mb-8
              ">

                <ShoppingBag className="
                  w-10
                  h-10
                  text-gray-400
                " />

              </div>

              <h2 className="
                text-3xl
                font-bold
                mb-4
              ">
                Your cart is empty
              </h2>

              <p className="
                text-gray-500
                mb-10
              ">
                Looks like you haven’t added
                anything yet.
              </p>

              <Link
                href="/shop"
                className="
                  inline-flex
                  bg-black
                  hover:bg-red-500
                  text-white
                  px-8
                  py-4
                  rounded-full
                  font-semibold
                  transition-all
                "
              >
                Continue Shopping
              </Link>

            </div>

          )}

          {/* Cart Layout */}
          {cartItems.length > 0 && (

            <div className="
              grid
              grid-cols-1
              lg:grid-cols-3
              gap-10
            ">

              {/* LEFT */}
              <div className="
                lg:col-span-2
                space-y-6
              ">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="
                      bg-white
                      rounded-3xl
                      p-6
                      shadow-sm
                      flex
                      flex-col
                      md:flex-row
                      gap-6
                    "
                  >

                    {/* IMAGE */}
                    <div className="
                      w-full
                      md:w-[220px]
                      h-[220px]
                      rounded-2xl
                      overflow-hidden
                      bg-gray-100
                    ">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />

                    </div>

                    {/* CONTENT */}
                    <div className="
                      flex-1
                      flex
                      flex-col
                      justify-between
                    ">

                      <div>

                        <h2 className="
                          text-3xl
                          font-bold
                          mb-4
                        ">
                          {item.name}
                        </h2>

                        <p className="
                          text-red-500
                          text-2xl
                          font-bold
                        ">
                          {item.price}
                        </p>

                        {/* Stock */}
                        <div className="mt-4">

                          {item.stock > 5 && (

                            <div className="
                              inline-flex
                              bg-green-100
                              text-green-700
                              px-4
                              py-2
                              rounded-full
                              text-sm
                              font-semibold
                            ">
                              In Stock
                            </div>

                          )}

                          {item.stock > 0 &&
                            item.stock <= 5 && (

                            <div className="
                              inline-flex
                              bg-yellow-100
                              text-yellow-700
                              px-4
                              py-2
                              rounded-full
                              text-sm
                              font-semibold
                            ">
                              Only {item.stock} left
                            </div>

                          )}

                        </div>

                      </div>

                      {/* Bottom */}
                      <div className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-5
                        mt-8
                      ">

                        {/* Quantity */}
                        <div className="
                          flex
                          items-center
                          gap-4
                        ">

                          {/* Minus */}
                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                            disabled={
                              item.quantity <= 1
                            }
                            className={`
                              w-11
                              h-11
                              rounded-full
                              border
                              flex
                              items-center
                              justify-center
                              transition-all

                              ${
                                item.quantity <= 1
                                  ? "opacity-40 cursor-not-allowed"
                                  : "hover:bg-black hover:text-white"
                              }
                            `}
                          >

                            <Minus className="
                              w-4
                              h-4
                            " />

                          </button>

                          {/* Input */}
                          <input
                            type="number"
                            min={1}
                            max={item.stock}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                Number(
                                  e.target.value
                                )
                              )
                            }
                            className="
                              w-20
                              h-12
                              border
                              rounded-xl
                              text-center
                              font-bold
                              outline-none
                            "
                          />

                          {/* Plus */}
                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                            disabled={
                              item.quantity >=
                              item.stock
                            }
                            className={`
                              w-11
                              h-11
                              rounded-full
                              border
                              flex
                              items-center
                              justify-center
                              transition-all

                              ${
                                item.quantity >=
                                item.stock
                                  ? "opacity-40 cursor-not-allowed"
                                  : "hover:bg-black hover:text-white"
                              }
                            `}
                          >

                            <Plus className="
                              w-4
                              h-4
                            " />

                          </button>

                        </div>

                        {/* Remove */}
                        <button
                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }
                          className="
                            flex
                            items-center
                            gap-2
                            text-red-500
                            font-semibold
                          "
                        >

                          <Trash2 className="
                            w-5
                            h-5
                          " />

                          Remove

                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

              {/* RIGHT SUMMARY */}
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
                    text-3xl
                    font-bold
                    mb-10
                  ">
                    Order Summary
                  </h2>

                  {/* Subtotal */}
                  <div className="
                    flex
                    items-center
                    justify-between
                    mb-6
                    text-lg
                  ">

                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-semibold">
                      ₹{totalPrice.toLocaleString()}
                    </span>

                  </div>

                  {/* Shipping */}
                  <div className="
                    flex
                    items-center
                    justify-between
                    mb-6
                    text-lg
                  ">

                    <span className="text-gray-500">
                      Shipping
                    </span>

                    <span className="font-semibold">
                      Free
                    </span>

                  </div>

                  {/* Divider */}
                  <div className="
                    border-t
                    my-8
                  " />

                  {/* Total */}
                  <div className="
                    flex
                    items-center
                    justify-between
                    text-2xl
                    font-bold
                    mb-10
                  ">

                    <span>Total</span>

                    <span>
                      ₹{totalPrice.toLocaleString()}
                    </span>

                  </div>

                  {/* Checkout */}
                  <Link
                    href="/checkout"
                    className="
                      w-full
                      flex
                      items-center
                      justify-center
                      bg-black
                      hover:bg-red-500
                      text-white
                      py-5
                      rounded-full
                      font-semibold
                      text-lg
                      transition-all
                    "
                  >
                    Proceed To Checkout
                  </Link>

                </div>

              </div>

            </div>

          )}

        </div>

      </main>

      <Footer />
    </>
    // </ProtectedRoute>
  );
}