"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import {
  NAV_MENU,
  USER_MENU,
  OWNER_MENU,
  ADMIN_MENU,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "@/constants/routes";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileNav() {
  const { user, logout } = useAuth();

  const menuItems =
    user?.role === "admin"
      ? ADMIN_MENU
      : user?.is_verified_owner
        ? OWNER_MENU
        : USER_MENU;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-md p-2 hover:bg-gray-100">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>RentSathi</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-2">

          {NAV_MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-3 transition hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}

          <hr className="my-4" />

          {!user ? (
            <>
              <Link
                href={LOGIN_ROUTE}
                className="rounded-lg px-4 py-3 transition hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                href={REGISTER_ROUTE}
                className="rounded-lg px-4 py-3 transition hover:bg-gray-100"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-4 py-3 transition hover:bg-gray-100"
                >
                  {item.label}
                </Link>
              ))}

              <button
                onClick={logout}
                className="rounded-lg px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </SheetContent>
    </Sheet>
  );
}