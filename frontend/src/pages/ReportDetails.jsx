import { useContext } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

export default function ReportDetails() {
  const { reportDetails } = useContext(AppContext);
  const {
    id,
    title,
    mgrs,
    created_at,
    priority,
    submitted_by,
    category,
    summary,
    recommendations,
    lat_long,
  } = reportDetails;
  console.log(reportDetails);
  return (
    <>
      <Header />

      <main className="page">
        <div className="page-header-container">
          <div className="page-title-container">
            <div className="page-header-title">{title}</div>
            <div className="page-header-subtitle">
              TG Pineland — last sync 4 min ago
            </div>
          </div>

          <div className="page-utility-container">
            <button className="page-action-secondary" disabled>
              Export
            </button>
            <button className="page-action-primary" disabled>
              + New report
            </button>
          </div>
        </div>

        <div>{id}</div>
        <div>{category}</div>
        <div>{mgrs}</div>
        <div>{lat_long}</div>
        <div>{created_at}</div>
        <div>{priority}</div>
        <div>{submitted_by}</div>
        <div>{summary}</div>
        <div>{recommendations}</div>
      </main>
    </>
  );
}
