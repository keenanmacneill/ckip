import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import parseLatLong from '../../helpers/parseLatLong';

export default function ViewportFilter({ allReportsRef, onUpdate }) {
  const map = useMap();

  useEffect(() => {
    let timer = null;

    function update() {
      const bounds = map.getBounds();
      const filtered = allReportsRef.current.filter(report => {
        const coord = parseLatLong(report.lat_long);
        if (!coord) return false;
        return bounds.contains(coord);
      });

      onUpdate(prev => {
        const prevIds = prev.map(r => r.id).join(',');
        const nextIds = filtered.map(r => r.id).join(',');
        if (prevIds === nextIds) return prev;
        return filtered;
      });
    }

    function debounced() {
      clearTimeout(timer);
      timer = setTimeout(update, 300);
    }

    update();

    map.on('move', debounced);
    map.on('zoomend', debounced);

    return () => {
      clearTimeout(timer);
      map.off('move', debounced);
      map.off('zoomend', debounced);
    };
  }, [map, allReportsRef, onUpdate]);

  return null;
}
