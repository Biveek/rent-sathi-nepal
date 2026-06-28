import { useEffect, useState } from "react";
import { getAllVerifications, decideVerification } from "../../api/admin.js";

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
        prev.map(v => v._id === id ? { ...v, status: "rejected", rejection_reason: reason } : v)
      );
      setRejectId(null);
      setReason("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reject");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <p style={{ color: "#6b6560" }}>Loading verifications...</p>;
  if (error)   return <p style={{ color: "red" }}>{error}</p>;
  if (verifications.length === 0)
    return <p style={{ color: "#6b6560" }}>No verifications found.</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {verifications.map(v => (
        <div key={v._id} style={{
          background: "#fff",
          border: `1px solid ${v.status === "approved" ? "#6ee7b7" : v.status === "rejected" ? "#fca5a5" : "#e5e2df"}`,
          borderRadius: 10,
          padding: "1.25rem",
          opacity: v.status !== "pending" ? 0.7 : 1,
        }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "#fdf0e8", color: "#d4622a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.7rem", fontWeight: 700,
                }}>
                  {v.user_id?.name?.slice(0, 2).toUpperCase()}
                </div>
                <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                  {v.user_id?.name}
                </span>
                <StatusBadge status={v.status} />
              </div>

              {/* Meta */}
              <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                {[
                  { label: v.user_id?.email },
                  { label: v.phone },
                  { label: v.address },
                  { label: `Applied ${new Date(v.createdAt).toLocaleDateString()}` },
                ].map((m, i) => (
                  <span key={i} style={{ fontSize: "0.8rem", color: "#6b6560" }}>
                    {m.label}
                  </span>
                ))}
              </div>

              {/* Citizenship image */}
              {v.citizenship_img && (
                <div style={{ marginTop: 10 }}>
                  <p style={{ fontSize: "0.75rem", color: "#6b6560", marginBottom: 4 }}>
                    Citizenship photo:
                  </p>
                  <img
                    src={v.citizenship_img}
                    alt="citizenship"
                    onClick={() => window.open(v.citizenship_img, "_blank")}
                    style={{
                      width: 160, height: 100, objectFit: "cover",
                      borderRadius: 6, border: "1px solid #e5e2df",
                      cursor: "pointer",
                    }}
                    onError={e => e.target.style.display = "none"}
                  />
                </div>
              )}

              {/* Rejection reason if rejected */}
              {v.status === "rejected" && v.rejection_reason && (
                <p style={{ marginTop: 8, fontSize: "0.82rem", color: "#b91c1c" }}>
                  Reason: {v.rejection_reason}
                </p>
              )}
            </div>

            {/* Action buttons — only show for pending */}
            {v.status === "pending" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 140 }}>

                {/* Approve */}
                <button
                  onClick={() => handleApprove(v._id)}
                  disabled={!!actionLoading}
                  style={{
                    padding: "0.55rem 1rem",
                    background: actionLoading === v._id ? "#e5e2df" : "#166534",
                    color: "#fff", border: "none", borderRadius: 6,
                    fontSize: "0.84rem", fontWeight: 600, cursor: "pointer",
                  }}
                >
                  {actionLoading === v._id ? "..." : "✓ Approve"}
                </button>

                {/* Reject toggle */}
                {rejectId === v._id ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <input
                      value={reason}
                      onChange={e => setReason(e.target.value)}
                      placeholder="Rejection reason..."
                      style={{
                        padding: "0.45rem 0.75rem",
                        border: "1px solid #e5e2df",
                        borderRadius: 6, fontSize: "0.82rem",
                        fontFamily: "DM Sans",
                      }}
                    />
                    <button
                      onClick={() => handleReject(v._id)}
                      disabled={!!actionLoading}
                      style={{
                        padding: "0.45rem",
                        background: "#b91c1c", color: "#fff",
                        border: "none", borderRadius: 6,
                        fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
                      }}
                    >
                      Confirm rejection
                    </button>
                    <button
                      onClick={() => { setRejectId(null); setReason(""); }}
                      style={{
                        padding: "0.45rem", background: "none",
                        border: "1px solid #e5e2df", borderRadius: 6,
                        fontSize: "0.82rem", cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setRejectId(v._id)}
                    style={{
                      padding: "0.55rem 1rem",
                      background: "#fff", color: "#b91c1c",
                      border: "1px solid #fca5a5", borderRadius: 6,
                      fontSize: "0.84rem", fontWeight: 600, cursor: "pointer",
                    }}
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
    pending:  { background: "#fef9c3", color: "#854d0e" },
    approved: { background: "#f0fdf4", color: "#166534" },
    rejected: { background: "#fef2f2", color: "#b91c1c" },
  };
  return (
    <span style={{
      ...styles[status],
      padding: "2px 10px", borderRadius: 99,
      fontSize: "0.72rem", fontWeight: 600,
    }}>
      {status}
    </span>
  );
}