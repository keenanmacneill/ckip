import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import * as mgrsLib from 'mgrs';
import { useContext, useEffect, useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import handleExportPdf from '../helpers/handleExportPdf';
import '../style/ReportDetails.css';

export default function ReportDetails() {
  const { reportDetails } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!reportDetails) {
      navigate('/404');
    }
  }, [reportDetails, navigate]);

  const handleBack = () => {
    navigate('/reports');
  };

  if (!reportDetails) return null;

  const {
    id,
    title,
    mgrs,
    created_at,
    priority,
    submitted_by,
    categories,
    summary,
    recommendations,
    lat_long,
    classification,
  } = reportDetails;

  const reportCategories = Array.isArray(categories)
    ? categories
    : categories
      ? [categories]
      : [];

  const reviewTimeline = [
    {
      title: 'Report submitted',
      time: created_at,
      meta: submitted_by,
      status: 'complete',
    },
    {
      title: 'MGRS verified',
      time: '2025-03-22 15:10Z',
      meta: 'Auto validation',
      status: 'complete',
    },
    {
      title: 'S2 review',
      status: 'pending',
    },
  ];

  function parseLatLong(value) {
    if (!value || typeof value !== 'string') return null;

    const [a, b] = value.split(',').map(v => Number.parseFloat(v.trim()));
    if (!Number.isFinite(a) || !Number.isFinite(b)) return null;

    // auto-detect if order came as "lon,lat"
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
      }).addTo(map);

      return () => map.removeLayer(layer);
    }, [map, points]);

    return null;
  }

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

  return (
    <>
      <Header />

      <main className="page">
        <div className="page-header-container">
          <div className="page-title-container">
            <div
              className="page-header-subtitle clickable"
              onClick={handleBack}
            >
              ← Back to reports
            </div>

            <div
              className={`classification classification-${String(classification)
                .toLowerCase()
                .replace(/\s+/g, '-')}`}
            >
              {classification}
            </div>

            <div className="page-header-title">{title}</div>

            <div className="report-details-tag-row">
              <span
                className={`report-details-tag report-details-priority priority-${String(
                  priority,
                )
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
              >
                {priority}
              </span>
            </div>
          </div>

          <div className="page-utility-container">
            <button
              className="page-action-primary"
              onClick={() => handleExportPdf([reportDetails])}
            >
              Export
            </button>
          </div>
        </div>

        <div className="report-top-layout">
          <section className="dashboard-map-container card">
            <div className="dashboard-panel-header">
              <div className="dashboard-panel-title">Report location</div>
              <div className="dashboard-panel-meta">
                MGRS: {mgrs} // LAT-LONG: {lat_long}
              </div>
            </div>

            <div className="dashboard-map">
              {coordinate ? (
                <MapContainer
                  center={coordinate}
                  zoom={11}
                  className="report-leaflet-map"
                >
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
              ) : (
                <div className="report-map-fallback">
                  No valid coordinate provided.
                </div>
              )}
            </div>
          </section>

          <aside className="report-details-side-column">
            <section className="report-details-side-card">
              <div className="report-details-side-section">
                <div className="report-details-label">Report ID</div>
                <div className="report-details-strong">
                  {`RPT-${String(id).padStart(4, '0')}`}
                </div>
              </div>

              <div className="report-details-divider" />

              <div className="report-details-side-section">
                <div className="report-details-label">Submitted By</div>
                <div className="report-details-strong">{submitted_by}</div>
              </div>

              <div className="report-details-divider" />

              <div className="report-details-side-section">
                <div className="report-details-label">Created</div>
                <div className="report-details-strong">{created_at}</div>
              </div>

              <div className="report-details-divider" />

              <div className="report-details-side-section">
                <div className="report-details-label">Categories</div>
                <div className="report-details-tag-row">
                  {reportCategories.map((category, index) => (
                    <span
                      key={`${category}-${index}`}
                      className={`report-details-tag report-details-category category-${String(
                        category,
                      )
                        .toLowerCase()
                        .replace(/\s+/g, '_')}`}
                    >
                      {String(category).replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </section>
            <section className="report-details-side-card">
              <div className="report-details-label review-timeline-title">
                Review Timeline
              </div>

              <div className="review-timeline-list">
                {reviewTimeline.map(item => (
                  <div
                    key={`${item.title}-${item.time}`}
                    className="review-timeline-item"
                  >
                    <div
                      className={`review-timeline-dot review-timeline-dot-${item.status}`}
                    />
                    <div className="review-timeline-content">
                      <div className="review-timeline-item-title">
                        {item.title}
                      </div>
                      <div className="review-timeline-item-meta">
                        {item.time}
                      </div>
                      <div className="review-timeline-item-submeta">
                        {item.meta}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <div className="report-bottom-layout">
          <section className="report-details-main-card">
            <div className="report-details-section">
              <div className="report-details-label">Summary</div>
              <div className="report-details-body">{summary}</div>
            </div>

            <div className="report-details-divider" />

            <div className="report-details-section">
              <div className="report-details-label">Recommendations</div>
              <div className="report-details-body">{recommendations}</div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
