"use client"; // Ensure this component is client-side

import React from "react";
import { useRouter } from "next/navigation";

const ShareButton = ({ bookingId, cabinId, numGuests, observations }) => {
  const router = useRouter();

  const shareReservation = () => {
    const shareData = {
      title: `Reservation for Cabin ${cabinId}`,
      text: `I have a reservation at Cabin ${cabinId}. Number of guests: ${numGuests}. Observations: ${
        observations || "None."
      }`,
      url: `https://Party-cabins.com/account/reservations/${bookingId}`, // Replace with your actual URL
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Share successful"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert(
        "Sharing is not supported in your browser. You can copy the link manually: " +
          shareData.url
      );
    }
  };

  return (
    <button
      type="button"
      onClick={shareReservation}
      className="px-5 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-all duration-300"
    >
      Share Reservation
    </button>
  );
};

export default ShareButton;
