import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import handleDownloadPdf from '../helpers/handleDownloadPdf';

export default function ReportsToolbar({ reports, loading, totalReports }) {
  const navigate = useNavigate();
  const { selectedReports, setSelectedReports } = useContext(AppContext);

  const handleNewReport = () => navigate('/dashboard');

  const handleExportSelected = () => handleDownloadPdf(selectedReports);

  const handleClearSelected = () => setSelectedReports([]);

  const handleSelectAll = () => setSelectedReports([...reports]);

  return (
    <div className="page-header-container">
      <div className="page-title-container">
        <div className="page-header-title">All reports</div>
        <div className="page-header-subtitle">
          {loading
            ? 'Loading reports...'
            : `${totalReports.toLocaleString()} total reports`}
        </div>
      </div>

      <div className="page-utility-container">
        <button
          className="page-action-secondary"
          onClick={handleSelectAll}
          disabled={
            selectedReports.length === reports.length || !reports.length
          }
        >
          Select all
        </button>
        <button
          className="page-action-secondary"
          onClick={handleClearSelected}
          disabled={selectedReports.length === 0}
        >
          Clear selected
        </button>
        <button
          className="page-action-secondary"
          onClick={handleExportSelected}
          disabled={selectedReports.length === 0}
        >
          Download selected ({selectedReports.length})
        </button>
        <button className="page-action-primary" onClick={handleNewReport}>
          + New report
        </button>
      </div>
    </div>
  );
}
