import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import ReportCategories from '../report/ReportCategories';

export default function ReportForm({
  reportClassification,
  setReportClassification,
  reportTitle,
  setReportTitle,
  reportSummary,
  setReportSummary,
  reportRecommendations,
  setReportRecommendations,
  reportMGRS,
  setReportMGRS,
  reportLatLong,
  setReportLatLong,
  reportPriority,
  setReportPriority,
  selectedCategories,
  setSelectedCategories,
  submitMessage,
  onSubmit,
}) {
  const { cap, categories } = useContext(AppContext);

  const sortedCategories = [...(categories || [])].sort((a, b) =>
    a.category.localeCompare(b.category, undefined, { sensitivity: 'base' }),
  );

  return (
    <div className="dashboard-report-container card">
      <div className="dashboard-panel-header">
        <div className="dashboard-panel-title">Submit report</div>
      </div>

      <div className="dashboard-report-body">
        <div className="auth-field-group">
          <div className="auth-label">Classification</div>
          <select
            className="report-priority clickable"
            defaultValue=""
            value={reportClassification}
            onChange={e => setReportClassification(e.target.value)}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="confidential">Confidential</option>
            <option value="secret">Secret</option>
            <option value="top_secret">Top Secret</option>
          </select>
        </div>

        <div className="auth-field-group">
          <div className="auth-label">Title</div>
          <input
            className="report-title"
            type="text"
            placeholder="Brief descriptive title..."
            value={reportTitle}
            onChange={e => setReportTitle(e.target.value)}
          />
        </div>

        <div className="auth-field-group">
          <div className="auth-label">Summary</div>
          <textarea
            className="report-summary"
            placeholder="Concise summary..."
            value={reportSummary}
            onChange={e => setReportSummary(e.target.value)}
          />
        </div>

        <div className="auth-field-group">
          <div className="auth-label">Recommendations</div>
          <textarea
            className="report-recommendations"
            placeholder="Concise recommendations..."
            value={reportRecommendations}
            onChange={e => setReportRecommendations(e.target.value)}
          />
        </div>

        <div className="auth-field-group">
          <div className="auth-label">MGRS</div>
          <input
            className="report-mgrs"
            type="text"
            placeholder="MGRS"
            value={reportMGRS}
            onChange={e => setReportMGRS(e.target.value)}
          />
        </div>

        <div className="auth-field-group">
          <div className="auth-label">Latitude, longitude</div>
          <input
            className="report-lat-long"
            type="text"
            placeholder="Latitude, longitude"
            value={reportLatLong}
            onChange={e => setReportLatLong(e.target.value)}
          />
        </div>

        <div className="auth-field-group">
          <div className="auth-label">Priority</div>
          <select
            className="report-priority clickable"
            defaultValue=""
            value={reportPriority}
            onChange={e => setReportPriority(e.target.value)}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="attention">Attention</option>
            <option value="critical">Critical</option>
            <option value="routine">Routine</option>
          </select>
        </div>

        <div className="auth-field-group">
          <ReportCategories
            label="Categories"
            selectedValues={selectedCategories}
            onChange={values => setSelectedCategories(values)}
            options={sortedCategories.map(category => ({
              value: category.category,
              label: category.category
                .split('_')
                .map(word => cap(word))
                .join(' '),
            }))}
          />
        </div>
      </div>

      <div className="dashboard-report-footer">
        {submitMessage && (
          <div
            className={`report-submit-message ${
              submitMessage[0] !== 201
                ? `report-submit-message-${submitMessage[0]}`
                : ''
            }`}
          >
            {submitMessage[1]}
          </div>
        )}
        <button className="report-submit-button" onClick={onSubmit}>
          Submit report
        </button>
      </div>
    </div>
  );
}
