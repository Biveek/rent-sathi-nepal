"use client";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileNav from "./MobileNav";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Logo />

        <NavLinks />

        <div className="hidden md:flex items-center">
          <UserMenu />
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
        
      </div>
    </header>
  );
}