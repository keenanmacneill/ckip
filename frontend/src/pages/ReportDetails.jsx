import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import '../style/ReportDetails.css';

export default function ReportDetails() {
  const { reportDetails } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!reportDetails) {
      navigate('/404');
    }
  }, [reportDetails, navigate]);

  if (!reportDetails) return 'Loading...';

  const handleBack = () => {
    navigate('/reports');
  };

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
    classification,
  } = reportDetails;

  const reviewTimeline = [
    {
      title: 'Report submitted',
      time: created_at,
      meta: submitted_by,
      status: 'complete',
    },
    {
      title: 'MGRS verified',
      time: '2025-03-22 15:10Z',
      meta: 'Auto validation',
      status: 'complete',
    },
    {
      title: '35 series review',
      time: '2025-03-22 15:42Z',
      status: 'pending',
    },
  ];

  return (
    <>
      <Header />

      <main className="page">
        <div className="page-header-container">
          <div className="page-title-container">
            <div
              className="page-header-subtitle clickable"
              onClick={handleBack}
            >
              ← Back to reports
            </div>

            <div className="classification">{classification}</div>

            <div className="page-header-title">{title}</div>

            <div className="report-details-tag-row">
              <span
                className={`report-details-tag report-details-priority priority-${String(
                  priority,
                )
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
              >
                {priority}
              </span>
            </div>
          </div>

          <div className="page-utility-container">
            <button className="page-action-secondary" disabled>
              Edit
            </button>
            <button className="page-action-secondary" disabled>
              Export PDF
            </button>
          </div>
        </div>

        <div className="report-details-layout">
          <section className="report-details-main-card">
            <div className="report-details-section">
              <div className="report-details-label">Summary</div>
              <div className="report-details-body">{summary}</div>
            </div>

            <div className="report-details-divider" />

            <div className="report-details-section">
              <div className="report-details-label">MGRS Coordinate</div>
              <div className="report-details-link clickable">{mgrs}</div>
            </div>

            <div className="report-details-divider" />

            <div className="report-details-section">
              <div className="report-details-label">Lat / Long</div>
              <div className="report-details-body">{lat_long}</div>
            </div>

            <div className="report-details-divider" />

            <div className="report-details-section">
              <div className="report-details-label">Recommendations</div>
              <div className="report-details-body">{recommendations}</div>
            </div>
          </section>

          <aside className="report-details-side-column">
            <section className="report-details-side-card">
              <div className="report-details-side-section">
                <div className="report-details-label">Report ID</div>
                <div className="report-details-strong">
                  {`RPT-${String(id).padStart(4, '0')}`}
                </div>
              </div>

              <div className="report-details-divider" />

              <div className="report-details-side-section">
                <div className="report-details-label">Submitted By</div>
                <div className="report-details-strong">{submitted_by}</div>
              </div>

              <div className="report-details-divider" />

              <div className="report-details-side-section">
                <div className="report-details-label">Created</div>
                <div className="report-details-strong">{created_at}</div>
              </div>

              <div className="report-details-divider" />

              <div className="report-details-side-section">
                <div className="report-details-label">Category</div>
                <div className="report-details-tag-row">
                  <span
                    className={`report-details-tag report-details-category category-${String(
                      category,
                    )
                      .toLowerCase()
                      .replace(/\s+/g, '_')}`}
                  >
                    {String(category).replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            </section>

            <section className="report-details-side-card">
              <div className="report-details-label review-timeline-title">
                Review Timeline
              </div>

              <div className="review-timeline-list">
                {reviewTimeline.map(item => (
                  <div
                    key={`${item.title}-${item.time}`}
                    className="review-timeline-item"
                  >
                    <div
                      className={`review-timeline-dot review-timeline-dot-${item.status}`}
                    />
                    <div className="review-timeline-content">
                      <div className="review-timeline-item-title">
                        {item.title}
                      </div>
                      <div className="review-timeline-item-meta">
                        {item.time}
                      </div>
                      <div className="review-timeline-item-submeta">
                        {item.meta}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}
