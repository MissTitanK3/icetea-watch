import { useCallback, useState, useRef } from 'react';
import { LatLngExpression } from 'leaflet';

export function useFindMe(
  onLocate: (coords: LatLngExpression) => void,
  getTranslation?: (key: string) => string | undefined,
  refreshIntervalMs = 600000, // 10 minutes
  movementThresholdM = 500, // 500 meters
) {
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastCoords = useRef<LatLngExpression | null>(null);
  const lastFetch = useRef<number>(0);

  const handleFindMe = useCallback(() => {
    setIsLocating(true);
    setError(null);

    const now = Date.now();
    const shouldFetch = !lastCoords.current || now - lastFetch.current > refreshIntervalMs;

    const emitLocation = (coords: LatLngExpression) => {
      lastCoords.current = coords;
      lastFetch.current = now;
      onLocate(coords);
      setIsLocating(false);
    };

    const success = (pos: GeolocationPosition) => {
      const coords: LatLngExpression = [pos.coords.latitude, pos.coords.longitude];

      const movedEnough = !lastCoords.current || getDistanceM(lastCoords.current, coords) > movementThresholdM;

      if (movedEnough || shouldFetch) {
        emitLocation(coords);
      } else {
        // Use cached location if move threshold not met
        emitLocation(lastCoords.current as LatLngExpression);
      }
    };

    const failure = () => {
      const fallbackMessage = getTranslation?.('locationDenied') ?? 'Unable to retrieve location.';
      alert(fallbackMessage);
      setError(fallbackMessage);
      setIsLocating(false);
    };

    if (!shouldFetch && lastCoords.current) {
      // Use cached without hitting GPS again
      emitLocation(lastCoords.current);
      return;
    }

    if (navigator.permissions) {
      navigator.permissions
        .query({ name: 'geolocation' as PermissionName })
        .then((result) => {
          if (result.state === 'granted' || result.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(success, failure, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 60000,
            });
          } else {
            failure();
          }
        })
        .catch(() => {
          navigator.geolocation.getCurrentPosition(success, failure, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
          });
        });
    } else {
      navigator.geolocation.getCurrentPosition(success, failure, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      });
    }
  }, [onLocate, getTranslation, refreshIntervalMs, movementThresholdM]);

  return { handleFindMe, isLocating, error };
}

// Helper: distance in meters between two [lat, lng] pairs
function getDistanceM(a: LatLngExpression, b: LatLngExpression) {
  const [lat1, lon1] = a as [number, number];
  const [lat2, lon2] = b as [number, number];
  const R = 6371e3; // meters
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLng = ((lon2 - lon1) * Math.PI) / 180;

  const x = Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
