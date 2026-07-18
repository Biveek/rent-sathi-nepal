import Image from "next/image";
import Link from "next/link";

import HeroSearch from "./HeroSearch";
import HeroImage from "@/assets/images/hero-image.jpg";

import { Button } from "@/components/ui/button";
import { LISTINGS_ROUTE, REGISTER_ROUTE } from "@/constants/routes";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto grid min-h-[80vh] max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-6 lg:px-8">
        {/* Left */}
        <div>
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
            🇳🇵 Nepal's Rental Marketplace
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            Find Your Perfect Rental in Nepal
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Rent rooms, vehicles, and land from trusted owners across Nepal.
          </p>

          <HeroSearch />

          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild>
              <Link href={LISTINGS_ROUTE}>
                Browse Listings
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href={REGISTER_ROUTE}>
                Become an Owner
              </Link>
            </Button>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <Image
            src={HeroImage}
            alt="RentSathi Hero"
            width={600}
            height={500}
            priority
            className="h-auto w-full max-w-xl"
          />
        </div>
      </div>
    </section>
  );
}