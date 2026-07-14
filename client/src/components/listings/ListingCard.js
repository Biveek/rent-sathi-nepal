import Link from "next/link";

export default function ListingCard({ listing }) {
  return (
    <Link
      href={`/listings/${listing._id}`}
      className="block overflow-hidden rounded-xl border bg-white shadow transition hover:shadow-lg"
    >
      <img
        src={listing.images?.[0]?.url}
        alt={listing.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">{listing.title}</h2>

        <p className="text-gray-500">📍 {listing.city}</p>

        <p className="mt-2 text-violet-600 font-bold">
          Rs. {listing.price} / {listing.price_unit.replace("_", " ")}
        </p>
      </div>
    </Link>
  );
}
