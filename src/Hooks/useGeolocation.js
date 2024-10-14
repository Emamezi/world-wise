import { useState } from "react";

function useGeolocation(defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function getLocation() {
    try {
      if (!navigator.geolocation)
        return setError("User has not provided authorization");

      setIsLoading(true);
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      });
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    } finally {
      // setIsLoading(false);
    }
  }

  return { isLoading, position, error, getLocation, setPosition };
}

export { useGeolocation };
