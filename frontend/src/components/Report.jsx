import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../style/Reports.css';

export default function Report({ report }) {
  const navigate = useNavigate();
  const { setReportDetails } = useContext(AppContext);

  const { id, title, mgrs, created_at, priority, submitted_by, category } =
    report;
  const categories = Array.isArray(category) ? category : [category];
  const priorityClass = priority?.toLowerCase().replace(/\s+/g, '_');

  const handleClick = () => {
    setReportDetails(report);
    navigate(`/reports/${title}`);
  };

  return (
    <div className="report-row" onClick={handleClick}>
      <div className="report-cell report-id">
        {String(id).startsWith('RPT-')
          ? id
          : `RPT-${String(id).padStart(4, '0')}`}
      </div>

      <div className="report-cell report-title">{title}</div>

      <div className="report-cell report-mgrs">{mgrs}</div>

      <div className="report-cell report-categories">
        {categories.map(cat => {
          const slug = cat
            ?.toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/_/g, '_');
          return (
            <span key={cat} className={`category-badge category-${slug}`}>
              {String(cat).replace(/_/g, ' ').toUpperCase()}
            </span>
          );
        })}
      </div>

      <div className="report-cell">
        <span className={`priority-pill priority-${priorityClass}`}>
          <span className="priority-dot" />
          {priority}
        </span>
      </div>

      <div className="report-cell report-submitted-by">{submitted_by}</div>

      <div className="report-cell report-date">
        {new Date(created_at).toLocaleDateString('en-CA')}
      </div>
    </div>
  );
}
