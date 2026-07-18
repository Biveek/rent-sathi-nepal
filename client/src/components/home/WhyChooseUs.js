import {
  ShieldCheck,
  BadgeCheck,
  Headset,
  MapPin,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Owners",
    description:
      "Every verified owner goes through our verification process for a safer rental experience.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Listings",
    description:
      "High-quality listings with detailed information and transparent pricing.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Our support team is always available whenever you need assistance.",
  },
  {
    icon: MapPin,
    title: "Across Nepal",
    description:
      "Browse rooms, vehicles and land listings from different cities across Nepal.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">
            Why Choose RentSathi Nepal?
          </h2>

          <p className="mt-3 text-gray-600">
            Making renting easier, safer and more reliable.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}