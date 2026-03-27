import { useEffect, useState } from 'react';

import Header from '../components/Header';
import Report from '../components/Report';
import '../style/Reports.css';

export default function Reports() {
  const [reports, setReports] = useState(null);

  useEffect(() => {
    const getReports = async () => {
      const res = await fetch('http://localhost:8080/reports', {
        credentials: 'include',
      });
      const reportsData = await res.json();
      setReports(reportsData);
    };
    getReports();
  }, []);

  if (!reports) return null;

  return (
    <>
      <Header />

      <main className="page">
        <div className="page-header-container">
          <div className="page-title-container">
            <div className="page-header-title">All reports</div>
            <div className="page-header-subtitle">
              {reports.length} reports — last sync 4 min ago
            </div>
          </div>

          <div className="page-utility-container">
            <button className="page-action-primary" disabled>
              + New report
            </button>
          </div>
        </div>

        <div className="filters-bar">
          <input
            className="filter-input"
            type="search"
            placeholder="Search by title, MGRS, or submitter..."
            disabled
          />

          <select
            className="filter-select"
            defaultValue="all_categories"
            disabled
          >
            <option value="all_categories">All categories</option>
            <option value="culture">Culture</option>
            <option value="economy">Economy</option>
            <option value="education">Education</option>
            <option value="governance">Governance</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="information">Information</option>
            <option value="key_leader">Key Leader</option>
            <option value="population">Population</option>
            <option value="public_health">Public Health</option>
            <option value="religion">Religion</option>
            <option value="security">Security</option>
          </select>

          <select
            className="filter-select"
            defaultValue="all_priorities"
            disabled
          >
            <option value="all_priorities">All priorities</option>
            <option value="attention">Attention</option>
            <option value="critical">Critical</option>
            <option value="info_only">Info Only</option>
            <option value="routine">Routine</option>
          </select>

          <select className="filter-select" defaultValue="all_dates" disabled>
            <option value="all_dates">All dates</option>
            <option value="last_7_days">Last 7 days</option>
            <option value="last_30_days">Last 30 days</option>
            <option value="last_60_days">Last 60 days</option>
            <option value="last_90_days">Last 90 days</option>
          </select>

          <button className="filter-button" disabled>
            Date
          </button>
          <button className="filter-button" disabled>
            Priority
          </button>
        </div>

        <div className="reports-table">
          <div className="reports-header">
            <div>ID</div>
            <div>TITLE</div>
            <div>MGRS</div>
            <div>CATEGORIES</div>
            <div>PRIORITY</div>
            <div>SUBMITTED BY</div>
            <div>DATE</div>
          </div>

          {reports.map(report => (
            <Report report={report} />
          ))}
        </div>
      </main>
    </>
  );
}
