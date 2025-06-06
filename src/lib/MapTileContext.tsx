// context/MapTileContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

const TILE_LAYERS = {
  osmStandard: {
    name: 'OpenStreetMap Standard',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
  },
  osmFrance: {
    name: 'OSM France',
    url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap France contributors',
  },
  osmGermany: {
    name: 'OSM Germany',
    url: 'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
  },
  cartoDark: {
    name: 'Carto Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '© CartoDB',
  },
  stamenWatercolor: {
    name: 'Stamen Watercolor',
    url: 'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg',
    attribution: 'Map tiles by Stamen Design, hosted by Stadia Maps',
  },
  esriStreet: {
    name: 'Esri World Street Map',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles © Esri',
  },
  esriImagery: {
    name: 'Esri World Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles © Esri',
  },
  esriTopo: {
    name: 'Esri World Topo Map',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles © Esri',
  },
  opentopomap: {
    name: 'OpenTopoMap',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '© OpenTopoMap contributors',
  },
} as const;

type TileKey = keyof typeof TILE_LAYERS;

const MapTileContext = createContext<{
  tileKey: TileKey;
  setTileKey: (key: TileKey) => void;
  tile: (typeof TILE_LAYERS)[TileKey];
}>({
  tileKey: 'cartoDark',
  setTileKey: () => {},
  tile: TILE_LAYERS.cartoDark,
});

export const MapTileProvider = ({ children }: { children: ReactNode }) => {
  const [tileKey, setTileKey] = useState<TileKey>(
    (typeof window !== 'undefined' && (localStorage.getItem('mapTile') as TileKey)) || 'cartoDark',
  );

  const tile = TILE_LAYERS[tileKey];

  const updateTileKey = (key: TileKey) => {
    setTileKey(key);
    localStorage.setItem('mapTile', key);
  };

  return (
    <MapTileContext.Provider value={{ tileKey, setTileKey: updateTileKey, tile }}>{children}</MapTileContext.Provider>
  );
};

export const useMapTile = () => useContext(MapTileContext);
export const MAP_TILE_OPTIONS = TILE_LAYERS;
