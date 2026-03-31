import toClassName from '../helpers/toClassName';

export default function createReportMarkerIcon(L, priority, classification) {
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
