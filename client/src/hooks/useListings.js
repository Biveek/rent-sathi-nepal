import { useEffect, useState } from "react";
import { getListings } from "@/api/listings";

export default function useListings(params = {}) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);

      try {
        const listings = await getListings(params);
        setListings(listings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [JSON.stringify(params)]);

  return {
    listings,
    loading,
  };
}