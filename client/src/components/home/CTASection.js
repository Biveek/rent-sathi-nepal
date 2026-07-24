import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  LISTINGS_ROUTE,
  LOGIN_ROUTE,
} from "@/constants/routes";

import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="bg-violet-600 py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">

        <h2 className="text-4xl font-bold text-white">
          Ready to Find Your Perfect Rental?
        </h2>

        <p className="mt-5 max-w-2xl text-lg text-violet-100">
          Browse verified rooms, vehicles, and land listings across Nepal
          or join RentSathi today and publish your own listing.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <Button
            asChild
            size="lg"
            variant="secondary"
          >
            <Link href={LISTINGS_ROUTE}>
              Browse Listings
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white bg-transparent text-white hover:bg-white hover:text-violet-600"
          >
            <Link href={LOGIN_ROUTE}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

        </div>

      </div>
    </section>
  );
}