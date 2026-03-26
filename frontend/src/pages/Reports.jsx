import { useEffect, useState } from 'react';

import Header from '../components/Header';

export default function Reports() {
  const [reports, setReports] = useState(null);

  useEffect(() => {
    const getReports = async () => {
      const res = await fetch('http://localhost:8080/reports');
      const reportsData = await res.json();
      setReports(reportsData);
    };
    getReports();
  }, []);
  return (
    <>
      <Header />
      <div>TO DO: REPORTS</div>;
    </>
  );
}

// Next, fetch all reports from GET /reports and display them in a table.
// The table should be filterable by category.
// The filter should update the data without a page reload.
// Decide whether filtering on the client or making a new request to the server.
