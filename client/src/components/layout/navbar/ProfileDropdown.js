"use client";

import Link from "next/link";
import { ChevronDown, LogOut } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import {
  USER_MENU,
  OWNER_MENU,
  ADMIN_MENU,
} from "@/constants/routes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function ProfileDropdown() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const menuItems =
    user.role === "admin"
      ? ADMIN_MENU
      : user.is_verified_owner
      ? OWNER_MENU
      : USER_MENU;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 transition hover:bg-gray-100">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user.profile_photo?.url || "/default-avatar.png"}
              alt={user.name}
            />

            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <span className="hidden font-medium lg:block">
            {user.name}
          </span>

          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.href}
            asChild
          >
            <Link href={item.href}>
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}