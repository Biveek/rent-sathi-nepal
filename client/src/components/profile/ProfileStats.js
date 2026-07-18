"use client";

import {
  Home,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";

export default function ProfileStats({ user }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {/* My Listings */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <Home className="h-8 w-8 text-violet-600" />

          <span className="text-3xl font-bold text-gray-900">
            {user?.listingCount ?? 0}
          </span>
        </div>

        <p className="font-semibold text-gray-900">
          My Listings
        </p>

        <p className="text-sm text-gray-500">
          Total active listings
        </p>
      </div>

      {/* My Bookings */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <CalendarDays className="h-8 w-8 text-violet-600" />

          <span className="text-3xl font-bold text-gray-900">
            {user?.bookingCount ?? 0}
          </span>
        </div>

        <p className="font-semibold text-gray-900">
          My Bookings
        </p>

        <p className="text-sm text-gray-500">
          Total bookings
        </p>
      </div>

      {/* Verification */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <BadgeCheck className="h-8 w-8 text-violet-600" />

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              user?.is_verified_owner
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {user?.is_verified_owner ? "Verified" : "Pending"}
          </span>
        </div>

        <p className="font-semibold text-gray-900">
          Verification
        </p>

        <p className="text-sm text-gray-500">
          Owner verification status
        </p>
      </div>
    </div>
  );
}