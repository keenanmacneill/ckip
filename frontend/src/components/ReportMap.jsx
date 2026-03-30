import L from 'leaflet';
window.L = L;

import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import createReportMarkerIcon from '../helpers/createReportMarkerIcon';
import parseLatLong from '../helpers/parseLatLong';
import parseMgrs from '../helpers/parseMgrs';
import '../style/ReportMap.css';
import HeatLayer from './HeatLayer';

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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={coordinate} icon={markerIcon} />

      <HeatLayer points={heatPoints} />
    </MapContainer>
  );
}
