'use client';
import { useEffect, useState } from 'react';

type LatLng = { lat: number; lng: number };

type Props = {
  targetLocation: LatLng | null;
  maxDistanceKm?: number;
  onDistanceChange?: (distance: number | null) => void;
};

export default function ReportDistanceGuard({ targetLocation, maxDistanceKm = 15, onDistanceChange }: Props) {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (!targetLocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const current = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setUserLocation(current);
      const dist = getDistanceKm(current, targetLocation);
      setDistance(dist);
      onDistanceChange?.(dist);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetLocation]);

  if (!userLocation || distance === null) return null;

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

// Haversine formula
function getDistanceKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
