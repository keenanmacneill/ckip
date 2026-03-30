import L from 'leaflet';
window.L = L;

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function HeatLayer({ points }) {
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
