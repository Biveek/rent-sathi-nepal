import {
  Star,
  Quote,
} from "lucide-react";

const testimonials = [
  {
    name: "Ram Sharma",
    location: "Kathmandu",
    review:
      "RentSathi made it incredibly easy to find a room within my budget. The listings were genuine and the owner was verified.",
  },
  {
    name: "Sita Karki",
    location: "Pokhara",
    review:
      "I rented a scooter during my trip. The booking process was simple and everything went smoothly.",
  },
  {
    name: "Hari Adhikari",
    location: "Chitwan",
    review:
      "Listing my property was quick and I started receiving rental inquiries within a few days.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">
            What Our Users Say
          </h2>

          <p className="mt-3 text-gray-600">
            Trusted by renters and property owners across Nepal.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Quote className="mb-5 h-8 w-8 text-violet-600" />

              <p className="leading-7 text-gray-600">
                "{testimonial.review}"
              </p>

              <div className="mt-6 flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <div className="mt-6">
                <h4 className="font-semibold">
                  {testimonial.name}
                </h4>

                <p className="text-sm text-gray-500">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}