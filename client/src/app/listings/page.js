"use client";

import { useState } from "react";

import ListingsFilterBar from "@/components/listings/ListingsFilterBar";
import ListingsGrid from "@/components/listings/ListingsGrid";
import useListings from "@/hooks/useListings";

export default function ListingsPage() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const { listings, loading } = useListings(filters);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <ListingsFilterBar
        filters={filters}
        setFilters={setFilters}
      />

      <ListingsGrid
        title="Explore Listings"
        listings={listings}
        loading={loading}
        emptyMessage="No listings found."
      />
    </main>
  );
}