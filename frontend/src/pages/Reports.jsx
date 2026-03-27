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
    </>
  );
}

// Add a category filter dropdown that uses `?category=x`. Decide whether to filter client-side or re-fetch from the server.

// Build the `/reports/:id` detail view. Display all fields and assigned categories.
