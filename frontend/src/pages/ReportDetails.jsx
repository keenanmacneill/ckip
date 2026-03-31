import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportDetailsBottomCard from '../components/report-details/ReportDetailsBottomCard';
import ReportDetailsMap from '../components/report-details/ReportDetailsMap';
import ReportDetailsSideSection from '../components/report-details/ReportDetailsSideSection';
import ReportDetailsSubheader from '../components/report-details/ReportDetailsSubheader';
import ReportDetailsTimeline from '../components/report-details/ReportDetailsTimeline';
import Header from '../components/shared/Header';
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
            <ReportDetailsTimeline reportDetails={reportDetails} />
          </aside>
        </div>

        <ReportDetailsBottomCard reportDetails={reportDetails} />
      </main>
    </>
  );
}
