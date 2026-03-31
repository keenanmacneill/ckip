import L from 'leaflet';
window.L = L;

import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import * as mgrsLib from 'mgrs';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapClickHandler from '../components/dashboard/MapClickHandler';
import MapLegend from '../components/dashboard/MapLegend';
import MetricsBar from '../components/dashboard/MetricsBar';
import ReportForm from '../components/dashboard/ReportForm';
import ReportMarker from '../components/dashboard/ReportMarker';
import ViewportFilter from '../components/dashboard/ViewportFilter';
import Header from '../components/shared/Header';
import HeatLayer from '../components/shared/HeatLayer';
import AppContext from '../context/AppContext';
import parseLatLong from '../helpers/parseLatLong';
import '../style/Dashboard.css';

const API_URL = import.meta.env.VITE_API_URL;
const PINELAND_CENTER = [34.8, -79.1];

export default function Dashboard() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [reportTitle, setReportTitle] = useState('');
  const [reportSummary, setReportSummary] = useState('');
  const [reportRecommendations, setReportRecommendations] = useState('');
  const [reportMGRS, setReportMGRS] = useState('');
  const [reportLatLong, setReportLatLong] = useState('');
  const [reportPriority, setReportPriority] = useState('');
  const [reportClassification, setReportClassification] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  const allReportsRef = useRef([]);
  const [visibleReports, setVisibleReports] = useState([]);

  const { categories, reports, setReports, loading, user } =
    useContext(AppContext);

  const resetForm = () => {
    setSelectedCategories([]);
    setReportTitle('');
    setReportSummary('');
    setReportRecommendations('');
    setReportMGRS('');
    setReportLatLong('');
    setReportPriority('');
    setReportClassification('');
  };

  const handleMapClick = latlng => {
    const lat = latlng.lat.toFixed(6);
    const lng = latlng.lng.toFixed(6);

    let mgrs = '';
    try {
      mgrs = mgrsLib.forward([latlng.lng, latlng.lat], 5);
    } catch {
      mgrs = '';
    }

    setReportLatLong(`${lat}, ${lng}`);
    setReportMGRS(mgrs);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API_URL}/reports`, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          title: reportTitle,
          categories: selectedCategories,
          summary: reportSummary,
          recommendations: reportRecommendations,
          mgrs: reportMGRS,
          lat_long: reportLatLong,
          priority: reportPriority,
          classification: reportClassification,
        }),
      });

      const message = await res.json();
      setSubmitMessage([res.status, message.message]);

      if (res.status === 201) resetForm();
    } catch (err) {
      setSubmitMessage(err.message);
      resetForm();
    }
  };

  useEffect(() => {
    if (loading || !user) return;

    const getReports = async () => {
      const res = await fetch(`${API_URL}/reports/`, {
        credentials: 'include',
      });

      if (!res.ok) {
        setReports([]);
        allReportsRef.current = [];
        setVisibleReports([]);
        return;
      }

      const data = await res.json();
      const parsed = Array.isArray(data?.reports) ? data.reports : [];

      setReports(parsed);
      allReportsRef.current = parsed;
      setVisibleReports(parsed);
    };

    getReports();
  }, [loading, user, setReports]);

  const reportMarkers = useMemo(() => {
    return visibleReports
      .map(report => ({ report, coordinate: parseLatLong(report.lat_long) }))
      .filter(item => item.coordinate);
  }, [visibleReports]);

  const heatPoints = useMemo(
    () => reportMarkers.map(({ coordinate }) => [...coordinate, 1]),
    [reportMarkers],
  );

  const handleVisibleReports = useCallback(updater => {
    setVisibleReports(updater);
  }, []);

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

        <MetricsBar reports={reports} />

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
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapClickHandler onMapClick={handleMapClick} />
                <ViewportFilter
                  allReportsRef={allReportsRef}
                  onUpdate={handleVisibleReports}
                />
                {heatPoints.length ? <HeatLayer points={heatPoints} /> : null}
                {reportMarkers.map(({ report, coordinate }) => (
                  <ReportMarker
                    key={report.id}
                    report={report}
                    coordinate={coordinate}
                  />
                ))}
              </MapContainer>
              <MapLegend />
            </div>
          </section>

          <ReportForm
            reportClassification={reportClassification}
            setReportClassification={setReportClassification}
            reportTitle={reportTitle}
            setReportTitle={setReportTitle}
            reportSummary={reportSummary}
            setReportSummary={setReportSummary}
            reportRecommendations={reportRecommendations}
            setReportRecommendations={setReportRecommendations}
            reportMGRS={reportMGRS}
            setReportMGRS={setReportMGRS}
            reportLatLong={reportLatLong}
            setReportLatLong={setReportLatLong}
            reportPriority={reportPriority}
            setReportPriority={setReportPriority}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            submitMessage={submitMessage}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    </>
  );
}
