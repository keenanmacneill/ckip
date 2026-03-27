import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as mgrsLib from 'mgrs';
import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

function parseLatLong(value) {
  if (!value || typeof value !== 'string') return null;

  const [a, b] = value.split(',').map(v => Number.parseFloat(v.trim()));
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;

  if (Math.abs(a) <= 90 && Math.abs(b) <= 180) return [a, b];
  if (Math.abs(a) <= 180 && Math.abs(b) <= 90) return [b, a];

  return null;
}

function parseMgrs(value) {
  if (!value || typeof value !== 'string') return null;

  try {
    const [lon, lat] = mgrsLib.toPoint(value.trim());
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    return [lat, lon];
  } catch {
    return null;
  }
}

function HeatLayer({ points }) {
  const map = useMap();
  const [heatReady, setHeatReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadHeat() {
      globalThis.L = L;
      await import('leaflet.heat');
      if (mounted) setHeatReady(true);
    }

    loadHeat();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!heatReady || !points?.length) return undefined;

    const layer = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 11,
      minOpacity: 0.45,
    }).addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, points, heatReady]);

  return null;
}

export default function ReportMap({ title, mgrs, lat_long }) {
  const coordinate = useMemo(
    () => parseLatLong(lat_long) ?? parseMgrs(mgrs),
    [lat_long, mgrs],
  );

  const heatPoints = useMemo(() => {
    if (!coordinate) return [];

    const [lat, lon] = coordinate;

    return [
      [lat, lon, 1.0],
      [lat + 0.01, lon + 0.01, 0.55],
      [lat - 0.01, lon - 0.015, 0.5],
    ];
  }, [coordinate]);

  if (!coordinate) {
    return (
      <div className="report-map-fallback">No valid coordinate provided.</div>
    );
  }

  return (
    <MapContainer center={coordinate} zoom={11} className="report-leaflet-map">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinate}>
        <Popup>
          {title}
          <br />
          {mgrs || lat_long}
        </Popup>
      </Marker>
      <HeatLayer points={heatPoints} />
    </MapContainer>
  );
}
