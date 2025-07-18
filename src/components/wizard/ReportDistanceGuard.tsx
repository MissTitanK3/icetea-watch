'use client';
import { useEffect, useState, useRef } from 'react';

type LatLng = { lat: number; lng: number };

type Props = {
  targetLocation: LatLng | null;
  maxDistanceKm?: number;
  onDistanceChange?: (distance: number | null) => void;
  refreshIntervalMs?: number; // default 10 minutes
  movementThresholdM?: number; // default 500 meters
};

export default function ReportDistanceGuard({
  targetLocation,
  maxDistanceKm = 15,
  onDistanceChange,
  refreshIntervalMs = 600000,
  movementThresholdM = 500,
}: Props) {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const lastCoords = useRef<LatLng | null>(null);
  const lastFetch = useRef<number>(0);

  useEffect(() => {
    if (!targetLocation) {
      onDistanceChange?.(null);
      return;
    }

    let cancelled = false;

    async function fetchLocation() {
      const now = Date.now();
      const shouldFetch = !lastCoords.current || now - lastFetch.current > refreshIntervalMs;

      if (!shouldFetch && lastCoords.current) {
        const dist = safeDistanceKm(lastCoords.current, targetLocation);
        setUserLocation(lastCoords.current);
        setDistance(dist);
        onDistanceChange?.(dist);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (cancelled) return;
          const current = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          const movedEnough =
            !lastCoords.current || (safeDistanceKm(lastCoords.current, current) ?? 0) * 1000 > movementThresholdM;

          if (movedEnough || !lastCoords.current) {
            lastCoords.current = current;
            lastFetch.current = now;
          }

          const dist = safeDistanceKm(current, targetLocation);
          setUserLocation(current);
          setDistance(dist);
          onDistanceChange?.(dist);
        },
        () => {
          onDistanceChange?.(null);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
      );
    }

    fetchLocation();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetLocation]);

  if (!userLocation || distance === null) {
    return <p className="text-sm text-gray-500">Validating your location to be within {maxDistanceKm}km...</p>;
  }

  if (distance > maxDistanceKm) {
    return (
      <p className="text-sm text-yellow-600">
        ⚠️ This location is <strong>{distance.toFixed(2)}km</strong> away from your current location. Reports should
        generally be made only from your vicinity.
      </p>
    );
  }

  return null;
}

// Null-safe Haversine
function safeDistanceKm(a: LatLng | null, b: LatLng | null): number | null {
  if (!a || !b) return null;

  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
