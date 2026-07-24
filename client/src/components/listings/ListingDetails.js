import BookingCard from "./BookingCard";
import ListingGallery from "./ListingGallery";
import ListingInfo from "./ListingInfo";
import OwnerCard from "./OwnerCard";
import SimilarListings from "./SimilarListings";

export default function ListingDetails({ listing, loading }) {
  if (loading) {
    return <h1 className="p-10">Loading...</h1>;
  }

  if (!listing) {
    return <h1 className="p-10">Listing not found.</h1>;
  }

  return (
    <section className="max-w-7xl mx-auto p-6">
      <ListingGallery images={listing.images} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ListingInfo listing={listing} />
        </div>

        <BookingCard listing={listing} />
      </div>

      <div className="mt-10 max-w-md">
        <OwnerCard owner={listing.owner_id} />
      </div>

      <div className="mt-12">
        <SimilarListings
          category={listing.category}
          currentListingId={listing._id}
        />
      </div>
    </section>
  );
}
