"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getOwnerBookings, updateBookingStatus } from "@/api/booking";

const STATUS_STYLES = {
  PENDING:   "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELED:  "bg-red-100 text-red-600",
};

export default function OwnerBookingsPage() {
  const router = useRouter();
  const [bookings,  setBookings]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");
  const [updating,  setUpdating]  = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("rentsathi_user") || "null");
    if (!user) { router.push("/login"); return; }
    if (user.role !== "OWNER" && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
      router.push("/"); return;
    }

    getOwnerBookings()
      .then(data => setBookings(data || []))
      .catch(() => setError("Failed to load booking requests"))
      .finally(() => setLoading(false));
  }, []);

  const handleStatus = async (bookingId, status) => {
    setUpdating(bookingId);
    try {
      await updateBookingStatus(bookingId, status);
      const data = await getOwnerBookings();
      setBookings(data || []);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {[1,2,3].map(i => (
        <div key={i} className="bg-white rounded-xl border p-5 mb-4 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/2 mb-3" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      ))}
    </div>
  );

  const pending   = bookings.filter(b => b.status === "PENDING");
  const others    = bookings.filter(b => b.status !== "PENDING");

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-1">Booking Requests</h1>
      <p className="text-gray-500 text-sm mb-6">
        {pending.length} pending · {bookings.length} total
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="text-5xl block mb-3">📋</span>
          <p className="text-lg">No booking requests yet</p>
          <a href="/listings/create" className="text-violet-600 hover:underline text-sm mt-2 block">
            Add a listing to get bookings →
          </a>
        </div>
      ) : (
        <div className="space-y-6">

          {/* Pending requests */}
          {pending.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-gray-700 mb-3">
                🟡 Pending Requests ({pending.length})
              </h2>
              <div className="space-y-3">
                {pending.map(b => (
                  <BookingRequestCard
                    key={b._id}
                    booking={b}
                    updating={updating}
                    onAccept={() => handleStatus(b._id, "CONFIRMED")}
                    onReject={() => handleStatus(b._id, "CANCELED")}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Past bookings */}
          {others.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-gray-700 mb-3">
                📁 Past Requests
              </h2>
              <div className="space-y-3">
                {others.map(b => (
                  <BookingRequestCard
                    key={b._id}
                    booking={b}
                    updating={updating}
                    readonly
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BookingRequestCard({ booking: b, updating, onAccept, onReject, readonly }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1">
          {/* Listing title */}
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-gray-900">
              {b.listing_id?.title || "Listing"}
            </h3>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              STATUS_STYLES[b.status] || "bg-gray-100 text-gray-600"
            }`}>
              {b.status}
            </span>
          </div>

          {/* Renter info */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-bold">
              {b.user_id?.name?.slice(0,2).toUpperCase() || "?"}
            </div>
            <span className="text-sm text-gray-600">{b.user_id?.name || "Renter"}</span>
            {b.user_id?.phone && (
              <span className="text-sm text-gray-400">· {b.user_id.phone}</span>
            )}
          </div>

          {/* Booking details */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-500">
            <div>
              <span className="block text-xs text-gray-400 uppercase tracking-wide">Check in</span>
              {new Date(b.start_date).toLocaleDateString()}
            </div>
            <div>
              <span className="block text-xs text-gray-400 uppercase tracking-wide">Check out</span>
              {new Date(b.end_date).toLocaleDateString()}
            </div>
            <div>
              <span className="block text-xs text-gray-400 uppercase tracking-wide">Amount</span>
              <span className="text-violet-600 font-semibold">
                Rs. {b.total_amount?.toLocaleString()}
              </span>
            </div>
          </div>

          {b.message && (
            <p className="mt-3 text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2 italic">
              "{b.message}"
            </p>
          )}
        </div>

        {/* Action buttons */}
        {!readonly && (
          <div className="flex flex-col gap-2 min-w-32">
            <button
              onClick={onAccept}
              disabled={!!updating}
              className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
            >
              {updating === b._id ? "..." : "✓ Accept"}
            </button>
            <button
              onClick={onReject}
              disabled={!!updating}
              className="px-4 py-2 border border-red-300 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 disabled:opacity-50 transition"
            >
              ✗ Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}