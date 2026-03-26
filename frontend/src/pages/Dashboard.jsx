import Header from '../components/Header';
import '../style/Dashboard.css';

const metrics = [
  {
    value: '247',
    label: 'TOTAL REPORTS',
    note: '↑ 18 this week',
    tone: 'default',
  },
  {
    value: '14',
    label: 'PENDING REVIEW',
    note: '3 past SLA',
    tone: 'warning',
  },
  {
    value: '31',
    label: 'AOS COVERED',
    note: '↑ 4 new',
    tone: 'success',
  },
  {
    value: '2',
    label: 'PRIORITY ALERTS',
    note: 'Requires action',
    tone: 'danger',
  },
];

const mapPoints = [
  { x: '14%', y: '61%', tone: 'info' },
  { x: '24%', y: '36%', tone: 'danger' },
  { x: '33%', y: '58%', tone: 'info' },
  { x: '47%', y: '26%', tone: 'warning' },
  { x: '54%', y: '61%', tone: 'warning' },
  { x: '64%', y: '43%', tone: 'success' },
  { x: '79%', y: '30%', tone: 'success' },
  { x: '91%', y: '51%', tone: 'danger' },
];

export default function Dashboard() {
  const handleSubmit = () => {};

  return (
    <>
      <Header />

      <main className="dashboard-page">
        <div className="dashboard-header-container">
          <div className="dashboard-title-container">
            <div className="dashboard-header-title">Dashboard</div>
            <div className="dashboard-header-subtitle">
              {/* TO DO: sync refresh with last refresh */}
              TG Pineland — last sync 4 min ago
            </div>
          </div>

          <div className="dashboard-utility-container">
            <button className="dashboard-action-secondary">Export</button>
            <button className="dashboard-action-primary">+ New report</button>
          </div>
        </div>

        <div className="dashboard-metrics-container">
          {/* TO DO: insert metrics components here: total reports, pending review, AOs covered, priority alerts */}
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
              <div className="dashboard-panel-title">
                Report distribution — operational area
              </div>
              <div className="dashboard-panel-meta">MGRS: 32NKL</div>
            </div>

            {/* Add a Leaflet map to the page. Plot each report as a point using its lat/lng. Then add the heatmap layer using the leaflet-heat plugin. The heatmap should reflect report density by area, not individual points. Wire it to live data so it updates when the category filter changes. Think about what data the heatmap layer actually needs and whether   can reuse what   already fetched. Also add a map-click feature. When a user clicks the map, it should populate the lat/lng fields in the submission form. The user should not have to type coordinates by hand.*/}
            <div className="dashboard-map">
              <div className="dashboard-map-grid"></div>
              <div className="dashboard-map-terrain"></div>

              {mapPoints.map((point, index) => (
                <span
                  key={index}
                  className={`dashboard-map-point dashboard-map-point-${point.tone}`}
                  style={{ left: point.x, top: point.y }}
                ></span>
              ))}

              <div className="dashboard-map-label dashboard-map-label-left">
                32NKL
              </div>
              <div className="dashboard-map-label dashboard-map-label-center">
                32NKL
              </div>
              <div className="dashboard-map-label dashboard-map-label-right">
                32NKL 48291 83741
              </div>

              <div className="dashboard-map-legend">
                <div>
                  <span className="dashboard-legend-dot dashboard-map-point-danger"></span>
                  Critical
                </div>
                <div>
                  <span className="dashboard-legend-dot dashboard-map-point-warning"></span>
                  Attention
                </div>
                <div>
                  <span className="dashboard-legend-dot dashboard-map-point-success"></span>
                  Routine
                </div>
                <div>
                  <span className="dashboard-legend-dot dashboard-map-point-info"></span>
                  Info only
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
                ></input>
              </div>

              <div className="auth-field-group">
                <div className="auth-label">Summary</div>
                <input
                  className="report-summary"
                  type="text"
                  placeholder="Concise summary..."
                ></input>
              </div>

              <div className="auth-field-group">
                <div className="auth-label">MGRS</div>
                <input
                  className="report-mgrs"
                  type="text"
                  placeholder="MGRS"
                ></input>
              </div>

              <div className="auth-field-group">
                <div className="auth-label">Latitude, longitude</div>
                <input
                  className="report-lat-long"
                  type="text"
                  placeholder="Latitude, longitude"
                ></input>
              </div>

              <div className="auth-field-group">
                <div className="auth-label">Recommendations</div>
                <input
                  className="report-recommendations"
                  type="text"
                  placeholder="Concise recommendations..."
                ></input>
              </div>

              <div className="auth-field-group">
                <div className="auth-label">Category</div>
                <select className="report-category">
                  {/* TO DO: generate options from categories table, multi-select */}
                </select>
              </div>

              <div className="auth-field-group">
                <div className="auth-label">Priority</div>
                <select className="report-priority">
                  {/* TO DO: generate options from priority table */}
                </select>
              </div>
            </div>

            {/* Wire form to POST endpoint. Handle the response, and show the user something meaningful whether it succeeds or fails. */}
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
