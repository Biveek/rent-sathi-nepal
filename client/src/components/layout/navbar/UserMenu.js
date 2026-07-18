"use client";

import Link from "next/link";

import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

export default function UserMenu() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href={LOGIN_ROUTE}
          className="font-medium text-gray-700 transition-colors hover:text-violet-700"
        >
          Login
        </Link>

        <Link
          href={REGISTER_ROUTE}
          className="rounded-lg bg-violet-600 px-4 py-2 font-medium text-white transition-colors hover:bg-violet-700"
        >
          Register
        </Link>
      </div>
    );
  }

  return <ProfileDropdown />;
}