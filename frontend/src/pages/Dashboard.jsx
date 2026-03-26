import Header from '../components/Header';
import '../style/Dashboard.css';

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="dashboard-header-container">
        <div className="dashboard-title-container">
          <div className="dashboard-header-title">Dashboard</div>
          <div className="dashboard-header-subtitle">
            {/* TO DO: sync refresh with last refresh */}
            AO: Pineland - last sync 4 min ago
          </div>
        </div>
        <div className="dashboard-utility-container">
          <button className="export-button">Export</button>
          <button className="new-report-button">+ New Report</button>
        </div>
      </div>
      <div className="dashboard-metrics-container">
        {/* TO DO: insert metrics components here */}
      </div>
      <div className="dashboard-main-container">
        <div className="dashboard-map">Report distribution</div>
        <div className="dashboard-report-container">
          <div className="dashboard-report-title">New report</div>
          <div className="dashboard-report-body">
            <div className="report-title-title">Title</div>
            <input
              className="report-title"
              type="text"
              placeholder="Brief descriptive title..."
            ></input>
            <div className="report-summary-title">Summary</div>
            <input
              className="report-summary"
              type="text"
              placeholder="Concise summary..."
            ></input>
            <div className="report-mgrs-title">MGRS</div>
            <input
              className="report-mgrs"
              type="text"
              placeholder="MGRS"
            ></input>
            <div className="report-mgrs-title">Latitude, longitude</div>
            <input
              className="report-lat-long"
              type="text"
              placeholder="Latitude, longitude"
            ></input>
            <div className="report-recommendations-title">Recommendations</div>
            <input
              className="report-recommendations"
              type="text"
              placeholder="Concise recommendations..."
            ></input>
            <div className="report-category-title">Category</div>
            <select className="report-category">
              {/* TO DO: generate options from categories table, multi-select */}
            </select>
            <div className="report-priority-title">Priority</div>
            <select className="report-priority">
              {/* TO DO: generate options from priority table */}
            </select>
          </div>
          <button className="report-submit-button">Submit report</button>
        </div>
      </div>
    </>
  );
}

// Wire the form to your POST endpoint.
// Handle the response, and show the user something meaningful whether it succeeds or fails.
// Add a Leaflet map to the page.
// Plot each report as a point using its lat/lng.
// Then add the heatmap layer using the leaflet-heat plugin.
// The heatmap should reflect report density by area, not individual points.
// Wire it to live data so it updates when the category filter changes.
// Think about what data the heatmap layer actually needs and whether you can reuse what you already fetched.
// Also add a map-click feature.
// When a user clicks the map, it should populate the lat/lng fields in the submission form.
// The user should not have to type coordinates by hand.
