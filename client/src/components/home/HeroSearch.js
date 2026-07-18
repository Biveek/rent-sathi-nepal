"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSearch() {
  return (
    <form className="mt-8 flex w-full max-w-2xl overflow-hidden rounded-xl border bg-white shadow-md">
      <input
        type="text"
        placeholder="Search rooms, vehicles, or land..."
        className="flex-1 px-5 py-4 text-gray-700 outline-none"
      />

      <Button
        type="submit"
        className="h-auto rounded-none px-6"
      >
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  );
}