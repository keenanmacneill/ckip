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
      console.log(reportsData);
      setReports(reportsData);
    };
    getReports();
  }, [reports]);

  if (!reports) return <h1>Loading...</h1>;
  return (
    <>
      <Header />

      <main className="reports-page">
        <div className="reports-header-container">
          <div className="reports-title-container">
            <div className="reports-header-title">All reports</div>
            <div className="reports-header-subtitle">
              {reports.length} reports — last sync 4 min ago
            </div>
          </div>

          <div className="reports-utility-container">
            <button className="reports-action-primary" disabled>
              + New report
            </button>
          </div>
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

        {reports.map(r => (
          <Report report={r} />
        ))}
      </main>
    </>
  );
}
