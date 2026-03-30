export default function parseLatLong(value) {
  if (!value || typeof value !== 'string') return null;

  const [a, b] = value.split(',').map(v => Number.parseFloat(v.trim()));
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;

  if (Math.abs(a) <= 90 && Math.abs(b) <= 180) return [a, b];
  if (Math.abs(a) <= 180 && Math.abs(b) <= 90) return [b, a];
  return null;
}
