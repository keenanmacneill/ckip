import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ReportDetailsMap from '../components/ReportDetailsMap';
import ReportDetailsSubheader from '../components/ReportDetailsSubheader';
import ReportTimeline from '../components/ReportTimeline';
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

  if (!reportDetails) return null;

  const {
    id,
    created_at,
    submitted_by_email,
    categories,
    summary,
    recommendations,
  } = reportDetails;

  const reportCategories = Array.isArray(categories) ? categories : [];

  return (
    <>
      <Header />

      <main className="page">
        <ReportDetailsSubheader reportDetails={reportDetails} />

        <div className="report-top-layout">
          <ReportDetailsMap reportDetails={reportDetails} />

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
                <div className="report-details-strong">
                  {submitted_by_email}
                </div>
              </div>

              <div className="report-details-divider" />

              <div className="report-details-side-section">
                <div className="report-details-label">Created</div>
                <div className="report-details-strong">{created_at}</div>
              </div>

              <div className="report-details-divider" />

              <div className="report-details-side-section">
                <div className="report-details-label">Categories</div>
                <div className="report-details-tag-row">
                  {reportCategories.map((category, index) => (
                    <span
                      key={`${category}-${index}`}
                      className={`report-details-tag report-details-category category-${String(
                        category,
                      )
                        .toLowerCase()
                        .replace(/\s+/g, '_')}`}
                    >
                      {String(category).replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <ReportTimeline reportDetails={reportDetails} />
          </aside>
        </div>

        <div className="report-bottom-layout">
          <section className="report-details-main-card">
            <div className="report-details-section">
              <div className="report-details-label">Summary</div>
              <div className="report-details-body">{summary}</div>
            </div>

            <div className="report-details-divider" />

            <div className="report-details-section">
              <div className="report-details-label">Recommendations</div>
              <div className="report-details-body">
                {recommendations.split('\n').map(r => (
                  <div>{r}</div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
