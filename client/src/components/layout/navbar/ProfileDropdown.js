"use client";

import Link from "next/link";
import { ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { LOGIN_ROUTE } from "@/constants/routes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  function handleLogout() {
    logout();
    router.push(LOGIN_ROUTE);
  }

  const isAdmin = user.role === "admin" || user.role === "SUPER_ADMIN";
  const isOwner = user.role === "OWNER";
  const isCustomer = user.role === "CUSTOMER";

  return (
    <div className="flex items-center gap-2">

      {/* Add Listing button — owner/admin */}
      {(isOwner || isAdmin) && (
        <Link
          href="/listings/create"
          className="bg-violet-600 text-white text-sm hover:bg-violet-500 px-3 py-2 rounded-lg"
        >
          + Add Listing
        </Link>
      )}

      {/* Admin panel button */}
      {isAdmin && (
        <Link
          href="/admin"
          className="bg-gray-800 text-white text-sm hover:bg-gray-700 px-3 py-2 rounded-lg"
        >
          🛡 Admin
        </Link>
      )}

      {/* Profile dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 transition hover:bg-gray-100">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.profile_photo?.url || "/default-avatar.png"}
                alt={user.name}
              />
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="hidden font-medium lg:block text-sm">
              {user.name?.split(" ")[0]}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">

          {/* Profile — everyone */}
          <DropdownMenuItem asChild>
            <Link href="/profile">👤 Profile</Link>
          </DropdownMenuItem>

          {/* Customer links */}
          {isCustomer && (
            <DropdownMenuItem asChild>
              <Link href="/profile/bookings">📅 My Bookings</Link>
            </DropdownMenuItem>
          )}

          {/* Owner links */}
          {isOwner && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/profile/owner">📋 Booking Requests</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/listings/my">🏠 My Listings</Link>
              </DropdownMenuItem>
            </>
          )}

          {/* Admin links */}
          {isAdmin && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/admin">🛡 Admin Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/owner">📋 Booking Requests</Link>
              </DropdownMenuItem>
            </>
          )}

          {/* Become owner — customer only */}
          {isCustomer && (
            <DropdownMenuItem asChild>
              <Link href="/profile">🔑 Become an Owner</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}