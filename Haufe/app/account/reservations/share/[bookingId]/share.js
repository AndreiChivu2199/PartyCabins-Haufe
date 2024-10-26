"use client";

import { useEffect, useState } from "react";

const useShareLink = (id) => {
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareLink(`${window.location.origin}/reservations/${id}`);
    }
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Reservation link copied to clipboard!");
  };

  return { shareLink, handleShare };
};

export default useShareLink;
