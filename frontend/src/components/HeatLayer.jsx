import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function HeatLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points?.length) return;

    const layer = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 11,
      minOpacity: 0.45,
    });

    layer.addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, points]);

  return null;
}
