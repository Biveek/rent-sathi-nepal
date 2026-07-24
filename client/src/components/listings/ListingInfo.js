export default function ListingInfo({ listing }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        {listing.title}
      </h1>

      <p className="mt-2 text-gray-500">
        📍 {listing.city}
      </p>

      <p className="mt-6">
        {listing.description}
      </p>
    </div>
  );
}