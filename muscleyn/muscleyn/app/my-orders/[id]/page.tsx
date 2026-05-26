"use client";

import {

  useEffect,

  useState,

} from "react";

import Image from "next/image";

import toast from "react-hot-toast";

import Navbar from "@/components/layout/Navbar";

import Footer from "@/components/layout/Footer";

import api from "@/services/api";

import {

  useParams,

} from "next/navigation";

import {

  ArrowLeft,

  ShoppingBag,

} from "lucide-react";

import Link from "next/link";

export default function OrderDetailsPage() {

  const params =
    useParams();

  const orderId =
    params.id;

  const [order, setOrder] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  // LOAD ORDER
  useEffect(() => {

    const loadOrder =
      async () => {

        try {

          const response =

            await api.get(

              `/customer-orders/${orderId}`
            );

          setOrder(
            response.data.data
          );

        } catch (error) {

          console.log(error);

          toast.error(
            "Failed to load order"
          );

        } finally {

          setLoading(false);
        }
      };

    if (
      orderId
    ) {

      loadOrder();
    }

  }, [orderId]);

  // LOADING
  if (loading) {

    return (
      <>
        <Navbar />

        <div className="
          min-h-screen
          flex
          items-center
          justify-center
          text-2xl
          font-bold
        ">

          Loading order...

        </div>

        <Footer />
      </>
    );
  }

  // NO ORDER
  if (!order) {

    return (
      <>
        <Navbar />

        <div className="
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          gap-6
        ">

          <h1 className="
            text-4xl
            font-bold
          ">
            Order Not Found
          </h1>

          <Link

            href="/my-orders"

            className="
              px-6
              py-3
              rounded-full
              bg-black
              text-white
            "
          >

            Back To Orders

          </Link>

        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="
        min-h-screen
        bg-gray-50
        py-12
      ">

        <div className="
          max-w-6xl
          mx-auto
          px-4
        ">

          {/* TOP */}
          <div className="
            flex
            items-center
            justify-between
            mb-10
            flex-wrap
            gap-4
          ">

            <div className="
              flex
              items-center
              gap-4
            ">

              <Link
                href="/my-orders"
              >

                <button className="
                  w-12
                  h-12
                  rounded-full
                  bg-white
                  shadow-sm
                  flex
                  items-center
                  justify-center
                ">

                  <ArrowLeft />

                </button>

              </Link>

              <div>

                <h1 className="
                  text-4xl
                  font-extrabold
                ">

                  Order #
                  {order.id}

                </h1>

                <p className="
                  text-gray-500
                  mt-2
                ">

                  {
                    new Date(
                      order.createdAt
                    ).toLocaleString()
                  }

                </p>

              </div>

            </div>

            <div className="
              flex
              gap-4
              flex-wrap
            ">

              <div className="
                px-5
                py-3
                rounded-full
                bg-blue-100
                text-blue-700
                font-bold
              ">

                {
                  order.orderStatus
                }

              </div>

              <div className="
                px-5
                py-3
                rounded-full
                bg-green-100
                text-green-700
                font-bold
              ">

                {
                  order.paymentStatus
                }

              </div>

            </div>

          </div>

          <div className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-10
          ">

            {/* ITEMS */}
            <div className="
              lg:col-span-2
              space-y-6
            ">

              {order.items.map(
                (
                  item: any,
                  index: number
                ) => (

                  <div

                    key={index}

                    className="
                      bg-white
                      rounded-3xl
                      p-6
                      shadow-sm
                    "
                  >

                    <div className="
                      flex
                      gap-5
                      flex-col
                      md:flex-row
                    ">

                      {/* IMAGE */}
                      <div className="
                        relative
                        w-32
                        h-32
                        rounded-2xl
                        overflow-hidden
                        bg-gray-100
                        flex-shrink-0
                      ">

                        <Image
                          src={
                            item.productImage
                          }
                          alt={
                            item.productName
                          }
                          fill
                          className="
                            object-cover
                          "
                        />

                      </div>

                      {/* INFO */}
                      <div className="
                        flex-1
                      ">

                        <h2 className="
                          text-2xl
                          font-bold
                          mb-3
                        ">

                          {
                            item.productName
                          }

                        </h2>

                        <p className="
                          text-gray-500
                          mb-4
                        ">

                          {
                            item.variantName
                          }

                        </p>

                        <div className="
                          flex
                          flex-wrap
                          gap-6
                        ">

                          <div>

                            <p className="
                              text-gray-500
                              text-sm
                            ">
                              Quantity
                            </p>

                            <p className="
                              font-bold
                              text-lg
                            ">
                              {
                                item.quantity
                              }
                            </p>

                          </div>

                          <div>

                            <p className="
                              text-gray-500
                              text-sm
                            ">
                              Price
                            </p>

                            <p className="
                              font-bold
                              text-lg
                            ">
                              ₹
                              {
                                item.price
                              }
                            </p>

                          </div>

                          <div>

                            <p className="
                              text-gray-500
                              text-sm
                            ">
                              Total
                            </p>

                            <p className="
                              font-bold
                              text-lg
                            ">
                              ₹
                              {
                                item.totalAmount
                              }
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

            {/* SUMMARY */}
            <div>

              <div className="
                bg-white
                rounded-3xl
                p-8
                shadow-sm
                sticky
                top-28
              ">

                <div className="
                  flex
                  items-center
                  gap-3
                  mb-8
                ">

                  <ShoppingBag
                    className="
                      w-8
                      h-8
                      text-red-500
                    "
                  />

                  <h2 className="
                    text-3xl
                    font-bold
                  ">
                    Summary
                  </h2>

                </div>

                <div className="
                  space-y-5
                ">

                  <div className="
                    flex
                    justify-between
                  ">

                    <span className="
                      text-gray-500
                    ">
                      Payment Method
                    </span>

                    <span className="
                      font-bold
                    ">
                      {
                        order.paymentMethod
                      }
                    </span>

                  </div>

                  <div className="
                    flex
                    justify-between
                  ">

                    <span className="
                      text-gray-500
                    ">
                      Delivery Charge
                    </span>

                    <span className="
                      font-bold
                    ">
                      ₹
                      {
                        order.deliveryCharge
                      }
                    </span>

                  </div>

                  <div className="
                    flex
                    justify-between
                  ">

                    <span className="
                      text-gray-500
                    ">
                      Discount
                    </span>

                    <span className="
                      font-bold
                    ">
                      ₹
                      {
                        order.discountAmount
                      }
                    </span>

                  </div>

                  <div className="
                    border-t
                    pt-6
                    flex
                    justify-between
                    text-2xl
                    font-extrabold
                  ">

                    <span>
                      Final Amount
                    </span>

                    <span>
                      ₹
                      {
                        order.finalAmount
                      }
                    </span>

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