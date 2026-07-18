"use client";

import { use } from "react";
import ListingCard from "@/components/listings/ListingCard";
import useCategoryListings from "@/hooks/useCategoryListings";
import { getCategoryListings } from "@/api/listings";
import ListingGrid from "@/components/listings/ListingsGrid";
import { CATEGORIES } from "@/constants/categories";

export default function CategoryPage({ params }) {
  const { category } = use(params);

  const { listings, loading } = useCategoryListings(category);

  return (
    <ListingGrid
      title={CATEGORIES[category]?.title || "Listings"}
      listings={listings}
      loading={loading}
      emptyMessage={`No ${category} listings found.`}
    />
  );
}
