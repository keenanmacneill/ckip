import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../style/Reports.css';

export default function Report({ report }) {
  const navigate = useNavigate();
  const { setReportDetails, selectedReports, setSelectedReports } =
    useContext(AppContext);

  const { id, title, mgrs, created_at, priority, submitted_by, categories } =
    report;

  const reportCategories = Array.isArray(categories)
    ? categories
    : categories
      ? [categories]
      : [];

  const sortedCategories = [...reportCategories].sort((a, b) =>
    String(a).localeCompare(String(b), undefined, { sensitivity: 'base' }),
  );

  const priorityClass = priority?.toLowerCase().replace(/\s+/g, '_');

  const handleClick = () => {
    setReportDetails(report);
    localStorage.setItem('reportDetails', JSON.stringify(report));
    navigate(`/reports/${title}`);
  };

  const handleToggleReport = report => {
    setSelectedReports(current => {
      const exists = current.some(r => r.id === report.id);

      if (exists) {
        return current.filter(r => r.id !== report.id);
      }

      return [...current, report];
    });
  };

  if (!report) return 'Loading...';

  return (
    <div className="report-row-container">
      <input
        className="report-checkbox"
        type="checkbox"
        checked={selectedReports.some(r => r.id === report.id)}
        onChange={() => handleToggleReport(report)}
      />
      <div className="report-row" onClick={handleClick}>
        <div className="report-cell report-id">
          {String(id).startsWith('RPT-')
            ? id
            : `RPT-${String(id).padStart(4, '0')}`}
        </div>

        <div className="report-cell report-title">{title}</div>

        <div className="report-cell report-mgrs">{mgrs}</div>

        <div className="report-cell report-categories">
          {sortedCategories.map((cat, index) => {
            const slug = cat
              ?.toLowerCase()
              .replace(/\s+/g, '_')
              .replace(/_/g, '_');
            return (
              <span
                key={`${cat}-${index}`}
                className={`category-badge category-${slug || 'unknown'}`}
              >
                {String(cat).replace(/_/g, ' ').toUpperCase()}
              </span>
            );
          })}
        </div>

        <div className="report-cell">
          <span className={`priority-pill priority-${priorityClass}`}>
            <span className="priority-dot" />
            {priority.toUpperCase()}
          </span>
        </div>

        <div className="report-cell report-submitted-by">{submitted_by}</div>

        <div className="report-cell report-date">
          {new Date(created_at).toLocaleDateString('en-CA')}
        </div>
      </div>
    </div>
  );
}
