export default function ReportTimeline({ reportDetails }) {
  const { submitted_by_email, created_at } = reportDetails;
  const reviewTimeline = [
    {
      title: 'Report submitted',
      time: created_at.replace('T', ', '),
      meta: submitted_by_email,
      status: 'complete',
    },
    {
      title: 'MGRS verified',
      time: '2025-03-22 15:10Z',
      meta: 'Auto validation',
      status: 'complete',
    },
    {
      title: 'S2 review',
      status: 'pending',
    },
  ];

  return (
    <>
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
                <div className="review-timeline-item-title">{item.title}</div>
                <div className="review-timeline-item-meta">{item.time}</div>
                <div className="review-timeline-item-submeta">{item.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
