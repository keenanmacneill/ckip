import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ReportDetailsBottomCard from '../components/ReportDetailsBottomCard';
import ReportDetailsMap from '../components/ReportDetailsMap';
import ReportDetailsSideSection from '../components/ReportDetailsSideSection';
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

  return (
    <>
      <Header />

      <main className="page">
        <ReportDetailsSubheader reportDetails={reportDetails} />

        <div className="report-top-layout">
          <ReportDetailsMap reportDetails={reportDetails} />

          <aside className="report-details-side-column">
            <ReportDetailsSideSection reportDetails={reportDetails} />
            <ReportTimeline reportDetails={reportDetails} />
          </aside>
        </div>

        <ReportDetailsBottomCard reportDetails={reportDetails} />
      </main>
    </>
  );
}
