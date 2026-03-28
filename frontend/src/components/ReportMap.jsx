import L from 'leaflet';
window.L = L;

import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import * as mgrsLib from 'mgrs';
import { useEffect, useMemo } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import '../style/ReportMap.css';

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

  useEffect(() => {
    if (!points?.length) return undefined;

    const layer = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 11,
      minOpacity: 0.45,
    });
    // .addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, points]);

  return null;
}

function toClassName(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

function createReportMarkerIcon(priority, classification) {
  const priorityClass = `marker-${toClassName(priority)}`;
  const classificationClass = `marker-classification-${toClassName(
    classification,
  )}`;

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-dot ${priorityClass} ${classificationClass}"></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

export default function ReportMap({
  mgrs,
  lat_long,
  priority,
  classification,
}) {
  const coordinate = useMemo(
    () => parseLatLong(lat_long) ?? parseMgrs(mgrs),
    [lat_long, mgrs],
  );

  const heatPoints = useMemo(() => {
    if (!coordinate) return [];

    const [lat, lon] = coordinate;

    return [[lat, lon, 1.0]];
  }, [coordinate]);

  const markerIcon = useMemo(() => {
    return createReportMarkerIcon(priority, classification);
  }, [priority, classification]);

  if (!coordinate) {
    return (
      <div className="report-map-fallback">No valid coordinate provided.</div>
    );
  }

  return (
    <MapContainer center={coordinate} zoom={11} className="report-leaflet-map">
      <TileLayer
        attribution="Esri"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />

      <Marker position={coordinate} icon={markerIcon} />

      <HeatLayer points={heatPoints} />
    </MapContainer>
  );
}
