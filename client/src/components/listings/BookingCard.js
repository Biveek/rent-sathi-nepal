"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createBooking } from "@/api/booking";

export default function BookingCard({ listing }) {
  const router  = useRouter();
  const { user } = useAuth();

  const today = new Date().toISOString().split("T")[0];
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const defaultEnd = nextMonth.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate,   setEndDate]   = useState(defaultEnd);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState(false);

const calcAmounts = () => {
  const start = new Date(startDate);
  const end   = new Date(endDate);
  const diffMs   = end - start;
  const diffDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  let units = diffDays;
  let unitLabel = "day";

  if (listing.price_unit === "per_month") {
    units = Math.max(1, Math.round(diffDays / 30));
    unitLabel = "month";
  } else if (listing.price_unit === "per_hour") {
    units = Math.max(1, Math.round(diffDays * 24));
    unitLabel = "hour";
  }

  const total   = units * listing.price;
  const advance = Math.round(total * 0.3);
  return { units, unitLabel, total, advance };
};

const { units, unitLabel, total, advance } = calcAmounts();

  const handleBooking = async () => {
    if (!user) { router.push("/login"); return; }
    if (new Date(endDate) <= new Date(startDate)) {
      setError("End date must be after start date");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createBooking({
        listing_id: listing._id,
        start_date: startDate,
        end_date:   endDate,
      });
      setSuccess(true);
      setTimeout(() => router.push("/profile/bookings"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  const handleContact = () => {
    if (!user) { router.push("/login"); return; }
    router.push(`/chat?ownerId=${listing.owner_id?._id}&listingId=${listing._id}`);
  };

  if (success) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-md lg:sticky lg:top-24 text-center py-10">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-lg font-semibold text-green-700">Booking Request Sent!</h3>
        <p className="text-sm text-gray-500 mt-1">Redirecting to your bookings...</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-md lg:sticky lg:top-24">
      {/* Price */}
      <h2 className="text-3xl font-bold text-violet-600">
        Rs. {listing.price.toLocaleString()}
      </h2>
      <p className="mt-1 text-gray-500 capitalize text-sm">
        {listing.price_unit.replace(/_/g, " ")}
      </p>
      <p className="text-sm text-gray-400 mt-1">
        Advance (30%): Rs. {Math.round(listing.price * 0.3).toLocaleString()}
      </p>

      {/* Date pickers */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">
            Start
          </label>
          <input
            type="date"
            value={startDate}
            min={today}
            onChange={e => setStartDate(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">
            End
          </label>
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={e => setEndDate(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Price breakdown */}
      {units > 0 && (
        <div className="mt-4 bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Rs. {listing.price.toLocaleString()} × {units} {unitLabel}{units > 1 ? "s" : ""}</span>
            <span>Rs. {total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Advance (30%)</span>
            <span>Rs. {advance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-200 pt-2">
            <span>Due now</span>
            <span className="text-violet-600">Rs. {advance.toLocaleString()}</span>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

      {/* Buttons */}
      <div className="mt-5 space-y-3">
        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full rounded-lg bg-violet-600 py-3 font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition"
        >
          {loading ? "Sending request..." : user ? "Book Now" : "Sign in to Book"}
        </button>

        <button
          onClick={handleContact}
          className="w-full rounded-lg border border-violet-600 py-3 font-medium text-violet-600 hover:bg-violet-50 transition"
        >
          💬 Contact Owner
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center mt-3">
        You won't be charged until the owner accepts
      </p>
    </div>
  );
}