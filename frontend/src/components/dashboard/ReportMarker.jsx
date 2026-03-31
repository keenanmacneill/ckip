import { useContext, useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { createReportMarkerIcon } from '../../helpers/createDashboardReportMarkerIcon';

export default function ReportMarker({ report, coordinate }) {
  const navigate = useNavigate();
  const { setReportDetails } = useContext(AppContext);
  const priority = report.priority || 'routine';

  const markerIcon = useMemo(
    () => createReportMarkerIcon(priority),
    [priority],
  );

  return (
    <Marker position={coordinate} icon={markerIcon}>
      <Popup>
        <div className="dashboard-popup-content">
          <div className="dashboard-popup-title">{report.title}</div>
          <div className="dashboard-popup-row">
            <span className="dashboard-popup-label">Classification</span>
            <span>
              {report.classification.replace(/_/g, ' ').toUpperCase() || 'N/A'}
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
