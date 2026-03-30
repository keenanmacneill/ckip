export default function ReportDetailsBottomCard({ reportDetails }) {
  const { summary, recommendations } = reportDetails;
  return (
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
  );
}
