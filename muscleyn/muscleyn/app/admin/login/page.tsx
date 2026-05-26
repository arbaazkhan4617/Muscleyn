"use client";

import {

  useState,

} from "react";

import {

  useRouter,

} from "next/navigation";

import toast from "react-hot-toast";

import axios from "axios";

import api from "@/services/api";

import {

  ShieldCheck,

  Eye,

  EyeOff,

} from "lucide-react";

export default function AdminLoginPage() {

  const router =
    useRouter();

  const [emailOrMobile,
    setEmailOrMobile] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  // LOGIN
  const handleLogin =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (
        !emailOrMobile ||
        !password
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;
      }

      try {

        setLoading(true);

        const response =

          await api.post(

            "/admin/auth/login",

            {

              emailOrMobile,

              password,
            }
          );

        const data =
          response.data.data;

        // SAVE TOKEN
        localStorage.setItem(

          "adminToken",

          data.token
        );

        localStorage.setItem(

          "adminUser",

          JSON.stringify(data)
        );

        toast.success(
          "Login successful"
        );

        router.push(
          "/admin/dashboard"
        );

      } catch (error: unknown) {

        console.log(error);

        const message =
          axios.isAxiosError(error)

            ? error.response?.data?.message

            : undefined;

        toast.error(

          message ||

          "Login failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <main className="
      admin-login-scene
      min-h-screen
      flex
      items-center
      justify-center
      px-4
      py-10
    ">

      <div className="
        admin-login-card
 bg-white
  text-black
  rounded-3xl
        shadow-sm
        w-full
        max-w-md
        p-10
      ">

        {/* ICON */}
        <div className="
          w-24
          h-24
          rounded-full
          bg-black
          flex
          items-center
          justify-center
          mx-auto
          mb-8
        ">

          <ShieldCheck className="
            w-12
            h-12
            text-white
          " />

        </div>

        {/* TITLE */}
        <h1 className="
          text-4xl
          font-extrabold
          text-center
          mb-3
        ">
          Admin Login
        </h1>

        <p className="
          text-center
          text-gray-500
          mb-10
        ">
          Login to manage
          your ecommerce
          platform
        </p>

        {/* FORM */}
        <form
          onSubmit={
            handleLogin
          }
          className="
            space-y-6
          "
        >

          {/* EMAIL / MOBILE */}
          <div>

            <label className="
              block
              mb-3
              font-semibold
            ">
              Email or Mobile
            </label>

            <input
              type="text"
              value={
                emailOrMobile
              }
              onChange={(e) =>
                setEmailOrMobile(
                  e.target.value
                )
              }
              placeholder="
                Enter email or mobile
              "
              className="
                w-full
                border
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-black
              "
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="
              block
              mb-3
              font-semibold
            ">
              Password
            </label>

            <div className="
              relative
            ">

              <input
                type={
                  showPassword

                    ? "text"

                    : "password"
                }

                value={
                  password
                }

                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }

                placeholder="
                  Enter password
                "

                className="
                  w-full
                  border
                  rounded-2xl
                  px-5
                  py-4
                  pr-14
                  outline-none
                  focus:border-black
                "
              />

              <button

                type="button"

                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }

                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                "
              >

                {
                  showPassword

                    ? (
                      <EyeOff />
                    )

                    : (
                      <Eye />
                    )
                }

              </button>

            </div>

          </div>

          {/* BUTTON */}
          <button

            type="submit"

            disabled={loading}

            className="
              w-full
              bg-black
              hover:bg-red-500
              text-white
              py-4
              rounded-2xl
              font-bold
              text-lg
              transition-all
            "
          >

            {
              loading

                ? "Logging in..."

                : "Login"
            }

          </button>

        </form>

      </div>

    </main>
  );
}