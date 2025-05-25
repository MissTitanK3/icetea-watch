'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';
import { Map as LeafletMap } from 'leaflet';
import ReportDistanceGuard from './ReportDistanceGuard';
import { useTranslations } from '@/lib/il8n/useTranslations';
import { useWizard } from './WizardContext';
import { useFindMe } from '@/lib/useFindMe';

const MapWrapper = dynamic(() => import('@/components/map/MapWrapper'), { ssr: false });

type LatLng = { lat: number; lng: number };

export default function LocationStep() {
  const { t } = useTranslations();
  const { setCanContinue, formData, setFormData } = useWizard();
  const [position, setPosition] = useState<LatLng | null>(formData.location || null);
  const [zoom, setZoom] = useState(17);
  const [distanceFromUser, setDistanceFromUser] = useState<number | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  const { handleFindMe, isLocating, error } = useFindMe((coords) => {
    const [lat, lng] = coords as [number, number];
    const normalized = { lat, lng };
    setPosition(normalized);
    setFormData((prev) => ({ ...prev, location: normalized }));
  });

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
      handleFindMe(); // ⬅️ initial attempt to locate
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const valid = !!position && (distanceFromUser === null || distanceFromUser <= 2);
    setCanContinue(valid);
  }, [position, distanceFromUser, setCanContinue]);

  return (
    <div className="space-y-4">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="pt-2">
          <h3 className="text-lg font-semibold">{t('locationPrompt')}</h3>
          <p className="text-sm text-gray-600">{t('tapMapOrGPS')}</p>
        </div>
        <div className="pt-2">
          <button
            onClick={handleFindMe}
            disabled={isLocating}
            className="bg-green-800 px-6 py-2 font-bold rounded-md shadow hover:bg-accent-dark transition disabled:opacity-50">
            {isLocating ? 'Locating...' : `📍 ${t('findMe') ?? 'Find Me'}`}
          </button>
        </div>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="h-[500px] rounded overflow-hidden">
        {position && (
          <MapWrapper
            position={position}
            zoom={zoom}
            onZoomChange={setZoom}
            onSelect={(coords) => {
              setPosition(coords);
              setFormData((prev) => ({ ...prev, location: coords }));
            }}
          />
        )}
      </div>

      {formData.location && (
        <ReportDistanceGuard
          targetLocation={formData.location}
          onDistanceChange={(dist) => setDistanceFromUser(dist)}
        />
      )}

      {/* {zoom > 16 && <div className="text-sm text-yellow-600">{t('zoomOutForSafety')}</div>} */}
    </div>
  );
}
