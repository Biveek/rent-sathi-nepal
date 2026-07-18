import {
  Menu,
  Home,
  Bed,
  Car,
  Trees,
  House,
  Phone,
  User,
  CalendarDays,
  LayoutDashboard,
  BadgeCheck,
  LogOut,
} from "lucide-react";

// Public Routes
export const HOME_ROUTE = "/";
export const CONTACT_ROUTE = "/contact";

// Authentication
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const VERIFICATION_ROUTE = "/verify";

// Listings
export const LISTINGS_ROUTE = "/listings";
export const ROOMS_ROUTE = "/listings/category/room";
export const VEHICLES_ROUTE = "/listings/category/vehicle";
export const LAND_ROUTE = "/listings/category/land";

export const CREATE_LISTING_ROUTE = "/listings/create";
export const MY_LISTINGS_ROUTE = "/listings/my";
export const BOOKINGS_ROUTE = "/booking";

// Admin
export const ADMIN_ROUTE = "/admin";

// User
export const PROFILE_ROUTE = "/profile";

// Navigation Menu
export const NAV_MENU = [
  {
    label: "Home",
    href: HOME_ROUTE,
    icon: Home,
  },
  {
    label: "Rooms",
    href: ROOMS_ROUTE,
    icon: Bed,
  },
  {
    label: "Vehicles",
    href: VEHICLES_ROUTE,
    icon: Car,
  },
  {
    label: "Land",
    href: LAND_ROUTE,
    icon: Trees,
  },
  {
    label: "Contact",
    href: CONTACT_ROUTE,
  },
];

export const USER_MENU = [
  {
    label: "My Profile",
    href: PROFILE_ROUTE,
    icon: User,
  },
  {
    label: "My Bookings",
    href: BOOKINGS_ROUTE,
    icon: CalendarDays,
  },
];

export const OWNER_MENU = [
  {
    label: "My Profile",
    href: PROFILE_ROUTE,
    icon: User,
  },
  {
    label: "My Listings",
    href: MY_LISTINGS_ROUTE,
    icon: House,
  },
  {
    label: "My Bookings",
    href: BOOKINGS_ROUTE,
    icon: CalendarDays,
  },
  {
    label: "Verification",
    href: VERIFICATION_ROUTE,
    icon: BadgeCheck,
  },
];

export const ADMIN_MENU = [
  {
    label: "Dashboard",
    href: ADMIN_ROUTE,
    icon: LayoutDashboard,
  },
  {
    label: "My Profile",
    href: PROFILE_ROUTE,
    icon: User,
  },
  {
    label: "My Listings",
    href: MY_LISTINGS_ROUTE,
    icon: House,
  },
  {
    label: "My Bookings",
    href: BOOKINGS_ROUTE,
    icon: CalendarDays,
  },
  {
    label: "Verification",
    href: VERIFICATION_ROUTE,
    icon: BadgeCheck,
  },
];
