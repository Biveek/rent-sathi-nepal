import { Bed, Car, Trees } from "lucide-react";

import {
  ROOMS_ROUTE,
  VEHICLES_ROUTE,
  LAND_ROUTE,
} from "./routes";


export const HERO_CATEGORIES = [
  {
    title: "Rooms",
    description: "Find rooms, apartments and flats.",
    href: ROOMS_ROUTE,
    icon: Bed,
  },
  {
    title: "Vehicles",
    description: "Cars, bikes and other vehicles.",
    href: VEHICLES_ROUTE,
    icon: Car,
  },
  {
    title: "Land",
    description: "Land and property for rent.",
    href: LAND_ROUTE,
    icon: Trees,
  },
];