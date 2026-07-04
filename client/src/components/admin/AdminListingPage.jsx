"use client"
import { useEffect, useState } from "react";
import { getAllListings } from "@/api/admin";

export default function AdminListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

  useEffect(() => {
    getAllListings()
      .then(res => setListings(res.data.data))
      .catch(() => setError("Failed to load listings"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500">Loading listings...</p>;
  if (error)   return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">All Listings</h1>
      <p className="text-gray-500 text-sm mb-5">{listings.length} active listings</p>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Listing", "Category", "Price", "Location", "Owner", "Status"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listings.map((l, i) => (
              <tr key={l._id}
                className={`hover:bg-gray-50 transition-colors ${i < listings.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-sm">{l.title}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    l.category === "room"    ? "bg-orange-100 text-orange-700" :
                    l.category === "vehicle" ? "bg-blue-100 text-blue-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {l.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  Rs {l.price?.toLocaleString()}
                  <span className="text-gray-400 text-xs"> /{l.price_unit?.replace("per_", "")}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {l.area ? `${l.area}, ` : ""}{l.city}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {l.owner_id?.name || "—"}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    l.status === "active"   ? "bg-green-100 text-green-700" :
                    l.status === "removed"  ? "bg-red-100 text-red-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}