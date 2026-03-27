import { useContext } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
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
  const { cap, categories } = useContext(AppContext);

  const handleSubmit = () => {};

  if (!categories) return null;

  return (
    <>
      <Header />

      <main className="page">
        <div className="page-header-container">
          <div className="page-title-container">
            <div className="page-header-title">Dashboard</div>
            <div className="page-header-subtitle">TG Pineland</div>
          </div>

          <div className="page-utility-container">
            <button className="page-action-primary">Export</button>
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
              <div className="dashboard-panel-meta">MGRS: 32NKL</div>
            </div>

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
                <select
                  className="report-category clickable"
                  defaultValue={'select_category'}
                >
                  <option value="select_category" disabled>
                    Select a category
                  </option>
                  {categories.map(c => (
                    <option value="c.category">
                      {c.category
                        .split('_')
                        .map(word => cap(word))
                        .join(' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="auth-field-group">
                <div className="auth-label">Priority</div>
                <select
                  className="report-priority clickable"
                  defaultValue={'select_priority'}
                >
                  <option value="select_priority" disabled>
                    Select a priority
                  </option>
                  <option value="attention">Attention</option>
                  <option value="critical">Critical</option>
                  <option value="info_only">Info Only</option>
                  <option value="routine">Routine</option>
                </select>
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
