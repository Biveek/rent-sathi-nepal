'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, navMenu, REGISTER_ROUTE } from '@/constants/routes';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import logo from '@/assets/images/logo.png';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!dropdownOpen) return;

    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [dropdownOpen]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    router.push(HOME_ROUTE);
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-white shadow-md">
      <nav className="flex flex-wrap items-center justify-between mx-auto px-4 py-3 max-w-7xl">
        <Link href={HOME_ROUTE} className="flex items-center gap-2">
          <Image
            className="h-10 w-auto object-contain"
            src={logo}
            alt="Logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-5">
          {navMenu.map((menu) => {
            const isActive = pathname === menu.route || (menu.route !== HOME_ROUTE && pathname.startsWith(menu.route));
            return (
              <li key={menu.route}>
                <Link
                  href={menu.route}
                  className={`hover:text-orange-500/80 transition ${isActive ? 'text-orange-500' : ''}`}
                >
                  {menu.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex gap-2 mx-1 items-center">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-gray-300"
              >
                <span>{user.name || user.email}</span>
                <span className="text-gray-400">▾</span>
              </button>
              <div
                className={`absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition ${dropdownOpen ? 'block' : 'hidden'}`}
              >
                <Link
                  href={PROFILE_ROUTE}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href={LOGIN_ROUTE} className="bg-gray-300 text-sm hover:bg-gray-400 p-3 rounded-lg">
                Sign In
              </Link>
              <Link href={REGISTER_ROUTE} className="bg-orange-500 text-white border border-gray-300 text-sm hover:bg-orange-600 p-3 rounded-lg">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
