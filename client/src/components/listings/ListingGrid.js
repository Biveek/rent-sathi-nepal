import ListingCard from "./ListingCard";

export default function ListingGrid({
  title,
  listings,
  loading,
  emptyMessage,
}) {
  if (loading) {
    return <h1 className="p-10">Loading...</h1>;
  }

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      {listings.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </section>
  );
}