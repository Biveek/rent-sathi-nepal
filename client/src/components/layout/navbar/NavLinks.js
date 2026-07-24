"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_MENU } from "@/constants/routes";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 md:flex">
      {NAV_MENU.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`font-medium transition-colors ${
            pathname === link.href
              ? "text-violet-700"
              : "text-gray-600 hover:text-violet-700"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}