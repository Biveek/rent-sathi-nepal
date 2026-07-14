export default function ListingDetails({ listing, loading }) {
  if (loading) {
    return <h1 className="p-10">Loading...</h1>;
  }

  if (!listing) {
    return <h1 className="p-10">Listing not found.</h1>;
  }

  return (
    <section className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Image Gallery
          </h2>

          <div className="h-96 rounded-xl bg-gray-100 flex items-center justify-center">
            Gallery Coming Soon
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            {listing.title}
          </h1>

          <p className="mt-2 text-gray-500">
            📍 {listing.city}
          </p>

          <p className="mt-4 text-2xl font-bold text-violet-600">
            Rs. {listing.price} / {listing.price_unit.replace("_", " ")}
          </p>

          <p className="mt-6">
            {listing.description}
          </p>
        </div>
      </div>
    </section>
  );
}