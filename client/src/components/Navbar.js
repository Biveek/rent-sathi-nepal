"use client";
import Image from "next/image";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  NAV_MENU,
  REGISTER_ROUTE,
} from "@/constants/routes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/images/logo.png";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  
  function handleLogout() {
    logout();
    router.push(LOGIN_ROUTE);
  }

  return (
    <header>
      <nav className="flex flex-wrap sticky w-full items-center justify-between mx-auto px-4 z-20 shadow-md">
        {/* Logo */}
        <Link href={HOME_ROUTE} className="flex items-center gap-2">
          <Image
            className="h-15 w-15 object-contain"
            src={logo}
            alt="Logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Nav Menu */}
        <ul className="hidden md:flex items-center gap-5">
          {NAV_MENU.map((menu) => {
            const isActive =
              pathname == menu.href ||
              (menu.route !== HOME_ROUTE && pathname.startsWith(menu.route));
            return (
              <li key={menu.href}>
                <Link
                  href={menu.href}
                  className={`hover:text-orange-500/80 transition ${isActive ? "text-orange-500" : ""}`}
                >
                  {menu.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Side Buttons */}
        <div className="flex gap-2 mx-1 items-center">
          {user ? (
            <>
              {/* Add Listing — only for owner or admin */}
              {(user?.role === "OWNER" ||
                user?.role === "admin" ||
                user?.role === "SUPER_ADMIN") && (
                <Link
                  href="/listings/create"
                  className="bg-violet-600 text-white text-sm hover:bg-violet-500 p-3 rounded-lg"
                >
                  + Add Listing
                </Link>
              )}
              {/* Admin panel — admin only */}
              {(user.role === "admin" || user.role === "SUPER_ADMIN") && (
                <Link
                  href="/admin"
                  className="bg-gray-800 text-white text-sm hover:bg-gray-700 p-3 rounded-lg"
                >
                  🛡 Admin
                </Link>
              )}

              {/* Customer bookings */}
              {user.role == "CUSTOMER" && (
                <Link
                  href="/profile/bookings"
                  className="bg-gray-100 text-sm hover:bg-gray-200 p-3 rounded-lg"
                >
                  📅 Bookings
                </Link>
              )}

              {/* Profile */}
              <Link
                href="/profile"
                className="bg-gray-100 text-sm hover:bg-gray-200 p-3 rounded-lg"
              >
                👤 {user.name?.split(" ")[0]}
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white text-sm hover:bg-red-400 p-3 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href={LOGIN_ROUTE}
                className="bg-grey-300 text-sm hover:bg-gray-500 p-3 rounded-lg"
              >
                Sign In
              </Link>
              <Link
                href={REGISTER_ROUTE}
                className="bg-orange-500 text-white border border-gray-300 text-sm hover:bg-orange-300 p-3 rounded-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
