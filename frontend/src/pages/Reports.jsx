import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Report from '../components/Report';
import AppContext from '../context/AppContext';
import handleExportPdf from '../helpers/handleExportPdf';
import '../style/Reports.css';

export default function Reports() {
  const navigate = useNavigate();
  const { reports, categories, cap, selectedReports, setSelectedReports } =
    useContext(AppContext);

  const handleNewReport = () => {
    navigate('/dashboard');
  };

  const handleExportSelected = () => {
    handleExportPdf(selectedReports);
  };

  const handleClearSelected = () => {
    setSelectedReports([]);
  };

  const handleSelectAll = () => {
    setSelectedReports([...reports]);
  };

  if (!reports || !categories) return null;

  return (
    <>
      <Header />

      <main className="page">
        <div className="page-header-container">
          <div className="page-title-container">
            <div className="page-header-title">All reports</div>
            <div className="page-header-subtitle">{reports.length} reports</div>
          </div>

          <div className="page-utility-container">
            <button
              className="page-action-secondary"
              onClick={handleSelectAll}
              disabled={selectedReports.length === reports.length}
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
              Export selected ({selectedReports.length})
            </button>
            <button className="page-action-primary" onClick={handleNewReport}>
              + New report
            </button>
          </div>
        </div>

        <div className="filters-bar">
          <input
            className="filter-input"
            type="search"
            placeholder="Search by title, MGRS, or submitter..."
          />

          <select className="filter-select" defaultValue="all_categories">
            <option value="all_categories">All categories</option>
            {categories.map(c => (
              <option value="c.category">
                {c.category
                  .split('_')
                  .map(word => cap(word))
                  .join(' ')}
              </option>
            ))}
          </select>

          <select className="filter-select" defaultValue="all_priorities">
            <option value="all_priorities">All priorities</option>
            <option value="attention">Attention</option>
            <option value="critical">Critical</option>
            <option value="info_only">Info Only</option>
            <option value="routine">Routine</option>
          </select>

          <select className="filter-select" defaultValue="all_dates">
            <option value="all_dates">All dates</option>
            <option value="last_7_days">Last 7 days</option>
            <option value="last_30_days">Last 30 days</option>
            <option value="last_60_days">Last 60 days</option>
            <option value="last_90_days">Last 90 days</option>
          </select>

          <button className="filter-button">Date</button>
          <button className="filter-button">Priority</button>
        </div>

        <div className="reports-table">
          <div className="reports-header">
            <div>EXPORT</div>
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
