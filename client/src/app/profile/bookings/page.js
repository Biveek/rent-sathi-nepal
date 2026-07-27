"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMyBookings, payBooking } from "@/api/booking";

const STATUS_STYLES = {
  PENDING:   "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELED:  "bg-red-100 text-red-600",
};

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [paying,   setPaying]   = useState(null);

  useEffect(() => {
    // redirect if not logged in
    const user = JSON.parse(localStorage.getItem("rentsathi_user") || "null");
    if (!user) { router.push("/login"); return; }

    getMyBookings()
      .then(data => setBookings(data || []))
      .catch(() => setError("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, []);

  const handlePay = async (bookingId, method) => {
    setPaying(bookingId);
    try {
      await payBooking(bookingId, method);
      // refresh
      const data = await getMyBookings();
      setBookings(data || []);
      alert("Payment successful! Booking confirmed.");
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    } finally {
      setPaying(null);
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {[1,2,3].map(i => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 mb-4 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/2 mb-3" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-1">My Bookings</h1>
      <p className="text-gray-500 text-sm mb-6">
        {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="text-5xl block mb-3">📅</span>
          <p className="text-lg">No bookings yet</p>
          <a href="/" className="text-violet-600 hover:underline text-sm mt-2 block">
            Browse listings →
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b._id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
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

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-500">
                    <div>
                      <span className="block text-xs text-gray-400 uppercase tracking-wide">Location</span>
                      {b.listing_id?.city || "—"}
                    </div>
                    <div>
                      <span className="block text-xs text-gray-400 uppercase tracking-wide">Check in</span>
                      {new Date(b.start_date).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="block text-xs text-gray-400 uppercase tracking-wide">Check out</span>
                      {new Date(b.end_date).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="block text-xs text-gray-400 uppercase tracking-wide">Total</span>
                      <span className="text-violet-600 font-semibold">
                        Rs. {b.total_amount?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {b.advance_amount && (
                    <p className="text-sm text-gray-500 mt-2">
                      Advance due: <span className="font-medium text-gray-700">
                        Rs. {b.advance_amount?.toLocaleString()}
                      </span>
                    </p>
                  )}
                </div>

                {/* Pay button — show if pending */}
                {b.status === "PENDING" && (
                  <div className="flex flex-col gap-2 min-w-36">
                    <p className="text-xs text-gray-400 text-center">Pay advance</p>
                    {["cash", "khalti", "card"].map(method => (
                      <button
                        key={method}
                        onClick={() => handlePay(b._id, method)}
                        disabled={paying === b._id}
                        className="px-3 py-2 bg-violet-600 text-white text-xs font-semibold rounded-lg hover:bg-violet-700 disabled:opacity-50 capitalize transition"
                      >
                        {paying === b._id ? "..." : `Pay via ${method}`}
                      </button>
                    ))}
                  </div>
                )}

                {b.status === "CONFIRMED" && (
                  <span className="text-green-600 text-sm font-medium">✅ Confirmed</span>
                )}

                {b.status === "CANCELED" && (
                  <span className="text-red-500 text-sm font-medium">❌ Cancelled</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}