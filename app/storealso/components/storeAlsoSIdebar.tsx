"use client";
import Userbtn from "@/app/components/login/userbtn";
import Image from "next/image";
import Link from "next/link";
import { Bell, PieChart, Package, LucideTarget } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

const StorealsoSidebar = () => {
  const pathname = usePathname();

  const active = "bg-gray-200 dark:bg-gray-800 font-medium";
  const normal = "hover:bg-gray-100 dark:hover:bg-gray-800";
  const path = useParams()
  const id = path.id
  return (
    <div className="h-screen hidden lg:flex w-[260px] bg-white dark:bg-[#0f0f0f] border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between text-black dark:text-white">
      {/* Top */}
      <div>
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 px-6 py-6">
          <Image src="/logo.svg" width={36} height={36} alt="logo" />
          <h2 className="text-lg font-semibold">2k1s</h2>
        </Link>

        {/* Menu */}
        <nav className="flex flex-col gap-2 px-2">
          <Link
            href={`/storealso/${id}`}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              pathname.startsWith(`/storealso/${id}`) ? active : normal
            }`}
          >
            <PieChart size={18} />
            Analytics
          </Link>

          <Link
            href={`/storealso/audience/${id}`}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              pathname.startsWith("/storealso/audience") ? active : normal
            }`}
          >
            <LucideTarget size={18} />
            Audience
          </Link>

          <Link
            href="/notifications"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              pathname === "/notifications" ? active : normal
            }`}
          >
            <Bell size={18} />
            Notifications
          </Link>

          <Link
            href="/inventory"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              pathname === "/inventory" ? active : normal
            }`}
          >
            <Package size={18} />
            Inventory
          </Link>
        </nav>
      </div>

      {/* Bottom user */}
    </div>
  );
};

export default StorealsoSidebar;
