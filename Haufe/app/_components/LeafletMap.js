"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { PassThrough } from "stream";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const position = [
  parseFloat(process.env.NEXT_PUBLIC_POSITION_LAT),
  parseFloat(process.env.NEXT_PUBLIC_POSITION_LNG),
];

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const handleError = (error) => {
      setError(error.message);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { location, error };
};

const LeafletMap = () => {
  const { location, error } = useGeolocation();

  const handleGetDirections = () => {
    if (location) {
      const userLocation = `${location.latitude},${location.longitude}`;
      const destination = `${process.env.NEXT_PUBLIC_POSITION_LAT},${process.env.NEXT_PUBLIC_POSITION_LNG}`;
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation}&destination=${destination}&travelmode=driving`;
      window.open(googleMapsUrl, "_blank");
    } else {
      alert(error || "Unable to retrieve your location.");
    }
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      className="rounded-2xl hover:shadow-lg hover:shadow-accent-500 duration-500"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          <div>
            <p>
              Click the button below to get driving directions to this location:
            </p>
            <button
              onClick={handleGetDirections}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Get Directions
            </button>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
