import L from 'leaflet';
window.L = L;

import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import * as mgrsLib from 'mgrs';
import { useContext, useEffect, useMemo, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ReportCategories from '../components/ReportCategories';
import AppContext from '../context/AppContext';
import '../style/Dashboard.css';

function parseLatLong(value) {
  if (!value || typeof value !== 'string') return null;

  const [a, b] = value.split(',').map(v => Number.parseFloat(v.trim()));
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;

  if (Math.abs(a) <= 90 && Math.abs(b) <= 180) return [a, b];
  if (Math.abs(a) <= 180 && Math.abs(b) <= 90) return [b, a];
  return null;
}

// build a themed custom marker icon from report priority and classification
function createReportMarkerIcon(priority) {
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

function HeatLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return undefined;

    // render leaflet heat layer from valid report coordinates
    const layer = L.heatLayer(points, {
      radius: 25,
      blur: 18,
      maxZoom: 11,
      minOpacity: 0.5,
    });
    // .addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, points]);

  return null;
}

function MapClickHandler({ onMapClick }) {
  // listen for clicks on the map and forward lat/lng to the form updater
  useMapEvents({
    click(event) {
      onMapClick(event.latlng);
    },
  });

  return null;
}

export default function Dashboard() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [reportTitle, setReportTitle] = useState('');
  const [reportSummary, setReportSummary] = useState('');
  const [reportRecommendations, setReportRecommendations] = useState('');
  const [reportMGRS, setReportMGRS] = useState('');
  const [reportLatLong, setReportLatLong] = useState('');
  const [reportPriority, setReportPriority] = useState('');

  const {
    cap,
    categories,
    reports,
    setReports,
    loading,
    user,
    setReportDetails,
  } = useContext(AppContext);

  function ReportMarker({ report, coordinate }) {
    const navigate = useNavigate();
    const priority = report.priority || 'routine';
    const classification = report.classification || 'unclassified';

    // memoize a custom marker icon for this report
    const markerIcon = useMemo(() => {
      return createReportMarkerIcon(priority, classification);
    }, [priority, classification]);

    return (
      <Marker position={coordinate} icon={markerIcon}>
        <Popup>
          <div className="dashboard-popup-content">
            <div className="dashboard-popup-title">{report.title}</div>
            <div className="dashboard-popup-row">
              <span className="dashboard-popup-label">Classification</span>
              <span>
                {report.classification.replace(/_/g, ' ').toUpperCase() ||
                  'N/A'}
              </span>
            </div>
            <div className="dashboard-popup-row">
              <span className="dashboard-popup-label">Priority</span>
              <span>
                {report.priority.replace(/_/g, ' ').toUpperCase() || 'N/A'}
              </span>
            </div>
            <div className="dashboard-popup-row">
              <span className="dashboard-popup-label">MGRS</span>
              <span>{report.mgrs || 'N/A'}</span>
            </div>
            <div className="dashboard-popup-row">
              <span className="dashboard-popup-label">LAT, LONG</span>
              <span>{report.lat_long || 'N/A'}</span>
            </div>

            <button
              type="button"
              className="page-action-secondary dashboard-popup-button"
              onClick={() => {
                setReportDetails(report);
                navigate(`/reports/${report.title}`);
              }}
            >
              View Report
            </button>
          </div>
        </Popup>
      </Marker>
    );
  }

  const sortedCategories = [...(categories || [])].sort((a, b) =>
    a.category.localeCompare(b.category, undefined, { sensitivity: 'base' }),
  );

  const PINELAND_CENTER = [34.8, -79.1];

  const metrics = [
    {
      value: reports.length,
      label: 'TOTAL REPORTS',
      tone: 'successMessage',
    },
    {
      value: reports.filter(r => r.priority === 'attention').length,
      label: 'PENDING REVIEW',
      tone: 'warning',
    },
    {
      value: reports.filter(r => r.priority === 'critical').length,
      label: 'PRIORITY ALERTS',
      tone: 'danger',
    },
  ];

  const reportMarkers = useMemo(() => {
    return reports
      .map(report => ({
        report,
        coordinate: parseLatLong(report.lat_long),
      }))
      .filter(item => item.coordinate);
  }, [reports]);

  const heatPoints = useMemo(
    // convert marker coordinates to leaflet.heat point format
    () => reportMarkers.map(({ coordinate }) => [...coordinate, 1]),
    [reportMarkers],
  );

  const handleMapClick = latlng => {
    // normalize clicked coordinates for the submission form
    const lat = latlng.lat.toFixed(6);
    const lng = latlng.lng.toFixed(6);

    let mgrs = '';
    try {
      // derive MGRS from the clicked lng/lat pair
      mgrs = mgrsLib.forward([latlng.lng, latlng.lat], 5);
    } catch {
      mgrs = '';
    }

    // populate the visible lat/lng field
    setReportLatLong(`${lat}, ${lng}`);
    // populate the visible MGRS field
    setReportMGRS(mgrs);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:8080/reports', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          title: reportTitle,
          categories: selectedCategories,
          summary: reportSummary,
          recommendations: reportRecommendations,
          mgrs: reportMGRS,
          lat_long: reportLatLong,
          priority: reportPriority,
        }),
      });

      const message = await res.json();
      window.alert(message.message);

      setSelectedCategories([]);
      setReportTitle('');
      setReportSummary('');
      setReportRecommendations('');
      setReportMGRS('');
      setReportLatLong('');
      setReportPriority('');
    } catch (err) {
      window.alert(err.message);

      setSelectedCategories([]);
      setReportTitle('');
      setReportSummary('');
      setReportRecommendations('');
      setReportMGRS('');
      setReportLatLong('');
      setReportPriority('');
    }
  };

  useEffect(() => {
    if (loading || !user) return;

    const getReports = async () => {
      // fetch live reports for markers and heat layer
      const res = await fetch('http://localhost:8080/reports', {
        credentials: 'include',
      });

      if (!res.ok) {
        setReports([]);
        return;
      }

      const data = await res.json();

      // support either a raw array response or an object-wrapped array response
      const parsedReports = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      setReports(parsedReports);
    };

    getReports();
  }, [loading, user, setReports]);

  if (!categories.length) return null;

  return (
    <>
      <Header />

      <main className="page">
        <div className="page-header-container">
          <div className="page-title-container">
            <div className="page-header-title">Dashboard</div>
            <div className="page-header-subtitle">SOTF Pineland</div>
          </div>
        </div>

        <div className="dashboard-metrics-container">
          {metrics.map(metric => (
            <div
              key={metric.label}
              className={`dashboard-metric-card card metric-card-${metric.tone}`}
            >
              <div className="dashboard-metric-value">{metric.value}</div>
              <div className="dashboard-metric-label">{metric.label}</div>
              <div className="dashboard-metric-note">{metric.note}</div>
            </div>
          ))}
        </div>

        <div className="dashboard-main-container">
          <section className="dashboard-map-container card">
            <div className="dashboard-panel-header">
              <div className="dashboard-panel-title">Report distribution</div>
              <div className="dashboard-panel-mgrs-hint">
                Click on the map to auto-populate the coordinates for your
                report
              </div>
            </div>

            <div className="dashboard-map dashboard-leaflet-map-wrap">
              <MapContainer
                center={PINELAND_CENTER}
                zoom={9}
                className="dashboard-leaflet-map"
              >
                {/* render tile map background */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* clicking the map updates MGRS and lat/lng form fields */}
                <MapClickHandler onMapClick={handleMapClick} />

                {/* draw a heatmap from all report coordinates */}
                {heatPoints.length ? <HeatLayer points={heatPoints} /> : null}

                {/* render report markers with themed popups and report navigation */}
                {reportMarkers.map(({ report, coordinate }) => (
                  <ReportMarker
                    key={report.id}
                    report={report}
                    coordinate={coordinate}
                  />
                ))}
              </MapContainer>

              {/* static legend anchored bottom-left of the map */}
              <div className="dashboard-map-legend dashboard-map-legend-bottom-left">
                <div>
                  <span className="dashboard-legend-dot dashboard-legend-critical"></span>
                  Critical
                </div>
                <div>
                  <span className="dashboard-legend-dot dashboard-legend-attention"></span>
                  Attention
                </div>
                <div>
                  <span className="dashboard-legend-dot dashboard-legend-routine"></span>
                  Routine
                </div>
              </div>
            </div>
          </section>

          <div className="dashboard-report-container card">
            <div className="dashboard-panel-header">
              <div className="dashboard-panel-title">Submit report</div>
            </div>

            <div className="dashboard-report-body">
              <div className="auth-field-group">
                <div className="auth-label">Title</div>
                <input
                  className="report-title"
                  type="text"
                  placeholder="Brief descriptive title..."
                  value={reportTitle}
                  onChange={e => {
                    setReportTitle(e.target.value);
                  }}
                />
              </div>

              <div className="auth-field-group">
                <div className="auth-label">Summary</div>
                <textarea
                  className="report-summary"
                  type="text"
                  placeholder="Concise summary..."
                  value={reportSummary}
                  onChange={e => {
                    setReportSummary(e.target.value);
                  }}
                />
              </div>

              <div className="auth-field-group">
                <div className="auth-label">Recommendations</div>
                <textarea
                  className="report-recommendations"
                  type="text"
                  placeholder="Concise recommendations..."
                  value={reportRecommendations}
                  onChange={e => {
                    setReportRecommendations(e.target.value);
                  }}
                />
              </div>

              <div className="auth-field-group">
                <div className="auth-label">MGRS</div>
                <input
                  className="report-mgrs"
                  type="text"
                  placeholder="MGRS"
                  value={reportMGRS}
                  onChange={e => {
                    setReportMGRS(e.target.value);
                  }}
                />
              </div>

              <div className="auth-field-group">
                <div className="auth-label">Latitude, longitude</div>
                <input
                  className="report-lat-long"
                  type="text"
                  placeholder="Latitude, longitude"
                  value={reportLatLong}
                  onChange={e => {
                    setReportLatLong(e.target.value);
                  }}
                />
              </div>

              <div className="auth-field-group">
                <div className="auth-label">Priority</div>
                <select
                  className="report-priority clickable"
                  defaultValue=""
                  value={reportPriority}
                  onChange={e => {
                    setReportPriority(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="attention">Attention</option>
                  <option value="critical">Critical</option>

                  <option value="routine">Routine</option>
                </select>
              </div>

              <div className="auth-field-group">
                <ReportCategories
                  label="Categories"
                  selectedValues={selectedCategories}
                  onChange={values => setSelectedCategories(values)}
                  options={sortedCategories.map(category => ({
                    value: category.category,
                    label: category.category
                      .split('_')
                      .map(word => cap(word))
                      .join(' '),
                  }))}
                />
              </div>
            </div>

            <div className="dashboard-report-footer">
              <button className="report-submit-button" onClick={handleSubmit}>
                Submit report
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
