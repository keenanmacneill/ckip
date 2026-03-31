export default function MetricsBar({ reports }) {
  const metrics = [
    {
      value: reports.length,
      //update dynamically
      label: 'REPORTS IN THE LAST YEAR',
      tone: 'successMessage',
    },
    {
      value: reports.filter(r => r.priority === 'attention').length,
      label: 'PENDING REVIEW',
      tone: 'warning',
    },
    {
      value: reports.filter(r => r.priority === 'critical').length,
      label: 'PRIORITY ALERTS',
      tone: 'danger',
    },
  ];

  return (
    <div className="dashboard-metrics-container">
      {metrics.map(metric => (
        <div
          key={metric.label}
          className={`dashboard-metric-card card metric-card-${metric.tone}`}
        >
          <div className="dashboard-metric-value">{metric.value}</div>
          <div className="dashboard-metric-label">{metric.label}</div>
          <div className="dashboard-metric-note">{metric.note}</div>
        </div>
      ))}
    </div>
  );
}
