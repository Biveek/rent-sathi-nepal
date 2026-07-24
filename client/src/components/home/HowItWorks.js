import {
  Search,
  CalendarCheck,
  KeyRound,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Listings",
    description:
      "Search rooms, vehicles, or land using filters that match your needs.",
  },
  {
    icon: CalendarCheck,
    title: "Book Easily",
    description:
      "Contact the owner or submit your booking request in just a few clicks.",
  },
  {
    icon: KeyRound,
    title: "Move In or Drive Away",
    description:
      "Complete the booking and enjoy your rental with confidence.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">
            How RentSathi Works
          </h2>

          <p className="mt-3 text-gray-600">
            Renting has never been this simple.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-2xl bg-white p-8 shadow-sm"
              >
                <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">
                  {index + 1}
                </div>

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}