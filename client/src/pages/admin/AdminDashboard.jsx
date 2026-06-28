import { useState } from "react";
import UsersList          from "../../components/admin/UserList";
import VerificationsList  from "../../components/admin/VerificatonList";

const tabs = [
  { id: "users",         label: "All Users" },
  { id: "verifications", label: "Verifications" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "DM Serif Display", fontSize: "2rem", marginBottom: "0.25rem" }}>
        Admin Dashboard
      </h1>
      <p style={{ color: "#6b6560", marginBottom: "1.5rem" }}>
        Manage users and owner verifications
      </p>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e5e2df", marginBottom: "1.5rem" }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "0.75rem 1.25rem",
              fontFamily: "DM Sans",
              fontSize: "0.9rem",
              fontWeight: 500,
              border: "none",
              background: "none",
              cursor: "pointer",
              borderBottom: activeTab === tab.id ? "2px solid #d4622a" : "2px solid transparent",
              color: activeTab === tab.id ? "#d4622a" : "#6b6560",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "users"         && <UsersList />}
      {activeTab === "verifications" && <VerificationsList />}
    </div>
  );
}