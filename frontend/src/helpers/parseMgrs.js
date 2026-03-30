import * as mgrsLib from 'mgrs';

export default function parseMgrs(value) {
  if (!value || typeof value !== 'string') return null;

  try {
    const [lon, lat] = mgrsLib.toPoint(value.trim());
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    return [lat, lon];
  } catch {
    return null;
  }
}
