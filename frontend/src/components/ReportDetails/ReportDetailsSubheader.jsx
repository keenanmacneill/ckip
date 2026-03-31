import { useNavigate } from 'react-router-dom';
import handleDownloadPdf from '../../helpers/handleDownloadPdf';

export default function ReportDetailsSubheader({ reportDetails }) {
  const { title, priority, classification } = reportDetails;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/reports');
  };

  return (
    <div className="page-header-container">
      <div className="page-title-container">
        <div className="page-header-subtitle clickable" onClick={handleBack}>
          ← Back to reports
        </div>

        <div
          className={`classification classification-${String(classification)
            .toLowerCase()
            .replace(/\s+/g, '-')}`}
        >
          {classification}
        </div>

        <div className="page-header-title">{title}</div>

        <div className="report-details-tag-row">
          <span
            className={`report-details-tag report-details-priority priority-${String(
              priority,
            )
              .toLowerCase()
              .replace(/\s+/g, '-')}`}
          >
            {priority.replace(/_/g, ' ').toUpperCase()}
          </span>
        </div>
      </div>
      <div className="page-utility-container">
        <button
          className="page-action-primary"
          onClick={() => handleDownloadPdf([reportDetails])}
        >
          Download
        </button>
      </div>
    </div>
  );
}
