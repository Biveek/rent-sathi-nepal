"use client"

import { useEffect, useState } from "react";
import { getAllUsers } from "@/api/admin";

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

  if (loading) return <p className="text-gray-500">Loading users...</p>;
  if (error)   return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <p className="text-sm text-gray-500 mb-3">{users.length} registered users</p>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["User", "Phone", "Role", "Verified", "Joined"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  i === users.length - 1 ? "border-0" : ""
                }`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {u.name?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{u.name}</div>
                      <div className="text-xs text-gray-500">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{u.phone || "—"}</td>
                <td className="px-4 py-3">
                  <RoleBadge role={u.role} />
                </td>
                <td className="px-4 py-3">
                  {u.is_verified_owner
                    ? <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">✓ Verified</span>
                    : <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full">Not verified</span>
                  }
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
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
  const styles = {
    admin: "bg-orange-100 text-orange-700",
    owner: "bg-green-100 text-green-700",
    user:  "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`${styles[role]} text-xs font-semibold px-3 py-1 rounded-full`}>
      {role}
    </span>
  );
}