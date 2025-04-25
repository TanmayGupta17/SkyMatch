"use client";

import { useState } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export function useGeolocation() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("User denied the request for geolocation");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable");
            break;
          case error.TIMEOUT:
            setLocationError("The request to get user location timed out");
            break;
          default:
            setLocationError("An unknown error occurred");
            break;
        }
      }
    );
  };

  return { coordinates, getLocation, locationError };
}
