'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet.heat';
import { formatAge } from '@/utils/general';
import { Report } from '@/types/wizard';
import { useTranslations } from '@/lib/il8n/useTranslations';
import { TranslationKey } from '@/lib/il8n/translations';
import { AGENCY_GRADIENTS } from '@/constants/agencies';

function MapRefForwarder({ onMapReady }: { onMapReady: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  return null;
}

function SetMapCenter({ center }: { center: LatLngExpression }) {
  const map = useMap();
  const previous = useRef<LatLngExpression | null>(null);

  useEffect(() => {
    const [newLat, newLng] = center as [number, number];
    const currentCenter = map.getCenter();

    // Check if coordinates are significantly different to avoid micro-jumps
    const distanceMoved = map.distance(currentCenter, L.latLng(newLat, newLng));

    if (!previous.current || distanceMoved > 10) {
      map.flyTo(center, map.getZoom(), { animate: true, duration: 1 });
      previous.current = center;
    }
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

export function HeatLayer({ reports }: { reports: Report[] }) {
  const map = useMap();
  const layersRef = useRef<L.Layer[]>([]);

  useEffect(() => {
    // Clear previous layers
    layersRef.current.forEach((layer) => map.removeLayer(layer));
    layersRef.current = [];

    const grouped: Record<string, [number, number, number?][]> = {};

    for (const report of reports) {
      const agency = report.agency_type?.[0] || 'other';
      const key = AGENCY_GRADIENTS[agency] ? agency : 'other';
      const point: [number, number, number?] = [report.location.lat, report.location.lng, 1];

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(point);
    }

    for (const [agency, points] of Object.entries(grouped)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const heat = (L as any)
        .heatLayer(points, {
          radius: 35,
          blur: 20,
          maxZoom: 17,
          gradient: AGENCY_GRADIENTS[agency],
        })
        .addTo(map);

      layersRef.current.push(heat);
    }

    return () => {
      layersRef.current.forEach((layer) => map.removeLayer(layer));
      layersRef.current = [];
    };
  }, [map, reports]);

  return null;
}

export default function HeatMap({ reports, center }: { reports: Report[]; center: LatLngExpression }) {
  const { t } = useTranslations();
  const [visibleReports, setVisibleReports] = useState<Report[]>(reports);

  const mapRef = useRef<L.Map | null>(null);

  return (
    <div className="rounded overflow-hidden z-0">
      <div className="relative">
        <div className="h-[500px]">
          <MapContainer center={center} zoom={12} scrollWheelZoom style={{ height: '100%', width: '100%', zIndex: 0 }}>
            <MapRefForwarder
              onMapReady={(map) => {
                mapRef.current = map;
              }}
            />
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <HeatLayer reports={visibleReports} />

            <VisibleReportsTracker reports={reports} onChange={setVisibleReports} />
            <SetMapCenter center={center} />
          </MapContainer>
        </div>
      </div>
      <ul className="flex flex-wrap gap-4 text-sm pt-4 justify-center">
        {Object.entries(AGENCY_GRADIENTS).map(([agency, gradient]) => (
          <li key={agency} className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: gradient[0.4] }} />
            <span>{agency}</span>
          </li>
        ))}
      </ul>

      <div className="text-sm space-y-2 mt-4">
        <h3 className="font-semibold">
          {t('visibleReports')} ({visibleReports.length})
        </h3>
        {visibleReports.length === 0 ? (
          <p className="text-gray-500">{t('noReports')}</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {visibleReports.map((r) => {
              const translatedAgencies = (r.agency_type || []).map((agency) => t(`agency.${agency}` as TranslationKey));

              return (
                <li key={r.id} className="py-2">
                  <div>
                    <strong>{t('agencies')}</strong>{' '}
                    {[...translatedAgencies, r.agency_other].filter(Boolean).join(', ')}
                  </div>
                  <div>
                    <strong>{t('reported')}</strong> {formatAge(r.timestamp)} {t('timeAgo')}
                  </div>
                  <div className="text-gray-500 text-xs">{new Date(r.timestamp).toLocaleString()}</div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
