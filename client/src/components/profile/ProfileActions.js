"use client";

import Link from "next/link";
import {
  UserPen,
  House,
  CalendarDays,
  BadgeCheck,
  LogOut,
} from "lucide-react";

export default function ProfileActions({ onLogout }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/profile/edit"
          className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-violet-50"
        >
          <UserPen className="h-6 w-6 text-violet-600" />
          <span className="font-medium">Edit Profile</span>
        </Link>

        <Link
          href="/listings/my"
          className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-violet-50"
        >
          <House className="h-6 w-6 text-violet-600" />
          <span className="font-medium">My Listings</span>
        </Link>

        <Link
          href="/my-bookings"
          className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-violet-50"
        >
          <CalendarDays className="h-6 w-6 text-violet-600" />
          <span className="font-medium">My Bookings</span>
        </Link>

        <Link
          href="/verification"
          className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-violet-50"
        >
          <BadgeCheck className="h-6 w-6 text-violet-600" />
          <span className="font-medium">Verification</span>
        </Link>

        <button
          onClick={onLogout}
          className="flex items-center gap-3 rounded-xl border border-red-200 p-4 text-red-600 transition hover:bg-red-50 sm:col-span-2"
        >
          <LogOut className="h-6 w-6" />
          <span className="font-medium">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}