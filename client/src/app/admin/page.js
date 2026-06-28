
"use client"

import { useState } from "react";
import UsersList from "@/components/admin/UserList";
import VerificationsList from "@/components/admin/VerificatonList";

const tabs = [
  { id: "users",         label: "All Users" },
  { id: "verifications", label: "Verifications" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
      <p className="text-gray-500 mb-6">Manage users and owner verifications</p>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "users"         && <UsersList/>}
      {activeTab === "verifications" && <VerificationsList />}
    </div>
  );
}