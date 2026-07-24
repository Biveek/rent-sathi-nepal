import Link from "next/link";

import { NAV_MENU } from "@/constants/routes";

export default function FooterLinks() {
  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold text-white">Quick Links</h3>

      <ul className="space-y-3">
        {NAV_MENU.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="transition hover:text-violet-400">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
