export default function ReportDetailsSideSection({ reportDetails }) {
  const { categories, id, created_at, submitted_by_email } = reportDetails;
  const reportCategories = Array.isArray(categories) ? categories : [];

  return (
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
        <div className="report-details-strong">{submitted_by_email}</div>
      </div>

      <div className="report-details-divider" />

      <div className="report-details-side-section">
        <div className="report-details-label">Created</div>
        <div className="report-details-strong">
          {created_at.replace('T', ', ')}
        </div>
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
  );
}
