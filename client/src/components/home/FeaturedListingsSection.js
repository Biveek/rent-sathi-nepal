"use client";

import Link from "next/link";

import useListings from "@/hooks/useListings";
import ListingsGrid from "@/components/listings/ListingsGrid";
import { Button } from "@/components/ui/button";
import { LISTINGS_ROUTE } from "@/constants/routes";

export default function FeaturedListingsSection() {
  const { listings, loading } = useListings();

  if (loading) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center">Loading listings...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Featured Listings</h2>
            <p className="mt-2 text-gray-600">
              Explore the latest rental listings.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href={LISTINGS_ROUTE}>View All</Link>
          </Button>
        </div>

        <ListingsGrid listings={listings.slice(0, 6)} />
      </div>
    </section>
  );
}