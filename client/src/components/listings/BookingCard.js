export default function BookingCard({ listing }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-md lg:sticky lg:top-24">
      <h2 className="text-3xl font-bold text-violet-600">
        Rs. {listing.price.toLocaleString()}
      </h2>

      <p className="mt-1 text-gray-500 capitalize">
        {listing.price_unit.replace("_", " ")}
      </p>

      <div className="mt-6 space-y-3">
        <button className="w-full rounded-lg border border-violet-600 py-3 font-medium text-violet-600 transition hover:bg-violet-50">
          Contact Owner
        </button>

        <button className="w-full rounded-lg bg-violet-600 py-3 font-medium text-white transition hover:bg-violet-700">
          Book Now
        </button>
      </div>
    </div>
  );
}
