import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function ListingCard({ listing }) {
  const image = listing.images?.[0]?.url || "/assets/images/placeholder.jpg";

  return (
    <Link
      href={`/listings/${listing._id}`}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white capitalize shadow">
          {listing.category}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        <h2 className="line-clamp-1 text-xl font-semibold text-gray-900">
          {listing.title}
        </h2>

        <p className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4 text-violet-600" />
          {listing.city || "Location unavailable"}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-violet-600">
            Rs. {listing.price?.toLocaleString() || "0"}
          </p>

          <span className="text-sm text-gray-500 capitalize">
            / {listing.price_unit?.replace("_", " ") || "N/A"}
          </span>
        </div>
      </div>
    </Link>
  );
}
