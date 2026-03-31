import Report from '../Report/Report';

export default function ReportsTable({ reports, loading }) {
  return (
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

      {!loading &&
        reports.map(report => <Report key={report.id} report={report} />)}
    </div>
  );
}
