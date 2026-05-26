"use client";

import Link from "next/link";

import {

  usePathname,

  useRouter,

} from "next/navigation";

import {

  LayoutDashboard,

  Package,

  ShoppingCart,

  Users,

  ImageIcon,

  TicketPercent,

  BarChart3,

  LogOut,

  Dumbbell,

  Sparkles,

  ChevronRight,

} from "lucide-react";

export default function AdminSidebar() {

  const pathname =
    usePathname();

  const router =
    useRouter();

  // LOGOUT
  const handleLogout =
    () => {

      localStorage.removeItem(
        "adminToken"
      );

      localStorage.removeItem(
        "adminUser"
      );

      router.push(
        "/admin/login"
      );
    };

  const menus = [

    {

      name:
        "Dashboard",

      href:
        "/admin/dashboard",

      icon:
        LayoutDashboard,
    },
  {

  name:
    "Brands",

  href:
    "/admin/brands",

  icon:
    Package,
},
{

  name:
    "Categories",

  href:
    "/admin/categories",

  icon:
    Package,
},

{

  name:
    "Sub Categories",

  href:
    "/admin/sub-categories",

  icon:
    Package,
},
    {

      name:
        "Products",

      href:
        "/admin/products",

      icon:
        Package,
    },

    {

      name:
        "Orders",

      href:
        "/admin/orders",

      icon:
        ShoppingCart,
    },

    {

      name:
        "Customers",

      href:
        "/admin/customers",

      icon:
        Users,
    },

    {

      name:
        "Banners",

      href:
        "/admin/banners",

      icon:
        ImageIcon,
    },

    {

      name:
        "Coupons",

      href:
        "/admin/coupons",

      icon:
        TicketPercent,
    },

    {

      name:
        "Reports",

      href:
        "/admin/reports",

      icon:
        BarChart3,
    },
  ];

  return (
    <aside className="
      admin-sidebar
      w-[280px]
      text-white
      min-h-screen
      flex
      flex-col
      px-6
      py-8
    ">

      {/* LOGO */}
      <div className="
        admin-sidebar-brand
        mb-10
        p-5
      ">

        <div className="
          relative
          z-10
          mb-5
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-red-600
          shadow-xl
          shadow-red-950/40
        ">

          <Dumbbell
            className="
              h-7
              w-7
            "
          />

        </div>

        <h1 className="
          relative
          z-10
          text-3xl
          font-extrabold
          tracking-wide
        ">
          MUSCLEYN
        </h1>

        <p className="
          relative
          z-10
          text-gray-300
          mt-2
          flex
          items-center
          gap-2
        ">
          <Sparkles
            className="
              h-4
              w-4
              text-red-300
            "
          />

          Admin Panel
        </p>

      </div>

      {/* MENUS */}
      <div className="
        flex-1
        space-y-3
      ">

        {menus.map(
          (menu) => {

            const Icon =
              menu.icon;

            const active =

              pathname ===
              menu.href ||
              pathname.startsWith(
                `${menu.href}/`
              );

            return (

              <Link

                key={menu.href}

                href={menu.href}

                className={`
                  admin-nav-link
                  flex
                  items-center
                  justify-between
                  gap-4
                  px-5
                  py-4
                  rounded-2xl
                  transition-all

                  ${
                    active

                      ? "bg-white text-black shadow-xl shadow-red-950/20"

                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }
                `}
              >

                <span className="
                  flex
                  items-center
                  gap-4
                ">

                  <Icon
                    className="
                      w-6
                      h-6
                    "
                  />

                  <span className="
                    font-semibold
                    text-lg
                  ">
                    {menu.name}
                  </span>

                </span>

                <ChevronRight
                  className={`
                    h-4
                    w-4
                    transition
                    ${
                      active

                        ? "opacity-100"

                        : "opacity-0"
                    }
                  `}
                />

              </Link>
            );
          }
        )}

      </div>

      {/* LOGOUT */}
      <button

        onClick={
          handleLogout
        }

        className="
          mt-10
          flex
          items-center
          justify-center
          gap-3
          border
          border-white/20
          rounded-2xl
          py-4
          bg-white/5
          hover:bg-red-600
          hover:border-red-400
          hover:text-white
          transition-all
          font-semibold
          shadow-xl
          shadow-black/20
        "
      >

        <LogOut
          className="
            w-5
            h-5
          "
        />

        Logout

      </button>

    </aside>
  );
}