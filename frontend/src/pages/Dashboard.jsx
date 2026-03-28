import { useContext, useState } from 'react';
import Header from '../components/Header';
import ReportCategories from '../components/ReportCategories';
import AppContext from '../context/AppContext';
import '../style/Dashboard.css';

export default function Dashboard() {
  const { cap, categories, reports } = useContext(AppContext);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const sortedCategories = [...(categories || [])].sort((a, b) =>
    a.category.localeCompare(b.category, undefined, { sensitivity: 'base' }),
  );
  const handleSubmit = () => {};

  const metrics = [
    {
      value: reports.length,
      label: 'TOTAL REPORTS',
      tone: 'success',
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

  if (!categories.length || !reports.length) return null;

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
            </div>

            <div className="dashboard-map"></div>
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
                <textarea
                  className="report-summary"
                  type="text"
                  placeholder="Concise summary..."
                ></textarea>
              </div>

              <div className="auth-field-group">
                <div className="auth-label">Recommendations</div>
                <textarea
                  className="report-recommendations"
                  type="text"
                  placeholder="Concise recommendations..."
                ></textarea>
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
