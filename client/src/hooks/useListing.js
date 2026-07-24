import { useEffect, useState } from "react";
import { getListingById } from "@/api/listings";

export default function useListing(id) {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListing() {
      setLoading(true);

      try {
        const listing = await getListingById(id);
        setListing(listing);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchListing();
    }
  }, [id]);

  return {
    listing,
    loading,
  };
}