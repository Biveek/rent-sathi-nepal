"use client";

import ListingsGrid from "./ListingsGrid";
import useCategoryListings from "@/hooks/useCategoryListings";

export default function SimilarListings({ category, currentListingId }) {
  const { listings, loading } = useCategoryListings(category);

  const similarListings = listings
    .filter((listing) => listing._id !== currentListingId)
    .slice(0, 4);

  return (
    <ListingsGrid
      title="Similar Listings"
      listings={similarListings}
      loading={loading}
      emptyMessage="No similar listings found."
    />
  );
}
