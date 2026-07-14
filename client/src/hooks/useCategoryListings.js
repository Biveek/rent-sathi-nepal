import { useEffect, useState } from "react";
import { getCategoryListings } from "@/api/listing.api";

export default function useCategoryListings(category) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const listings = await getCategoryListings(category);
        setListings(listings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [category]);

  return {
    listings,
    loading,
  };
}
