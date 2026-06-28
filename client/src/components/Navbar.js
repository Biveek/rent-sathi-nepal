"use client";
import Image from "next/image";
import { HOME_ROUTE, LOGIN_ROUTE, navMenu, REGISTER_ROUTE } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/images/logo.png";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header >
      <nav className="flex flex-wrap sticky w-full items-center justify-between mx-auto px-4 z-20 shadow-md">
        <Link href={HOME_ROUTE} className="flex items-center gap-2">
        <Image className="h-15 w-15 object-contain"
          src={logo}
          alt="Logo"
          width={120}
          height={40}
            priority
        />
      </Link>

        <ul className="hidden md:flex items-center gap-5 ">
          {navMenu.map((menu) => {
            const isActive =
              pathname == menu.route ||
              (menu.route !== HOME_ROUTE && pathname.startsWith(menu.route));

            return (
              <li key={menu.route}>
                <Link
                  href={menu.route}
                  className={`hover:text-orange-500/80 transition ${isActive ? "text-orange-500" : ""}`}
                >
                  {menu.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex gap-2 mx-1">
          <Link
            href={LOGIN_ROUTE}
            className="bg-grey-300 text-sm hover:bg-gray-500 p-3 rounded-lg"
          >
            Sign In
          </Link>

          <Link
            href={REGISTER_ROUTE}
            className="bg-orange-500 text-white border border-gray-300  text-sm hover:bg-orange-300  p-3 rounded-lg"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
