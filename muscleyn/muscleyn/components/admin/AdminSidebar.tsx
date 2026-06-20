"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  ShieldCheck,
  Settings,
  MessageSquare,
  Star,
  FileText,
  Zap,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  const menus = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Brands",
      href: "/admin/brands",
      icon: Package,
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: Package,
    },
    {
      name: "Sub Categories",
      href: "/admin/sub-categories",
      icon: Package,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      name: "Banners",
      href: "/admin/banners",
      icon: ImageIcon,
    },
    {
      name: "Coupons",
      href: "/admin/coupons",
      icon: TicketPercent,
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
    },
    {
      name: "Deals of the Day",
      href: "/admin/deals",
      icon: Sparkles,
    },
    {
      name: "Authenticity Links",
      href: "/admin/authenticity",
      icon: ShieldCheck,
    },
    {
      name: "Terms & Conditions",
      href: "/admin/cms?tab=terms",
      icon: FileText,
    },
    {
      name: "Privacy Policy",
      href: "/admin/cms?tab=privacy",
      icon: ShieldCheck,
    },
    {
      name: "Homepage Banner",
      href: "/admin/cms?tab=flash",
      icon: Zap,
    },
    {
      name: "Contact Enquiries",
      href: "/admin/enquiries",
      icon: MessageSquare,
    },
    {
      name: "Product Reviews",
      href: "/admin/reviews",
      icon: Star,
    },
  ];

  return (
    <aside className="admin-sidebar w-[280px] text-white h-screen fixed left-0 top-0 bottom-0 overflow-y-auto flex flex-col px-6 py-8 border-r border-white/5 z-40">
      {/* LOGO */}
      <div className="mb-8 flex flex-col gap-3 pl-1">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-900/50">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-widest text-white leading-none">
              PRABHA PHARMA
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase tracking-widest">
              <Sparkles className="h-3 w-3 text-red-500" />
              Admin Panel
            </p>
          </div>
        </div>
        <div className="h-px bg-white/10 w-full" />
      </div>


      {/* MENUS */}
      <div className="flex-1 space-y-3">
        {menus.map((menu) => {
          const Icon = menu.icon;
          
          // Match active tab if has query parameters, otherwise check base path match
          const active = menu.href.includes("?")
            ? (pathname === menu.href.split("?")[0] && currentTab === new URLSearchParams(menu.href.split("?")[1]).get("tab"))
            : (pathname === menu.href || (menu.href !== "/admin/dashboard" && pathname.startsWith(`${menu.href}/`)));

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`admin-nav-link flex items-center justify-between gap-4 px-5 py-4 rounded-2xl transition-all ${
                active
                  ? "bg-white text-black shadow-xl shadow-red-950/20"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-4">
                <Icon className="w-6 h-6" />
                <span className="font-semibold text-lg">{menu.name}</span>
              </span>
              <ChevronRight className={`h-4 w-4 transition ${active ? "opacity-100" : "opacity-0"}`} />
            </Link>
          );
        })}
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mt-10 flex items-center justify-center gap-3 border border-white/20 rounded-2xl py-4 bg-white/5 hover:bg-red-600 hover:border-red-400 hover:text-white transition-all font-semibold shadow-xl shadow-black/20 cursor-pointer"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
}