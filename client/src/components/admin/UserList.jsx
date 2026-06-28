import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/admin.js";

export default function UsersList() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    getAllUsers()
      .then(res => setUsers(res.data.data))
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: "#6b6560" }}>Loading users...</p>;
  if (error)   return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <p style={{ fontSize: "0.85rem", color: "#6b6560", marginBottom: "1rem" }}>
        {users.length} registered users
      </p>

      <div style={{ background: "#fff", border: "1px solid #e5e2df", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#faf9f8" }}>
              {["User", "Phone", "Role", "Verified Owner", "Joined"].map(h => (
                <th key={h} style={{
                  padding: "0.65rem 1rem", textAlign: "left",
                  fontSize: "0.73rem", fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: "0.07em",
                  color: "#6b6560", borderBottom: "1px solid #e5e2df"
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}
                style={{ borderBottom: "1px solid #e5e2df" }}
                onMouseEnter={e => e.currentTarget.style.background = "#faf9f8"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >
                <td style={{ padding: "0.85rem 1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "#fdf0e8", color: "#d4622a",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.7rem", fontWeight: 700, flexShrink: 0
                    }}>
                      {u.name?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: "0.88rem" }}>{u.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b6560" }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "0.85rem 1rem", fontSize: "0.86rem" }}>
                  {u.phone || "—"}
                </td>
                <td style={{ padding: "0.85rem 1rem" }}>
                  <RoleBadge role={u.role} />
                </td>
                <td style={{ padding: "0.85rem 1rem" }}>
                  {u.is_verified_owner
                    ? <span style={greenBadge}>✓ Verified</span>
                    : <span style={grayBadge}>Not verified</span>}
                </td>
                <td style={{ padding: "0.85rem 1rem", fontSize: "0.84rem", color: "#6b6560" }}>
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RoleBadge({ role }) {
  const colors = {
    admin: { background: "#fdf0e8", color: "#d4622a" },
    owner: { background: "#f0fdf4", color: "#166534" },
    user:  { background: "#f1f0ee", color: "#44403c" },
  };
  return (
    <span style={{
      ...colors[role],
      padding: "2px 10px", borderRadius: 99,
      fontSize: "0.75rem", fontWeight: 600,
    }}>
      {role}
    </span>
  );
}

const greenBadge = {
  background: "#f0fdf4", color: "#166534",
  padding: "2px 10px", borderRadius: 99,
  fontSize: "0.75rem", fontWeight: 600,
};
const grayBadge = {
  background: "#f1f0ee", color: "#6b6560",
  padding: "2px 10px", borderRadius: 99,
  fontSize: "0.75rem", fontWeight: 600,
};