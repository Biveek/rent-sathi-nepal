"use client";

import ListingGrid from "./ListingGrid";
import useCategoryListings from "@/hooks/useCategoryListings";

export default function SimilarListings({ category, currentListingId }) {
  const { listings, loading } = useCategoryListings(category);

  const similarListings = listings
    .filter((listing) => listing._id !== currentListingId)
    .slice(0, 4);

  return (
    <ListingGrid
      title="Similar Listings"
      listings={similarListings}
      loading={loading}
      emptyMessage="No similar listings found."
    />
  );
}
