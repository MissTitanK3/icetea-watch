'use client';
import dynamic from 'next/dynamic';

import { useRef, useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { ReportFormData } from '@/types/wizard';
// import { Map as LeafletMap } from 'leaflet'; // Add this
// import type { LatLng } from 'leaflet'; // And this
import { Map as LeafletMap } from 'leaflet';
import ReportDistanceGuard from './ReportDistanceGuard';

// Import dynamically with SSR off
const MapWrapper = dynamic(() => import('@/components/map/MapWrapper'), {
  ssr: false,
});

type Props = {
  data: ReportFormData;
  onUpdate: (values: Partial<ReportFormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

type LatLng = { lat: number; lng: number };

export default function LocationStep({ data, onUpdate, onNext, onBack }: Props) {
  const [position, setPosition] = useState<LatLng | null>(data.location || null);
  const [address, setAddress] = useState('');
  const [zoom, setZoom] = useState(13);
  const [manualWarning, setManualWarning] = useState(false);
  const [distanceFromUser, setDistanceFromUser] = useState<number | null>(null); // ⬅️ new

  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const handleZoom = () => {
      setZoom(map.getZoom());
    };

    map.on('zoomend', handleZoom);
    return () => {
      map.off('zoomend', handleZoom);
    };
  }, []);

  useEffect(() => {
    if (!position) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setPosition(coords);
          onUpdate({ location: coords });
        },
        () => {
          setManualWarning(true);
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddressSubmit = async () => {
    // Replace this with real geocoding in production
    const fakeCoords = { lat: 47.6062, lng: -122.3321 }; // Seattle fallback
    setPosition(fakeCoords);
    onUpdate({ location: fakeCoords });
  };

  const canContinue = !!position && (distanceFromUser === null || distanceFromUser <= 2);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Where did it happen?</h3>
        <p className="text-sm text-gray-600">Tap the map or allow GPS.</p>
      </div>

      {manualWarning && (
        <div className="text-sm text-red-600">No GPS detected. Type an address and we’ll estimate the location.</div>
      )}

      {manualWarning && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="123 Example St, City, State"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button onClick={handleAddressSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            Submit
          </button>
        </div>
      )}

      <div className="h-64 rounded overflow-hidden">
        {position && (
          <MapWrapper
            position={position}
            zoom={zoom}
            onZoomChange={setZoom}
            onSelect={(coords) => {
              setPosition(coords);
              onUpdate({ location: coords });
            }}
          />
        )}
      </div>
      {data.location && (
        <ReportDistanceGuard targetLocation={data.location} onDistanceChange={(dist) => setDistanceFromUser(dist)} />
      )}

      {zoom > 16 && (
        <div className="text-sm text-yellow-600">For safety, zoom out if this location is too specific.</div>
      )}

      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="px-4 py-2 border rounded">
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`px-4 py-2 rounded ${
            canContinue ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}>
          Continue
        </button>
      </div>
    </div>
  );
}
