export default function OwnerCard({ owner }) {
  if (!owner) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">
        Owner Information
      </h2>

      <div className="flex items-center gap-4">
        <img
          src={owner.profile_photo?.url || "/default-avatar.png"}
          alt={`${owner.name}'s profile`}
          className="h-16 w-16 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-lg">
            {owner.name}
          </h3>

          <p className="text-sm text-gray-500">
            ⭐ Trust Score: {owner.trust_score}
          </p>

          {owner.is_verified_owner && (
            <p className="text-sm font-medium text-green-600">
              ✔ Verified Owner
            </p>
          )}
        </div>
      </div>
    </div>
  );
}