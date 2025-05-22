'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet.heat';
import { formatAge } from '@/utils/general';
import { Report } from '@/types/wizard';
import { useTranslations } from '@/lib/il8n/useTranslations';
import { TranslationKey } from '@/lib/il8n/translations';

function MapRefForwarder({ onMapReady }: { onMapReady: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  return null;
}

function SetMapCenter({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

function VisibleReportsTracker({ reports, onChange }: { reports: Report[]; onChange: (visible: Report[]) => void }) {
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      const visible = reports.filter((r) => bounds.contains(r.location));
      onChange(visible);
    },
  });

  // Initial run
  useEffect(() => {
    const bounds = map.getBounds();
    const visible = reports.filter((r) => bounds.contains(r.location));
    onChange(visible);
  }, [map, reports, onChange]);

  return null;
}

export function HeatLayer({ points }: { points: [number, number, number?][] }) {
  const map = useMap();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const heat = (L as any)
      .heatLayer(points, {
        // radius: 25,
        // blur: 15,
        // maxZoom: 17,
        radius: 35, // increase for wider glow
        blur: 20, // higher = softer edges
        maxZoom: 17,
        gradient: {
          0.0: 'rgba(255, 0, 0, 0)', // transparent red
          0.4: 'orange',
          0.65: 'yellow',
          1.0: 'white',
        },
      })
      .addTo(map);

    return () => {
      heat.remove();
    };
  }, [map, points]);

  return null;
}

export default function HeatMap({ reports }: { reports: Report[] }) {
  const { t } = useTranslations();
  const [isMounted, setIsMounted] = useState(false);
  const [visibleReports, setVisibleReports] = useState<Report[]>(reports);
  const [center, setCenter] = useState<LatLngExpression>([47.6062, -122.3321]); // Default: Seattle
  const mapRef = useRef<L.Map | null>(null);

  function handleFindMe() {
    const success = (pos: GeolocationPosition) => {
      const coords: LatLngExpression = [pos.coords.latitude, pos.coords.longitude];
      setCenter(coords);

      // Optional: animate map zoom and center
      const map = mapRef.current;
      if (map) {
        map.setView(coords, 15, { animate: true });
      }
    };

    const failure = () => {
      alert(t('locationDenied') ?? 'Unable to retrieve location.');
    };

    if (navigator.permissions) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((result) => {
          if (result.state === 'granted' || result.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(success, failure, {
              enableHighAccuracy: true,
              timeout: 10000,
            });
          } else {
            failure();
          }
        })
        .catch(() => {
          navigator.geolocation.getCurrentPosition(success, failure, {
            enableHighAccuracy: true,
            timeout: 10000,
          });
        });
    } else {
      navigator.geolocation.getCurrentPosition(success, failure, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    }
  }

  useEffect(() => {
    setIsMounted(true);

    const tryGetLocation = () => {
      const success = (pos: GeolocationPosition) => {
        const coords: LatLngExpression = [pos.coords.latitude, pos.coords.longitude];
        setCenter(coords);
      };

      const failure = () => {
        console.warn('Geolocation failed or was denied. Falling back to default.');
      };

      if (navigator.permissions) {
        navigator.permissions
          .query({ name: 'geolocation' })
          .then((result) => {
            if (result.state === 'granted' || result.state === 'prompt') {
              navigator.geolocation.getCurrentPosition(success, failure, {
                enableHighAccuracy: true,
                timeout: 10000,
              });
            } else {
              failure();
            }
          })
          .catch(() => {
            // If Permissions API fails, fallback to geolocation
            navigator.geolocation.getCurrentPosition(success, failure, {
              enableHighAccuracy: true,
              timeout: 10000,
            });
          });
      } else {
        // No Permissions API support
        navigator.geolocation.getCurrentPosition(success, failure, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      }
    };

    tryGetLocation();
  }, []);

  // Convert reports to LatLng tuples for the heat layer
  const heatPoints = reports.map<[number, number, number?]>((r) => [r.location.lat, r.location.lng]);

  if (!isMounted) return <div className="h-[500px]">Loading map…</div>;

  return (
    <div className="rounded overflow-hidden">
      <button
        onClick={handleFindMe}
        className=" bg-green-800 px-10 py-2 font-bold my-5 rounded-md shadow hover:bg-accent-dark transition">
        📍 {t('findMe') ?? 'Find Me'}
      </button>

      <div className="h-[500px] rounded overflow-hidden">
        <MapContainer center={center} zoom={12} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
          <MapRefForwarder
            onMapReady={(map) => {
              mapRef.current = map;
            }}
          />
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <HeatLayer points={heatPoints} />
          <VisibleReportsTracker reports={reports} onChange={setVisibleReports} />
          <SetMapCenter center={center} />
        </MapContainer>
      </div>

      {/* ✅ Put this outside the map */}
      <div className="text-sm space-y-2 mt-4">
        <h3 className="font-semibold">
          {t('visibleReports')} ({visibleReports.length})
        </h3>
        {visibleReports.length === 0 ? (
          <p className="text-gray-500">{t('noReports')}</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {visibleReports.map((r) => (
              <li key={r.id} className="py-2">
                <div>
                  <strong>{t('agencies')}</strong>{' '}
                  {[...(r.agency_type || []), r.agency_other]
                    .filter(Boolean)
                    .map((agency) => t(`agency.${agency}` as TranslationKey))
                    .join(', ')}
                </div>
                <div>
                  <strong>{t('reported')}</strong> {formatAge(r.timestamp)}
                  {t('timeAgo')}
                </div>
                <div className="text-gray-500 text-xs">{new Date(r.timestamp).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
