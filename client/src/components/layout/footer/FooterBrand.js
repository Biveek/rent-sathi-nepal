import Link from "next/link";

import { HOME_ROUTE } from "@/constants/routes";

export default function FooterBrand() {
  return (
    <div>
      <Link href={HOME_ROUTE} className="text-2xl font-bold text-white">
        RentSathi
      </Link>

      <p className="mt-4 text-sm leading-7 text-gray-400">
        Nepal's trusted rental marketplace for rooms, vehicles and land. Find
        verified listings or publish your own property with confidence.
      </p>
    </div>
  );
}
