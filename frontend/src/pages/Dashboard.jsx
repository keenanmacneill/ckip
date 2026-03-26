import Header from '../components/Header';

export default function Dashboard() {
  return (
    <>
      <Header />
      <div>TO DO: DASHBOARD, SUBMIT REPORT</div>;
    </>
  );
}

// Start with the report submission form.
// It needs a lat/lng input (typed coordinates are fine for now), a free-text summary field, and a way to select one or more category tags.
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
