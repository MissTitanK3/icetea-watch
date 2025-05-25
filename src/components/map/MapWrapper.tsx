'use client';

import { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLngLiteral, Map as LeafletMap } from 'leaflet';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix icon path
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

type Props = {
  position: LatLngLiteral;
  zoom: number;
  onZoomChange: (z: number) => void;
  onSelect: (pos: LatLngLiteral) => void;
};

function ClickHandler({ onSelect }: { onSelect: (pos: LatLngLiteral) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
}

export default function MapWrapper({ position, zoom, onZoomChange, onSelect }: Props) {
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const handleZoom = () => {
      onZoomChange(map.getZoom());
    };

    map.on('zoomend', handleZoom);
    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [onZoomChange]);

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      ref={(ref) => {
        if (ref) mapRef.current = ref;
      }}>
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <ClickHandler onSelect={onSelect} />
      <Marker position={position} />
    </MapContainer>
  );
}
