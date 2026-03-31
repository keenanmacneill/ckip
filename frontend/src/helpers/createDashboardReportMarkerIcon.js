import L from 'leaflet';

export function createReportMarkerIcon(priority) {
  const safePriority = priority || 'routine';

  return L.divIcon({
    className: 'dashboard-report-marker-icon-wrapper',
    html: `
      <div class="dashboard-report-marker dashboard-report-marker-${safePriority} ${
        safePriority === 'critical'
          ? `marker-pulse marker-pulse-${safePriority}`
          : ''
      }">
        <div class="dashboard-report-marker-core"></div>
      </div>
    `,
    iconSize: [34, 42],
    iconAnchor: [17, 42],
    popupAnchor: [0, -34],
  });
}
