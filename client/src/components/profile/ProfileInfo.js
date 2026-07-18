"use client";

import { Mail, Phone, ShieldCheck, Calendar } from "lucide-react";

export default function ProfileInfo({ user }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        Profile Information
      </h2>

      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <Mail className="mt-1 h-5 w-5 text-violet-600" />

          <div>
            <p className="text-sm text-gray-500">Email</p>

            <p className="font-medium text-gray-900">{user?.email || "-"}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Phone className="mt-1 h-5 w-5 text-violet-600" />

          <div>
            <p className="text-sm text-gray-500">Phone Number</p>

            <p className="font-medium text-gray-900">
              {user?.phone || "Not Added"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <ShieldCheck className="mt-1 h-5 w-5 text-violet-600" />

          <div>
            <p className="text-sm text-gray-500">Trust Score</p>

            <p className="font-medium text-gray-900">
              ⭐ {user?.trust_score ?? 0}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Calendar className="mt-1 h-5 w-5 text-violet-600" />

          <div>
            <p className="text-sm text-gray-500">Joined</p>

            <p className="font-medium text-gray-900">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
