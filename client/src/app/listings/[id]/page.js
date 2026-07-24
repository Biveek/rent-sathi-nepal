"use client";

import { use } from "react";
import useListing from "@/hooks/useListing";
import ListingDetails from "@/components/listings/ListingDetails";

export default function ListingPage({ params }) {
  const { id } = use(params);

  const { listing, loading } = useListing(id);

  if (loading) {
    return <h1 className="p-10">Loading...</h1>;
  }

  if (!listing) {
    return <h1 className="p-10">Listing not found.</h1>;
  }

  return (
  <ListingDetails listing={listing} loading={loading} />
  );
}
