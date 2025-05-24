'use client';
import dynamic from 'next/dynamic';

import { useRef, useEffect, useState } from 'react';
import { Map as LeafletMap } from 'leaflet';
import ReportDistanceGuard from './ReportDistanceGuard';
import { useTranslations } from '@/lib/il8n/useTranslations';
import { useWizard } from './WizardContext';

// Import dynamically with SSR off
const MapWrapper = dynamic(() => import('@/components/map/MapWrapper'), {
  ssr: false,
});

type LatLng = { lat: number; lng: number };

export default function LocationStep() {
  const { t } = useTranslations();
  const { setCanContinue, formData, setFormData } = useWizard();
  const [position, setPosition] = useState<LatLng | null>(formData.location || null);
  const [address, setAddress] = useState('');
  const [zoom, setZoom] = useState(13);
  const [manualWarning, setManualWarning] = useState(false);
  const [distanceFromUser, setDistanceFromUser] = useState<number | null>(null);

  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!mapRef.current) return undefined;

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
      const fallback = () =>
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setPosition(coords);
            setFormData((prev) => ({ ...prev, location: coords }));
          },
          () => setManualWarning(true),
          { enableHighAccuracy: true, timeout: 10000 },
        );

      if (navigator.permissions) {
        navigator.permissions
          .query({ name: 'geolocation' })
          .then((result) => {
            if (result.state === 'granted' || result.state === 'prompt') fallback();
            else setManualWarning(true);
          })
          .catch(fallback);
      } else {
        fallback();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const valid = !!position && (distanceFromUser === null || distanceFromUser <= 2);
    setCanContinue(valid);
  }, [position, distanceFromUser, setCanContinue]);

  const handleAddressSubmit = async () => {
    const coords = { lat: 47.6062, lng: -122.3321 }; // Placeholder
    setPosition(coords);
    setFormData((prev) => ({ ...prev, location: coords }));
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{t('locationPrompt')}</h3>
        <p className="text-sm text-gray-600">{t('tapMapOrGPS')}</p>
      </div>

      {manualWarning && <div className="text-sm text-red-600">{t('gpsError')}</div>}

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
            {t('submit')}
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

      {zoom > 16 && <div className="text-sm text-yellow-600">{t('zoomOutForSafety')}</div>}
    </div>
  );
}
