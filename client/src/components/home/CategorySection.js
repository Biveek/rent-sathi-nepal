import Link from "next/link";

import {
  HERO_CATEGORIES
} from "@/constants/home";


export default function CategorySection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Browse Categories
          </h2>

          <p className="mt-3 text-gray-600">
            Choose the category that fits your rental needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {HERO_CATEGORIES.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={category.href}
                className="group rounded-2xl border bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-violet-500 hover:shadow-lg"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {category.title}
                </h3>

                <p className="mt-2 text-gray-600">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}