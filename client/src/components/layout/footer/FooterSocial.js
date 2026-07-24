"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

const socialLinks = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "https://facebook.com",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://instagram.com",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
  },
];

export default function FooterSocial() {
  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold text-white">
        Follow Us
      </h3>

      <div className="flex items-center gap-4">
        {socialLinks.map((social) => {
          const Icon = social.icon;

          return (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-all duration-300 hover:bg-violet-600 hover:text-white"
            >
              <Icon size={18} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}