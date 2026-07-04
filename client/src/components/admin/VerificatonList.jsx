"use client"

import { useEffect, useState } from "react";
import { getAllVerifications, decideVerification } from "@/api/admin";

export default function VerificationsList() {
  const [verifications, setVerifications] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState("");
  const [rejectId,      setRejectId]      = useState(null);
  const [reason,        setReason]        = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    getAllVerifications()
      .then(res => setVerifications(res.data.data))
      .catch(() => setError("Failed to load verifications"))
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      await decideVerification(id, "approve");
      setVerifications(prev =>
        prev.map(v => v._id === id ? { ...v, status: "approved" } : v)
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to approve");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    if (!reason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }
    setActionLoading(id);
    try {
      await decideVerification(id, "reject", reason);
      setVerifications(prev =>
        prev.map(v => v._id === id
          ? { ...v, status: "rejected", rejection_reason: reason }
          : v
        )
      );
      setRejectId(null);
      setReason("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reject");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <p className="text-gray-500">Loading verifications...</p>;
  if (error)   return <p className="text-red-500">{error}</p>;
  if (verifications.length === 0)
    return <p className="text-gray-500">No verifications found.</p>;

  return (
    <div className="flex flex-col gap-4">
      {verifications.map(v => (
        <div key={v._id} className={`bg-white rounded-xl p-5 border transition-opacity ${
          v.status === "approved" ? "border-green-200" :
          v.status === "rejected" ? "border-red-200 opacity-60" :
          "border-gray-200"
        }`}>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              {/* Name + status */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">
                  {v.user_id?.name?.slice(0, 2).toUpperCase()}
                </div>
                <span className="font-semibold text-sm">{v.user_id?.name}</span>
                <StatusBadge status={v.status} />
              </div>

              {/* Meta info */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                <span>{v.user_id?.email}</span>
                <span>{v.phone}</span>
                <span>{v.address}</span>
                <span>Applied {new Date(v.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Citizenship image */}
              {v.citizenship_img && (
                <div className="mt-3">
                  <p className="text-xs text-gray-400 mb-1">Citizenship photo:</p>
                  <img
                    src={v.citizenship_img}
                    alt="citizenship"
                    onClick={() => window.open(v.citizenship_img, "_blank")}
                    className="w-40 h-24 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                    onError={e => e.target.style.display = "none"}
                  />
                </div>
              )}

              {/* Rejection reason */}
              {v.status === "rejected" && v.rejection_reason && (
                <p className="mt-2 text-xs text-red-600">
                  Reason: {v.rejection_reason}
                </p>
              )}
            </div>

            {/* Action buttons */}
            {v.status === "pending" && (
              <div className="flex flex-col gap-2 min-w-36">
                <button
                  onClick={() => handleApprove(v._id)}
                  disabled={!!actionLoading}
                  className="px-4 py-2 bg-green-700 text-white text-sm font-semibold rounded-lg hover:bg-green-800 disabled:opacity-50 transition-colors"
                >
                  {actionLoading === v._id ? "..." : "✓ Approve"}
                </button>

                {rejectId === v._id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      value={reason}
                      onChange={e => setReason(e.target.value)}
                      placeholder="Rejection reason..."
                      className="px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-orange-400"
                    />
                    <button
                      onClick={() => handleReject(v._id)}
                      disabled={!!actionLoading}
                      className="px-3 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                      Confirm rejection
                    </button>
                    <button
                      onClick={() => { setRejectId(null); setReason(""); }}
                      className="px-3 py-2 border border-gray-200 text-xs rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setRejectId(v._id)}
                    className="px-4 py-2 border border-red-200 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors"
                  >
                    ✗ Reject
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending:  "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };
  return (
    <span className={`${styles[status]} text-xs font-semibold px-3 py-1 rounded-full`}>
      {status}
    </span>
  );
}